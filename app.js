var http=require('http');
var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"2,4,6Trinitrophenol",
	database:"Test"
});
con.connect(function(err){
	if(err) throw err;
	console.log("connected!");
});
var app=express();
http.createServer();
var urlencodeParser=bodyParser.urlencoded({extended:false});
app.set('view engine','ejs');
app.get('/signup',function(req,res){
	res.render('signup',{Name:req.query.Name,Password:req.query.Password,RePassword:req.query.RePassword,Email:req.query.Email,Username:req.query.Username,Pass:req.query.Pass});
});
app.post('/signup',urlencodeParser,function(req,res){
	console.log(req.body);
	if(req.body.Password===req.body.RePassword)
	{
		var sql="INSERT INTO User(Name,Password,Email) VALUES (?,?,?)";
		con.query(sql,[req.body.Name,req.body.Email],function(err,result){
			if(err) throw err;
			console.log("Inserted");
		});
	}
	else
		console.log("reenter");

	res.render('login',{Name:req.query.Name,Age:req.query.Age});
	res.end("Inserted");
});
app.get('/signin',function(req,res){
	res.render('signin',{Name:req.query.Username,Pass:req.query.Pass});
});
app.post('/signin',urlencodeParser,function(req,res){
	var sql="SELECT * FROM User where Name=?";
	con.query(sql,[req.body.Username],function(err,result){
		if(err) throw err;
		var string = JSON.stringify(result);
		var json=JSON.parse(string);
		if(req.body.Pass==json[0].Password)
			res.render('mainpage',{Name:req.body.Username,Email:json[0].Email});
	});
	// console.log("rea");
});
app.listen(3000);
