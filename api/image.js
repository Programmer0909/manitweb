const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: "dh04ahb5s",
  api_key: "161722351559698",
  api_secret: "EIt-GZYruU-gdtXzIc6fIOrRDYE"
})

const storage = new CloudinaryStorage({
    cloudinary,
    params : {
        folder : "Pratham",
        allowedFormats : ['jpeg' , 'png' , 'jpg']
    }
})

module.exports = {
    cloudinary,
    storage
}