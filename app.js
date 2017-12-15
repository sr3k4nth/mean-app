var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('mongodb://rootname:root@ds129344.mlab.com:29344/contacts',['contacts']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/disp', function(req, res){
/*contactlist = [
		{
			name:"Srikanth",
			email:"srikanth.tnrs@gmail.com",
			phone:8904120567
		},
		{
			name:"vijay",
			email:"vijju.yuvi@gmail.com",
			phone:9030688100
		},
		{
			name:"mahi",
			email:"mahi.beast@gmail.com",
			phone:7977896879
		}];
		res.json(contactlist);*/
		// respond to get request by sending data on the server 
	var data = db.collection('contacts').find().toArray(function(err, data){

		res.json(data);
	});

});
app.post('/sendcontact', function(req, res){
console.log("-------------------------------------- in node app");
db.collection('contacts').insert(req.body, function(err, data){
if(err)
{
	console.log("error");
}
});
});
app.delete('/deletecontact/:id', function(req, res){
console.log("----in delete");
var id = req.params.id;
console.log(id);
db.collection('contacts').remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
});
});
app.get('/editcontact/:id', function(req, res){
console.log("--------node in edit");
var id = req.params.id;
console.log(id);
db.collection('contacts').findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
 });
});
app.put('/updatecontact/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.collection('contacts').findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

// MongoClient.connect('mongodb://tunuguntla:srikanth.123@ds137256.mlab.com:37256/contacts', function(err,database){

/*db.collection('contacts').insert(
[
		{
			"name":"Srikanth",
			"email":"srikanth.tnrs@gmail.com",
			"phone":8904120567
		},
		{
			"name":"vijay",
			"email":"vijju.yuvi@gmail.com",
			"phone":9030688100
		},
		{
			"name":"mahi",
			"email":"mahi.beast@gmail.com",
			"phone":7977896879
		}]
);*/




app.listen(8080);
console.log("app is running");
// mongodb://<dbuser>:<dbpassword>@ds137256.mlab.com:37256/contacts  (important link to be seen)
