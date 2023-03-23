const pathFn = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');
const linkTargetFileList = [
  '.vscode',
  'tsconfig.json',
  'tsconfig.cjs.json',
  'tsconfig.esm.json',
  'tsconfig.node.json',
  '.editorconfig',
  '.ncurc.json',
  '.prettierignore',
  '.prettierrc.js',
];
const child_process = require('child_process');

const getFolderList = async (path) => {
  const dirList = await fsPromises.readdir(path);
  const dirReturnList = [];
  for (let i = 0, lenI = dirList.length; i < lenI; i++) {
    const dir = dirList[i];
    if (dir === 'node_modules') continue;
    const dirPath = pathFn.join(path, dir);
    const isDirectory = fs.lstatSync(dirPath).isDirectory();
    if (isDirectory) dirReturnList.push(dir);
  }
  return dirReturnList;
};

const fileExistCheck = async (filePath) => {
  try {
    const stat = await fsPromises.stat(filePath);
    return stat ? true : false;
  } catch (error) {
    return false;
  }
};

const setSymlink = async (dirPath) => {
  console.log({ dirPath });

  for (let i = 0, lenI = linkTargetFileList.length; i < lenI; i++) {
    const fileName = linkTargetFileList[i];
    const currentFilePath = pathFn.join(dirPath, fileName);
    const sourcePath = pathFn.join(__dirname, fileName);

    try {
      try {
        await fsPromises.rm(currentFilePath, { recursive: true }).catch((e) => { });
        await fsPromises.unlink(currentFilePath).catch((e) => { });
      } catch (e) {
        try {
          fs.rmdirSync(currentFilePath, { recursive: true });
        } catch (err) { }
      }
    } catch (e) {
      console.log('e :>> ', e);
    }

    const pathArray = dirPath.split(pathFn.sep);

    const checkVuePath = () => {
      const frontendIndex = pathArray.findIndex((x) => x === 'frontend');
      if (frontendIndex > -1) return true;
      const vueIndex = pathArray.findIndex((x) => x.includes('vue'));
      if (vueIndex > -1) return true;
      return false;
    };
    const templateSourcePath = pathFn.join(__dirname, 'common', 'template');
    if (fileName === 'tsconfig.json') {
      if (checkVuePath()) {
        const tsConfigSourcePath = pathFn.join(templateSourcePath, `tsconfig.vue.json`);
        await fsPromises.symlink(tsConfigSourcePath, currentFilePath);
      } else {
        const cjsTsConfigSourcePath = pathFn.join(templateSourcePath, `tsconfig.esm.json`);
        await fsPromises.symlink(cjsTsConfigSourcePath, currentFilePath);
      }
      // const cmd = `git rm --cached  ${currentFilePath}`;
      // child_process.exec(cmd);
    } else if (fileName === '.vscode') {
      await fsPromises.symlink(sourcePath, currentFilePath, 'dir');
      // const cmd = `git rm --cached ${currentFilePath}`;
      // child_process.exec(cmd);
    } else {
      const sourcePath = pathFn.join(templateSourcePath, `${fileName}`);
      await fsPromises.symlink(sourcePath, currentFilePath);
      // const cmd = `git rm --cached ${currentFilePath}`;
      // child_process.exec(cmd);
    }
  }
};
const recursiveFolderAction = async (parentPath, dirList, nowDepth = 1, maxDepth = 4) => {
  for (let i = 0, lenI = dirList.length; i < lenI; i++) {
    const dir = dirList[i];
    const childrenDirPath = pathFn.join(parentPath, dir);
    const dirInPackageJsonPath = pathFn.join(childrenDirPath, 'package.json');
    if (await fileExistCheck(dirInPackageJsonPath)) {
      await setSymlink(pathFn.relative('.', childrenDirPath));
    }
    if (nowDepth >= maxDepth) return;
    const childrenDirList = await getFolderList(childrenDirPath);
    await recursiveFolderAction(childrenDirPath, childrenDirList, nowDepth + 1, maxDepth);
  }
};

const rootAction = async (path) => {
  try {
    const dirList = await getFolderList(path);
    dirList.forEach(async (dir) => {
      if (dir[0] === '.') return;
      if (dir === 'common') return;
      const childrenDirPath = pathFn.join(path, dir);
      const dirInPackageJsonPath = pathFn.join(childrenDirPath, 'package.json');
      if (await fileExistCheck(dirInPackageJsonPath)) {
        setSymlink(pathFn.relative('.', childrenDirPath));
      }
      const childrenDirList = await getFolderList(childrenDirPath);
      await recursiveFolderAction(childrenDirPath, childrenDirList);
    });
  } catch (e) {
    console.log('e :>> ', e);
  }
};
rootAction(__dirname);
