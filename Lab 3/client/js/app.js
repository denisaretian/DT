var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: 4
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        initDataBits: function(){
            this.dataBits=[];
            
            for(var i=0;i<this.numberOfDataBits;i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                var encodedMessage = this.encode(this.dataBits);
                // this.status = encodedMessage + ' encoded sent to server';

                return axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            /*// This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 4
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 2
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 1
            // var C0 = this. ...
			console.log("Control bits: "+c1+","+c2+","+c4);
            return [c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]; // vectorul V (cuvantul de transmis)
        */
            let n = bits.length; // bits is the array of transmitted bits
            let r = Math.ceil(Math.log2(n+1 + Math.log2(n+1) / Math.log2(2))) - 1; //2^r >= (n + r +1)
            let output = new Array(n + r);
            let j = 0;

            for ( let i = 0; i < output.length; i++){
                if ((i + 1 & i) === 0){
                    let parity = 0;
                    for (let k = i; k < output.length; k++){
                        if (( k + 1 & i !== 0)){ // check if k+1 has a 1 in the i-th position
                            parity ^= output[k];
                        }
                    }
                    output[i] = parity;
                } else {
                    output[i] = bits[j++];
                }
            }
            return output;

        },
        parity: function(number){
            return number % 2;
        },
        validate: function(bits){
            for(var i=0; i<bits.length;i++){
                if (this.validateBit(bits[i].data) === false)
                return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 ||
            parseInt(character) === 1);  
        }
    }
})