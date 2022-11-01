/* Приклад використання методів програмних классів  */
/* Перегляд даних користувача (робота з класом user)*/
export const getUserDetails = (id) => async(dispatch, getState) =>{
    try {
        dispatch({type: USER_DETAILS_REQUEST});
    const {
        userLogin : {userInfo},
    } = getState();

    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        },
    };
};
  
/* Оновлення даних користувача (робота з класом user)*/
export const updateUserProfile = (user) => async(dispatch,getState) =>{
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQUEST});
    const {
        userLogin : {userInfo},
    } = getState();

    const config = {
        headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${userInfo.token}`
        },
    };

        const {data} = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo",JSON.stringify(data))

    } catch (error) {
        const message = 
        error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
            if (message === "Not atorized, token failed") {
                dispatch(logout());
            }
        dispatch({     
            type: USER_UPDATE_PROFILE_FAIL,
            payload:message,
        });
    }
}
