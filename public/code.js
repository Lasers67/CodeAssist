var Code=document.getElementById('Workspace');
// Code.contentEditable=true;
var Tabs=document.getElementById('tabs');
var Tabs_M=document.getElementById('tabs_M');
var mybutton= document.getElementById('my_name');
var mybutton2= document.getElementById('my_name2');
var logoff=document.getElementById("signout");
var compileButton=document.getElementById("Compile");
var compileButton2=document.getElementById("Compile2");
compileButton2.onclick=function(){
	submitCode();
}
var testCases=document.getElementById('Input');
var output=document.getElementById('codeOutput');
Code.focus();
var users_in_room=document.getElementById('users_in_room');
var users_in_room_M=document.getElementById('users_in_room_M');
var leave_room=document.getElementById('leave_room');
// var table=document.getElementById('tableToModify');
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
			Code.value=content.buffer;
});
Code.addEventListener('keyup',function(){
	if(codingTogetherFlag==true){
		console.log(current);	
		console.log('emitting client_character');
		var workCode=Code.value;
		socket.emit('client_character',{buffer:workCode, Room:current});
	}
});
compileButton.onclick=function(){
	submitCode();
}
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
		code:Code.value
	};
	socket.emit('saveFile',dat);
};
logoff.onclick=function(){
	saveCode();
	this.href="http://localhost:3000/"; 
};
setInterval(saveCode, 10000);
function submitCode()
{
	var dat={
		source:Code.value,
		testcases:testCases.value,
		UserName:user.innerHTML
	};
	socket.emit('testCode',dat);
}
function clickedMyButton()
{
	leave_room.style.display='none';
	codingTogetherHost=true;
	current=user.innerHTML;
	socket.emit('takefilename',{filen:current});
	socket.emit('users_inside_this_room',current);
}
mybutton.onclick=function(){
	clickedMyButton();

};
mybutton2.onclick=function(){
	clickedMyButton();
};
socket.on('codeTogether',function(data){
	saveCode();
	var choice=confirm('Want to code together with '+data.fileName+'?');
	// switch tabs on re Alert
	if(choice==true){
		var A=document.getElementById(data.fileName+"1");
		if(A==null){
		leave_room.style.display='block';
					Code.value=data.code;
					var list1=document.createElement('li');
					var ref1=document.createElement('a');
					ref1.innerHTML=data.fileName;
					ref1.id=data.fileName+"1";
					ref1.href="#";
					ref1.onclick=function()
					{ 
						var string = this.id;
						string = string.substr(0,string.length-1);
						codingTogetherHost=false;
						codingTogetherFlag=true;
						current = string;
						socket.emit('users_inside_this_room',current);
						socket.emit('takefilename',{filen:current});
						leave_room.style.display='block';
					};
					list1.appendChild(ref1);
					Tabs_M.appendChild(list1);
					



					var but=document.createElement('button');
					but.innerText=data.fileName;
					but.className="btn btn-default btn-arrow-right";
					but.id=data.fileName+"1";
					but.onclick=function()
					{ 
						var string = this.id;
						string = string.substr(0,string.length-1);
						codingTogetherHost=false;
						codingTogetherFlag=true;
						current = string;
						socket.emit('users_inside_this_room',current);
						socket.emit('takefilename',{filen:current});
						leave_room.style.display='block';
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
	Code.value=data;
});

function marzi(name){
	// var new_button=document.createElement('button');
	// new_button.id=name+"6";
	// new_button.innerText=name;
	// new_button.onclick=function(){
	// 	if(current===user.innerHTML && current!=this.innerText)
	// 	{
	// 		socket.emit('kicking',{kicked_person:this.innerText,from:user.innerHTML});
	// 	}
	// 	else{
	// 		alert("Apple");
	// 	}

	// };
	// users_in_room.appendChild(new_button);
	// alert(users_in_room.nodeName);
		var list=document.createElement('li');
		var ref=document.createElement('a');
		ref.innerHTML=name;
		ref.id=name+"6";
		// ref.href='#';
		ref.onclick=function(){
			if(current===user.innerHTML && current!=this.innerHTML)
			{
				socket.emit('kicking',{kicked_person:this.innerHTML,from:user.innerHTML});
			}
			else{
				alert("Apple");
			}
		};
		list.appendChild(ref);
		users_in_room_M.appendChild(list);

		var row = document.createElement('tr');
		var col = document.createElement('td');
		col.innerText=name;
		col.id=name+"6";
		users_in_room.appendChild(row); 
		col.onclick=function(){
			if(current===user.innerHTML && current!=this.innerText)
			{
				socket.emit('kicking',{kicked_person:this.innerText,from:user.innerHTML});
			}
			else{
				// alert("Cannot ");
			}
		};
		row.appendChild(col);
}
socket.on('users_inside_this_room',function(data){
	users_in_room.innerHTML='';
	users_in_room_M.innerHTML='';
	data.forEach(function(item){
		marzi(item);
	});
});
socket.on('kick_tab',function(data){
	var a=document.getElementById(data+"1");
	var b=document.getElementById(data+"6");
	if(b!=null)
	{
		users_in_room.removeChild(b);
		users_in_room_M.removeChild(b);
	}
	if(a!=null){
		Tabs.removeChild(a);
		Tabs_M.removeChild(a);
	}
});
leave_room.onclick=function(){
	leave_room.style.display='none';
	var a=document.getElementById(current+"1");
	Tabs.removeChild(a);
	Tabs_M.removeChild(a);
	socket.emit('left',{room:current, leaving:user.innerHTML});
	clickedMyButton();
}
socket.on("got_kicked",function(data){
	var a=document.getElementById(data+"1");
	Tabs.removeChild(a);
	Tabs_M.removeChild(a);
	clickedMyButton();
});
socket.on('byebye',function(data){
	if(current===data)
	{
		clickedMyButton();
	}
});
socket.on('testCode',function(data){
	console.log('Testing:');
	console.log(data);
	output.value=data;
});
socket.on('pleaseWait',function(){
	output.value='Please Wait...';
});