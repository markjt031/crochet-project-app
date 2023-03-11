require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const multer=require('multer');
const Project=require('./models/project');
const fs=require('fs');


const PORT=process.env.PORT;
//const mongoURI=process.env.MONGO_URI;
const mongoURI = 'mongodb://localhost:27017/projects';

const app=express();
const upload=multer({dest: "./uploads"})


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
    res.render('new.ejs');
})

app.post("/gallery", upload.single('img'), (req, res)=>{
    if (!req.file){
        let image=fs.readFileSync('./uploads/20230309094926793_480x320.jpeg')
        Project.create({
            name: req.body.name, 
            img: {data: image.toString('base64'), contentType: 'image/jpeg'},
            colors: req.body.colors.split(","),
            yarnBrands: req.body.yarnBrands.split(","),
            patternCredit: req.body.patternCredit,
            complete: req.body.complete
        });
        res.redirect("/gallery")
    }
    else{
        Project.create({
            name: req.body.name, 
            img: {data: req.file.buffer, contentType: req.file.mimetype},
            colors: req.body.colors.split(","),
            yarnBrands: req.body.yarnBrands.split(","),
            patternCredit: req.body.patternCredit,
            complete: req.body.complete
        });
        res.redirect("/gallery")
    }

})
app.get("/seed",(req, res)=>{
    Project.create([{
        name: "Squid",
        img: {data: fs.readFileSync("./uploads/20230307_213933.jpg").toString('base64'), contentType:"img/jpeg"},
        description: "A neon giant squid",
        colors: ["pink", "purple", "black", "blue", "green"],
        yarnBrands: ["Red Heart Super Saver"],
        patternCredit: "projectarian.com/shop/product/hubble-the-squid-free-crochet-pattern/",
        complete: "complete"
    }])
    console.log(Project.find({}, (err, foundProjects)=>{
        console.log(foundProjects)
    }));
} )

app.get("/gallery/:id", (req,res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if (err){console.log(err.message)}
        //console.log(foundProject)
        res.render('show.ejs', {
            project: foundProject
        });
    });
});

app.get("/gallery/:id/edit", (req, res)=>{
    res.send("this is the edit page");
})

