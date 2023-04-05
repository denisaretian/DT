let nr1 = 0;
let n2 = 0;

function printValue(divId, value){
document.getElementById(divId).innerHTML = value;
}

document.getElementById("sum").addEventListener("click", sum);
document.getElementById("sub").addEventListener("click", sub);
document.getElementById("mult").addEventListener("click", mult);
document.getElementById("div").addEventListener("click", div);

function sum(){
    let sum = 0;
    nr1 = parseInt(document.getElementById("nr1").value);
    nr2 = parseInt(document.getElementById("nr2").value);
    sum =  nr1 + nr2;
    printValue("result", sum);
}

function sub(){
    let rez = 0;
    nr1 = parseInt(document.getElementById("nr1").value);
    nr2 = parseInt(document.getElementById("nr2").value);
    rez =  nr1 - nr2;
    printValue("result", rez );
}

function mult(){
    let rez  = 0;
    nr1 = parseInt(document.getElementById("nr1").value);
    nr2 = parseInt(document.getElementById("nr2").value);
    rez =  nr1 * nr2;
    printValue("result", rez );
}

function div(){
    let rez  = 0;
    nr1 = parseInt(document.getElementById("nr1").value);
    nr2 = parseInt(document.getElementById("nr2").value);
    rez =  nr1 / nr2;
    printValue("result", rez );
}
