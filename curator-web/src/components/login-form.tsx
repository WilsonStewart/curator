import { SocialButton } from "@/components/social-button"

export const LoginForm = () => {
    return (
        <div className="login">
            <img src="/bone.png"></img>
            <h1 className="login-title">login to <span>curator</span></h1>
            <input placeholder="email" />
            <input placeholder="password" type="password" />
            <button>Login with username and password</button>
            <SocialButton />
        </div>
    )
}