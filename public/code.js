var Code=document.getElementById('Workspace');
// Code.contentEditable=true;
Code.focus();
var codingTogetherFlag=false;
var codingTogetherHost=false;
var room='room1';
var original_room=user.innerHTML;
var current=original_room;
socket.on('connect',function(){
	console.log('working');
	socket.emit('room',{Room:original_room,to:user.innerHTML,from:user.innerHTML});
});
//receive character from server
socket.on('server_character',function(content){
		console.log('From Server:'+content);
		Code.innerHTML=content;
});
Code.addEventListener('keyup',function(){
	if(codingTogetherFlag==true)
{		console.log('emitting client_character');
		var workCode=Code.innerHTML;
		socket.emit('client_character',{buffer:workCode, Room:current});
	}
});
function codeTogether(otherUser){
	saveCode();
	codingTogetherFlag=true;
	codingTogetherHost=true;
	var dat={
		fileName:user.innerHTML,
		otherUser:otherUser.id,
		code:Code.innerHTML
	};
	socket.emit('codeTogether',dat);
};
function saveCode(){
	if((codingTogetherHost==true)||(codingTogetherFlag==false)){
		console.log('Content: '+Code.innerHTML);
		var dat={
			fileName:user.innerHTML,
			code:Code.innerHTML
		};
		socket.emit('saveFile',dat);
	}
};
setInterval(saveCode, 5000);
socket.on('codeTogether',function(data){
	saveCode();
	var choice=confirm('Want to code together with '+data.fileName+'?');
	if(choice==true){
		Code.innerHTML=data.code;
		current=data.fileName;
		codingTogetherFlag=true;
		socket.emit('room',{Room:current,to:data.fileName,from:user.innerHTML});
	}
	else
		codingTogetherFlag=false;
});