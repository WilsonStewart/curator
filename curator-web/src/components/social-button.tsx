export const SocialButton = (props: { type: "github" | 'devBypass' | 'google', imgpath: string }) => {
    switch (props.type) {
        case 'devBypass':
            return (
                <button className="social-button social-button-devbypass">
                    <img src={props.imgpath} />
                    <p>Bypass login as SYSTEM</p>
                </button >
            )

        case 'github':
            return (
                <button className="social-button social-button-github">
                    <img src={props.imgpath} />
                    <p>Login with GitHub</p>
                </button >
            )

        case 'google':
            return (
                <button className="social-button social-button-google">
                    <img style={{ backgroundColor: "white" }} src={props.imgpath} />
                    <p>Sign in with Google</p>
                </button >
            )
    }
}
