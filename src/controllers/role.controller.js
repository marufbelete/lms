const { handleError } = require("../helpers/handleError");
const { 
  editRole,
  fetchRoles,
  insertRole,
  fetchRolesById
 } = require("../service/role");
const {addRoleSchema,getByIdSchema, updateRoleSchema } =
 require("../validation/role.validation");

exports.addRole=async(req,res,next)=>{
      try{
        const param= req.body;
        const {error}=addRoleSchema.validate(param)
        if(error){
          handleError(error.message,403)
        }
        const result = await insertRole(param);
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }
  
  exports.getRoles=async(req,res,next)=>{
      try{
        const result = await fetchRoles();
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }

  exports.updateRole=async(req,res,next)=>{
      try{
        const {id}=req.params;
        const {name}=req.body;
        const filter={
          where:{
          id
          }
        };
        const param={
          name
        };
        const {error}=updateRoleSchema.validate({
          id,name
        })
        if(error){
          handleError(error.message,403)
        }
        const result = await editRole(param,filter);
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }

  exports.getRoleById=async(req,res,next)=>{
      try{
        const {id}=req.params;
        const {error}=getByIdSchema.validate({id})
        if(error){
          handleError(error.message,403)
        }
        const result = await fetchRolesById(id);
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }
  