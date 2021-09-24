export const isLoginTrue = () => {
    return {
        type: "LOGINTRUE"
    }
}
export const isLoginFalse = () => {
    return {
        type: "LOGINFALSE"
    }
}

export const userData = (val) => {
    return {
        type: "USERDATA",
        payload: val
    }
}