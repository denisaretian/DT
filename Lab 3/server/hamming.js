function decode(bits) {
	/*var z4=parity(bits[3]+bits[4]+bits[5]+bits[6]);
	var z2=parity(bits[1]+bits[2]+bits[5]+bits[6]);
	var z1=parity(bits[0]+bits[2]+bits[4]+bits[6]);
	// var z0 = ...
    
    var errorPosition=z1*1+z2*2+z4*4;
	var errorDetected=false;
	if (errorPosition!=0) errorDetected=true;
	if (errorDetected) {
		bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
	}
    return { errorCorrected: errorDetected, errorPosition: errorPosition-1, bits: bits };
*/

	let parityBits = [];
	let n = bits.length;

	//calculate parity bits
	for(let i = 0; Math.pow(2,i) <= n; i++){
		let parity = 0;
		let mask = Math.pow(2,i);
		for(let j = mask - 1; j < n; j += mask * 2){
			for (let k = j; k < j + mask && k < n; k++){
			parity ^= bits[k];
			}
		}
		parityBits.push(parity);
	}
	
//calculate error position
let errorPosition = 0;
for (let i = 0; i < parityBits.length; i++){
	errorPosition += parityBits[i] * Math.pow(2, i);
}

//correct error if detected
var errorDetected = false;
if (errorPosition != 0){
	errorDetected = true;
	bits[errorPosition -1] ^= 1;
}

return { errorCorrected: errorDetected, errorPosition: errorPosition-1, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;
