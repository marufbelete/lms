import { Optional } from "sequelize";

export interface IBaseUser{
    id: string;
    first_name?:string|null;
    last_name?:string|null;
    email?:string|null;
    username?:string|null;
    subscribed_to_newsletter:boolean;
    avatar?:string|null;
    password?:string|null;
    is_email_confirmed?:boolean;
    google_id?:string|null;
    is_local_auth?:boolean;
}

export interface IUser extends IBaseUser{
    role_id?:string; 
    remember_me?:boolean;
    file?:Express.Multer.File
    image?:string;
}


export interface PersonCreationAttributes extends 
Optional<IUser, 'id'|'username'|'first_name'|'password'|
'last_name'|'email'|'subscribed_to_newsletter'|
'avatar'|'is_email_confirmed'|'google_id'|
'is_local_auth'|'image'>{};

export interface UserResponse extends Partial<IBaseUser>{
  roles?:{
    id:string;
    name:string;
    is_active: boolean;
  }[]
}

export interface ILogin extends Pick<IUser,'email'|'password'|'remember_me'>{
  
}
