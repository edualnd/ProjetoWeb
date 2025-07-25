import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import "@fontsource/inter/900-italic.css";
import "@fontsource/inter/500.css";
import UserProfilePage from "./pages/UserProfilePage.jsx";

import MainLayout from "./components/MainLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FollowsPage from "./pages/FollowsPage.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { PostPage } from "./pages/PostPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { userStore } from "../store/userStore.js";

function App() {
  const { userData } = userStore();
  const theme = createTheme({
    palette: {
      ocean: {
        main: "#227b94",
        light: "#30a2c3",
        lighter: "#c2eafd",
        dark: "#09333F",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/profile"
            element={
              <MainLayout>
                <Outlet></Outlet>
              </MainLayout>
            }
          >
            <Route index element={<Navigate to="me" replace />} />

            <Route
              path=":username"
              element={<ProfilePage></ProfilePage>}
            ></Route>
            <Route
              path=":username/follows/:category"
              element={<FollowsPage></FollowsPage>}
            />
          </Route>

          <Route
            path="/config"
            element={
              <>
                <Navbar
                  logged={userData.logged}
                  username={userData.username}
                ></Navbar>
                <ConfigPage></ConfigPage>
              </>
            }
          />
          <Route
            path="/post/postId"
            element={
              <>
                <Navbar logged={true}></Navbar>
                <PostPage></PostPage>
              </>
            }
          ></Route>
          <Route
            path="/forgot-password/:token"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
