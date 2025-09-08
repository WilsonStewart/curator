export const LayoutTopbar = () => {
    return (
        <div className="layout-topbar">
            <button id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav">
                <svg id="burger" viewBox="0 0 24 24" width="32" height="32" role="img" aria-hidden="true">
                    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path id="bar1" d="M4 6h16" />
                        <path id="bar2" d="M4 12h16" />
                        <path id="bar3" d="M4 18h16" />
                    </g>
                </svg>
            </button>

        </div>

    )
}