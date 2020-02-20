
//	Variables

var copyArray = [];
var booleanCopy = false;

var border = { //Zmienne guzików
	
	Camera: document.getElementById('bCamera'),
	
	Stats: document.getElementById('bStats'),
	
	Vars: document.getElementById('bVars'),
	
	Autonomus: document.getElementById('bAutonomus'),
	
}

var canvas ={ //zapisywanie drogi do poszczególnych wskaźników

	width: 300,
	
	driveLMotor: document.getElementById('driveLMotorIndicator').getContext("2d"),
	
	driveRMotor: document.getElementById('driveRMotorIndicator').getContext("2d"),
	
	shootLMotor: document.getElementById('shootLMotorIndicator').getContext("2d"),
	
	shootRMotor: document.getElementById('shootRMotorIndicator').getContext("2d"),
	
}

//	JQ

$(document).ready(function(){
  changeHeight();			//Środkowanie wyskokości
  canvasTranslate();		//Ustawienie canvasów na środku
  showdiv(1);				//pokazanie pierwszego diva po odpaleniu strony
  $("#Stats").slideUp(0);
  $("#Vars").slideUp(0);
  $("#Autonomus").slideUp(0); //animacja przechodzenia między kartami
  $("#bCamera").click(function(){
	$("#Stats").slideUp(350);
	$("#Vars").slideUp(300);
	$("#Autonomus").slideUp(300);
    $("#Camera").delay(300).slideDown(300);
	showdiv(1);
  });
  $("#bStats").click(function(){
    $("#Camera").slideUp(300);
	$("#Vars").slideUp(300);
	$("#Autonomus").slideUp(300);
	$("#Stats").delay(300).slideDown(300);
	showdiv(2);
  });
  $("#bVars").click(function(){
    $("#Camera").slideUp(300);
	$("#Stats").slideUp(300);
	$("#Autonomus").slideUp(300);
	$("#Vars").delay(300).slideDown(300);
	showdiv(3);
  });
  $("#bAutonomus").click(function(){
    $("#Camera").slideUp(300);
	$("#Stats").slideUp(300);
	$("#Vars").slideUp(300);
	$("#Autonomus").delay(300).slideDown(300);
	showdiv(4);
  });
});

//	Functions

function onLoad(){
	
	//canvasTranslate();

	chart(canvas.driveLMotor, 0); //Przykładowe wartości do wskaźników
	chart(canvas.driveRMotor, 0);
	chart(canvas.shootLMotor, 0);
	chart(canvas.shootRMotor, 0);
}

function canvasTranslate(){			//Transfer położenia punktu (0.0) na środek wskaźnika
	
	canvas.driveLMotor.translate(400,3); // Canvas ma długosć 400px, ale używane set jedynie 300px
	canvas.driveRMotor.translate(400,3);
	canvas.shootLMotor.translate(400,3);
	canvas.shootRMotor.translate(400,3);
	
}

function chart(ctx, x){ //Rysowanie wartości wskaźników
	
	if(x > canvas.width) x = canvas.width;			//sprawdzenie czy wartość nie wychodzi poza wartosć (gdyby mapowanie poszło źle)
	else if(x < -canvas.width) x = -cansax.width;

	ctx.fillStyle = "#404040";						//dopasowanie tła wskaźnika
	ctx.fillRect(-canvas.width,0,canvas.width*2,30);//narysowanie tła, głównie w celu odświerzenia przed ponownym narysowaniem
	
	var grd = ctx.createRadialGradient(0,15,1,0,15,canvas.width*1);	//przejście z jednego koloru na drugie (x1, y1, r1, x2, y2, r2) - Fukncja ta wyznacza 2 koła z przejściem w kolorach między nimi
	grd.addColorStop(0,'#49879F');					//Kolor 1
	grd.addColorStop(1,'#78179b');					//Kolor 2
	
	ctx.fillStyle = grd;							//Nadanie prostokątowi (wskaźnikowi) kolorów przejścia
	ctx.fillRect(0,0,x,30);							//Narysowanie wskaźnika
	
	
	ctx.fillStyle = "black";
	ctx.fillRect(-1,0,2,30);
	
	
	ctx.lineWidth = 3;									//Grubość linii 
	ctx.strokeRect(-canvas.width,0,canvas.width*2,30)	//Obramówka do wskaźnika
	
}

function copy(elem){
	
	elem.setAttribute('onclick',''); // Wyłączenie funkcji, aby nie robić paru takich samych okien
	
	var box = document.createElement('div');
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var nr = elem.id.slice(7);					//pobieranie miejsca zmiennej
	var span = document.createElement('span');
	
	
	document.getElementById('field').appendChild(box);	//Wsadzenie 'Pudła' na kopie do miejsca na kopie

	box.style.border = "2px solid #202020"				
	box.className = "box"
	box.id = "box" + nr;
	box.style.height = "102px"							
	box.style.position = "absolute";					//Ważny element, aby div mógł się poruszać
	box.style.textAlign = "center";
	
	
	div1.innerHTML = elem.innerHTML;					//Pobranie nazwy zmiennej
	div1.className = elem.className;					//Pobranie klasy, aby nowy pojemnik był podobny
	div1.id = "header" + nr;
	div1.style.borderBottom = "2px solid #202020"
	div1.style.backgroundColor = "#303030"
	div1.style.margin = "0px";
	div1.style.paddingLeft = "0px";
	
	div1.style.width = "180px";
	
	box.appendChild(div1);								//Wsadzenie do pudła
	
	div2.className = "var";
	div2.style.display = "block"
	
	box.appendChild(div2);
	
	span.id = "copy" + nr;								//nadanie tekstowi id, aby go później zaktualizować w listener()
	span.innerHTML = document.getElementById('var'+nr).value;	//	
	
	div2.appendChild(span);
	
	copyArray.push(nr); //Wstawienie danej zmiennej do tablicy, aby odwołać się do niej w każdej pętli Networtable
	
	booleanCopy = true; //Zwolnienie blokady, aby nie było błędów
	
	dragElement(document.getElementById('box'+nr));
	
}

function listener(){
	
	if(booleanCopy){
		
		for (let i = 0; i < copyArray.length; i++) {
			//update zmiennych w kopiach
			document.getElementById('copy' + copyArray[i]).innerHTML = document.getElementById('var' + copyArray[i]).value;
			
		}
	}
	
}

function showdiv(a){ //Zmiana border-bottom, aby ładnie wyglądało
	
	hidediv();
	
	switch(a){ //Ukrycie danego border-bottom
		
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
			border.Autonomus.style.borderBottomColor = "#404040";
			break;
	}
	
}

function hidediv(){ //Pokazanie każdego border-bottom
	
	border.Camera.style.borderBottomColor = "#202020";
	border.Stats.style.borderBottomColor = "#202020";
	border.Vars.style.borderBottomColor = "#202020";
	border.Autonomus.style.borderBottomColor = "#202020";
	
}

function changeHeight(){ //Wyśrdkowanie względem wysokości
	
	var height = window.innerHeight;
	document.body.style.marginTop =  (height - 755)/2 + "px";
	
}

function dragElement(elmnt) {							//Sprawianie aby dany elemeny mógł być poruszany
	
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	
	var nr = elmnt.id.slice(3);	
	
	if (document.getElementById("header" + nr)) {
		// if present, the header is where you move the DIV from:
		document.getElementById("header" + nr).onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}