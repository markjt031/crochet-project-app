require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const upload=require('multer');
const Project=require('./models/project');



const app=express();
const PORT=process.env.PORT;
const mongoURI=process.env.MONGO_URI;

app.use(express.static('public'));
app.use("/uploads", express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));


mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

app.get("/gallery", (req, res)=>{
    res.send("this is the gallery page");
})

app.get("/gallery/new", (req, res)=>{
    res.send("this is the new page");
})

app.post("/gallery", (req, res)=>{
    console.log(req.body);
})

app.get("/gallery/:id", (req,res)=>{
    res.send("this is the show page");
})

app.get("/gallery/:id/edit", (req, res)=>{
    res.send("this is the edit page");
})

