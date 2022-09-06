
const axios = require("axios");
const fs = require("fs");
const path = require("path");


exports.getData=(req,res,next)=>{

    let date=req.query.date;
    let searchString=req.query.searchString;
        let Limit = req.query.limit;

    if(Limit<1){
     return   res.json("limit should be greater than zero");
    } 
 
axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=${date}`)
  .then((result) => {
    let dummydata=result.data.centers;
let dummyarray=[];
    for(let i=0;i<dummydata.length;i++){
        let dummyname = dummydata[i].name.toLowerCase();
        if(dummyname.includes(searchString)) 
{
    dummyarray.push({ center_id:dummydata[i].center_id,name: dummydata[i].name });
}
    }
let dummyarr=[];
Limit=req.query.limit||dummyarray.length;

    for(let j=0;j<Limit;j++){
        if(dummyarray[j]==null){
            break;
        }
        dummyarr.push(dummyarray[j]);
    }
          res.json({code: 200,message: "Hospitals sent successfully",result: dummyarr});
    fs.writeFile(path.join(__dirname, "..", "hospitals.txt"),JSON.stringify(dummyarr),(err) => {
        if (err) throw err;
      }
    ); 
 }).catch(err=>{
    res.json(err);
 })
   }