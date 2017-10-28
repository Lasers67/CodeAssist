var socket=io.connect('http://10.8.18.76:3000');
var Message=document.getElementById('Message');
var Send_button=document.getElementById('send');
var output=document.getElementById('Output');
var user=document.getElementById('name');
var type=document.getElementById('typing');
var code=document.getElementById('Code-space');
//Emit
Send_button.addEventListener('click',function(){
	//send text
	// alert('pressed');
	socket.emit('chat',{
		Message:Message.value,
		UserName:user.innerText
	});
	//clear input box after sending text
	Message.value="";
});
//typing
Message.addEventListener('keypress',function(event){
	socket.emit('typing',user.innerHTML);
	if(event.keyCode===13)
		Send_button.click();
});
//Listen
socket.on('chat',function(data){
	type.innerHTML="";
	output.innerHTML+='<p><strong>'+data.UserName+':</strong>'+data.Message+'</p>';
});
socket.on('typing',function(data){
	type.innerHTML='<p>'+data+' is typing...</p>';
	// type.style.color='red';
});
