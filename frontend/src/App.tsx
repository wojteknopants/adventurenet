import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import LoginContext from "./pages/AuthContext";
import Feed from "./pages/feed/Feed";
import NotFound from "./pages/NotFound";
import MainContext from "./pages/MainContext";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import LoginForm from "./pages/login/LoginForm";
import RegistrationForm from "./pages/registration/RegistrationForm";
import AuthContext from "./pages/AuthContext";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContext />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route path="/auth" element={<AuthContext />}>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/registration" element={<RegistrationForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
