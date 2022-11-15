async function test() {
    await db.init();

    console.log('TC1.1: ');
    if (await sendMessage(
     {
        "login":"prokop,
        "email":"prokop@gmail.com",
        "password":"123456789"
     }) == 1) console.log('TC11:Passed = 1');
    else console.log('Failed');

    console.log('TC1.2: ');
    if (await sendMessage(
     {
        "login":"prokopenkoprokopenkoprokopenkoprokopenko,
        "email":"prokop@gmail.com",
        "password":"123456789"
     }) == -1) console.log('TC12:Passed = -1');
    else console.log('Failed');
    
    console.log('TC1.3: ');
    if (await sendMessage(
     {
        "login":"prokop,
        "email":"prokopprokopenkoprokopenkoprokopenkoprokopenkoprokopenkoprokopenkoprokopenkoprokopenko@gmail.com",
        "password":"123456789"
     }) == -2) console.log('TC13:Passed = -2');
    else console.log('Failed');

    console.log('TC1.4: ');
    if (await sendMessage(
     {
        "login":"prokop,
        "email":"prokop@gmail.com",
        "password":"123456789"
        "phone_number":"+38098527738554544445454"
     }) == -3) console.log('TC13:Passed = -3');
    else console.log('Failed');
  
   console.log('TC1.5: ');
    if (await sendMessage(
     {
        "login":"prokop,
        "email":"prokop@gmail.com",
        "password":"123456789"
        "phone_number":"+38Нуль98П'ять637612"
     }) == -4) console.log('TC15:Passed = -4');
    else console.log('Failed');
}

test();
