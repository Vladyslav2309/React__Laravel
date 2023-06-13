export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}
export interface IAuthUser{
    isAuth:boolean
    user?: IUser
    image:  File|null
}
export interface IUser{
    email:string,
    name:string
    image:  File|null
}
