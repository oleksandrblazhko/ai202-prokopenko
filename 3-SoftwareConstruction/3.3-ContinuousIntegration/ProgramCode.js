/* Приклад встановлення з'єднання з БД  */
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
 } 

/* Процедура виводу на екран значень атрибутів */
/* Перегляд даних користувача */
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

        const {data} = await axios.get(`/api/users/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = 
        error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
            if (message === "Not atorized, token failed") {
                dispatch(logout());
            }
        dispatch({     
            type: USER_DETAILS_FAIL,
            payload:message,
        });
    }
};
