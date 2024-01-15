import { IncludeOptions, UpdateOptions} from "sequelize";
import { User } from "../models/user.model";
import {Options, PersonCreationAttributes} from "../types"

export class UserService{

static async insertUser(param:PersonCreationAttributes,transaction={}){
  const new_user = new User(param)
  return new_user.save({...transaction})
}

static async editUser(param:PersonCreationAttributes,filter:UpdateOptions){
  return User.update(param,filter)
}

static async fetchUsers(filter:IncludeOptions,options?:Options){
  if(options?.scope){
  return User.scope(options.scope).findAll(filter)
  }
  return User.findAll(filter)
}

static async fetchUser(filter:IncludeOptions,options?:Options){
  if(options?.scope){
  return User.scope(options.scope).findOne(filter)
  }
  return User.findOne(filter)
}

static async fetchUserById(user_id:string,options?:Options){
  if(options?.scope){
  return User.scope(options.scope).findByPk(user_id)
  }
  return User.findByPk(user_id)
}

}

