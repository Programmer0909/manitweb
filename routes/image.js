const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../api/image")
const upload = multer({ storage: storage });
const User = require("../models/user")
const Image = require("../models/image")
const passport = require("passport");

router.post("/post-image", upload.array("image"), async (req, res) => {
    const user = req.session?.passport?.user;
    console.log("New", user);
    const curr_user = await User.findOne({ username: user }).exec();
    for (const img of req.files) {
        const imgi = await Image.create({
            ImageUrl: img.path,
            Filename: img.filename,
        });
        curr_user.images.push(imgi._id);
    }
    await curr_user.save();
    res.redirect("/images/getimage");
});


router.get("/getimage", async (req, res) => {
    const user = req.session?.passport?.user;
    console.log("New", user);
    const curr_user = await User.findOne({ username: user }).exec();
    const populatedUser = await User.populate(curr_user, { path: "images" }); // Populate the images field
    const populatedImageUrlArray = populatedUser.images.map(image => image.ImageUrl); // Extract ImageUrl values
    res.render("image.ejs", { url: populatedImageUrlArray });

})



module.exports = router;