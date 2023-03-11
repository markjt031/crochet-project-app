require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');

const projectController=require('./controllers/projects')

const app=express();

app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));
app.use("/gallery", projectController);


const PORT=process.env.PORT;
const MONGODB_URI=process.env.MONGODB_URI;
//const mongoURI = 'mongodb://localhost:27017/projects';
mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: false,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.get("/", (req, res)=>{
    res.send('home page');
})

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));



