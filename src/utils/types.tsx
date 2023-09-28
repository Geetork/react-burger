import { store } from "../index";

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    count?: number;
}

export interface IBun extends IIngredient {
    idTop: string;
    idBottom: string;
};

export interface IDroppedIngredient extends IIngredient {
    id: string;
}

type TSuccess = {
    success: boolean;
}

export type TServerResponse<T> = TSuccess & T;

export type TRefreshResponse = TServerResponse<{ 
    refereshToken: string,
    accessToken: string}>;

export type TAuth = TServerResponse<TUserInfo> & TRefreshResponse;

export type TUserInfo = TServerResponse<{
    user: {
        email: string,
        name: string
    }
}>

export type TOrderResponse = TServerResponse<{
    name: string,
    order: {
        number: number
    }
}>

export type TLogout = TServerResponse<{
    message: string
}>

export type TResetPassword = TServerResponse<{
    message: string
}>

export interface IWSOrder {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IWSOrders {
    success: boolean;
    orders: IWSOrder[];
    total: number;
    totalToday: number;
  } 

export type RootState = ReturnType<typeof store.getState>;