import { FC, MouseEventHandler } from "react";

export type LoginProps = {
  onLoginClick: MouseEventHandler;
};

const Login: FC<LoginProps> = ({ onLoginClick }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          className="rounded-full"
          src="https://via.placeholder.com/200"
          alt="placeholder"
        />
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={onLoginClick}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
