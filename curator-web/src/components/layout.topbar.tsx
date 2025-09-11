import { Hamburger } from "@/components/hamburger"
import { Superbar } from "@/components/superbar"

export const LayoutTopbar = () => {
    return (
        <div className="layout-topbar">
            <div className="left"><img className="logo-top-left" src="/bone.png" /></div>
            <div className="middle">
                <Superbar />
            </div>
            <div className="right"><Hamburger /></div>
        </div>

    )
}