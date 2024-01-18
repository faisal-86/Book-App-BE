//define mongoose dependency
const mongoose = require('mongoose');
const database = "Novagram App"; //defined in .env 

//Connection to mongoDB database cloud - PROMISE
mongoose.connect(process.env.DATABASEURL)
.then(() => {
    const db = mongoose.connection;
    console.log(`\u001b[1;32mMongoDB\u001b[0m: Connected to Database \u001b[1;32m[${db.name}]\u001b[0m`);
    console.log(`Host \u001b[1;33m[${db.host}]\u001b[0m and Port: \u001b[1;33m${db.port}\u001b[0m`);
})
.catch((error) => {
    console.log("\u001b[1;32mMongoDB\u001b[0m: \u001b[1;31m" + database + " connection issue\u001b[0m: " + error);
})