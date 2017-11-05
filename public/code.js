var Code=document.getElementById('Workspace');
// Code.contentEditable=true;
Code.focus();
var codingTogetherFlag=false;
var codingTogetherHost=false;
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
	if(codingTogetherFlag==true){
		console.log('emitting client_character');
		var workCode=Code.innerHTML;
		socket.emit('client_character',{buffer:workCode});
	}
});
function codeTogether(otherUser){
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
	var choice=confirm('Want to code together with '+data.fileName+'?');
	if(choice==true){
		Code.innerHTML=data.code;
		codingTogetherFlag=true;
	}
	else
		codingTogetherFlag=false;
});