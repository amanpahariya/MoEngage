import React from 'react';

function Navbar() {
    return (
        <nav className={"navbar navbar-expand-lg shadow-none border-bottom bg-white"}>
            <div className="container">
                <aside className="navbar-brand mb-0 h1">
                    <img
                        src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg"
                        className={"img-fluid"} alt={"logo"}
                        style={{maxWidth: 50, maxHeight: 50}}
                    />
                    <span className={"h4 mx-2"}>Navbar</span>
                </aside>
            </div>
        </nav>
    );
}

export default Navbar;