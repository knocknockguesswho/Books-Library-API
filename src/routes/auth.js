const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const splitName = file.originalname.split('.');
        const ext = splitName.pop();
        const newName = splitName.join('-');
        cb(null, `${newName}-${Date.now()}.${ext}`);
    }
});
const upload = multer({
    storage: storage
});

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/refresh', authController.refresh);
// router.post('/register', upload.none(), authController.register);
// router.post('/login', upload.none(), authController.login);

module.exports = router;