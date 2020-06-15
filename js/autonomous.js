var autonomus = document.getElementById('selectAuto');

selectAuto.onclick = function(){
	
	autonomus.backgroundColor = "white"
	
	autonomus.style.backgroundColor = "#a0a0a0";
	
	NetworkTables.setValue("/SmartDashboard/AutoSelected", autonomus.value);
	
};