'use strict';
  var a=require('node-cmd');
  const util = require('util')
  var request = require('request');

module.exports = function(server) {

  var router = server.loopback.Router();

  router.get('/call', function(req, res) {

    console.log(__dirname + '/../calling.html');
    res.sendFile(__dirname + '/calling.html');
  });
  router.get('/c',function(req,res){
    var input=req.query.c;
    console.log(input);
   a.get(
       input,
       function(err, data, stderr){
         if(!err)
         {
           res.end("Ouptut:"+data)
           console.log(data);
         }
           res.end("Ouptut:"+err);
       }
   );

  })
  router.get('/status', server.loopback.status());


router.get('/count',async function(req,res){

var infoJson=[
{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Accomodations",
  "count":0
},
{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/AirTravelCompanies",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/AirTravelForms",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Appointments",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Blogs",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/ContactUs",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Documents",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Events",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/ForexCompanies",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/ForexHelpForms",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/loanCompanies",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/HelpForm",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/LoanInfoForms",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Mentors",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/MentorSignUps",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/MockVisaInterviews",
  "count":0
},
{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/students",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Universities",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/Users",
  "count":0
},{
  "url":"https://arcane-ocean-14843.herokuapp.com/api/UserSignUps",
  "count":0
}
]

for(var i=0;i<infoJson.length;i++)
{
  var requestPromise = util.promisify(request);
  var response = await requestPromise(infoJson[i].url);
  //  let response = await request.get(url);
  //  console.log(response.data);
    if (response.err) {

      return err
    }
    else {
      infoJson[i].count=JSON.parse(response.body).length;
    };

}

res.end(JSON.stringify(infoJson));

});
  server.use(router);
};
