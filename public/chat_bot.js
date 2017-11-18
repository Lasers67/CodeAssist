//Lasers67 #GotNoChill
		var accessToken = "2d9d9319060e419d8cdc981766d7e0da";
		var baseUrl = "https://api.api.ai/v1/";
		$(document).ready(function() {
			$("#bot_input").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					send();
				}
			});
		});
		var recognition;
		function startRecognition() {
			recognition = new webkitSpeechRecognition();
			recognition.onstart = function(event) {
				updateRec();
			};
			recognition.onresult = function(event) {
				var text = "";
			    for (var i = event.resultIndex; i < event.results.length; ++i) {
			    	text += event.results[i][0].transcript;
			    }
			    setInput(text);
				stopRecognition();
			};
			recognition.onend = function() {
				stopRecognition();
			};
			recognition.lang = "en-US";
			recognition.start();
		}
	
		function stopRecognition() {
			if (recognition) {
				recognition.stop();
				recognition = null;
			}
		}
		function switchRecognition() {
			if (recognition) {
				stopRecognition();
			} else {
				startRecognition();
			}
		}
		function setInput(text) {
			$("#bot_input").val(text);
			send();
		}
		function send() {
			document.getElementById('bot_input').value='';
			var text = $("#bot_input").val();
			$.ajax({
				type: "POST",
				url: baseUrl + "query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + accessToken
				},
				data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
				success: function(data) {
					setResponse(JSON.stringify(data, undefined, 2));
				},
				error: function() {
					setResponse("Internal Server Error");
				}
			});
			// setResponse("Loading...");
		}
		function setResponse(val) {
			// alert(typeof(val));
			var obj=JSON.parse(val);
			var res=obj.result.fulfillment.speech;
			console.log(res);		
			if(res.indexOf("Chat")!=-1)
			{
				var x=res;
				x=x.substr(4);
				if(document.getElementById(x)===null)
					$("#response").html(x+" is offline!");
				else
					document.getElementById(x).click();
				//console.log(x+'se Chat karni hai!');
			}
			else if(res.indexOf("changelang")!=-1)
			{
				var x=res;
				x=x.substr(10);
				if(x==="C")
					LangChange(document.getElementById("1"));
				else if(x==="C++")
					LangChange(document.getElementById("2"));
				else if(x==="Java")
					LangChange(document.getElementById("3"));
				else if(x==="Python2.7")
					LangChange(document.getElementById("5"));
				else if(x==="Perl")
					LangChange(document.getElementById("6"));
				else if(x==="PHP")
					LangChange(document.getElementById("7"));
				else if(x==="Ruby")
					LangChange(document.getElementById("8"));
				else if(x==="C#")
					LangChange(document.getElementById("9"));
				else if(x==="MySQL")
					LangChange(document.getElementById("10"));
				else if(x==="Haskell")
					LangChange(document.getElementById("12"));
				else if(x==="Bash")
					LangChange(document.getElementById("14"));
				else if(x==="Scala")
					LangChange(document.getElementById("15"));
				else if(x==="Lua")
					LangChange(document.getElementById("18"));
				else if(x==="JavaScript")
					LangChange(document.getElementById("20"));
				else if(x==="R")
					LangChange(document.getElementById("24"));
				else if(x==="Objective-C")
					LangChange(document.getElementById("32"));
				else if(x==="Visual Basic")
					LangChange(document.getElementById("37"));
				else if(x==="Swift")
					LangChange(document.getElementById("51"));
				else
					$("#response").html("Cannot find "+res+" language in database!");
				console.log('Language change karni hai!');
			}
			else if(res.indexOf("Collabwith")!=-1)
			{
				var x=res;
				x=x.substr(10);
				if(document.getElementById(x+'c')===null)
					$("#response").html(x+" is offline!");
				else
					document.getElementById(x+'c').click();
				console.log('Collab karna hai!');
			}
			else if(res.indexOf("Compiling")!=-1)
			{
				document.getElementById("Compile").click();
				console.log('Compile karna hai!');
			}
			else if(res.indexOf("SearchingFor")!=-1)
			{
				var x=res;
				x=x.substr(12);
				findUsers(x);
				//$("#response").html(x+" is offline!");
				console.log('Search karna hai!');
			}
			else if(res.indexOf("Tabs_")!=-1)
			{
				var x=res;
				x=x.substr(5);
				if(document.getElementById(x+'1')===null)
					$("#response").html("Tab for "+x+" is not available!");
				else
					document.getElementById(x+'1').click();
				console.log('Tabbing karni hai!');
			}
			else
			{	
				$("#response").html(obj.result.fulfillment.speech);
			}
		}