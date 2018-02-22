function gameOver(action){
	
	//alert("game over");
	var body =document.getElementsByTagName("body");
	body[0].appendChild(document.createElement("DIV")).setAttribute("id", "gameover");
	document.getElementById("gameover").innerHTML = "LOSER <br> <p id=\"try\">try again?</p>";
	document.getElementById("try").addEventListener("click",function(){window.location.reload();});
	clearInterval(action);
}

var scene = [
				[{life:3},{life:3},{life:3},{life:3},{life:3},{life:3},{life:3},{life:3}],
				[{life:2},{life:2},{life:2},{life:2},{life:2},{life:2},{life:2},{life:3}],
				[{life:1},{life:1},{life:1},{life:1},{life:1},{life:1},{life:0},{life:3}]];
for (var i = 0; i < scene.length; i++) {
	$("#scene").append('<div class="row" id=\"row'+i+'\">')
	for (var j = 0; j < scene[0].length; j++) {			
			$("#scene div#row"+i).append("<div class=\"b"+scene[i][j].life+"\" data-life=\""+scene[i][j].life+"\"id=\'b"+i+""+j+"\'>");
	}
}
$("#player").css("left",((screen.availWidth/2))-parseInt($("#player").css("width"))+"px");
$("#ball").css("left",((screen.availWidth/2))-parseInt($("#ball").css("width"))+"px");

$(document).keydown(function(event) {
	if(event.keyCode==37){
		var mov = parseInt($('#player').css("left"));
		if (parseInt($('#player').css("left")) > 0){
			mov = mov - 10; 
			$('#player').css("left",mov+"px");
		}
	}
	if(event.keyCode==39){
		var mov = parseInt($('#player').css("left"));
		var width = parseInt($("#player").css("width"));
		if ((mov+width) < screen.availWidth && (mov+width)+10 < screen.availWidth ){	
			mov = mov+10; 
			$('#player').css("left",mov+"px");
		}	   		
	}
});

var y = window.innerHeight - (parseInt($("#player").css("height"))+parseInt($("#ball").css("height")));
var x = parseInt($("#ball").css("left"));
var movY = -1;
var movX = -1;
var scene = document.getElementById("scene").childNodes;
var sceneMD = document.getElementById("scene").getBoundingClientRect();


		
var action = setInterval(function (){
	document.getElementById("ball").style.left=String(x)+"px";
    document.getElementById("ball").style.top=String(y)+"px";
	//console.log(movY)
    if(y<=0){
		movY *= movY;

	}
	if(y>=document.getElementById("player").offsetTop - document.getElementById("ball").offsetWidth && x>=document.getElementById("player").offsetLeft && x<= document.getElementById("player").offsetLeft + document.getElementById("player").offsetWidth){ 
		movY *= -movY;
		console.log("entre")
	}

	if (y>=window.innerHeight){
        gameOver(action); 
	}
	if( y <= sceneMD.bottom ){
        for (var i = 1; i < scene.length; i++){
            var sceneRow = document.getElementById("scene").childNodes[i];
            var sceneRowMD = sceneRow.getBoundingClientRect();
            if(y <= sceneRowMD.bottom && y >= sceneRowMD.top){
            	console.log( document.getElementById("row"+(i-1)));
            	for (var j = 0; j < document.getElementById(("row"+(i-1))).childNodes.length; j++) {
            		var block = document.getElementById(("row"+(i-1))).childNodes[j];
		            var blockMD = block.getBoundingClientRect();
		            if( x >= blockMD.left && x <= blockMD.right && y >= blockMD.top && y <= blockMD.bottom ){
		            	var blockLife =block.getAttribute("data-life"); 
		            	console.log(block.getAttribute("data-life"));
		            	if (blockLife > 0){
		            		blockLife--;
		            		block.setAttribute("data-life",blockLife);
		            		block.className = "b"+blockLife;
							movY *= movY;
		            	}			 
		            }	
            	}
           	}
        }
    }

	if(x<=0){
       movX *= movX;
    }
    if(x >= (window.innerWidth - document.getElementById("ball").offsetWidth)){
       	movX *= -movX;
    }
	y += movY; 
	x += movX;

},5);
