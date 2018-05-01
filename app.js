var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

app.use(bodyparser.json());
Employee =require('./Models/Employee');

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
mongoose.connect('mongodb://localhost:27017/empdb');
var db = mongoose.connection;
db.once('open',function(){
    console.log('connection eshatblished');
});
// app.get('/', function (req, res) {
//     res.sendFile('form.html', { root: __dirname });
// });
app.get('/', function (req, res) {
    res.send('welcome to landmarkit solutions');
});

 app.get('/api/GetAllEmployees',function(req,res) {
    Employee.getEmployees(function(err,Employees){
          if(err)
          {
            console.log(err);
            res.send(err);
          }          
          res.json(Employees);
     });
 });
 app.get('/api/Employees/:empid',function(req,res) {
   Employee.getEmpById(req.params.empid,function(err,Employee){
       console.log("emp id in appjs is" + req.params.empid);
         if(err)
         {
           console.log(err);
         }          
         res.json(Employee);
    });
});
app.post('/api/AddandUpdateEmployee',function(req,res) {
    var employee = req.body;
        Employee.addandupdateEmployee(employee,function(err,employee){
               if(err)
              {
                  console.log(err);
              }          
                 res.json(employee);
            });
 });


 app.delete('/api/deleteEmployee/:_id',function(req,res){
  var id = req.params._id;
  Employee.removeEmployee(id,function(err,employee){
    if(err)
    {
     throw err; 
    }  
    res.json(employee);
  });
 }); 
  var port = process.env.PORT || 3000;
app.listen(port, () => console.log("running on port " + port));
