
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

selectLeft.onclick = function(){
	
	clear();
	
	autonomus.left.style.backgroundColor = "#a0a0a0";
	
	NetworkTables.putValue(autonomus.left.value, autonomus.left.value);
	
};

selectMiddle.onclick = function(){
	
	clear();
	
	autonomus.middle.style.backgroundColor = "#a0a0a0";
	
	NetworkTables.putValue(autonomus.middle.value, autonomus.middle.value);
	
};

selectRight.onclick = function(){
	
	clear();
	
	autonomus.right.style.backgroundColor = "#a0a0a0";
	
	NetworkTables.putValue(autonomus.right.value, autonomus.right.value);
	
};

