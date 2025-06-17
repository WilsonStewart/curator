import { SocialButton } from "@/components/social-button";
import { KeyIcon } from "@phosphor-icons/react";

export const LoginForm = () => {
  return (
    <div className="login">
      <img src="/bone.png"></img>
      <h1 className="login-title">
        login to <span>curator</span>
      </h1>
      <input placeholder="email" />
      <input placeholder="password" type="password" />
      <div className="login--buttons">
        <button>
          {/* <KeyIcon color="gray" size={30} style={{ marginRight: "10px" }} /> */}
          Login
        </button>
        {/* <SocialButton /> */}
      </div>
    </div>
  );
};
