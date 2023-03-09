require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override');

const app=express();
const PORT=process.env.PORT;
const mongoURI=process.env.MONGO_URI;

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

