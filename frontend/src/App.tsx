import { Route, Routes } from "react-router-dom";
import Feed from "./pages/main/Feed";
import Messages from "./pages/main/Messages";
import Settings from "./pages/main/Settings";
import Profile from "./pages/main/Profile";
import Explore from "./pages/main/Explore";
import MainLayout from "./pages/main/MainLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginForm from "./pages/auth/LoginForm";
import RegistrationForm from "./pages/auth/RegistrationForm";
import ActivateUser from "./pages/auth/ActivateForm";
import NotFound from "./pages/NotFound";

import { Provider } from "react-redux";
import store from "./store";
import Layout from "./pages/hocs/Layout";
import Logout from "./pages/main/Logout";
import Notifications from "./pages/main/Notifications";
import Bookmarks from "./pages/main/Bookmarks";

import { postsApiSlice } from "./features/posts/postsSlice";

store.dispatch(postsApiSlice.endpoints.getPosts.initiate());

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/:user" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/registration" element={<RegistrationForm />} />
              <Route
                path="/auth/activate/:uid/:token"
                element={<ActivateUser />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
};

export default App;
