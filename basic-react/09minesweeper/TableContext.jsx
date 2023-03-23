const {createContext} = require('react');

// createContext를 통해 보내줄 값을 설정하고, useContext를 통해 그 값을 가져옴
// createContext의 인자에는 Context의 초기값이 들어감
// 초기값이 의미가 없다면, 모양새만 맞추면 됨
const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: ()=>{},
});

// https://velog.io/@shin6403/NodeJs-requireexportsmodule.exports-Part.2
exports.TableContext = TableContext;