import { changeUserRole } from '../../model/userModel.js';
import { professionalRoleSchema } from '../../schemas/userSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';
const roleController = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let changeRole, newRole;
    if (role == 'PROFESSIONAL') {
      //Apagar o documento e nome trocar o role common
      newRole = 'COMMON';
      changeRole = await changeUserRole(userId, newRole, null, null);
    } else {
      //pegar o documento e nome e trocar o role para proffessional
      const newRole = 'PROFESSIONAL';
      const { success, error, data } = await validateSchema(
        professionalRoleSchema,
        req.body,
      );
      if (!success) {
        throw new CustomError(
          400,
          'Dados inválidos: verifique e tente novamente',
        );
      }
      changeRole = await changeUserRole(
        userId,
        newRole,
        data.document,
        data.name,
      );
    }

    if (!changeRole) {
      throw new Error();
    }
    req.user.role = newRole;
    return res.status(200).json({
      success: true,
      message: 'Tipo de conta atualizada com sucesso',
      user: changeRole,
    });
  } catch (e) {
    next(e);
  }
};

export default roleController;
