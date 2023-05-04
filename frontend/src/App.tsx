import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import LoginContext from "./pages/login/LoginContext";
import Feed from "./pages/feed/Feed";
import NotFound from "./pages/NotFound";
import RegistrationContext from "./pages/registration/RegistrationContext";
import MainContext from "./pages/MainContext";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";

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

        <Route path="/login" element={<LoginContext />} />
        <Route path="/registration" element={<RegistrationContext />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
