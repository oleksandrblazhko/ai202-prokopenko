/* Приклад взаємодії користувача з БД */

/* Приклад встановлення з'єднання з БД  */
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
 } 

/* конструктор екземплярів об'єктів класів.
       Вхідні параметри:
	   1) name - назва акаунту користувача
	   умова 1) якщо в таблиці Users вже існує вказане ім'я,
	   користувач авторизується у додатку при введенні вірних даних на основі даних таблиці,
	   інакше в таблиці Users створюється новий рядок в БД. 
	   Вихідний параметр - екземпляр обєкту класу
	*/

/* Авторизація користувача */
userRouter.post(
    "/login",
    asyncHandler(async (req, res) =>{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: User._id,
                name: User.name,
                email: User.email,
                photo: User.photo,
                age: User.age,
                growth: User.growth,
                weight: User.weight,
                subscription: User.subscription,
                createdAt: User.createdAt,
                token: generateToken(User._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
);

/* Реєстрація нового користувача */
userRouter.post(
    "/",
    asyncHandler(async (req, res) =>{
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        const user = await User.create({
            name, 
            email, 
            password,
        });

        if (user) {
            res.status(201).json({
                _id: User._id,
                name: User.name,
                email: User.email,
                photo: User.photo,
                age: User.age,
                growth: User.growth,
                weight: User.weight,
                subscription: User.subscription,
                createdAt: User.createdAt,
                token: generateToken(User._id),
            });
        }
        else{
            res.status(400);
            throw new Error("Invalid User Data");
        }
    })
);

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

/* Процедура зміни значення атрибутів */
userRouter.put(
    "/profile",
    protect,
    asyncHandler(async (req, res) =>{
const user = await User.findById(req.user._id)

if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
        user.password = req.body.password
    }
  /* Функції отримання значень атрибутів */
    const updatedUser = await user.save();
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        age: updatedUser.age,
        growth: updatedUser.growth,
        weight: updatedUser.weight,
        subscription: updatedUser.subscription,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
    });
} else {
    res.status(404);
    throw new Error("User not found");
    }
  })
);
