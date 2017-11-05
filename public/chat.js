var socket=io.connect('localhost:3000');
var Message=document.getElementById('Message');
var Send_button=document.getElementById('send');
var output=document.getElementById('Output');
var user=document.getElementById('name');
var type=document.getElementById('typing');
var code=document.getElementById('Code-space');
var sidebar=document.getElementById('sidebar');
var chat_box=document.getElementById('Chat-box');
//Emit

// setInterval(Onliner, 3000);
function function1(data,ID) {
 	 var li = document.createElement("div");
 	 // var br=document.createElement("br");
	 li.id=ID;
	 li.innerHTML='<p><strong>'+data.UserName+':</strong>'+data.Message+'</p>';
 	 output.appendChild(li);
	}

//typing
Message.addEventListener('keypress',function(event){
	if(event.keyCode===13)
		Send_button.click();
});	
Message.addEventListener('keydown',function(event){
	socket.emit('typing',user.innerHTML);
});
Message.addEventListener('keyup',function(event){
	socket.emit('clear_text');
});


socket.on('typing',function(data){
	type.innerHTML='<p>'+data+' is typing...</p>';
});
socket.on('clear_text',function(){
	setTimeout(function(){type.innerHTML='';},1000);
});
var receiver='aa';
function fun(data,ID)
{
	var newbutton = document.createElement("button");
	newbutton.id=ID;
	newbutton.className='chatButton';
	newbutton.innerHTML = ID;
	newbutton.onclick=function(){receiver=data;output.style.display='block';};
	sidebar.appendChild(newbutton);
	var newbutton2 = document.createElement("button");
	newbutton2.id=ID;
	newbutton2.className = 'inviteButton';
	newbutton2.innerHTML = 'Code Together';
	newbutton2.onclick=function(){codeTogether(newbutton2);};
	sidebar.appendChild(newbutton2);
}

socket.on('Online',function(data){
	sidebar.innerHTML='';
	data.forEach(function(item){
		if(item!=user.innerHTML){
			fun(item,item);
		}
	});
});
Send_button.addEventListener('click',function(){	
	socket.emit('chat',{
		to: receiver,
		Message:Message.value,
		UserName:user.innerText
	});
	var data={to: receiver,Message:Message.value,UserName:user.innerText};
	function1(data,'my');
	//clear input box after sending text
	Message.value="";
});

//Listen
socket.on('chat',function(data){
	type.innerHTML="";
	var val='<p><strong>'+data.UserName+':</strong>'+data.Message+'</p>';
	function1(data,'her');
});
