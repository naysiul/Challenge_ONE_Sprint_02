//console.log(location.pathname); // te da la ubicacion de la ruta o nombre de la ruta
var auxiliar = ["casa"];
var miUsb = [];
var cocoa = [];

//Selectores
var palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT","HTML", "CSS"];
var palabraSecreta = "";
var cantidad_errores = 0;

//----------------------------------- index -----------------------------------
//-----------------------------------------------------------------------------

if(location.pathname == './juego_ahorcado/index.html'){
    //aqui poner explicacion
    laAyuda();
    
}

//----------------------------------- agregar -----------------------------------
//-----------------------------------------------------------------------------

if(location.pathname == '/D:/ONE_CURSO/Codigos/juego_ahorcado/agregar.html'){
    //aqui poner explicacion
    laAyuda();    

    function btnGuardar(){
        var expresion =0;
        const inputTexto = document.querySelector("#input_tex");   //entrada de datos
        var expresion = inputTexto.value;
        if( expresion == ""){
            alert("!No has escrito ninguna palabra aún!");
        } 
        else {            
            console.log( "expresion: " + expresion);        
            localStorage.setItem("miUsb", expresion);
            location.assign("/D:/ONE_CURSO/Codigos/juego_ahorcado/juego.html");
        }      
            
    }

    function reglaEscritura(event) { 
        var dato = event.which; //esto convierte a unicode
        console.log(dato);     
        if( dato >= 65 && dato <= 90) {        //mayusculas y espacio vacio
            console.log("usable");        		
        }
        else {        
            console.log("no usable");              
            alert(" No use minúsculas, acentos ni simbolos. ");
            //inputTexto.value = "";
            console.log(dato);
            location.reload(); //recarga pagina            
        }               
    }
}

//----------------------------------- juego -----------------------------------
//-----------------------------------------------------------------------------

if(location.pathname == '/D:/ONE_CURSO/Codigos/juego_ahorcado/juego.html'){
    laAyuda();
    var palabra_a_adivinar = document.querySelector("#palabra_a_adivinar");
    var letras_usadas = document.querySelector("#letras_usadas");
    var gano = document.querySelector("#gano");    
    var perdio = document.querySelector("#perdio");
    console.log("inició el juego");  
    // Cargo palabra agregada
    var cocoa = localStorage.getItem("miUsb");
    console.log("importado de agregar palabra: " + cocoa);
    console.log(palabras);
    if(cocoa == null){
        cocoa = " "; 
    } else{
        palabras.push(cocoa);  //Almaceno palabra en la matriz principal
    }
    console.log(palabras);
    horca();  //dibuja la horca
    var pincel = document.querySelector("#horca").getContext("2d");
    pincel.strokeStyle = "white";
    //document.getElementById("hola").style.display = "none";
    escojerPalabraSecreta();    
    //dibujarLinea();    //lo quite porque genera guiones individuales, usar  y hacer que funcione en el futuro
    

}

//-------⇊-----------⇊-------- escoger Palabra secreta -------⇊-----------⇊--------

//PalabraSecreta
function escojerPalabraSecreta(){
    var palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabraRandom;
    console.log("palabra secreta = " + palabraSecreta);
    var letraPorLetra = palabraSecreta.split(""); //separamos en letras
    console.log("frase = " + letraPorLetra);
    var letrasPresionadas = []; // un array de letras presionadas
    var palabraRandom2 = [...palabraRandom]; // crea una copia de la palabraRandom
    var cant_intentos = document.querySelector(".numero_intentos");
    var vidas = 7;

    //palabras.push(cocoa);
    cant_intentos.innerHTML = vidas;  // ira cambiando la cantidad de intentos

    for (var i = 0; i < palabraRandom.length; i++) {
        var crear_span = document.createElement("span");
        crear_span.classList.add("span");  //con esto añades clases CSS --- AYUDA EN: https://lenguajejs.com/javascript/dom/manipular-clases-css/ 
        palabra_a_adivinar.appendChild(crear_span); // crea elementos HTML y sus atributos, en este caso crea span, tantos como letras tenga la palabra elegida --- AYUDA EN https://lenguajejs.com/javascript/dom/insertar-elementos-dom/
    }

    addEventListener("keypress", tecla_presionada); //detecta la tecla que se presione

    function tecla_presionada(x) {
        var span = document.querySelectorAll("#palabra_a_adivinar span"); // consulta y selecionda todos los ID #..
        var letraEnMayuscula = x.key.toUpperCase();  //convierto la letra presionada a mayuscula
        console.log(letraEnMayuscula);  //muestra en consola cada letra en mayuscula
        var acerto = false;    //pongo la variable acerto en falso como valor inicial
        letrasPresionadas.push(letraEnMayuscula); // almaceno o subo letraEnMayuscula en letrasPresionadas !!!
        var letrasPresionadas2 = letrasPresionadas.filter( // impide repeticion de letras en letrasPresionadas !!!

            function quitar(letra, i, usadas) {
                return i === usadas.indexOf(letra);
            });

        letras_usadas.innerHTML = letrasPresionadas2.join(" ");

        for (let i = 0; i < palabraRandom.length; i++) {
            if (letraEnMayuscula == palabraRandom[i]) { // si la tecla presionada coincide con alguna de la palabraRandom:

                span[i].innerHTML = letraEnMayuscula; // coloca la letra acertada en el span que le corresponde

                // eliminamos la letra acertada de palabraRandom2
                const letra_acertada = palabraRandom2.indexOf(letraEnMayuscula)
                if (letra_acertada > -1) {
                    palabraRandom2.splice(letra_acertada, 1);
                }
                acerto = true;
            }

            if (palabraRandom2.length == 0) { // si palabraRandom2 llega a 0:
                gano.style.display = "block"; // muestra el mensaje de ganaste
                removeEventListener("keypress", tecla_presionada);
            }
        }

        // si falla se dibuja una extremidad
        if (acerto == false) {
            cantidad_errores++;
            vidas--;
        }
        if (cantidad_errores == 1) {
            cabeza();
        }
        if (cantidad_errores == 2) {
            cuerpo();
        }
        if (cantidad_errores == 3) {
            brazoIzquierdo();
            cant_intentos.style.color = "white";            
        }
        if (cantidad_errores == 4) {
            brazoDerecho();
        }
        if (cantidad_errores == 5) {
            piernaIzquierda();
            cant_intentos.style.color = "orange";
        }
        if (cantidad_errores == 6) {
            piernaDerecha();
            cant_intentos.style.color = "red";
        }
        if (cantidad_errores == 7) { 
            perdio.style.display = "block"; // muestra el mensaje de perdiste
            removeEventListener("keypress", tecla_presionada);    //con esto bloqueamos las falsa escrituras luego del fin del juego
        }
        console.log("acerto? = " + acerto);
        cant_intentos.innerHTML = vidas;
    }
}

//-------⮅-----------⮅-------- escoger Palabra secreta -------⮅-----------⮅--------


//Dibuja la linea punteada deacuerdo a la palabra 
function dibujarLinea(){
    let tablero = document.querySelector("#forca").getContext("2d");
    tablero.lineWidth = 3; /** Grosor de linea */
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#fa7107";
    tablero.strokeStyle = "#efd50e";

    let anchura = 300/palabraSecreta.length;
    console.log("longitud = " + palabraSecreta.length);
    console.log(anchura);
    for (let i = 0; i < palabraSecreta.length; i++){
        tablero.moveTo(20 + (anchura*i), 25)
        tablero.lineTo(35 + (anchura*i), 25)
    }
    tablero.stroke();
    tablero.closePath();
}

//.............🡣............. dibujo de la Horca .............🡣.............
 
function horca() {
    let tableroHorca = document.querySelector("#horca").getContext("2d");
    tableroHorca.fillStyle = "yellow";       //color     
    //width= "310" height="410"
    //pincel.fillRect(ejeX, ejeY, ancho, alto);
    tableroHorca.fillRect(50, 390, 100, 5);    //base    
    tableroHorca.fillRect(95, 11, 5, 380);      //poste    
    tableroHorca.fillRect(96, 11, 160, 5);      //travezaño    
    tableroHorca.fillRect(251, 11, 5, 53);      //poste chico 252, 11, 5, 40    
}
//.............🡡............. dibujo de la Horca .............🡡.............

//.......▼...........▼........ dibujo del muñeco .......▼...........▼........

function cabeza() {
    pincel.lineWidth = 5;
    pincel.arc(254, 98, 30, 0, 2 * Math.PI);  // pincel.arc(x, y, radio, star angle, end angle)
    pincel.stroke();
}

function cuerpo() {
    pincel.moveTo(254, 130);
    pincel.lineTo(254, 260);
    pincel.stroke();
}

function brazoIzquierdo() {
    pincel.moveTo(254, 160);
    pincel.lineTo(214, 220);
    pincel.stroke();
}

function brazoDerecho() {
    pincel.moveTo(254, 160);
    pincel.lineTo(294, 220);
    pincel.stroke();
}

function piernaIzquierda() {
    pincel.moveTo(254, 260);
    pincel.lineTo(214, 320);
    pincel.stroke();
}

function piernaDerecha() {
    pincel.moveTo(254, 260);
    pincel.lineTo(294, 320);
    pincel.stroke();
}

//.......▲...........▲........ dibujo del muñeco .......▲...........▲........

// reinicia el juego
function btnReIniciar(){
    location.reload();
    localStorage.clear(); //para borrar
}

// regresa al menu principal
function btnDesistir(){
    location.assign("/D:/ONE_CURSO/Codigos/juego_ahorcado/index.html");
    localStorage.clear(); //para borrar
}


//.............🡣............. la ventana de ayuda .............🡣.............
 
function laAyuda() {
    var icono_ayuda = document.querySelector(".logo_ayuda");
    var ayudaE = document.querySelector(".ayuda");
    icono_ayuda.addEventListener("click",ventana_ayuda);
    
    function ventana_ayuda() {
        if( ayudaE.style.display == "none"){
            ayudaE.style.display = "block";
        } else { ayudaE.style.display = "none";}        
    }
}

//.............🡡............. la ventana de ayuda .............🡡.............





