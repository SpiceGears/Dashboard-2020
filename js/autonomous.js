
var autonomus = {
	
	left: document.getElementById('selectLeft'),
	
	middle: document.getElementById('selectMiddle'),
	
	right: document.getElementById('selectRight'),
	
}

function clear(){
	
	autonomus.left.style.backgroundColor = "white"
	autonomus.middle.style.backgroundColor = "white"
	autonomus.right.style.backgroundColor = "white"
	
}

function put(s){
	
	// console.log(s.value);
	
	NetworkTables.setValue("/SmartDashboard/AutoSelected", s.value);
	
}

selectLeft.onclick = function(){
	
	clear();
	
	autonomus.left.style.backgroundColor = "#a0a0a0";
	
	put(autonomus.left);	
	
};

selectMiddle.onclick = function(){
	
	clear();
	
	autonomus.middle.style.backgroundColor = "#a0a0a0";
	
	put(autonomus.middle);
	
};

selectRight.onclick = function(){
	
	clear();
	
	autonomus.right.style.backgroundColor = "#a0a0a0";
	
	put(autonomus.right);
	
};

