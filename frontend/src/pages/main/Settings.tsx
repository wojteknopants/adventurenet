import DeleteAccount from "../../components/DeleteAccount";
import PageTitle from "../../components/PageTitle";
import ResetEmail from "../../components/ResetEmail";
import ResetPassword from "../../components/ResetPassword";

const Settings = () => {
  return (
    <div>
      <PageTitle title="Settings" />
      <div className="flex flex-col gap-2">
        <ResetEmail />
        <ResetPassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
