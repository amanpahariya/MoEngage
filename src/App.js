import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Search from "./Components/Search";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {isLoginTrue, isLoginFalse, userData} from "./Action";
import Amine from "./Components/Amine";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await axios({
                method: "GET",
                credentials: true,
                withCredentials: true,
                url: process.env.REACT_APP_PROXY + "/verifyuser"
            }).then((res) => {
                dispatch(userData(res.data.user.id))
                dispatch(isLoginTrue())
            }).catch(() => {
                dispatch(isLoginFalse())
            })
        }
        fetchData();
    })
    return (
        <>
            <Navbar/>
            <main className={"main"}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={Search}/>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/signup"} component={Signup}/>
                        <Route path={"/amine/:id"} component={Amine}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
