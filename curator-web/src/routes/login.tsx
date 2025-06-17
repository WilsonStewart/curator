import { Overlay } from "@/components/overlay";
import { authAtom } from "@/lib/state";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [authState, setAuthState] = useAtom(authAtom);

  return (
    <Overlay>
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
    </Overlay>
  );
}
