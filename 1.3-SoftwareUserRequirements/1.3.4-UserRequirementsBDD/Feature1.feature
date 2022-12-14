Feature: Авторизація користувача
  As a незареєстрований/неавторизованний в системі користувач
  In order to користуватися застосунком
  I want to зареєструватися або авторизуватися у застосунку
  
  Scenario 1: авторизація за допомогою номера телефону
  Given номер телефону
  Then авторизація/реєстрація пройдена успішно

  Scenario 2: авторизація за допомогою облікового запису Google/Facebook
  Given логін та пароль облікового запису
  Then авторизація/реєстрація пройдена успішно
