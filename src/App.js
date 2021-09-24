import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";


function App() {
    return (
        <>
            <Navbar/>
            <main className={"main"}>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/signup"} component={Signup}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
