/* Приклад встановлення з'єднання з БД  */
const userSchema = mongoose.Schema(
  {
    "id": "1",
    "login": "Prokop",
    "e-mail": "Prokop@gmail.com",
    "photo": {},
    "age": "19",
    "growth": "190",
    "weight": "75",
    "subscription": "1 year",
  }
  {
    "id": "2",
    "login": "Ktoto2",
    "e-mail": "Ktoto2@gmail.com",
    "photo": {},
    "age": "129",
    "growth": "900",
    "weight": "175",
    "subscription": "2 year",
  }
);
    

/* Процедура виводу на екран значень атрибутів */
/* Перегляд даних користувача з порядковим номером 1 (id=1) */
export const getUserDetails = (id == 1) => async(dispatch, getState) =>{
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
