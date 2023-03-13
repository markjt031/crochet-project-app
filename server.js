require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session')
const userController = require('./controllers/user_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')
const methodOverride=require('method-override');
const projectController=require('./controllers/projects');
const Project = require('./models/project.js');

const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));

app.use(session({
	  secret: process.env.SECRET,
	  resave: false, 
	  saveUninitialized: false
	})
  )
app.use('/users', userController)
app.use("/gallery", projectController);
app.use('/sessions', sessionsController)


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
	if (req.session.currentUser){
    	res.redirect("/gallery");
	}
	else {
		res.redirect("/sessions/new");
	}
})

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));



