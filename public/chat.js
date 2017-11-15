var socket=io.connect('http://localhost:4000');
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
 	 var ele=document.getElementById(Apple+"Box");
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
	var new_div=document.createElement("div");
	new_div.className="btn-group btn-group-justified";
	new_div.id=ID+'K';
	var newbutton = document.createElement("a");
	newbutton.id=ID;
	newbutton.innerHTML="A";
	// newbutton.className='chatButton';
	newbutton.innerHTML = ID;
	// newbutton.type="button";
	newbutton.className='btn btn-info';
	newbutton.onclick=function(){receiver=data;create_chatbox(ID);};
	new_div.appendChild(newbutton);
	var newbutton2 = document.createElement("a");
	newbutton2.id=ID;
	newbutton2.className='btn btn-default';
	newbutton.style.backgroundColor="#26292a";
	newbutton.style.border="#aeb2b4";
	newbutton2.innerHTML = 'Share';
	newbutton2.onclick=function(){
		codeTogether(this);
	};
	newbutton2.style.display='none';
	new_div.onmouseover=function(){
		newbutton.innerHTML='Chat';
		newbutton.style.backgroundColor="#26292a";
		// newbutton.className="btn btn-default";
		newbutton2.style.display='';
	};
	new_div.onmouseout=function(){
		var string=this.id;
		string=string.substr(0,string.length-1);
		newbutton.innerHTML=string;
		// newbutton.className="btn btn-info";

		newbutton2.style.display='none';
	}
	new_div.appendChild(newbutton2);
	sidebar.appendChild(new_div);
}
function create_chatbox(Name)
{
	var A=document.getElementById(Name+"2");
	if(A==null)
	{
		var New_Chatbox=document.createElement("div");
		var Name_box=Name+"2";
		New_Chatbox.id=Name_box;
		// New_Chatbox.style.position='fixed';
		New_Chatbox.style.float='right';
		New_Chatbox.style.top="-300px";
		// New_Chatbox.style.backgroundColor='blue';
		New_Chatbox.style.height="40vh";
		New_Chatbox.style.width="20vw";
		// New_Chatbox.style.position='absolute';
		New_Chatbox.style.marginTop='-100px';
		New_Chatbox.style.bottom='0';
		// New_Chatbox.style.color="white";
		// New_Chatbox.style.border="1px solid red";
	
		var Chat_head=document.createElement("div");
		Chat_head.innerHTML='<a style="text-decoration:none; color:white" onclick=\'OverlayOn("'+Name+'")\'>'+Name+'</a>';
		var cross_button=document.createElement('span');
		cross_button.id=Name+"X";
		cross_button.className="glyphicon glyphicon-remove";
		cross_button.style.position='relative';
		cross_button.onmouseover=function(){
			this.style.color="grey";
		}
		cross_button.onmouseout=function(){
			this.style.color="white";
		}
		cross_button.style.left="14vw";
		cross_button.onclick=function()
		{
			var string=this.id;
			string=string.substr(0,string.length-1);
			//alert(string);
			var k=document.getElementById(string+"2");
			Chatting.removeChild(k);
		}
		Chat_head.appendChild(cross_button);
		Chat_head.style.position='fixed';
		Chat_head.style.float="right";
		Chat_head.style.padding='5px';
		Chat_head.style.backgroundColor='#1187c2';
		Chat_head.style.color='white';
		Chat_head.style.width='20vw';	
		New_Chatbox.appendChild(Chat_head);
		var Chat_bottom=document.createElement("div");
		Chat_bottom.style.width='20vw';
		// Chat_bottom.style.border='1px solid black';
		Chat_bottom.style.color='black';
		var New_Message=document.createElement("input");
		New_Message.type="text";
		New_Message.placeholder="Message";
		Chat_bottom.appendChild(New_Message);
		var SEND=document.createElement("button");
		SEND.className="btn btn-default";
			New_Message.id=Name+"3";
		SEND.id=Name+"4";
		SEND.innerHTML="Send";
		Chat_bottom.appendChild(SEND);
		Chat_bottom.style.position='fixed';
		Chat_bottom.style.backgroundColor="white";
		Chat_bottom.style.bottom='0';
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
		New_Chatbox.appendChild(Chat_bottom);
		var oldChatData={to:Name,UserName:user.innerHTML};
		socket.emit('myChatInBox',oldChatData);
		New_Message.addEventListener('keypress',function(event){
			if(event.keyCode==13)
				SEND.click();
		});
		var  Chat_area=document.createElement('div');
		Chat_area.style.backgroundColor="white";
		Chat_area.style.position='fixed';
		Chat_area.style.marginTop='30px';
		// Chat_area.style.marginTop="-11vh";
		// Chat_area.style.marginBottom='0vh';
		Chat_area.style.height='30%';
		// Chat_area.style.zIndex='-11';
		Chat_area.style.width='20vw';	
		Chat_area.id=Name+'Box';
		Chat_area.style.overflow="auto";
		New_Chatbox.appendChild(Chat_area);
		// New_Chatbox.style.float="left";
		// New_Chatbox.style.overflow="auto";
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
	//alert('receive');
	var Apple=data.UserName;
	create_chatbox(Apple);
	function1(data,'her',Apple);
});
socket.on('myChatInBox',function(data){
	//alert('rrr');
	function1(data,"my",data.to);
});