import type { PropsWithChildren } from "react";

export const LayoutContent = (props: PropsWithChildren) => {
    return <div className="content">
        {props.children}
    </div>
}