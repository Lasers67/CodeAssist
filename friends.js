var userSearch=document.getElementById('searchtext');
function OverlayOn(data){
	document.getElementById('overlay').style.display='block';
	socket.emit('OverlayContent',data);
}
function OverlayOff(){
	document.getElementById('overlay').style.display='none';
}
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
	var x=document.getElementById('SearchedText');
	x.innerText="'"+namestr+"'";
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
	var d=data;
	var x=document.getElementById('Users');
	var f=d.friend;
	f.forEach(function(item){
		var but='<button onclick=\'UnFriend("'+item.Name+'")\' class="btn btn-success" style="float:right;">Unfriend</button>';
		x.innerHTML+='<div class="search-result"><h3><a onclick=\'OverlayOn("'+item.Name+'")\'>'+item.Name+'</a></h3><img src="/profile.jpg" alt="user pic">'+but+'</div>';
	});
	var uf=d.nonfriend;
	uf.forEach(function(item){
		var but='<button style="float:right;" class="btn btn-success" onclick=\'AddFriend("'+item.Name+'")\'><span class="glyphicon glyphicon-plus"></span>Add friend</button>';
		x.innerHTML+='<div class="search-result"><h3><a onclick=\'OverlayOn("'+item.Name+'")\'>'+item.Name+'</a></h3><img src="/profile.jpg" alt="user pic">'+but+'</div>';
	});
});
socket.on('ChangedFriend',function(data){
	findUsers("getfrominput");
});
socket.on('OverlayContent',function(data){
	document.getElementById('OverlayNameHead').innerHTML=data.Name;
	document.getElementById('OverlayName').innerHTML=data.Name;
	document.getElementById('OverlayEmail').innerHTML=data.Email;
	document.getElementById('OverlayRating').innerHTML=data.Rate;
});
