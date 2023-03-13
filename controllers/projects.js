const express= require('express')
const Project=require('../models/project');
const router= express.Router();
const fs=require('fs');
const multer=require('multer');
const upload=multer({dest: "./uploads"});
const moment=require('moment')
const methodOverride=require('method-override');

router.use(express.json());
router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }
  
//Index Route
router.get("/", isAuthenticated, (req, res)=>{
    Project.find({createdBy: req.session.currentUser.username}, (error, allProjects)=>{
        if (error){console.log(error.message)}
            res.render('index.ejs', {
            projects: allProjects,
            currentUser: req.session.currentUser
        });
    });
});

//New Route
router.get("/new", isAuthenticated,(req, res)=>{
    res.render('new.ejs', {currentUser: req.session.currentUser});
})

//Create Route
router.post("/", isAuthenticated, upload.single('img'), (req, res)=>{
    if (!req.file){
        req.body.createdBy=req.session.currentUser.username
        req.body.img='/uploads/20230309094926793_480x320.jpeg';
        Project.create(req.body, (err, newProject)=>{
            if (err){
                console.log(err.message);
            }
            res.redirect("/gallery");
        });
           
        }
    else{
        req.body.createdBy=req.session.currentUser.username
        req.body.img="/"+req.file.path;
        Project.create(req.body, (err, newProject)=>{
            if (err){
                console.log(err.message);
            }
            res.redirect("/gallery");
        });
    }
})
router.delete('/:id', isAuthenticated, (req, res)=>{
    Project.findByIdAndRemove(req.params.id, (err, foundProject)=>{
        if (err){
            console.log(err.message)
        }
        res.redirect('/gallery')
    })
})

router.get("/:id", isAuthenticated, (req,res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if (err){console.log(err.message)}
        //console.log(foundProject)
        res.render('show.ejs', {
            project: foundProject,
            currentUser: req.session.currentUser,
            time: moment(foundProject.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        });
    });
});
router.put('/:id', isAuthenticated, upload.single('img'), (req, res)=>{
    
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
router.get("/:id/edit", isAuthenticated, (req, res)=>{
    Project.findById(req.params.id,(err, foundProject)=>{
        if (err){
            console.log(err.message);
        }
        res.render('edit.ejs', {
            project: foundProject,
            currentUser: req.session.currentUser
        })
    } )
   
})

module.exports=router;