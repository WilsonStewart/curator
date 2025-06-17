import type { PropsWithChildren } from "react"


export const Overlay = (props: PropsWithChildren) => {
    return (
        <div className="overlay">{props.children}</div>
    )
}