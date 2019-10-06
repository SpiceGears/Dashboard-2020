
//	Variables

var border = {
	
	Camera: document.getElementById('bCamera'),
	
	Stats: document.getElementById('bStats'),
	
	Vars: document.getElementById('bVars'),
	
	ProgrammingStuff: document.getElementById('bProgrammingStuff'),
	
}

//	JQ

$(document).ready(function(){
  changeHeight();
  showdiv(1);
  $("#Stats").slideUp(0);
  $("#Vars").slideUp(0);
  $("#ProgrammingStuff").slideUp(0);
  $("#bCamera").click(function(){
	$("#Stats").slideUp(350);
	$("#Vars").slideUp(300);
	$("#ProgrammingStuff").slideUp(300);
    $("#Camera").delay(300).slideDown(300);
	showdiv(1);
  });
  $("#bStats").click(function(){
    $("#Camera").slideUp(300);
	$("#Vars").slideUp(300);
	$("#ProgrammingStuff").slideUp(300);
	$("#Stats").delay(300).slideDown(300);
	showdiv(2);
  });
  $("#bVars").click(function(){
    $("#Camera").slideUp(300);
	$("#Stats").slideUp(300);
	$("#ProgrammingStuff").slideUp(300);
	$("#Vars").delay(300).slideDown(300);
	showdiv(3);
  });
  $("#bProgrammingStuff").click(function(){
    $("#Camera").slideUp(300);
	$("#Stats").slideUp(300);
	$("#Vars").slideUp(300);
	$("#ProgrammingStuff").delay(300).slideDown(300);
	showdiv(4);
  });
});

//	Functions

function showdiv(a){
	
	hidediv();
	
	switch(a){
		
		case 1:
			border.Camera.style.borderBottomColor = "#404040";
			break;
		case 2:
			border.Stats.style.borderBottomColor = "#404040";
			break;
		case 3:
			border.Vars.style.borderBottomColor = "#404040";
			break;
		case 4:
			border.ProgrammingStuff.style.borderBottomColor = "#404040";
			break;
	}
	
}

function hidediv(){
	
	border.Camera.style.borderBottomColor = "#202020";
	border.Stats.style.borderBottomColor = "#202020";
	border.Vars.style.borderBottomColor = "#202020";
	border.ProgrammingStuff.style.borderBottomColor = "#202020";
	
}

function changeHeight(){
	
	var height = window.innerHeight;
	document.body.style.marginTop =  (height - 755)/2 + "px";
	
}