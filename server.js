require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const multer=require('multer');
const Project=require('./models/project');
const fs=require('fs');


const PORT=process.env.PORT;
const mongoURI=process.env.MONGO_URI;
//const mongoURI = 'mongodb://localhost:27017/projects';

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

//Index Route
app.get("/gallery", (req, res)=>{
    Project.find({}, (error, allProjects)=>{
		if (error){console.log(error.message)}
        res.render('index.ejs', {
            projects: allProjects
        });
    });
});

//New Route
app.get("/gallery/new", (req, res)=>{
    res.render('new.ejs');
})

//Create Route
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
        console.log(req.file)
        let image=fs.readFileSync("./"+req.file.path)
        Project.create({
            name: req.body.name, 
            img: {data: image.toString('base64'), contentType: req.file.mimetype},
            colors: req.body.colors.split(", "),
            yarnBrands: req.body.yarnBrands.split(", "),
            patternCredit: req.body.patternCredit,
            complete: req.body.complete
        });
        fs.unlink("./"+req.file.path, (err)=>{
            if (err){
                console.log(err.message)
            }
        })
        res.redirect("/gallery")
    }

})
app.delete('/gallery/:id', (req, res)=>{
    Project.findByIdAndRemove(req.params.id, (err, foundProject)=>{
        if (err){
            console.log(err.message)
        }
        res.redirect('/gallery')
    })
})
// app.get("/seed",(req, res)=>{
//     Project.create([{
//         name: "Squid",
//         img: {data: fs.readFileSync("./uploads/20230307_213933.jpg").toString('base64'), contentType:"img/jpeg"},
//         description: "A neon giant squid",
//         colors: ["pink", "purple", "black", "blue", "green"],
//         yarnBrands: ["Red Heart Super Saver"],
//         patternCredit: "projectarian.com/shop/product/hubble-the-squid-free-crochet-pattern/",
//         complete: "complete"
//     }])
//     console.log(Project.find({}, (err, foundProjects)=>{
//         console.log(foundProjects)
//     }));
// } )

app.get("/gallery/:id", (req,res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if (err){console.log(err.message)}
        //console.log(foundProject)
        res.render('show.ejs', {
            project: foundProject
        });
    });
});
app.put('/gallery/:id', upload.single('img'), (req, res)=>{
    console.log(req.body)
    if (!req.file){
        Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
            if (err){
                console.log(err.message)
            }
            res.redirect('/gallery/'+req.params.id);
        })    
    }
    else{
        let image=fs.readFileSync("./"+req.file.path);
        req.body.img={data: image.toString('base64'), contentType: req.file.contentType};
        Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
            if (err){
                console.log(err.message)
            }
            fs.unlink("./"+req.file.path, (err)=>{
                if (err){
                    console.log(err)
                }
            });
            res.redirect('/gallery/'+req.params.id);
        })
    }
    
    
})
app.get("/gallery/:id/edit", (req, res)=>{
    Project.findById(req.params.id,(err, foundProject)=>{
        if (err){
            console.log(err.message);
        }
        res.render('edit.ejs', {project: foundProject})
    } )
   
})

