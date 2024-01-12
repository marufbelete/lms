import { TABLE } from "../constant/table";
import { Table, Model, Column, DataType,
ForeignKey,BelongsTo} from "sequelize-typescript";
import { User } from "./user.model";
import { Collection } from "./collection.model";
    
    
@Table({
  tableName: TABLE.COLLECTION_USER,
  modelName:'collection_user',
})
export class Collection_User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false
    
  })
  is_started: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false     
  })
  is_completed: string;

  @ForeignKey(() => User)
  @Column
  userId:string;

  @ForeignKey(() => Collection)
  @Column
  collectionId:string;


  @BelongsTo(()=> User)
  user?: User;

  @BelongsTo(()=> Collection)
  collection?: Collection;

}
    
    