const { handleError } = require("../helpers/handleError");
const { 
  editRole,
  fetchRoles,
  insertRole,
  fetchRole,
  removeRole
 } = require("../service/role");
const { getByIdSchema } = require("../validation/common.validation");
const {addRoleSchema, updateRoleSchema } =
 require("../validation/role.validation");
exports.addRole=async(req,res,next)=>{
      try{
        const param= req.body;
        const {error}=addRoleSchema.validate(param)
        if(error){
          handleError(error.message,403)
        }
        const result = await insertRole(param);
        return res.status(201).json(result);
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
        const param=req.body;
        const filter={
          where:{
          id
          }
        };
       
        const {error}=updateRoleSchema.validate({
          id,...param
        })
        if(error){
          handleError(error.message,403)
        }
        const result = await editRole(param,filter);
        return res.status(201).json(result);
      }
      catch(error){
       next(error)
      }
    }

  exports.getRole=async(req,res,next)=>{
      try{
        const {id}=req.params;
        const {error}=getByIdSchema.validate({id})
        if(error){
          handleError(error.message,403)
        }
        const filter={
          where:{id}
        };
        const result = await fetchRole(filter);
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }

  exports.deleteRole=async(req,res,next)=>{
      try{
        const {id}=req.params;
        const {error}=getByIdSchema.validate({id})
        if(error){
          handleError(error.message,403)
        }
        const filter = {
          where:{
            id
          }
        }
        const result = await removeRole(filter);
        return res.json(result);
      }
      catch(error){
       next(error)
      }
    }
  