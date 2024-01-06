import DeleteAccount from "../../components/DeleteAccount";
import PageTitle from "../../components/PageTitle";

const Settings = () => {
  return (
    <>
      <PageTitle title="Settings" />
      {/* <ResetEmail />
      <ResetPassword /> */}
      <DeleteAccount />
    </>
  );
};

export default Settings;
