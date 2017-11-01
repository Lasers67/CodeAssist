var Code=document.getElementById('Workspace');
// Code.contentEditable=true;
Code.focus();
var room='room1';
socket.on('connect',function(){
	console.log('working');
	socket.emit('room',room);
});
//receive character from server
socket.on('server_character',function(content){
	console.log('From Server:'+content);
	Code.innerHTML=content;
});
Code.addEventListener('keyup',function(){
	var char=Code.innerHTML;			
	socket.emit('client_character',{buffer:char});
});