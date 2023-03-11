const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
    name: {type: String, required: true},
    img: {data: Buffer, contentType: String},
    description: {type: String},
    colors: [{type: String}],
    yarnBrands: [{type: String}],
    patternCredit: {type: String},
    complete: {type: Boolean}
}, {timeStamps: true}, {collection: "Projects" });

const Project=mongoose.model("Project", ProjectSchema);
module.exports=Project;