import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isLoginTrue} from "../Action";

function Signup() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.changeLogin)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("");

    const [cnfPasswordError, setCnfPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const history = useHistory();
    useEffect(() => {
        if (isLogin) {
            history.push("/");
        }
    }, [isLogin])

    const PasswordLength = (val) => {
        setPassword(val);
        if (val.length <= 7) {
            setPasswordError("password should have at least 8 character");
        } else {
            setPasswordError(null)
        }
    }

    const confirmPassword = (val) => {
        setCnfPassword(val);
        if (val !== password) {
            setCnfPasswordError("password and confirm password should same");
        } else {
            setCnfPasswordError(null);
        }
    }

    const onsubmitForm = async (e) => {
        e.preventDefault();
        if (password.length >= 8) {

            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_PROXY}/register/`,
                credentials: 'include',
                withCredentials: true,
                data: {
                    email,
                    password,
                    firstname: firstName,
                    lastname: lastName
                }
            })
                .then((res) => {
                    dispatch(isLoginTrue());
                })
                .catch((err) => {
                    if (err.response.status === 406) {
                        if (err.response.data.message === "already_exist") setEmailError("This email address is already exist");
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
                                <div className="row my-2">
                                    <div className="col">
                                        <label className="form-label" htmlFor="form3Example1">First name</label>
                                        <input type="text" id="form3Example1" className="form-control"
                                               value={firstName}
                                               onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label" htmlFor="form3Example2">Last name</label>
                                        <input type="text" id="form3Example2" className="form-control"
                                               value={lastName}
                                               onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"my-2"}>
                                    <label className={"form-label"} htmlFor="emailAddress">Email Address <span
                                        className={"text-danger"}> *</span>
                                    </label>
                                    <input type="email" className={"form-control"} name={"email"} value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required={true}/>
                                    {
                                        emailError ? <span id={"email"}
                                                           className={"text-danger small px-2"}>{emailError}</span> : <></>
                                    }
                                </div>
                                <div className={"my-2"}>
                                    <label className={"form-label"} htmlFor="password">Password <span
                                        className={"text-danger"}> *</span> </label>
                                    <div className={"form-control d-flex align-items-center bg-white"}>
                                        <input type={"password"}
                                               className={"w-100 border-0 outline-none"}
                                               name={"password"}
                                               value={password}
                                               onChange={(e) => PasswordLength(e.target.value)}
                                               required={true}/>
                                    </div>
                                    {
                                        passwordError ? <span id={"password"}
                                                              className={"text-danger small px-2"}>{passwordError}</span> : <></>
                                    }

                                </div>
                                <div className={"my-2"}>
                                    <label className={"form-label"} htmlFor="password">Confirm Password <span
                                        className={"text-danger"}> *</span> </label>
                                    <div className={"form-control d-flex align-items-center bg-white"}>
                                        <input type={"password"}
                                               className={"w-100 border-0 outline-none"}
                                               name={"password"}
                                               value={cnfPassword}
                                               onChange={(e) => confirmPassword(e.target.value)}
                                               required={true}/>
                                    </div>
                                    {
                                        cnfPasswordError ? <span id={"password"}
                                                                 className={"text-danger small px-2"}>{cnfPasswordError}</span> : <></>
                                    }
                                </div>
                                <button type="submit"
                                        className="btn-custom text-white w-100 py-2 my-3 border-0">Sign Up
                                </button>
                            </form>
                            <p className={"small text-center text-muted"}>Don't have account yet? <Link
                                to={"/login"}>signin</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;