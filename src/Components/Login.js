import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {isLoginTrue} from "../Action";

function Login() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.changeLogin)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [typePassword, setTypePassword] = useState(true);
    const [error, setError] = useState();
    const history = useHistory();

    useEffect(() => {
        if (isLogin) {
            history.goBack();
        }

    }, [isLogin, history])


    const onsubmitForm = async (e) => {
        e.preventDefault();
        if (password.length >= 8) {

            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_PROXY}/login/`,
                credentials: 'include',
                withCredentials: true,
                data: {
                    email: email,
                    password
                }
            })
                .then(() => {
                    dispatch(isLoginTrue())
                    setError("");
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        setError(err);
                    }
                })


        } else {
            document.getElementById("password").innerText = "password is incorrect"
        }
    }
    return (
        <section className={"fm-container"}>
            <div className={"container"}>
                <div className="row">
                    <div className="container container--mini">
                        <div className="card p-3">
                            <img
                                src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg"
                                className={"img-fluid mx-auto fm-logo mb-3"} alt={"logo"}/>
                            <form onSubmit={(e) => onsubmitForm(e)}
                                  method={"POST"}>
                                <div className={"my-2"}>
                                    <label className={"form-label"} htmlFor="emailAddress">Email Address <span
                                        className={"text-danger"}> *</span>
                                    </label>
                                    <input type="email" className={"form-control"} name={"email"} value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required={true}/>
                                    <span id={"email"} className={"text-danger small px-2"}>{error}</span>


                                </div>
                                <div className={"my-2"}>
                                    <label className={"form-label"} htmlFor="password">Password <span
                                        className={"text-danger"}> *</span> </label>
                                    <div className={"form-control d-flex align-items-center bg-white"}>
                                        <input type={!typePassword ? "text" : "password"}
                                               className={"w-100 border-0 outline-none"}
                                               name={"password"}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               required={true}/>

                                        <span>{typePassword ?
                                            <FontAwesomeIcon icon={faEye}
                                                             onClick={() => setTypePassword(!typePassword)}/>
                                            : <FontAwesomeIcon icon={faEyeSlash}
                                                               onClick={() => setTypePassword(!typePassword)}/>
                                        }
                        </span>
                                    </div>
                                    <span id={"password"} className={"text-danger small px-2"}>{error}</span>

                                </div>
                                <button type="submit"
                                        className="btn-custom text-white w-100 py-2 my-3 border-0">Sign In
                                </button>
                            </form>
                            <p className={"small text-center text-muted"}>Don't have account yet? <Link
                                to={"/signup"}>signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;