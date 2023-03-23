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
export declare type MenuTemplateItem<T extends string = string> = MenuTemplateLineItem | MenuTemplateCategoryItem<T> | MenuTemplateMenuItem<T> | MenuTemplateTitleItem | MenuTemplateSubTitleItem;
export declare type MenuTemplate<T extends string = string> = MenuTemplateItem<T>[];
export interface MenuPermission<D extends string = string> {
    id: string;
    type: 'c' | 'u' | 'r' | 'd';
    range: 'all' | 'private' | 'organization';
    text: string;
    apiUrl: {
        method: RestMethod;
        url: D;
    }[];
    option?: any;
}
export declare type MenuList</*menuKey*/ T extends string = string, /*apiUrl:url*/ D extends string = string> = {
    [key in T]: {
        title: string;
        url: string;
        permission: MenuPermission<D>[];
        isAdmin?: boolean;
    };
};
declare type MenuTemplateRemoveRecursiveRawItem = Omit<MenuTemplate<string>[number], 'subTree'>;
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
export declare namespace RoleMenu {
    interface RoleMenuPermission extends MenuPermission {
        isUse: boolean;
    }
    interface RoleMenuLineItem extends MenuTemplateLineItem {
        isUse: boolean;
    }
    interface RoleMenuCategoryItem extends MenuTemplateCategoryItem {
        isUse: boolean;
    }
    interface RoleMenuSubTitleItem extends MenuTemplateSubTitleItem {
        isUse: boolean;
    }
    interface RoleMenuMenuItem extends MenuTemplateMenuItem {
        isUse: boolean;
        permission: MenuPermission[];
    }
    interface RoletitleItem extends MenuTemplateTitleItem {
        isUse: boolean;
    }
    type RoleMenuTemplateItem = RoleMenuLineItem | RoleMenuCategoryItem | RoleMenuSubTitleItem | RoleMenuMenuItem | RoletitleItem;
}
export {};
//# sourceMappingURL=index.d.ts.map