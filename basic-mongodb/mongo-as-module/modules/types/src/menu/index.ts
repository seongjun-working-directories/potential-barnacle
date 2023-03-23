import type { RestMethod } from '../api';

export interface MenuTemplateLineItem {
  id: string;
  title: string;
  type: 'line';
  isAdmin?: boolean;
}
export interface MenuTemplateMenuItem<T extends string = string> {
  id: string;
  type: 'menu';
  icon: string;
  menuKey: T;
  title: string;
  menuUrl: string;
  isAdmin?: boolean;
}
export interface MenuTemplateCategoryItem<T extends string = string> {
  id: string;
  type: 'category';
  icon: string;
  title: string;
  subTree: MenuTemplateItem<T>[];
  isAdmin?: boolean;
}
export interface MenuTemplateSubTitleItem {
  id: string;
  type: 'subtitle';
  title: string;
  isAdmin?: boolean;
}
export interface MenuTemplateTitleItem {
  id: string;
  type: 'title';
  title: string;
  isAdmin?: boolean;
}

export type MenuTemplateItem<T extends string = string> =
  | MenuTemplateLineItem
  | MenuTemplateCategoryItem<T>
  | MenuTemplateMenuItem<T>
  | MenuTemplateTitleItem
  | MenuTemplateSubTitleItem;

export type MenuTemplate<T extends string = string> = MenuTemplateItem<T>[];

export interface MenuPermission<D extends string = string> {
  id: string;
  type: 'c' | 'u' | 'r' | 'd';
  range: 'all' | 'private' | 'organization'; //APi DB 타겟 범위
  text: string;
  apiUrl: {
    method: RestMethod;
    url: D;
  }[];
  option?: any;
}

export type MenuList</*menuKey*/ T extends string = string, /*apiUrl:url*/ D extends string = string> = {
  [key in T]: {
    title: string;
    url: string;
    permission: MenuPermission<D>[];
    isAdmin?: boolean;
  };
};

type MenuTemplateRemoveRecursiveRawItem = Omit<MenuTemplate<string>[number], 'subTree'>;

interface MenuTemplateRemoveRecursiveItemFourDepth extends MenuTemplateRemoveRecursiveRawItem {
  subTree?: MenuTemplateRemoveRecursiveRawItem[];
}
interface MenuTemplateRemoveRecursiveItemThreeDepth extends MenuTemplateRemoveRecursiveRawItem {
  subTree?: MenuTemplateRemoveRecursiveItemFourDepth[];
}
interface MenuTemplateRemoveRecursiveItemTwoDepth extends MenuTemplateRemoveRecursiveRawItem {
  subTree?: MenuTemplateRemoveRecursiveItemThreeDepth[];
}
export interface MenuTemplateRemoveRecursiveItemOneDepth extends MenuTemplateRemoveRecursiveRawItem {
  subTree?: MenuTemplateRemoveRecursiveItemTwoDepth[];
}

export namespace RoleMenu {
  export interface RoleMenuPermission extends MenuPermission {
    isUse: boolean;
  }
  export interface RoleMenuLineItem extends MenuTemplateLineItem {
    isUse: boolean;
  }
  export interface RoleMenuCategoryItem extends MenuTemplateCategoryItem {
    isUse: boolean;
  }
  export interface RoleMenuSubTitleItem extends MenuTemplateSubTitleItem {
    isUse: boolean;
  }
  export interface RoleMenuMenuItem extends MenuTemplateMenuItem {
    isUse: boolean;
    permission: MenuPermission[];
  }
  export interface RoletitleItem extends MenuTemplateTitleItem {
    isUse: boolean;
  }
  export type RoleMenuTemplateItem =
    | RoleMenuLineItem
    | RoleMenuCategoryItem
    | RoleMenuSubTitleItem
    | RoleMenuMenuItem
    | RoletitleItem;
}
