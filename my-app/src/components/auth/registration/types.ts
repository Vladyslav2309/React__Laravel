export interface  IUserCreate{
    firstName: string,
    lastName:string,
    email:string,
    phone:string;
    password:string,
    password_confirmation: string,
    image:  File|null,
}