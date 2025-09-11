import { Overlay } from "@/components/overlay";
import { isAuthedAtom } from "@/lib/state";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isAuthed, setIsAuthed] = useAtom(isAuthedAtom);
  const navigate = useNavigate();

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
          <button
            onClick={async () => {
              console.log("Before: ", isAuthed);
              setIsAuthed(true);
              console.log("After: ", isAuthed);
              navigate({ to: "/automations" });
            }}
          >
            Login
          </button>
          {/* <SocialButton /> */}
        </div>
      </div>
    </Overlay>
  );
}
