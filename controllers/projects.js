const express= require('express')
const Project=require('../models/project');
const router= express.Router();
const multer=require('multer');
const fs=require('fs');
const upload=multer({dest: "./uploads"});
const methodOverride=require('method-override');
const moment=require('moment')


router.use(express.json());
router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));


//Index Route
router.get("/", (req, res)=>{
    Project.find({}, (error, allProjects)=>{
		if (error){console.log(error.message)}
        res.render('index.ejs', {
            projects: allProjects
        });
    });
});

//New Route
router.get("/new", (req, res)=>{
    res.render('new.ejs');
})

//Create Route
router.post("/", upload.single('img'), (req, res)=>{
    if (!req.file){
       
        req.body.img='/uploads/20230309094926793_480x320.jpeg';
        Project.create(req.body, (err, newProject)=>{
            if (err){
                console.log(err.message);
            }
            res.redirect("/gallery");
        });
       
    }
    else{
        // console.log(req.file)
        // let image=fs.readFileSync("./"+req.file.path)
        req.body.img="/"+req.file.path;
        Project.create(req.body, (err, newProject)=>{
            if (err){
                console.log(err.message);
            }
            res.redirect("/gallery");
        });
    }

})
router.delete('/:id', (req, res)=>{
    Project.findByIdAndRemove(req.params.id, (err, foundProject)=>{
        if (err){
            console.log(err.message)
        }
        res.redirect('/gallery')
    })
})

router.get("/:id", (req,res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if (err){console.log(err.message)}
        //console.log(foundProject)
        res.render('show.ejs', {
            project: foundProject,
            time: moment(foundProject.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        });
    });
});
router.put('/:id', upload.single('img'), (req, res)=>{
    
    if (!req.file){
        Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
            if (err){
                console.log(err.message)
            }
            res.redirect('/gallery/'+req.params.id);
        })    
    }
    else{
        // let image=fs.readFileSync("./"+req.file.path);
        // console.log(req.file.path);
        req.body.img='/'+req.file.path;
        Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
            if (err){
                console.log(err.message)
            }
            // fs.unlink("./"+req.file.path, (err)=>{
            //     if (err){
            //         console.log(err)
            //     }
            // });
            res.redirect('/gallery/'+req.params.id);
        })
    }
    
    
})
router.get("/:id/edit", (req, res)=>{
    Project.findById(req.params.id,(err, foundProject)=>{
        if (err){
            console.log(err.message);
        }
        res.render('edit.ejs', {project: foundProject})
    } )
   
})

module.exports=router;