import { Role } from "../models/role.model";
import { RoleCreationAttributes } from "../types/role.interface";

export class RoleService{
static async insertRole({name}:RoleCreationAttributes){
  const new_role = new Role({name})
  const  result= await new_role.save()
  return result;
}

static async fetchRoles(){
  const result =  await Role.findAll()
  return result;
}

static async fetchRole(filter:any){
  const result =  await Role.findOne(filter)
  return result;
}

static async editRole(param:Partial<RoleCreationAttributes>,filter:any){
  const result =  await Role.update(param,filter)
  return result;
  }

  static async removeRole(filter:any){
  const result =  await Role.destroy(filter)
  return result;
  }

}