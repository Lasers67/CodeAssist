var Code=document.getElementById('Workspace');
// Code.contentEditable=true;
var Tabs=document.getElementById('tabs');
var mybutton= document.getElementById('my_name');
Code.focus();
var codingTogetherFlag=false;
var codingTogetherHost=false;
var original_room=user.innerHTML;
var current=original_room;
socket.on('connect',function(){
	console.log('working');
	socket.emit('room',{Room:original_room,to:user.innerHTML,from:user.innerHTML});
});
//receive character from server
socket.on('server_character',function(content){
		console.log('From Server:'+content.Room);
		if(content.Room===current)
			Code.innerHTML=content.buffer;
});
Code.addEventListener('keyup',function(){
	if(codingTogetherFlag==true){
		console.log(current);	
		console.log('emitting client_character');
		var workCode=Code.innerHTML;
		socket.emit('client_character',{buffer:workCode, Room:current});
	}
});
function codeTogether(otherUser){
	saveCode();
	codingTogetherFlag=true;
	codingTogetherHost=true;
	clickedMyButton();
	var dat={
		filen:user.innerHTML
	};
	socket.emit('takefilename',dat);
	var dat={
		fileName:user.innerHTML,
		otherUser:otherUser.id,
	};
	socket.emit('codeTogether',dat);
};
function saveCode(){
	var dat={
		fileName:current,
		code:Code.innerText
	};
	socket.emit('saveFile',dat);
};

setInterval(saveCode, 100);

function clickedMyButton()
{
	codingTogetherHost=true;
	current=user.innerHTML;
	socket.emit('takefilename',{filen:current});
}
mybutton.onclick=function(){
	clickedMyButton();
}
socket.on('codeTogether',function(data){
	saveCode();
	var choice=confirm('Want to code together with '+data.fileName+'?');
	// switch tabs on re Alert
	if(choice==true){
		var A=document.getElementById(data.fileName+"1");
		if(A==null){
					Code.innerText=data.code;
					var but=document.createElement('button');
					but.innerText=data.fileName;
					but.id=data.fileName+"1";
					but.onclick=function()
					{ 
						var string = this.id;
						string = string.substr(0,string.length-1);
						codingTogetherHost=false;
						codingTogetherFlag=true;
						current = string;
						socket.emit('takefilename',{filen:current});
					};
					Tabs.appendChild(but);
		}
		current=data.fileName;
		codingTogetherHost=false;
		codingTogetherFlag=true;
		socket.emit('room',{Room:data.fileName,to:data.fileName,from:user.innerHTML});
	}
});
socket.on("takefilename",function(data){
	Code.innerText=data;
});