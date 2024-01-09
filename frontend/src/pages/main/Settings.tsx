import DarkMode from "../../components/DarkMode";
import DeleteAccount from "../../components/DeleteAccount";
import PageTitle from "../../components/PageTitle";

const Settings = () => {
  return (
    <>
      <PageTitle title="Settings" />
      {/* <ResetEmail />
      <ResetPassword /> */}
      <DeleteAccount />

      <DarkMode />
    </>
  );
};

export default Settings;
