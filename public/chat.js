var socket=io.connect('http://10.8.18.76:3000');
var Message=document.getElementById('Message');
var Send_button=document.getElementById('send');
var output=document.getElementById('Output');
var user=document.getElementById('name');
var type=document.getElementById('typing');
var code=document.getElementById('Code-space');
var sidebar=document.getElementById('sidebar');
//Emit
function function1(data,ID) {
 	 var li = document.createElement("div");
	li.id=ID;
	li.innerHTML='<p><strong>'+data.UserName+':</strong>'+data.Message+'</p>';
 	 output.appendChild(li);
	}
Send_button.addEventListener('click',function(){
	//send text
	socket.emit('chat',{
		Message:Message.value,
		UserName:user.innerText
	});
	var data={Message:Message.value,UserName:user.innerText};
	function1(data,'my');
	//clear input box after sending text
	Message.value="";
});
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
//Listen
socket.on('chat',function(data){
	type.innerHTML="";
	var val='<p><strong>'+data.UserName+':</strong>'+data.Message+'</p>';
	function1(data,'her');
});
socket.on('typing',function(data){
	type.innerHTML='<p>'+data+' is typing...</p>';
});
socket.on('clear_text',function(){
	setTimeout(function(){type.innerHTML='';},1000);
});
function Onliner(){
	// alert('Loaded');
	socket.emit('Online');
};
setInterval(Onliner, 3000);
socket.on('Online',function(data){
	sidebar.innerHTML='';
	data.forEach(function(item){
		if(item.Name!=user.innerHTML)
			sidebar.innerHTML+='<h1>'+item.Name+'</h1>';
	});
});