import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
HasMany,BelongsToMany} from "sequelize-typescript";
import { Course } from "./course.model";
import { User } from "./user.model";
import { Collection_User } from "./collection_user";
import { CollectionCreationAttributes, ICollection } from "../types/collection.interface";
    
    
@Table({
  tableName: TABLE.COLLECTION,
  modelName:'collection',
})
export class Collection extends Model<ICollection,CollectionCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
    
  })
  title: string;

  @Column({
    type: DataType.STRING       
  })
  description: string;


  @HasMany(()=> Course)
  courses?: Course[];

  @BelongsToMany(()=> User,()=>Collection_User)
  users?: Array<User & {collection_user: Collection_User}>;

  @HasMany(()=> Collection_User)
  collection_users?: Collection_User[];

}
    
    