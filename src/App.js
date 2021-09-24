import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";


function App() {
    return (
        <>
            <Navbar/>
            <main className={"main"}>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/login"} component={Login}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
