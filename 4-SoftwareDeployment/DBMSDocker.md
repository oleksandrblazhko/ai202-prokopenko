<br>Етапи створення контейнеру для роботи з MongoDB
- Запускаємо командний рядок на машині із встановленим Docker.
- Створюємо каталог: D:/mongoDB через mkdir.
- В каталозі, створюємо підкаталог scripts, що буде містити файл init.js з прописаним кодом:

<br>db = connect("mongodb://localhost/project");
<br>db.createUser({
<br> user: "admin",
<br>  pwd: "admin",
<br>  roles: ["readWrite", "dbAdmin"],
<br>});
<br>
<br>db.users.insertMany([
<br> {
<br>    "_id": "1",
<br>    login: "Prokop",
<br>    "e-mail": "Prokop@gmail.com",
<br>    secret_key: "5e0dd59c8686b2ed36a50a9f428cf39f305a1fb5c0d2f842a5b2716bae9e0004",
<br>  },
<br>  {
<br>    "_id": "2",
<br>    username: "AdminProkop",
<br>    "e-mail": "AdminProkop@gmail.com",
<br>    secret_key: "5e0dd59c8676b2e236a50a9f428cf39f305a1fb5c0d2f842a5b2716bae9e0004",
<br>  },
<br>]);
<br>
<br>db.messages.insertMany([
<br> {
<br>  sender: "2",
<br>  receiver: "1",
<br>  text: "Authorized, Prokop!",
<br>  date: 2211516222022,
<br>  },
<br>  {
<br>    sender: "1",
<br>    receiver: "2",
<br>    text: "Authorized, AdminProkop!",
<br>    date: 2511516222023,
<br>  },
<br>  {
<br>    sender: "2",
<br>    receiver: "1",
<br>   text: "Hello!",
<br>    date: 3211516222824,
<br>  },
<br>]);
- Після цього команду "docker pull mongo" для того щоб отримати образ із потрібними нам файлами та конфігурацією.
<- Створюємо та запускаємо новий контейнер, для цього використаємо команду "docker run --name prokop-mongo -p 28003:28003 -w /scripts -v ${PWD}:/scripts -d mongo".
- Запускаємо mongosh для роботи з MongoDB: docker exec -it prokop-mongo mongosh project та завантажуємо у нього скрипт load("scripts/init.js").
- База даних налаштована та заповнена, підключатися до неї можна за URI "mongodb://admin:admin@localhost:28003/project". (тобто вказуємо ім'я користувача, пароль, локалбну адресу та назву файлу для подальшої взаємодії з БД)
