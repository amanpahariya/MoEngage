import changeLogin from "./loginreducer";
import {combineReducers} from "redux";
import userDataReduce from "./userreducer";

const rootReduce = combineReducers({
    changeLogin,
    userDataReduce
})

export default rootReduce;