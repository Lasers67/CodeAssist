var http=require('http');
var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var socket=require('socket.io');
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
app.use(express.static('public'));
http.createServer();
var urlencodeParser=bodyParser.urlencoded({extended:false});
var server=app.listen(3000);
app.set('view engine','ejs');
app.get('/signup',function(req,res){
	res.render('signup',{Name:req.query.Name,Password:req.query.Password,RePassword:req.query.RePassword,Email:req.query.Email});
});
app.post('/signup',urlencodeParser,function(req,res){
	console.log(req.body);
	if(req.body.Password===req.body.RePassword)
	{
		var sql="INSERT INTO User(Name,Password,Email) VALUES (?,?,?)";
		con.query(sql,[req.body.Name,req.body.Password,req.body.Email],function(err,result){
			if(err) throw err;
			console.log("Inserted");
		});
	}
	else
		console.log("reenter");
	// res.render('mainpage',{Name:req.query.Name,Age:req.query.Age});
	res.redirect('/?Name='+req.body.Name);
	res.end("Inserted");
});
app.get('/signin',function(req,res){
	res.render('signin',{Name:req.query.Username,Pass:req.query.Pass});
});
app.post('/signin',urlencodeParser,function(req,res){
	var sql="SELECT * FROM User where Name=?";
	con.query(sql,[req.body.Username],function(err,result){
		if(err) throw err;
		var name=req.body.Username;
		var string = JSON.stringify(result);
		var json=JSON.parse(string);
		console.log(json[0].Password);
		if(req.body.Pass==json[0].Password)
		{
			res.redirect('/?Name='+req.body.Username);
		}
	});
});
var io=socket(server);
app.get('/',function(req,res){
	// if(res.query.Name!='a')
		if(req.query.Name){
			console.log('Connection');
			res.render('mainpage',{Name:req.query.Name});
		}
		else
			res.end('Starting Page');
});
io.on('connection',function(socket){
	console.log('Connection Made');
	socket.on('chat',function(data){
			console.log(data);
			io.sockets.emit('chat',data);
	});
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});
	socket.on('error',function(err){
		console.log('Error!',err);
	});
	socket.on('room',function(room){
		socket.join(room);
		console.log("aaa");
	});
	socket.on('disconnect',function(socket){
		console.log('disconnected');
	});
	var room='room1';
    socket.on('client_character',function(msg){
    	console.log('Data from client: '+msg.buffer);
   		socket.in(room).broadcast.emit('server_character',msg.buffer);
   });
});