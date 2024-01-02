import DeleteAccount from "../../components/DeleteAccount";
import PageTitle from "../../components/PageTitle";
import ResetEmail from "../../components/ResetEmail";
import ResetPassword from "../../components/ResetPassword";

const Settings = () => {
  return (
    <>
      <PageTitle title="Settings" />
      <ResetEmail />
      <ResetPassword />
      <DeleteAccount />
    </>
  );
};

export default Settings;
