const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url')
let Image = require('../models/images');


var db = []

// Route for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch images from the database
        const images = await Image.find(); 
        res.render('index', { images }); // Pass the images array to the EJS template
    } catch (err) {
        console.error('Error fetching images:', err);
        res.render('index', { images: [] }); // Pass an empty array if an error occurs
    }
});


router.post('/upload', (req, res)=>{
    upload(req,res, (err)=>{
        if (err){
            res.redirect(`/?msg=${err}`);
        }else{
            console.log(req.file);
            // res.send("test");
            if (req.file == undefined){
                res.redirect('/?msg=Error: No file selcted!');
            }else{
                // const imageObj = {
                //     id: uuid.v4(),
                //     name: req.file.filename,
                //     path: 'images/' + req.file.filename
                // }
                // db.push(imageObj);
                // console.log(db);

                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                })

                // save the uploaded image to the database
                newImage.save()

                
                res.redirect('/?msg=File uploaded successfully');
            }
        }
    })
})

module.exports = router;