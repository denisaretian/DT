document.getElementById("n").addEventListener('input',inputSum );

 function inputSum(){
	var inputNumber = parseInt(document.getElementById("n").value );
	sum( inputNumber );
}

 function sum(n){
	if (!isNaN(n)){
	var sum = 0;
	console.log("number");
	for(var i=1;i<=n;i++){
		sum+=i;
	}
	return sum;}
	else {console.log( "not a number");}
 }

