const textarea=document.getElementById("msg-input");
const textoutput=document.getElementById("msg-output");
const buttonEncrypt=document.getElementById("but");
const buttonDecrypt=document.getElementById("but2");
const buttons=document.getElementsByClassName("button");
const buttonCopy=document.getElementById("butcopy");
const root=document.querySelector(":root");

function transferAnimOn(){
    root.style.setProperty("--rotate","rotate ease 1.5s infinite");
}
function transferAnimOff(){
    root.style.setProperty("--rotate","none");
}
function padlockAnimOff(){
    root.style.setProperty("--padlock","0");
}
function padlockAnimOn(){
    root.style.setProperty("--padlock","1");
}


function buttonsDisable(){
    buttonEncrypt.disabled=true;
    buttonDecrypt.disabled=true;
    buttonCopy.disabled=true;
    buttonEncrypt.style.setProperty("cursor","default");
    buttonDecrypt.style.setProperty("cursor","default");
    buttonCopy.style.setProperty("cursor","default");
    setTimeout(() => {
        root.style.setProperty("--but-hover-color","var(--green)");
        root.style.setProperty("--but-hover-border","var(--green)");
        root.style.setProperty("--but-hover-bshadow","none");
        root.style.setProperty("--but-hover-tshadow","none");
        
    }, 500);
}
function buttonsEnable(){
    buttonEncrypt.disabled=false;
    buttonDecrypt.disabled=false;
    buttonCopy.disabled=false;
    buttonEncrypt.style.setProperty("cursor","pointer");
    buttonDecrypt.style.setProperty("cursor","pointer");
    buttonCopy.style.setProperty("cursor","pointer");
    setTimeout(() => {
        root.style.setProperty("--but-hover-color","rgb(146, 255, 146)");
        root.style.setProperty("--but-hover-border","rgb(146, 255, 146)");
        root.style.setProperty("--but-hover-bshadow"," 0 0 5px 1px var(--green)");
        root.style.setProperty("--but-hover-tshadow"," -1px 0 var(--green), 0 1px var(--green), 1px 0 var(--green), 0 -1px var(--green)");
        
    }, 500);
}

function inputAnimation(msg) {
    let input=textarea.value;
    if (input!==""){transferAnimOn();
    buttonsDisable();
    if(msg!=="")padlockAnimOn();
    let inputInterval=setInterval(() => {
        if (input.length==0){
            outputAnimation(msg);
            clearInterval(inputInterval);
            return};
        input=input.slice(1,input.length -1);
        textarea.value=input;
    }, 60);}
    
}

function outputAnimation(msg) {
    let cont=1;
    let output="";
    let outputInterval=setInterval(() => {
        if (cont>msg.length){
            transferAnimOff();
            padlockAnimOff();
            setTimeout(() => {
                root.style.setProperty("--padlock-anim","none");
            }, 1000);
            buttonsEnable();
            if(msg!=="")buttonCopy.scrollIntoView({behavior:"smooth"});
            clearInterval(outputInterval);
            return
        };
        output=msg.slice(msg.length-cont,msg.length);
        textoutput.value=output;
        cont++;
    }, 40);
    
}

function encrypt(){
    textoutput.value="";
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

    inputAnimation(output);
    
}

function decrypt() {
    textoutput.value="";
    const input=textarea.value;
    let output="";

    output= input.replace(/enter/gi,"e");
    output= output.replace(/imes/gi,"i");
    output= output.replace(/ai/gi,"a");
    output= output.replace(/ober/gi,"o");
    output= output.replace(/ufat/gi,"u");

    inputAnimation(output);
}

function buttonClicked(but){
    but.style.setProperty("animation","button-clicked .5s");
    setTimeout(() => {
        but.style.setProperty("animation","none");

    }, 500);
}


buttonEncrypt.addEventListener("click", ()=>{
    buttonClicked(buttonEncrypt);
    root.style.setProperty("--anim-color","255, 36, 0");
    root.style.setProperty("--padlock-anim","close");
    root.style.setProperty("--padlock-bg","linear-gradient(0deg, rgb(75, 18, 2) 0%, rgb(108, 61, 3) 35%, rgb(195, 62, 5) 100%)");
    encrypt();
});
buttonDecrypt.addEventListener("click", ()=>{
    buttonClicked(buttonDecrypt);

    root.style.setProperty("--anim-color","36, 255, 0");
    root.style.setProperty("--padlock-anim","open");
    root.style.setProperty("--padlock-bg","linear-gradient(0deg, rgba(4,75,2,1) 0%, rgba(3,108,17,1) 35%, rgba(89,195,5,1) 100%)");
    decrypt();
});
buttonCopy.addEventListener("click", ()=>{
    buttonClicked(buttonCopy);
    if(textoutput.value!==""){
        root.style.setProperty("--copy-anim","display-copy 1.5s");
        setTimeout(() => {
            root.style.setProperty("--copy-anim","none");
        }, 1500);
        textoutput.focus(); //para que chrome accione correctamente el blur
        textoutput.select();
        document.execCommand("copy");
        textoutput.blur();

    };
});