export const getUser = () => (dispatch) => {
    return dispatch ({
        type: "GET_USER",
        payload: {
            name: "lk",
            email: "lk@gmail.com"
        }
    })
}