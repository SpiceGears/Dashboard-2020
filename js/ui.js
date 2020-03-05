// Define UI elements

var i=0;

var ui = {
	
	robotState: document.getElementById('robotStatus'),
	
	timer: document.getElementById('timer'),
	
	gyroValue: document.getElementById('gyroValue'),
	
	robotGyro: document.getElementById('gyroArm'),
	
	stats: {
	
		driveLMotor: document.getElementById('driveLMotorIndicator').getContext("2d"),
		
		driveLMotorValue: document.getElementById('driveLMotorValue'),
		
		driveRMotor: document.getElementById('driveRMotorIndicator').getContext("2d"),
		
		driveRMotorValue: document.getElementById('driveRMotorValue'),
		
		shootLMotor: document.getElementById('shootLMotorIndicator').getContext("2d"),
		
		shootLMotorValue: document.getElementById('shootLMotorValue'),
		
		shootRMotor: document.getElementById('shootRMotorIndicator').getContext("2d"),
		
		shootRMotorValue: document.getElementById('shootRMotorValue'),
		
		potValue: document.getElementById('potValue'),
		
		potArrow: document.getElementById('potArrow'),
		
		potCircle: document.getElementById('potCircle'),
	},
	
	varList: document.getElementById('tuning'),
	
	autonomus: {
		
		left: document.getElementById('selectLeft'),
		
		middle: document.getElementById('selectMiddle'),
		
		right: document.getElementById('selectRight'),
		
	},
	
	camera : document.getElementById('camera'),
	
	akumulator : document.getElementById('akumulatorVoltage'),
	
	akumulatorValue : document.getElementById('akumulatorVoltageValue'),
};

// Key Listeners

NetworkTables.addRobotConnectionListener(onRobotConnection, true);



function onRobotConnection(connected) {
	var state = connected ? 'Connected!' : 'Disconnected';
	console.log(state);
	
	if(connected) ui.robotState.style.background = "green";
	else ui.robotState.style.background = "red";
	
	ui.camera.src = "http://10.58.83.11:5800";
}

//attachSelectToSendableChooser("autonomusList", "Autonomous Mode");


NetworkTables.addGlobalListener(onValueChanged, true);

/*
//This button is just an example of triggering an event on the robot by clicking a button.
NetworkTables.addKeyListener('/SmartDashboard/value1', (key,value) => {
	function addData(chart1," " , value);
	addData(chart1," ",Math.floor(Math.random() * 90)+1);
	ui.testdiv1.innerHTML = value;
	
});

NetworkTables.addKeyListener('/SmartDashboard/gyro', (key,value) => {
	ui.robotGyro.style.transform = "rotate(" + value + "deg)";
	
 */

function onValueChanged(key,value,isNew) {
	
	if (value == 'true') {
		value = true;
	} else if (value == 'false') {
		value = false;
	}
	
	switch(key) {
		case '/SmartDashboard/tv':	//Pobieranie 'Czy robot widzi target'
		
			if(value == 1){
				ui.camera.style.borderColor = 'green';
			}else {
				ui.camera.style.borderColor = 'red';
			} break;
		
		case '/SmartDashboard/timer': //Pobierane timera
			
			ui.timer.innerHTML = parseInt(value) < 0 ? '0:00' : Math.floor(parseInt(value) / 60) + ':' + (parseInt(value) % 60 < 10 ? '0' : '') + parseInt(value) % 60;
			if(value<30) ui.timer.style.color = "red";
			else ui.timer.style.color = "white";
			break;
		
		case '/SmartDashboard/driveTrain_LeftMPS': //Left Drive Motor
			
			ui.stats.driveLMotorValue.innerHTML = parseFloat(parseInt(value*100))/400;
			chart(ui.stats.driveLMotor,value*300/4);
			
			// console.log("Lewy drive: " + value);
			
			break;
			
		case '/SmartDashboard/driveTrain_RightMPS': //Right Drive Motor
			
			ui.stats.driveRMotorValue.innerHTML = parseFloat(parseInt(value*100))/400;
			chart(ui.stats.driveRMotor,value*300/4);
			
			// console.log("Prawy drive: " + value);
			
			break;
			
		case '/SmartDashboard/shooter_LeftRPS': //Right Drive Motor
			
			ui.stats.shootLMotorValue.innerHTML = parseFloat(parseInt(value*100))/100;
			chart(ui.stats.shootLMotor,value*3);
			
			// console.log("Lewy shoot: " + value)
			
			break;
			
		case '/SmartDashboard/shooter_RightRPS': //Right Drive Motor
			
			ui.stats.shootRMotorValue.innerHTML = parseFloat(parseInt(value*100))/100;
			chart(ui.stats.shootRMotor,value*3);
			
			//console.log("Prawy shoot: " + value);
			
			break;
		
		case '/SmartDashboard/driveTrain_GyroAngle':
			
			var visibleAngle = Math.round(value);
			
			if(value > 360) {
				visibleAngle = visibleAngle - 360;
			}else if( value < 0) {
				VisiblaAnagale = visibleAngle + 360;
			}
			
			ui.gyroValue.innerHTML = visibleAngle;
			ui.robotGyro.style.transform = "rotate(" + -value + "deg)";
			
			// console.log("Gyro: " + value);
			
			break;
		
		case '/SmartDashboard/aiming_ActualPosition':
			
			ui.stats.potArrow.style.transform = "rotate(" +  ((value - 48)*45/14) + "deg)";
			
			ui.stats.potValue.innerHTML = parseInt(value);
			
			// console.log("Potenciometr: " + value);
			
			break;
			
		case '/SmartDashboard/SendableChooser[0]/options':
			
			while (ui.autonomus.left.firstChild) {
				ui.autonomus.left.removeChild(ui.autonomus.left.firstChild);
			}
			
			for (i = 0; i < value.length; i++) {
				var option = document.createElement('option');
				option.innerHTML = value[i];
				ui.autonomus.left.appendChild(option);
			}
			
			ui.autonomus.left.value = value[0];
			
			NetworkTables.setValue("/SmartDashboard/AutoSelected", value[0]);
			
			// console.log("Poszło!");
			
			//console.log(NetworkTables.getValue('/SmartDashboard/AutoChoices/Deault_Auto'));
			
			ui.autonomus.left.style.backgroundColor = "#a0a0a0";
			
			break;
		
		case '/SmartDashboard/akumulatorVoltage':
			
			ui.akumulator.height = value * 40 / 14;
			
			ui.akumulatorValue.innerHTML = value + V;
			
			break;
	}
	
	
	if (isNew && !document.getElementsByName(key)[0]) {
		// Jeżeli 'nowa wartość' + nie jest pusta
		if(key.substring(0,11) === "/limelight/") { //sprawdzanie czy limelight wysyła dane = limelight podłączony
			ui.camera.limelight = "10px solid red"
		} else if(key.substring(0,16) != "/SmartDashboard/" /*|| key.substring(0,25) == "/SmartDashboard/limelight"*/) {
			//filtrowanie śmieci
			//console.log("limelight wysyła dane");
		} else {
			
			key = key.slice(16);
			
			var divBox = document.createElement('div');	//Tworzenie 'Pudła'
			divBox.name = "box"+ i;						
			divBox.className = "box"; 					
			ui.varList.appendChild(divBox);				//Wsadzenie go do listy zmiennych
			
			
			var div1 = document.createElement('div');	//Tworzenie diva na nazwę zmiennej
			divBox.appendChild(div1);					//Wsadzenie go do 'Pudła'
			
			div1.className = "element";					//Nadanie mu własności
			div1.setAttribute("id", "element" + i);		//Nadanie ID, aby go potem znaleźć
			div1.setAttribute('onclick','copy(this)');	//Nadanie funkcji 'onclick' 
			
			var p = document.createElement('span');		
			p.innerHTML = key;							//Pobranie nazwy zmiennej
			div1.appendChild(p); 						//Wsadzenie jej do pierwszego diva
			
			var div2 = document.createElement('div');	//Stworzenie drugiego diva na wartości
			div2.className = "var";						
			
			divBox.appendChild(div2);					//Wsadzenie go do 'Pudła'
			
			var input = document.createElement('input');//Stworzenie inputu
			input.name = key;							//Nadanie mu nazwy, aby go potem znaleźć i zaktualizować
			input.value = value;						//Pobranie warości zmiennej
			
			//Ta sekcja zmienia input do jego typu dantych (boolean/number), jeżeli żaden z nich, to 'text'
			//Pomijam ze względu na dalsze obliczenia z .value
			
			/*//if (value === true || value === false) {// Sprawdzenie czy to boolean
				// input.type = 'checkbox'; 			// Zamiana inputu na checkox
				// input.checked = value; 				// .value nie działa na checkbox, potrzeba urzyć własności checkboxów
			// } else */if (!isNaN(value)) {			// Sprawdzanie czy nie jest nie liczbą 
				input.type = 'number';					// Zmiana imputu na liczbę
			} else {
				input.type = 'text';					// Najlepsza opcja dla bliżej nie znanego typu danych oraz samego tekstu
			}
			
			input.style.width = "180px";				// Nadanie inputowi własności div2
			input.style.height = "37px"
			input.id = "var" + i;						// Nadanie ID aby odnaleźć wartość
			
			// listener na wprowadzenie zmiennych do robota
			
			// input.onchange = function() {
				// switch (input.type) { // Figure out how to pass data based on input type
					// case 'checkbox':
						// Dla checkboxów, sprawdza czy jest zaznaczony i wysyła wynik true/false
						// NetworkTables.putValue(key, input.checked);
						// break;
					// case 'number':
						// Oddaje wartość w zmiennej int
						// NetworkTables.putValue(key, parseInt(input.value));
						// break;
					// case 'text':
						// Dla tekstu po prostu wysyła wartość
						// NetworkTables.putValue(key, input.value);
						// break;
				// }
			 // };
			 
			div2.appendChild(input);					// Wsadzenie imputu do divu na zmienne
			i++;
		}
	} else {											// Jeżeli wartość już istnieje 
		
		key = key.slice(16);							// Ucięcie "/SmartDashboard/"
		var oldInput = document.getElementsByName(key)[0]; // Szukanie elementu po nazwie
		if (oldInput) { 								// Powinno byc zawsze true, chyba że coś pójdzie nie tak
			if (oldInput.type === 'checkbox') { 		// Sprawdza typ danych i go aktualizuje
				oldInput.checked = value;
			} else {
				oldInput.value = value;
			}
		} else {
			//console.log('Error: Non-new variable ' + key + ' not present in tuning list!');
		}
	}
	
	
	listener();											// Dodatkowy listener aby aktualizować resztę zmiennych
	
};
