console.log("file loaded")
let imageUploadButton=document.getElementById('upload-images');
let imagePreview=document.getElementById('image-preview')

imageUploadButton.onchange=(e)=>{
    imagePreview.src=URL.createObjectURL(e.target.files[0])}