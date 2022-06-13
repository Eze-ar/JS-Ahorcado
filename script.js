function dibujarLineas() { //dibuja los _ _ _ de  la palabra a adivinar
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "MidnightBlue"; //color de las líneas
    tablero.beginPath(); //comienza una nueva ruta o trazado

    let ancho = 70;
    for (let i = 0; i < palabraSecreta.length; i++) {
        tablero.moveTo(500 + (ancho * i), 320);
        tablero.lineTo(550 + (ancho * i), 320);
    }
    tablero.stroke(); //realiza el trazado/dibujo definido antes
    tablero.closePath(); //termina el trazado o ruta actual, para poder comenzar uno nuevo
}

function escribirLetraCorrecta(index) {
    let ancho = 70;

    tablero.font = "bold 60px 'Indie Flower'";
    tablero.fillStyle = "MidnightBlue";
    if (palabraSecreta[index] == 'I') {
        tablero.fillText(palabraSecreta[index], 515 + (ancho * index), 310); //nomás para centrar la 'I'
    } else {
        tablero.fillText(palabraSecreta[index], 505 + (ancho * index), 310);
    }

}

function escribirLetraIncorrecta(letra, errores) {
    if (errores < 11) { //no sigue más alla de 10 errores
        tablero.font = "bold 40px 'Indie Flower'";
        tablero.fillStyle = "DarkRed";

        let ancho = 60;
        //for debug:
        //console.log(355 + (11 - errores) * 30, 500);
        //console.log(errores);
        tablero.fillText(letra, 450 + errores * ancho, 370);
    }
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0) {
        if (errores == 10) {
            dibujarOjos();
            dibujarTriste();
            //document.getElementById("resultado").innerHTML = "PERDISTE!";
            //document.getElementById("palabraSecreta").innerHTML = "La palabra era: " + palabraSecreta;
            tablero.font = "bold 35px 'Indie Flower'";
            tablero.fillStyle = "DarkRed";
            tablero.fillText('Perdiste! La palabra era: "' + palabraSecreta + '"', 500, 45);
        }
    }
}

// ------------------ funciones que dibujas la Figura
function dibujarBase() {
    tablero.lineCap = 'round';
    tablero.lineJoin = 'round';
    tablero.strokeStyle = "MidnightBlue";
    tablero.moveTo(100, 320);
    tablero.lineTo(300, 320);
    tablero.stroke();
}

function dibujarPoste() {
    tablero.moveTo(200, 10);
    tablero.lineTo(200, 320);
    tablero.lineWidth = 6;
    tablero.stroke();
}

function dibujarTabla() {
    tablero.moveTo(200, 10);
    tablero.lineTo(350, 10);
    tablero.stroke();
}

function dibujarCuerda() {
    tablero.moveTo(350, 10);
    tablero.lineTo(350, 40);
    tablero.stroke();
}

function dibujarCabeza() {
    tablero.beginPath();
    tablero.arc(350, 80, 40, 0, 2 * Math.PI);
    tablero.stroke();
}

function dibujarCuerpo() {
    tablero.moveTo(350, 120);
    tablero.lineTo(350, 205);
    tablero.stroke();
}

function dibujarBrazoIzq() {
    tablero.moveTo(350, 120);
    tablero.lineTo(300, 180);
    tablero.stroke();
}

function dibujarBrazoDer() {
    tablero.moveTo(350, 120);
    tablero.lineTo(400, 180);
    tablero.stroke();
}

function dibujarPiernaIzq() {
    tablero.moveTo(350, 205);
    tablero.lineTo(300, 280);
    tablero.stroke();
}

function dibujarPiernaDer() {
    tablero.moveTo(350, 205);
    tablero.lineTo(400, 280);
    tablero.stroke();
}

function dibujarOjos() {
    tablero.beginPath();
    tablero.arc(365, 68, 2, 0, 2 * Math.PI);
    tablero.stroke();
    tablero.beginPath();
    tablero.arc(335, 68, 2, 0, 2 * Math.PI);
    tablero.stroke();
}

function dibujarRisa() {
    tablero.beginPath();
    tablero.arc(350, 82, 20, 0, Math.PI); // .arc (x, y, radio, startAngle, endAngle, antihorario);
    tablero.stroke();
}

function dibujarTriste() {
    tablero.beginPath();
    tablero.arc(350, 100, 20, Math.PI, 0); // .arc (x, y, radio, startAngle, endAngle, antihorario);
    tablero.stroke();
}
// ------------------ Fin de funciones que dibujan la figura


function agregarPalabra() {
    const docPalabraNueva = document.getElementById("palabraNueva"); //traigo la referencia del nodo que es constante
    const btnAgregarPalabra = document.getElementById("agregarPalabra");
    const regex = /^[A-ZÑ]+$/g;

    let palabraNueva = docPalabraNueva.value.toUpperCase();

    //console.log("matcheo:" + regex.test(palabraNueva));

    if (!palabraNueva.match(regex)) {
        document.getElementById("palabraNueva").value = "Sólo letras por favor";
    } else if (palabraNueva.length < 3) {
        document.getElementById("palabraNueva").value = "Mínimo 3 letras";
    } else {
        document.getElementById("palabraNueva").value = '"' + palabraNueva + '" agregada';
        palabras.push(palabraNueva);
        console.log(palabras); //for debug
    }
}



var palabras = ["MUÑEQUITO", "OBELISCO", "PIRAMIDE", "ANTEOJOS", "ANTIFAZ", "ESCALINATA", "LEGUMBRE", "VEGANISMO", "INGENIERIA", "ELECTRONICA", "ÑANDU", "PERIMIDO", "ENCUBIERTO"];
var tablero = document.getElementById("tablero").getContext("2d");
var errores = 0; //cantidad de letras incorrectas
var cantLetrasCorrectas = 0;
var letrasCorrectas = [];
var letrasIncorrectas = [];

var palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
//Math.random retorna entre [0;1) un flotante y floor redondea al más bajo o sea así completo
//selecciona una palabra aleatoriamente

//for debug:
//console.log(palabraSecreta);

dibujarLineas(palabraSecreta);

document.onkeydown = (e) => {
    let tecla = e.key.toUpperCase();
    let regex = /[A-Z]/;
    //for debug:
    //console.log(tecla);
    //console.log(tecla.length);
    if (tecla.length < 2) { //esto para que no detecte ESCAPE y lo tome como E....sí pasó
        if (regex.test(tecla) || tecla == 'Ñ') { //sólo letras A-Z y no números! Observar que tuve que poner el caso de l Ñ aparte!!!
            let letra = tecla; //nomás para claridad del código :-)
            //console.log("letra!");

            if (palabraSecreta.includes(letra) && !letrasCorrectas.includes(letra)) {
                for (let i = 0; i < palabraSecreta.length; i++) {
                    if (palabraSecreta[i] === letra) {
                        console.log("Letra correcta: " + letra);
                        escribirLetraCorrecta(i);
                        cantLetrasCorrectas++;
                        letrasCorrectas.push(letra); //guardo registro de las lestras correctas para no repetirlas
                        //console.log("cantLetrasCorrectas=" + cantLetrasCorrectas); //for debug
                        if (cantLetrasCorrectas == palabraSecreta.length) {
                            if (errores >= 5) { //para saber que ya dibujó la cara
                                dibujarOjos();
                                dibujarRisa();
                            }
                            tablero.fillText("Felicitaciones, GANASTE", 500, 50);
                        }
                    }
                }
            } else if (!letrasIncorrectas.includes(letra)) { //para no repetir letras incorrectas
                letrasIncorrectas += letra;
                errores++;
                adicionarLetraIncorrecta(letra);
                escribirLetraIncorrecta(letra, errores);
                switch (errores) {
                    case 1:
                        dibujarBase();
                        break;
                    case 2:
                        dibujarPoste();
                        break;
                    case 3:
                        dibujarTabla();
                        break;
                    case 4:
                        dibujarCuerda();
                        break;
                    case 5:
                        dibujarCabeza();
                        break;
                    case 6:
                        dibujarCuerpo();
                        break;
                    case 7:
                        dibujarBrazoIzq();
                        break;
                    case 8:
                        dibujarBrazoDer();
                        break;
                    case 9:
                        dibujarPiernaIzq();
                        break;
                    case 10:
                        dibujarPiernaDer();
                        //console.log("errores=" + errores);
                        break;
                }
            }

        }
    }
};



//for debug
/*
dibujarBase();
dibujarPoste();
dibujarTabla();
dibujarCuerda();
dibujarCabeza();
dibujarCuerpo();
dibujarBrazoIzq();
dibujarBrazoDer();
dibujarPiernaIzq();
dibujarPiernaDer();
dibujarOjos();
dibujarRisa();

//dibujarTriste();
*/