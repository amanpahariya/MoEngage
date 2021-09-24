import rootReduce from "./Reducers";
import {createStore} from "redux";

const store = createStore(rootReduce, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;