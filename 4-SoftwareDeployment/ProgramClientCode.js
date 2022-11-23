const { MongoClient, ServerApiVersion } = require('mongodb');

const client = {
  "id":"1",
  "login":"Prokop",
  "e-mail":"Prokop@gmail.com",
  "secret_key":"5e0dd59c8686b2ed36a50a9f428cf39f305a1fb5c0d2f842a5b2716bae9e0004"}
;

class DataBase {
    async init() {
        const mongoClient = await new MongoClient('mongodb://admin:admin@localhost:28003/project', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        }).connect();

        this.messages = mongoClient.db('project').collection('messages');
    }

    async newMessage(msg) {
        try {
            await this.messages.insertOne(msg);

            return { ok: true };
        } catch (e) {
            return { ok: false };
        }
    }
}

const db = new DataBase();

async function sendMessage(user_id, message) {
    if (message.length < 1 || message.length > 1024) {
        return -2;
    }
    if (user_id < 0) {
        return -1;
    }

    const messageObj = {
        sender: client.id,
        receiver: user_id,
        text: message,
        date: Date.now()
    }

    let result = await db.newMessage(messageObj);
    if (result.ok) return 1;
    else return -1;
}

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
