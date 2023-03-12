const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
    name: {type: String, required: true},
    img: {type: String},
    description: {type: String},
    colors: [{type: String}],
    yarnBrands: [{type: String}],
    patternCredit: {type: String},
    complete: {type: String}
}, {timestamps: true});

const Project=mongoose.model("Project", ProjectSchema);
module.exports=Project;