"use strict";
const Utilisateur = require("../models/u.model");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

module.exports.addUtilisateur = (req, res) => {	
    try {
        // 'avatar' is the name of our file input field in the HTML form

        let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const classifiedsadd = {
				image: req.file.filename
			};
            // Add User Model
            Utilisateur.addUtilisateur(classifiedsadd, (err, resp) => {
              if (err) {
                res.send(err);
              } else {
                res.send(resp);
              }
            });
        }); 
    }catch (err) {console.log(err)}
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
