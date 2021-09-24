const initialState = 0;
const userDataReduce = (state = initialState, action) => {
    switch (action.type) {
        case "USERDATA":
            return state = action.payload;
        default:
            return state;
    }
}

export default userDataReduce;