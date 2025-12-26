import { Hamburger } from "@/components/hamburger"
import { Superbar } from "@/components/superbar"

export const LayoutTopbar = () => {
    return (
        <div className="layout-topbar">
            <div className="left"><img className="bone-icon" src="/bone.png" width={"30px"} /></div>
            <div className="middle">
                <Superbar />
            </div>
            <div className="right"><Hamburger /></div>
        </div>

    )
}