const router = require("express").Router();
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "D:/New folder (3)/Manit web/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    },
});
const upload = multer({ storage: storage });

router.post('/import-excel', upload.single('import-excel'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    readXlsxFile(`D:/New folder (3)/Manit web/uploads/temp1.xlsx`).then((rows) => {
        res.render("excel", { heading: rows[0], data: rows });
    }).catch((error) => {
        console.error("Error reading Excel file:", error);
        res.status(500).send('Error reading Excel file.');
    });
});

router.get("/getdata", (req, res) => {
    readXlsxFile("C:/Users/LENOVO/OneDrive/Desktop/Manit web/uploads/temp.xlsx").then((rows) => {
        res.render("excel", { heading: rows[0], data: rows });
    }).catch((error) => {
        console.error("Error reading Excel file:", error);
        res.status(500).send('Error reading Excel file.');
    });
});

module.exports = router;
