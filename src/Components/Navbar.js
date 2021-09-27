import React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {isLoginFalse, userData} from "../Action";

function Navbar() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.changeLogin)

    const logout = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_PROXY}/logout`,
            credentials: 'include',
            withCredentials: true
        })
            .then(() => {
                dispatch(isLoginFalse());
                dispatch(userData(0));
            })
            .catch(() => {
                // console.log(e);
            })
    }
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
                {isLogin ? <button className={"btn btn-warning"} onClick={() => logout()}>logout</button> : <></>}
            </div>
        </nav>
    );
}

export default Navbar;