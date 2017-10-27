var socket=io.connect('http://localhost:3000');
var Code=document.getElementById('Workspace');
Code.contentEditable=true;
Code.focus();
// Code.addEventListener('keypress',function(){
// 	socket.emit('room',{
// 		Message:"aaa"
// 	});
// });
// socket.on('room',function(data){
// 	Code.innerHTML+=data.Message;
// });
var room='room1';
socket.on('connect',function(){
	console.log('working');
	socket.emit('room',room);
});
//receive character from server
socket.on('server_character',function(content){
	console.log('From Server:'+content);
	// alert('a');
	Code.innerHTML=content;
});
Code.addEventListener('keyup',function(){
	var char=Code.innerHTML;
	console.log("emitting client_character " + char);			
	socket.emit('client_character',{buffer:char});
});
