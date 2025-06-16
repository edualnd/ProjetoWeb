import { useState } from "react";
import ChangeEmail from "../components/Config/ChangeEmail.jsx";
import ChangePass from "../components/Config/ChangePass.jsx";
import ChangeRole from "../components/Config/ChangeRole.jsx";

import EditProfile from "../components/Config/EditProfile.jsx";
import DeleteAccount from "../components/Config/DeleteAccount.jsx";
import SideBar from "../components/Config/SideBar.jsx";
import { Stack, Box } from "@mui/material";
const ConfigPage = () => {
  const [section, setSection] = useState("editProfile");

  return (
    <>
      <Stack direction={"row"}>
        <SideBar
          selected={section}
          onChange={(event, section) => setSection((prev) => section || prev)}
          r
        ></SideBar>
        <Box
          sx={{
            width: "80%",
            height: "100vh",
            p: 2,
          }}
        >
          <RenderComponent section={section}></RenderComponent>
        </Box>
      </Stack>
    </>
  );
};
const RenderComponent = ({ section }) => {
  let ret = null;
  switch (section) {
    case "editProfile":
      ret = <EditProfile></EditProfile>;
      break;
    case "changePass":
      ret = <ChangePass></ChangePass>;
      break;
    case "changeEmail":
      ret = <ChangeEmail></ChangeEmail>;
      break;
    case "changeRole":
      ret = <ChangeRole></ChangeRole>;
      break;
    case "deleteAccount":
      ret = <DeleteAccount></DeleteAccount>;
      break;
  }
  return ret;
};

export default ConfigPage;
