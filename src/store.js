import rootReduce from "./Reducers";
import {createStore} from "redux";

const store = createStore(rootReduce);

export default store;