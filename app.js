var exec=require('child_process').exec;
var http=require('http');
var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var socket=require('socket.io');
var fs=require('fs');
var utf8=require('utf8');
var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"shshwt.grg",
	database:"Test"
});
con.connect(function(err){
	if(err) throw err;
	console.log("Server Started!");
});
var app=express();
app.use(express.static('public'));
http.createServer();
var urlencodeParser=bodyParser.urlencoded({extended:false});
var server=app.listen(4000);
app.set('view engine','ejs');
app.get('/signup',function(req,res){
	res.render('signup',{Name:req.query.Name,Password:req.query.Password,RePassword:req.query.RePassword,Email:req.query.Email});
});
/*app.get('/search_user',function(req,res){
	con.query("select Name from user where Name!='App'",function(err,result){
   		if(err) throw err;
   		var j=JSON.parse(JSON.stringify(result));
   		res.render('search_results',{dat:j});
   	});
});*/
/*app.get('/profile/:name',function(req,res){
	var data=req.params.name;
	con.query('Select * from User where Name=?',[data],function(err,result){
		if(err) throw err;
		else if(result.length===0);	//Result is empty, do nothing !
		else{
			var j=JSON.parse(JSON.stringify(result));
			var d=j[0];
			console.log(d);
			res.render('profile',{Name:data,EMail:d.Email,Rating:d.Rating});
		}
	});
});*/
app.post('/signup',urlencodeParser,function(req,res){
	if(req.body.Password===req.body.RePassword)
	{
		con.query('select * from user where Name=?',[req.body.Name],function(err,result){
			if((result.lenth===0) ||(err))
				res.render('signup',{Name:req.query.Name,Password:req.query.Password,RePassword:req.query.RePassword,Email:req.query.Email});
			else
			{
				var sql="INSERT INTO user(Name,Password,Email) VALUES (?,?,?)";
				con.query(sql,[req.body.Name,req.body.Password,req.body.Email],function(err,result){
					if(err) throw err;
					console.log("Inserted New Value into user");
					fs.writeFileSync(__dirname+'/codes/'+req.body.Name+'.txt','');
					var q="create table `"+req.body.Name+"`(FriendName varchar(255));"
					con.query(q,function(err,result){
						q="create table `"+req.body.Name+"Tags`(Language varchar(255) primary key,TimesHelped int);"
						con.query(q,function(err,result){
							res.redirect('/?Name='+req.body.Name);
							res.end("Inserted");
						});
					});
				});
			}
		});
	}
	else{
		console.log("reenter");
		res.render('signup',{Name:req.query.Name,Password:req.query.Password,RePassword:req.query.RePassword,Email:req.query.Email});
	}
	// res.render('mainpage',{Name:req.query.Name,Age:req.query.Age});
});
app.get('/signin',function(req,res){
	res.render('signup',{Name:req.query.Username,Pass:req.query.Pass});
});
app.post('/signin',urlencodeParser,function(req,res){
	var sql="SELECT * FROM user where Name=?";
		con.query(sql,[req.body.Username],function(err,result){
		if(err) throw err;
		var name=req.body.Username;
		var string = JSON.stringify(result);
		var json=JSON.parse(string);
		if(req.body.Pass==json[0].Password)
		{
			res.redirect('/?Name='+req.body.Username);
		}
		else{
			res.render('signup',{Name:req.query.Username,Pass:req.query.Pass});		
		}
	});
});
var io=socket(server);
var NAME='';
app.get('/',function(req,res){
	// if(res.query.Name!='a')
		NAME=req.query.Name;
		if(req.query.Name){
			NAME=req.query.Name;
			console.log('Connection Made by '+NAME);
			res.render('mainpage',{Name:req.query.Name});
		}
		else
			res.render('signup');
});
app.get('/:garbage',function(req,res){
	res.redirect('http://localhost:4000/signup');
});
var users={};
var Online_Users='';
io.on('connection',function(socket){
	socket.name=NAME;
	console.log('Connection Made by '+NAME);
	var session='UPDATE user SET SessionID=? where Name=?';
	con.query(session,[socket.id,NAME]);
	if(socket.Name!=='')
	{
		users[socket.name]=socket;
		var text=fs.readFileSync(__dirname+'/codes/'+socket.name+'.txt','utf8');
		socket.emit("takefilename",text);
	}
	var sql='UPDATE user SET Online=1 where SessionID=?';
	con.query(sql,[socket.id],function(err){
		if(err) throw err;
	});
	var sql2='UPDATE user SET Online=0 where SessionID=?';
	// var online_users="select Name from User where Online=1";
	Object.keys(users).forEach(function(item){
		var q="select Name from user where Online=1 and Name in (select FriendName from `"+item+"`)";
		con.query(q,function(err,result){
			if(err)	throw err;
			var j=JSON.parse(JSON.stringify(result));
			users[item].emit('Online',j);
		});
	});
	//io.sockets.emit('Online',Object.keys(users));
	//console.log(Object.keys(users));
	socket.on('chat',function(data){
		var text=data.Message;
		var d = new Date();	
		var str='\n['+data.UserName+':-'+d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+","+d.getHours()+':'+d.getMinutes()+']'+text+'*--x--*';
		console.log(str);
		con.query('Select FileName from chat where (User1=? and User2= ?)or(User1=? and User2=?)',[data.to,data.UserName,data.UserName,data.to],function(err,result){
			if(err) throw err;
			else if(result.length===0);
			else{
				var j=JSON.parse(JSON.stringify(result));
				var l=j[0].FileName;
				if(fs.existsSync(__dirname+'/chats/'+l)){
					fs.appendFileSync(__dirname+'/chats/'+l,str);
				}
				else{
					fs.writeFileSync(__dirname+'/chats/'+l,str);
				}
				users[data.to].emit('chat',data);
			}
		});
	});
	socket.on('myChatInBox',function(data){
		console.log('Getting mychat...');
		console.log('To:'+data.to+'\nFrom:'+data.UserName);
		con.query('Select FileName from chat where (User1=? and User2= ?)or(User1=? and User2=?)',[data.to,data.UserName,data.UserName,data.to],function(err,result){
			if(err) throw err;
			else if(result.length===0);
			else{
				var j=JSON.parse(JSON.stringify(result));
				var l=j[0].FileName;
				if(fs.existsSync(__dirname+'/chats/'+l)){
					var text=fs.readFileSync(__dirname+'/chats/'+l,'utf8');
					var chats=text.split("*--x--*");
					chats.forEach(function(item,index){
						var t=item.split(":-");
						var s=t[0];
						s=s.substring(2);
						if(s===data.UserName){
							var x=item.indexOf(']');
							s=item.substring(x+1);
							var dat={
								to:data.to,
								Message:s,
								UserName:data.UserName
							};
							socket.emit('myChatInBox',dat);
						}
						else if(s===data.to){
							var x=item.indexOf(']');
							s=item.substring(x+1);
							var dat={
								to:data.UserName,
								Message:s,
								UserName:data.to
							};
							socket.emit('chat',dat);
						}
					});
				}
			}
		});
	});
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});
	socket.on('clear_text',function(){
		socket.broadcast.emit('clear_text');
	});
	socket.on('error',function(err){
		console.log('Error!',err);
	});
	socket.on('room',function(room){
		//console.log("apple");
		try{
		users[room.from].join(room.Room);
		// var a=io.of('/').in(room.Room).sockets;
		// console.log(a);
		var clients = io.sockets.adapter.rooms[room.Room].sockets;   

		//to get the number of clients
		var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
		var A=[];
		for (var clientId in clients ) {
		     //this is the socket of each client in the room.
		     var clientSocket = io.sockets.connected[clientId];
		     //you can do whatever you need with this
		     A.push(clientSocket.name);
		}
		io.to(room.Room).emit('users_inside_this_room',A);
	}
	catch(err)
	{
		console.log("BHK!!");
	}
	});
	socket.on('users_inside_this_room',function(data){
		var clients = io.sockets.adapter.rooms[data].sockets;   

		//to get the number of clients
		var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
		var A=[];
		for (var clientId in clients ) {
		     //this is the socket of each client in the room.
		     var clientSocket = io.sockets.connected[clientId];
		     //you can do whatever you need with this
		     A.push(clientSocket.name);
		}
		io.to(data).emit('users_inside_this_room',A);
	});
	socket.on('joinroom',function(data){
		socket.join(data);
	});
	socket.on('disconnect',function(sock){
		con.query(sql2,[socket.id]);
		delete users[socket.name];
		io.of('/').in(socket.name).clients(function(error, clients) {
		    if (clients.length > 0) {
		        console.log('clients in the room: \n');
		        console.log(clients);
		        io.to(socket.name).emit('byebye',socket.name);
		        clients.forEach(function (socket_id) {
		            io.sockets.sockets[socket_id].leave(socket.name);
		        });
		        
		    }
		});
		socket.broadcast.emit('kick_tab',socket.name);
		console.log(socket.id+' disconnected');
	});
    socket.on('client_character',function(msg){
   		socket.in(msg.Room).broadcast.emit('server_character',msg);
   });
	socket.on('saveFile',function(data){
		fs.writeFileSync(__dirname+'/codes/'+data.fileName+'.txt',data.code);
   });
   socket.on('codeTogether',function(data){
   		console.log(data);
		var origCode=fs.readFileSync(__dirname+'/codes/'+data.fileName+'.txt','utf8');
		var dat={
			fileName:data.fileName,
			otherUser:data.otherUser,
			code:origCode,
			lang:data.lang
		};
		console.log(dat.otherUser);
		users[data.otherUser].emit('codeTogether',dat);
   });
   socket.on('takefilename',function(data){
   		console.log(data);
		var text='';
		try{
			text=fs.readFileSync(__dirname+'/codes/'+data.filen+'.txt','utf8');
		}
		catch(err){
			console.log(err);
		}
   		socket.emit("takefilename",text);
   });
   socket.on('left',function(data){
   		users[data.leaving].leave(data.room);
   		var clients = io.sockets.adapter.rooms[data.room].sockets;   
		//to get the number of clients
		var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
		var A=[];
		for (var clientId in clients ) {
		     //this is the socket of each client in the room.
		     var clientSocket = io.sockets.connected[clientId];
		     //you can do whatever you need with this
		     A.push(clientSocket.name);
		}
		console.log(A);
		users[data.room].emit('CodeTogetherEnd',data);
		console.log("Disconnection caused!");
		io.to(data.room).emit('users_inside_this_room',A);
   });
   socket.on('kicking',function(data){
   		users[data.kicked_person].emit('got_kicked',data.from);
   		users[data.kicked_person].leave(data.from);
		var clients = io.sockets.adapter.rooms[data.from].sockets;   
		//to get the number of clients
		var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
		var A=[];
		for (var clientId in clients ) {
		     //this is the socket of each client in the room.
		     var clientSocket = io.sockets.connected[clientId];
		     //you can do whatever you need with this
		     A.push(clientSocket.name);
		}
		console.log(A);
		io.to(data.from).emit('users_inside_this_room',A); 

 		
   });
   socket.on('testCode',function(data){
		var x=data.source;
		x=x.replace(/\n/g,'%0A');
		x=x.replace(/"/g,'\\"');
		//console.log(x);
		var y=data.testcases;
		y=y.replace(/\n/g,'%0A');
		var z=data.lang;
		exec("curl -sX POST api.hackerrank.com/checker/submission.json -d \"source="+x+"&lang="+z+"&testcases=['"+y+"']&api_key=hackerrank|2252156-2145|f983468b215ca61b1185e513e8379c676967af34\" -x 10.8.0.1:8080 -H \"charset:utf-8\"",function(error,stdout,stderr){
			if(error){
				console.log(error);
			}
			var out='';
			var json=JSON.parse(stdout);
			//console.log(json.result.compilemessage);
			//console.log(json.result.stderr);
			//console.log(json.result.stdout);
			console.log(json);
			/*if((json.result.compilemessage==='')&&(json.result.stderr==='')){
					out=json.result.stdout;
			}
			else{
				out=(json.result.compilemessage)+(json.result.stderr);
				out=utf8.decode(out);
			}*/
			if(json.result.stdout==null){
				out=(json.result.compilemessage)+(json.result.stderr);
				out=utf8.decode(out);
			}
			else
				out=json.result.stdout;
			//console.log(out);
			users[data.UserName].emit('testCode',out);
		});
		users[data.UserName].emit('pleaseWait');
   });
   socket.on('OverlayContent',function(data){
		con.query('select * from user where Name=?',[data],function(err,result){
			if(err) throw err;
			else if(result.length===0);
			else{
				var j=JSON.parse(JSON.stringify(result));
				var d={
					Name:j[0].Name,
					Email:j[0].Email,
				};
				socket.emit('OverlayContent',d);
			}
		});
   });
   socket.on("findUsers",function(dat){
   		var q="select Name from user where Name like ? and Name!=? and Name!='App' and Name not in (select FriendName from `"+dat.User+"`)";
   		con.query(q,['%'+dat.str+'%',dat.User],function(err,result){
   			if(err) throw err;
   			var j=JSON.parse(JSON.stringify(result));
   			console.log(j);
   			//socket.emit('findUsers',j);
   			q="select Name from user where Name like ? and Name!=? and Name!='App' and Name in (select FriendName from `"+dat.User+"`)";
   			con.query(q,['%'+dat.str+'%',dat.User],function(err,result){
   				if(err) throw err;
   				var w=JSON.parse(JSON.stringify(result));
   				console.log(w);
   				var tot={
   					friend:w,
   					nonfriend:j
   				};
   				socket.emit('findUsers',tot);
   			});
   		});
   });
   socket.on('AddFriend',function(data){
   		var q="insert into `"+data.User+"` values (?)";
   		con.query(q,data.other,function(err,result){
   			if(err) throw err;
   			q="insert into `"+data.other+"` values (?)";
   			con.query(q,data.User,function(err,result){
   				if(err) throw err;
   				console.log("Friends Added!");
   				socket.emit('ChangedFriend',data);
   			});
   		});
   });
   socket.on('UnFriend',function(data){
   		var q="delete from `"+data.User+"` where FriendName=?";
   		con.query(q,data.other,function(err,result){
   			if(err) throw err;
   			q="delete from `"+data.other+"` where FriendName=?";
   			con.query(q,data.User,function(err,result){
   				if(err) throw err;
   				console.log("Friends Removed!");
   				socket.emit('ChangedFriend',data);
   			});
   		});
   });
   socket.on('codeTogetherUpdate',function(data){
   		var x="select * from `"+data.otherUser+"Tags` where Language=?";
   		con.query(x,[data.lang],function(err,result){
   			if(err) throw err;
   			else if(result.length===0)
   			{
   				x="insert into `"+data.otherUser+"Tags` values(?,0,0)";
   				con.query(x,[data.lang],function(err,result){
   					if(err)	throw err;
   				});
   			}
/*   		else
   			{
   				x='update `'+data.otherUser+"Tags` set TimesHelped=TimesHelped+1 where Language=?";
   				con.query(x,[data.lang],function(err,result){
   					if(err)	throw err;
   				});
   			}*/
   		});
   });
   socket.on('RatingUpdate',function(data){
   		var q="update `"+data.User+"Tags` set Rating=((Rating*TimesHelped)+?)/(TimesHelped+1) where Language=?";
   		con.query(q,[data.rate,data.lang],function(err,result){
   			if(err)	throw err;
   			q="update `"+data.User+"Tags` set TimesHelped=TimesHelped+1 where Language=?";
   			con.query(q,[data.lang],function(err,result){
   				if(err) return err;
   			});
   		});

   });
});