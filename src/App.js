import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Search from "./Components/Search";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {isLoginTrue, isLoginFalse} from "./Action";

function App() {
    const dispatch = useDispatch();

    useEffect(async () => {
        await axios({
            method: "GET",
            credentials: true,
            withCredentials: true,
            url: process.env.REACT_APP_PROXY + "/verifyuser"
        }).then((res) => {
            dispatch(isLoginTrue())
        }).catch((err) => {
            dispatch(isLoginFalse())
        })
    }, [])


    return (
        <>
            <Navbar/>
            <main className={"main"}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={Search}/>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/signup"} component={Signup}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
