var userSearch=document.getElementById('searchtext');

function AddFriend(namestr)
{
	var dat={
		User:user.innerText,
		other:namestr
	};
	socket.emit('AddFriend',dat);
}

function UnFriend(namestr)
{
	var choice=confirm('You sure you wish to unfriend '+namestr+'?');
	if(choice==true)
	{
		var dat={
			User:user.innerText,
			other:namestr
		};
		socket.emit('UnFriend',dat);
	}
}

function findUsers(namestr)
{
	if(namestr==="getfrominput")
		namestr=userSearch.value;
	console.log(namestr);
	var modal = document.getElementById('myModal');
	var users=document.getElementById('Users');
	var span = document.getElementsByClassName("close")[0];
	var x=document.getElementById('Users');
	x.innerHTML="";
    modal.style.display = "block";
	span.onclick = function() {
	    modal.style.display = "none";
	}
	window.onclick = function(event) {
    	if (event.target == modal) {
    	    modal.style.display = "none";
   	 }
	}
	var dat={
		User:user.innerText,
		str:namestr
	};
	socket.emit('findUsers',dat);
}
socket.on('findUsers',function(data){
	console.log(data);
	var d=data;
	var x=document.getElementById('Users');
	var f=d.friend;
	console.log(f);
	f.forEach(function(item){
		var but='<button onclick=\'UnFriend("'+item.Name+'")\'>Unfriend</button>';
		x.innerHTML+='<div class="search-result"><h3><a onclick=\'OverlayOn("'+item.Name+'")\'>'+item.Name+'</a></h3>'+but+'<img src="/profile.jpg" alt="user pic"><p>Description of user.</p></div>';
	});
	var uf=d.nonfriend;
	console.log(uf);
	uf.forEach(function(item){
		var but='<button onclick=\'AddFriend("'+item.Name+'")\'>Add friend</button>';
		x.innerHTML+='<div class="search-result"><h3><a onclick=\'OverlayOn("'+item.Name+'")\'>'+item.Name+'</a></h3>'+but+'<img src="/profile.jpg" alt="user pic"><p>Description of user.</p></div>';
	});
});
socket.on('ChangedFriend',function(data){
	findUsers("getfrominput");
});