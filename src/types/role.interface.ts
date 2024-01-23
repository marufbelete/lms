import { Optional } from "sequelize";

export interface IRole {
  id: string;
  name: string;
}

export interface RoleCreationAttributes extends Optional<IRole, "id"> {}

// export interface UserResponse extends Partial<IBaseUser>{

// }
