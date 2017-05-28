var express = require('express');
var app = express();
 
 var mongojs = require('mongojs');
 var db = mongojs('mongodb://anuragems:anurag1501@ds137281.mlab.com:37281/dbemployeedirectory');
 var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

 
app.get('/employeelist',function(req, res){
    console.log("I received a GET request");
 
    
    db.employeelist.find(function(err,docs){
console.log(docs);
res.json(docs);
    });
});
 app.post('/employeelist',function(req, res){
     console.log(req.body);
     db.employeelist.insert(req.body, function(err, docs){
         res.json(docs);
     });
 });

 app.delete('/employeelist/:id', function(req, res){
     var id = req.params.id;
     console.log(id);
     db.employeelist.remove({_id: mongojs.ObjectId(id)},function(req, docs){
         res.json(docs);
     });
 });


app.get('/employeelist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.employeelist.findOne({_id: mongojs.ObjectId(id)}, function(err,docs){
		res.json(docs);
	});
});


app.put('/employeelist/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.employeelist.findAndModify({query: {_id: mongojs.ObjectId(id)},update: {$set: {name: req.body.name, email: req.body.email, dateofbirth: req.body.dateofbirth, department: req.body.department, gender: req.body.gender}},new: true }, function(err,doc){
		res.json(doc);
	});
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
 
 