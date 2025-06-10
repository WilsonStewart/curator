import type { PropsWithChildren } from "react";

export const LayoutContent = (props: PropsWithChildren) => {
    return <div className="layout-content">
        <div className="container">
            {props.children}
        </div>
    </div>
}