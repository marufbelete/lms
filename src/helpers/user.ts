import jwt from "jsonwebtoken";
import {hash,verify} from 'argon2';
import {Request} from "express";
import {UserService} from "../service/index.service";
import { User } from "../models/user.model";

interface ITokenIssue{
  sub?:string,
  email:string
}
interface ITokenOptions{
  expiresIn?:string
}

export const isEmailExist=async (email:string) => {
  const user = await UserService.fetchUser({
   where:{email:email}
  },{scope:'user_role_state'});
  return user;
}

export const hashPassword=async(password:string)=>{
  return await hash(password)
}

export const isPasswordCorrect = (password:string,hashedPassword:string) => {
  return verify(hashedPassword,password)
};

export const issueToken = function (payload:ITokenIssue,secret:string,option:ITokenOptions={}):string {
  const token = jwt.sign(payload, secret, {...option});
  return token;
};

export const isTokenValid = async function (token:string,secret:string) {
  const user = jwt.verify(token,secret);
  return user;
};

export const isEmailVerified = async (filter:any) => {
  const user = await UserService.fetchUser({ where: {...filter} });
  return user?.is_email_confirmed;
};

export const getLoggedUser = async (req:Request) => {
  const {sub}=req.user as {sub:string}
  const user = await UserService.fetchUserById(sub,{scope:'user_role_state'});
  return user;
};

export const userIp = (request:Request) => {
  let ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  return ip;
};

export const mapUserRole=(user:User,image?:string)=>{
  console.log(user)
  const transformedObject = {
      ...user.dataValues,
      image:image,
      roles: user.roles?.map(role => ({
        id: role.id,
        name: role.name,
        is_active: role.user_role?.is_active || false
      }))
    }
   delete transformedObject.password
   return transformedObject 
  };



