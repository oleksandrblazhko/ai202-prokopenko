Feature: Покупка підписки у застосунку
  As a авторизованний користувач
  In order to мати змогу користуватися усім функціоналом програмного продукту та без реклами
  I want to придбати підписку та оплатити її за допомогою API банку

  Scenario 1: API підключен
  Given введені правильні дані картки
  Then поповнюється рахунок компанії-розробника 

  Scenario 1: API не підключен
  Given введені неправильні дані картки
  Then клієнти з підозрою відносяться до додатку
  Then рахунок компанії-розробника не поповнюється