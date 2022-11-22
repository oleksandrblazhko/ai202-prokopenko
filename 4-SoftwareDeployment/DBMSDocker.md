<br>Етапи створення контейнеру для роботи з MongoDB
<br>Запускаємо командний рядок на машині із встановленим Docker.
<br>Створюємо каталог: D:/mongoDB через mkdir.
<br>В цьому каталозі, створюємо підкаталог scripts, що буде містити файл init.js з прописаним кодом:
<br>db = connect("mongodb://localhost/project");

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: ["readWrite", "dbAdmin"],
});

db.users.insertMany([
  {
    "_id": "1",
    login: "Prokop",
    "e-mail": "Prokop@gmail.com",
    secret_key: "5e0dd59c8686b2ed36a50a9f428cf39f305a1fb5c0d2f842a5b2716bae9e0004",
  },
  {
    "_id": "2",
    username: "AdminProkop",
    "e-mail": "AdminProkop@gmail.com",
    secret_key: "5e0dd59c8676b2e236a50a9f428cf39f305a1fb5c0d2f842a5b2716bae9e0004",
  },
]);

db.messages.insertMany([
  {
    sender: "2",
    receiver: "1",
    text: "Authorized, Prokop!",
    date: 2211516222022,
  },
  {
    sender: "1",
    receiver: "2",
    text: "Authorized, AdminProkop!",
    date: 2511516222023,
  },
  {
    sender: "2",
    receiver: "1",
    text: "Hello!",
    date: 3211516222824,
  },
]);
Після цього команду "docker pull mongo" для того щоб отримати образ із потрібними нам файлами та конфігурацією.
Створюємо та запускаємо новий контейнер, для цього використаємо команду "docker run --name prokop-mongo -p 28003:28003 -w /scripts -v ${PWD}:/scripts -d mongo".
Запускаємо mongosh для роботи з MongoDB: docker exec -it prokop-mongo mongosh project та завантажуємо у нього скрипт load("scripts/init.js").
База даних налаштована та заповнена, підключатися до неї можна за URI "mongodb://admin:admin@localhost:28003/project". (тобто вказуємо ім'я користувача, пароль, локалбну адресу та назву файлу для подальшої взаємодії з БД)
