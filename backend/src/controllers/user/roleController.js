import { changeUserRole } from "../../model/userModel.js";
import { professionalRoleSchema } from "../../schemas/userSchema.js";
import validateSchema from "../../utils/validators/schemaValidator.js";


const roleController = async (req,res) => {
  const { userId, role } = req.user;
  let changeRole, newRole
  if( role == 'PROFESSIONAL'){
    //Apagar o documento e nome trocar o role common
    newRole = 'COMMON';
    changeRole = await changeUserRole(userId, newRole, null, null);

  }else{
    //pegar o documento e nome e trocar o role para proffessional
    const newRole = 'PROFESSIONAL';
    const { success, error, data } = await validateSchema(professionalRoleSchema, req.body)
    if(!success){
      return res.status(400).json({
        message: 'Success false, invalid types in the schema',
        error: error,
      });
    }
    changeRole = await changeUserRole(userId, newRole, data.document, data.name);
  }

  if(!changeRole){
    return res.status(200).json({
    message: 'erro',
  });
  }
  req.user.role = newRole
  return res.status(200).json({
    message: 'Role updated successfully',
    userId,
    newRole: role,
    data: changeRole
  });
}

export default roleController
