import { Overlay } from "@/components/overlay";
import { SocialButton } from "@/components/social-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  // const [isAuthed, setIsAuthed] = useAtom(isAuthedAtom);
  // const navigate = useNavigate();

  return (
    <Overlay>
      <div className="login-box font-lexend">
        <img className="bone-icon" src="/bone.png" width={"100px"}></img>
        <h1>curator</h1>
        {true ? <SocialButton imgpath="/bone.png" type="devBypass" /> : <div />}
        {true ? <SocialButton imgpath="/github-mark-white.png" type="github" /> : <div />}
        {true ? <SocialButton imgpath="/google.png" type="google" /> : <div />}

        {/* <input id="email-input" placeholder="email address" type="email" />
        <input id="password-input" placeholder="password" type="password" /> */}
      </div>
    </Overlay>
  );
}
