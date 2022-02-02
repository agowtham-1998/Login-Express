const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


//Connect to My Local Mongodb

const database = process.env.LOCAL_DB.replace('<PASSWORD>', process.env.LOCAL_DB_PASS);

//Connect to Mongodb Atlas 

//const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(con => {
    console.log('DB connection Successfully!');
});


// Start the server
const port = process.env.PORT;
app.listen(3100, () => {
    console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});