const express = require("express");

const router = express.Router();
const {homepage}=require("../controllers/staticpage")

router.get('/',(req,res)=>{
    return res.render('home')
})

module.exports = router;