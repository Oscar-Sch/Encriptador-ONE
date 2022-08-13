const textarea=document.getElementById("msg-input");
const textoutput=document.getElementById("msg-output");
const button=document.getElementById("but");
const button2=document.getElementById("but2");
const buttonCopy=document.getElementById("butcopy");



function inputAnimation() {
    let input=textarea.value;
    setInterval(() => {
        if (input==""){return};
        input=input.slice(1,input.length -1);
        textarea.value=input;
    }, 60);
    
}

function outputAnimation(msg) {
    let cont=1;
    let output="";
    setInterval(() => {
        if (cont>msg.length){return};
        output=msg.slice(msg.length-cont,msg.length);
        textoutput.value=output;
        cont++;
    }, 40);
    
}

function encrypt(){
    const input=textarea.value;
    let output="";
    for (char of input){
        switch (char) {
            case "e":
                output+="enter";
                break;
            case "i":
                output+="imes";
                break;
            case "a":
                output+="ai";
                break;
            case "o":
                output+="ober";
                break;
            case "u":
                output+="ufat";
                break;
        
            default:
                output+=char;
                break;
        }
    }

    inputAnimation();
    outputAnimation(output);

    // return output;
}

function decrypt() {
    const input=textarea.value;
    let output="";

    output= input.replace(/enter/gi,"e");
    output= output.replace(/imes/gi,"i");
    output= output.replace(/ai/gi,"a");
    output= output.replace(/ober/gi,"o");
    output= output.replace(/ufat/gi,"u");

    inputAnimation();
    outputAnimation(output);

}


button.addEventListener("click", ()=>{
    encrypt();
    // textoutput.value=encrypt();
    // textoutput.value=inputAnimation();
});
button2.addEventListener("click", ()=>{
    
    decrypt();
    // textoutput.value=decrypt();
});
buttonCopy.addEventListener("click", ()=>{
    
    navigator.clipboard.writeText(textoutput.value);
    alert("se copio: "+ textoutput.value);
});