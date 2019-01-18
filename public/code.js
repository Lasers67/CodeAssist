var Code=document.getElementById('Workspace');
Code.style.fontSize='18px';
var editor = ace.edit("Workspace",{
      minLines:21,
      maxLines:21,
    wrap: true,
        autoScrollEditorIntoView: true
    });
    console.log(editor.getValue());
    editor.setValue("Hello");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/text");
var user=document.getElementById('name');
// Code.contentEditable=true;
var Tabs=document.getElementById('tabs');
//var Tabs_M=document.getElementById('tabs_M');
var mybutton= document.getElementById('my_name');
var mybutton2= document.getElementById('my_name2');
var logoff=document.getElementById("signout");
var compileButton=document.getElementById("Compile");
var compileButton2=document.getElementById("Compile2");
var searchUsers=document.getElementById('searchUsers');
var language=0;
var testCases=document.getElementById('Input');
var output=document.getElementById('codeOutput');
Code.focus();
var users_in_room=document.getElementById('users_in_room');
var users_in_room_M=document.getElementById('users_in_room_M');
var leave_room=document.getElementById('leave_room');
// var table=document.getElementById('tableToModify');
var codingTogetherFlag=false;
var codingTogetherHost=false;
var original_room=user.innerText;
var current=original_room;
function CodeTogetherRate(data){
	var modal = document.getElementById('CodingTogetherRate');
	var users=document.getElementById('CodeTogetherLangButtonRate');
	var span = document.getElementById("closeRate");
	var rate = document.getElementById("CodeTogetherRate");
    var conf= document.getElementById("CodeTogetherRateSubmit");
    modal.style.display = "block";
	span.onclick = function() {
	    modal.style.display = "none";
	}
	conf.onclick =function(){
		if(users.innerText==='Language')
			console.log('Nothing chosen!');
		else{
			modal.style.display="none";
			var d={
				User:data.leaving,
				lang:users.innerText,
				rate:ratingValue
			};
			socket.emit('RatingUpdate',d);
		}
	}
	window.onclick = function(event) {
    	if (event.target == modal) {
    	    modal.style.display = "none";
   	 }
	}
}
function LangChange(lang){
	var x=document.getElementById(lang.id).innerHTML;
	language=lang.id;
	document.getElementById('LangButton').innerHTML=x+'<span class="caret"></span>';
	if(x=="Python2.7")
	{
		editor.session.setMode("ace/mode/python");
	}
	else if(x=="C" || x=="C++")
	{
		editor.session.setMode("ace/mode/c_cpp");
	}
	else if(x=="Java")
	{
		editor.session.setMode("ace/mode/java");
	}
	// else if(x=="Perl")
	// {
	// 	editor.session.setMode("ace/mode/perl");
	// }
	// else if(x=="PHP")
	// {
	// 	editor.session.setMode("ace/mode/php");
	// }
	else if(x=="Ruby")
	{
		editor.session.setMode("ace/mode/ruby");
	}
	else if(x=="C#")
	{
		editor.session.setMode("ace/mode/csharp");
	}
	// else if(x=="MySQL")
	// {
	// 	editor.session.setMode("ace/mode/mysql");
	// }
	else if(x=="Haskell")
	{
		editor.session.setMode("ace/mode/haskell");
	}
	else if(x=="Bash")
	{
		editor.session.setMode("ace/mode/batchfile");
	}
	// else if(x=="Scala")
	// {
	// 	editor.session.setMode("ace/mode/scala");
	// }
	// else if(x=="Lua")
	// {
	// 	editor.session.setMode("ace/mode/lua");
	// }
	else if(x=="JavaScript")
	{
		editor.session.setMode("ace/mode/javascript");
	}
	// else if(x=="R")
	// {
	// 	editor.session.setMode("ace/mode/r");
	// }
	// else if(x=="Objective-C")
	// {
	// 	editor.session.setMode("ace/mode/objectivec");
	// }
	// else if(x=="Visual Basic")
	// {
	// 	editor.session.setMode("ace/mode/visualforce");
	// }
	// else if(x=="Swift")
	// {
	// 	editor.session.setMode("ace/mode/swift");
	// }

}
function CodeTogetherLangChange(lang){
	var x=lang.innerHTML;
	language=lang.id;
	document.getElementById('CodeTogetherLangButton').innerHTML=x+'<span class="caret"></span>';
}
function CodeTogetherLangChangeRate(lang){
	var x=document.getElementById(lang.id).innerHTML;
	language=lang.id;
	document.getElementById('CodeTogetherLangButtonRate').innerHTML=x+'<span class="caret"></span>';
}
compileButton2.onclick=function(){
	if(language===0)
		autolanguagedetection();
	else
		submitCode();
}
socket.on('connect',function(){
	socket.emit('room',{Room:original_room,to:user.innerText,from:user.innerText});
});
//receive character from server
socket.on('server_character',function(content){
		if(content.Room===current)
			editor.setValue(content.buffer);
});
Code.addEventListener('keyup',function(){
	if(codingTogetherFlag==true){
		var workCode=editor.getValue();
		socket.emit('client_character',{buffer:workCode, Room:current});
	}
});
compileButton.onclick=function(){
	if(language===0)
		autolanguagedetection();
	else
		submitCode();
}
function codeTogetherOverlay(otherUser){
	saveCode();
	var modal = document.getElementById('CodingTogetherLang');
	var users=document.getElementById('CodeTogetherLangButton');
	var span = document.getElementById("closeLang");
	var conf = document.getElementById("ConfirmCodeTogether");
    modal.style.display = "block";
	span.onclick = function() {
	    modal.style.display = "none";
	}
	conf.onclick =function(){
		if(users.innerText==='Language');
		else{
			modal.style.display="none";
			var d={
				other:otherUser.id,
				lang:users.innerText
			};
			codeTogether(d);
		}
	}
	window.onclick = function(event) {
    	if (event.target == modal) {
    	    modal.style.display = "none";
   	 }
	}
};
function codeTogether(data){
	saveCode();
	codingTogetherFlag=true;
	codingTogetherHost=true;
	clickedMyButton();
	var d={
		filen:user.innerText,
	};
	socket.emit('takefilename',d);
	var dat={
		fileName:user.innerText,
		otherUser:(data.other).substr(0,(data.other).length-1),
		lang: data.lang
	};
	socket.emit('codeTogether',dat);
};
function saveCode(){
	var dat={
		fileName:current,
		code:editor.getValue()
	};
	socket.emit('saveFile',dat);
};
logoff.onclick=function(){
	saveCode();
	this.href="http://localhost:4000/"; 
};
setInterval(saveCode, 10000);
function submitCode()
{
	var dat={
		source:editor.getValue(),
		testcases:testCases.value,
		lang:language,
		UserName:user.innerText
	};
	socket.emit('testCode',dat);
}
function clickedMyButton()
{
	leave_room.style.display='none';
	codingTogetherHost=true;
	current=user.innerText;
	mybutton.style.backgroundColor='black';
	mybutton.style.color='white';
	socket.emit('takefilename',{filen:current});
	socket.emit('users_inside_this_room',current);
}
mybutton.onclick=function(){
	leave_room.style.display='none';
	codingTogetherHost=true;
	document.getElementById(current+"1").style.backgroundColor='white';
	document.getElementById(current+"1").style.color='black';
	current=user.innerText;
	this.style.backgroundColor='black';
	this.style.color='white';
	socket.emit('takefilename',{filen:current});
	socket.emit('users_inside_this_room',current);
};
mybutton2.onclick=function(){
	clickedMyButton();
};
socket.on('codeTogether',function(data){
	saveCode();
	var choice=confirm('Want to code together with '+data.fileName+' in '+data.lang+'?');
	// switch tabs on re Alert
	if(choice==true){
		socket.emit('codeTogetherUpdate',data);
		var A=document.getElementById(data.fileName+"1");
		if(A==null){
		leave_room.style.display='block';
					editor.setValue(data.code);
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
					var but=document.createElement('button');
					but.innerText=data.fileName;
					but.className="btn btn-default btn-arrow-right";
					but.id=data.fileName+"1";
					but.style.backgroundColor='black';
					but.style.color='white';
					if(current!=user.innerText)
					{
						document.getElementById(current+"1").style.backgroundColor='white';
						document.getElementById(current+"1").style.color='black';
					}
					else
					{
						mybutton.style.backgroundColor='white';
						mybutton.style.color='black';
					}
					but.onclick=function()
					{ 
						var string = this.id;
						string = string.substr(0,string.length-1);
						codingTogetherHost=false;
						codingTogetherFlag=true;
						if(current!=user.innerText)
						{
							document.getElementById(current+"1").style.backgroundColor='white';
							document.getElementById(current+"1").style.color='black';
						}
						else
						{
							mybutton.style.backgroundColor='white';
							mybutton.style.color='black';
						}
						current = string;
						this.style.backgroundColor='black';
						this.style.color='white';
						socket.emit('users_inside_this_room',current);
						socket.emit('takefilename',{filen:current});
						leave_room.style.display='block';
					};
					Tabs.appendChild(but);
		}
		current=data.fileName;
		codingTogetherHost=false;
		codingTogetherFlag=true;
		socket.emit('room',{Room:data.fileName,to:data.fileName,from:user.innerText});
	}
});
socket.on("takefilename",function(data){
	editor.setValue(data);
});
function autolanguagedetection()
{
	var input = editor.getValue();
	Algorithmia.client("simlsSH3xPkksEwSuBmAmXYlMHh1")
    .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3")
    .pipe(input)
    .then(function(output){
    	var ID='0';
        if(output.result[0][0]=='javascript'){
        	ID='29';
        }
        else if(output.result[0][0]=='java'){
        	ID='27';
        }
        // else if(output.result[0][0]=='php'){
        // 	ID='7';
        // }	
        else if(output.result[0][0]=='c'){
        	ID='4';
        	output.result[0][0]='c_cpp';
        }
        // else if(output.result[0][0]=='lua'){
        // 	ID='18';
       	// }
        // else if(output.result[0][0]=='html'){
        // }
        // else if(output.result[0][0]=='objective-c'){
        // 	ID='32';
        // 	output.result[0][0]='objectivec';
        // }
        // else if(output.result[0][0]=='sql'){
        // 	ID='10';
        // 	output.result[0][0]='mysql';
        // }
        else if(output.result[0][0]=='c++'){
        	ID='10';
        	output.result[0][0]='c_cpp';
        }
        // else if(output.result[0][0]=='swift'){
        // 	ID='51';
        // }
        else if(output.result[0][0]=='bash'){
        	ID='1';
        }
        else if(output.result[0][0]=='ruby'){
        	ID='38';
        }
        // else if(output.result[0][0]=='perl'){
        // 	ID='6';
        // }
        else if(output.result[0][0]=='c#'){
        	ID='16';
        	output.result[0][0]='csharp';
        }
        // else if(output.result[0][0]=='scala'){
        // 	ID='15';
        // }
        else if(output.result[0][0]=='python'){
        	ID='36';
        }
        //  else if(output.result[0][0]=='r'){
        //  	ID='24';
        // }
         else if(output.result[0][0]=='haskell'){
         	ID='23';
        }
        //  else if(output.result[0][0]=='vb'){
        //  	ID='37';
        //  	output.result[0][0]='visualforce';
        // }
        editor.session.setMode("ace/mode/".concat(output.result[0][0]));
        if(ID!='0')
        {
        	var to_change=document.getElementById(ID);
        	LangChange(to_change);
        }

        submitCode();
    });
}
function marzi(name){
	var list=document.createElement('li');
	var ref=document.createElement('a');
	ref.innerHTML=name;
	ref.id=name+"6";
	ref.onclick=function(){
		if(current===user.innerText && current!=this.innerHTML)
		{
			socket.emit('kicking',{kicked_person:this.innerHTML,from:user.innerText});
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
	if(current==user.innerText && name!=user.innerText)
		col.title='Kick '+name;
	col.id=name+"6";
	users_in_room.appendChild(row); 
	col.onclick=function(){
		if(current===user.innerText && current!=this.innerText)
		{
			socket.emit('kicking',{kicked_person:this.innerText,from:user.innerText});
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
		//Tabs_M.removeChild(a);
	}
});
leave_room.onclick=function(){
	leave_room.style.display='none';
	var a=document.getElementById(current+"1");
	Tabs.removeChild(a);
	//Tabs_M.removeChild(a);
	socket.emit('left',{room:current, leaving:user.innerText});
	clickedMyButton();
}
socket.on("got_kicked",function(data){
	var a=document.getElementById(data+"1");
	Tabs.removeChild(a);
	//Tabs_M.removeChild(a);
	clickedMyButton();
});
socket.on('byebye',function(data){
	if(current===data)
	{
		clickedMyButton();
	}
});
socket.on('testCode',function(data){
	output.value=data;
});
socket.on('pleaseWait',function(){
	output.value='Please Wait...';
});

socket.on('CodeTogetherEnd',function(data){
	CodeTogetherRate(data);
});
socket.on('compileErrorResolve',function(data){
	var doc=document.getElementById('response');
	doc.innerHTML="<a href='"+data.url+"' style='color:white;' target='_blank'>Google says this</a><br/>";
	if(data.arr.length==0){
		doc.innerHTML+="<br>Try seeking help from your Friends!";
	}
	else{	
		doc.innerHTML+="Or you can contact:";
		data.arr.forEach(function(item){
			doc.innerHTML+='<br/>'+item.name;
		});
	}
});