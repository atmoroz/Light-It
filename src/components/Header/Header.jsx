import React from "react";

import "./header.css";

class Header extends React.Component {
    render() {
        return (
            <>
                <header className="header">
                    <picture>
                        <source
                            srcSet="../banner.png"
                            media="(min-width: 540px)"
                        />
                        <img src="../banner_min.png" alt="banner" />
                    </picture>
                </header>
            </>
        );
    }
}
export default Header;
