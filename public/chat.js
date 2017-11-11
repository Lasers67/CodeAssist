var socket=io.connect('http://localhost:3000');
var Message=document.getElementById('Message');
var Send_button=document.getElementById('send');
var output=document.getElementById('Output');
var user=document.getElementById('name');
var type=document.getElementById('typing');
var code=document.getElementById('Code-space');
var sidebar=document.getElementById('sidebar');
var chat_box=document.getElementById('Chat-box');
var bottom_chat=document.getElementById('bottom-chat');
var Chatting=document.getElementById('ChattingArea');
//Emit
// setInterval(Onliner, 3000);
function function1(data,ID,Apple) {
 	 var li = document.createElement("input");
 	 li.type="text";
 	 // var br=document.createElement("br");
	 li.id=ID;
	 li.value=data.Message;
	 li.readOnly=true;
 	 var ele=document.getElementById(Apple+"2");
 	 ele.appendChild(li);
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
	newbutton.onclick=function(){receiver=data;create_chatbox(ID);};
	sidebar.appendChild(newbutton);
	var newbutton2 = document.createElement("button");
	newbutton2.id=ID;
	newbutton2.className = 'inviteButton';
	newbutton2.innerHTML = 'Code Together';
	newbutton2.onclick=function(){
		codeTogether(this);
	};
	sidebar.appendChild(newbutton2);
}
function create_chatbox(Name)
{
	var A=document.getElementById(Name+"2");
	if(A==null)
	{
		var New_Chatbox=document.createElement("div");
		var Name_box=Name+"2";
		New_Chatbox.id=Name_box;
		New_Chatbox.style.height="300px";
		New_Chatbox.style.width="300px";
		New_Chatbox.style.color="black";
		New_Chatbox.style.border="1px solid red";
		var Chat_head=document.createElement("div");
		New_Chatbox.appendChild(Chat_head);
		Chat_head.innerHTML=Name;
		var Chat_bottom=document.createElement("div");
		New_Chatbox.appendChild(Chat_bottom);
		var New_Message=document.createElement("input");
		New_Message.type="text";
		New_Message.placeholder="Message";
		Chat_bottom.appendChild(New_Message);
		var SEND=document.createElement("button");
		New_Message.id=Name+"3";
		SEND.id=Name+"4";
		SEND.innerHTML="Send";
		Chat_bottom.appendChild(SEND);
		SEND.onclick=function(){
			var string=this.id;
			var name=string.substr(0,string.length-1);
			var to_send=document.getElementById(name+"3").value;
			socket.emit("chat",{to:name,Message:to_send,UserName:user.innerHTML});
			var data={to:name,Message:to_send,UserName:user.innerHTML};
			var Apple=name;
			function1(data,"my",Apple);
			New_Message.value="";
		};
		New_Message.addEventListener('keypress',function(event){
			if(event.keyCode==13)
				SEND.click();
		});
		New_Chatbox.style.float="right";
		New_Chatbox.style.overflow="auto";
		New_Chatbox.style.backgroundColor="white";
		Chatting.appendChild(New_Chatbox);}
		// New_Message.style.position="relative";
}
socket.on('Online',function(data){
	sidebar.innerHTML='';
	data.forEach(function(item){
		if(item!=user.innerHTML){
			fun(item,item);
		}
	});
});
//Listen
socket.on('chat',function(data){
	type.innerHTML="";
	var Apple=data.UserName;
	create_chatbox(Apple);
	function1(data,'her',Apple);
});