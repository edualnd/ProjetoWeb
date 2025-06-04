import { changeUsername, checkRegisterCredentials } from "../../model/userModel.js"


const usernameController = async (req, res) => {
    const {userId, username} = req.user
    const newUsername = req.body.username
    if(username == newUsername) {
      return res.status(400).json({
        message: "Mesmo username"
      })
    }

    const checkUsername = await checkRegisterCredentials(
      null,
      newUsername,
    );
    const { success, error, data } = await validateSchema(userSchema, user, {email: true, password: true});
    if(checkUsername || !success){
      return res.status(400).json({
        message: "Username já em uso",
        error: error || ""
      })
    }
    const user = await changeUsername(userId, newUsername)

    if(!user){
      
      return res.status(500).json({
        message: "Erro ao mudar o username"
      })

    }

    return res.status(200).json({
      message:"username mudado com sucesso"
    })

}

export default usernameController
