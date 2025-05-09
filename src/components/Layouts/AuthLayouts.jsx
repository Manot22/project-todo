import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
  const { children, type, titleLayout } = props;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="p-8 max-w-md mx-auto rounded-lg">
        <div className="mb-4">
          <h1 className="text-center font-semibold text-xl">{titleLayout}</h1>
          <p className="text-gray-500 text-sm text-center">
            Welcome, please enter your details !!!
          </p>
        </div>
        {children}
        <p className="text-sm text-gray-500 text-center">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          {type === "login" && (
            <Link to="/register" className="underline text-blue-500">
              Sign up
            </Link>
          )}

          {type === "register" && (
            <Link to="/" className="underline text-blue-500">
              Sign in
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};
export default AuthLayouts;
