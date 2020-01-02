const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const app = express();

// middle ware
app.use(express.static('public'))
app.use(cors())
app.use(fileUpload());

app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "fuck eroor" });
        }
        return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
    });
})


app.listen(4500, () => {
    console.log('server is running at port 4500');
})