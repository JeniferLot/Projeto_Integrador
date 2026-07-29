// ==========================
// TEMA CLARO E ESCURO
// ==========================

const botaoTema = document.getElementById("tema");

const body = document.body;

if(localStorage.getItem("tema") === "escuro"){

    body.classList.add("dark");
    botaoTema.innerHTML="☀️ Modo Claro";

}

botaoTema.onclick = ()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        localStorage.setItem("tema","escuro");
        botaoTema.innerHTML="☀️ Modo Claro";

    }else{

        localStorage.setItem("tema","claro");
        botaoTema.innerHTML="🌙 Modo Escuro";

    }

};

// ==========================
// TAMANHO DA FONTE
// ==========================

let tamanho = Number(localStorage.getItem("fonte")) || 20;

const textos = document.querySelectorAll(".texto");

function atualizarFonte(){

    textos.forEach(texto=>{

        texto.style.fontSize=tamanho+"px";

    });

    localStorage.setItem("fonte",tamanho);

}

atualizarFonte();

document.getElementById("fonteMaior").onclick=()=>{

    if(tamanho<32){

        tamanho+=2;
        atualizarFonte();

    }

}

document.getElementById("fonteNormal").onclick=()=>{

    tamanho=20;
    atualizarFonte();

}

// ==========================
// LEITOR DE VOZ
// ==========================

let indiceAtual=0;

let falando=false;

let pausado=false;

const paragrafos=document.querySelectorAll(".texto");

let fala;

// limpa destaque
function limparDestaque(){

    paragrafos.forEach(p=>{

        p.classList.remove("lendo");

    });

}

// lê próximo parágrafo
function lerParagrafo(){

    if(indiceAtual>=paragrafos.length){

        limparDestaque();
        falando=false;
        indiceAtual=0;
        return;

    }

    limparDestaque();

    paragrafos[indiceAtual].classList.add("lendo");

    fala=new SpeechSynthesisUtterance(paragrafos[indiceAtual].innerText);

    fala.lang="pt-BR";

    fala.rate=1;

    fala.pitch=1;

    fala.volume=1;

    fala.onend=function(){

        indiceAtual++;

        if(falando){

            lerParagrafo();

        }

    }

    speechSynthesis.speak(fala);

}

// ==========================
// BOTÃO LER
// ==========================

document.getElementById("ler").onclick=function(){

    speechSynthesis.cancel();

    indiceAtual=0;

    falando=true;

    pausado=false;

    lerParagrafo();

}

// ==========================
// PAUSAR
// ==========================

document.getElementById("pausar").onclick=function(){

    speechSynthesis.pause();

    pausado=true;

}

// ==========================
// CONTINUAR
// ==========================

document.getElementById("continuar").onclick=function(){

    if(pausado){

        speechSynthesis.resume();

        pausado=false;

    }

}

// ==========================
// PARAR
// ==========================

document.getElementById("parar").onclick=function(){

    falando=false;

    pausado=false;

    indiceAtual=0;

    speechSynthesis.cancel();

    limparDestaque();

}

// ==========================
// ATALHOS DE TECLADO
// ==========================

document.addEventListener("keydown",function(e){

    if(e.altKey && e.key==="1"){

        document.getElementById("robotica").scrollIntoView({

            behavior:"smooth"

        });

    }

    if(e.altKey && e.key==="2"){

        document.getElementById("fisica").scrollIntoView({

            behavior:"smooth"

        });

    }

    if(e.altKey && e.key==="m"){

        botaoTema.click();

    }

    if(e.altKey && e.key==="l"){

        document.getElementById("ler").click();

    }

});

// ==========================
// MENSAGEM DE BOAS-VINDAS
// ==========================

window.onload=function(){

console.log("Site carregado com sucesso!");

}