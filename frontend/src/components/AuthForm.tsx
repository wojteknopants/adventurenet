import { ReactNode, useEffect, useState } from "react";
interface AuthFormProps {
  children: ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ children, handleSubmit }: AuthFormProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    setIsShowing(true);
  }, []);
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <form
        onSubmit={handleSubmit}
        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 24px 48px" }}
        className={`flex flex-col justify-center transition-all ease-in-out duration-500 ${
          isShowing ? "opacity-100" : "opacity-0"
        } p-6 backdrop-blur-lg bg-white dark:bg-darkMainSection rounded-2xl`}
      >
        {children}
      </form>
    </div>
  );
};

// const mapStateToProps = (state: any) => ({
//   isAuthenticated: state.auth.checkIsAuthenticated,
// });

export default AuthForm;
//export default LoginForm;
