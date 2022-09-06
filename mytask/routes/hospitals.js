const express=require('express');

const router=express.Router();
const hospitalContollers=require('../controllers/hospitalscontroller');

router.get("/getHospitals",hospitalContollers.getData);

module.exports=router;  