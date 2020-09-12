const $rondas = document.querySelector("#rondas")
const $comenzar = document.querySelector("#comenzar")
const $tiempo = document.querySelector("#tiempo")
const $tablero = document.querySelector("#tablero")
const $card = document.querySelectorAll(".card")
const $back = document.querySelectorAll(".back")
const $front = document.querySelectorAll(".front img")

let secuenciaInput = []
let turnosJugados
let cartasRestantes = 16

$comenzar.onclick = function () {
    turnosJugados = 1
    actualizarNumeroRondas(turnosJugados)

    const backArray = []
    crearBackArray();
    function crearBackArray() {
        for (let i = 0; i < $back.length; i++) {
            backArray.push(i)
        }
    }

    const frontArray = []
    crearFrontArray();
    function crearFrontArray() {
        for (let i = 0; i < $back.length / 2; i++) {
            frontArray.push(i)
        }

    }
    asignarImagenes();

    function asignarImagenes() {
        frontArray.forEach(function (elemento) {
            randomNum = Math.floor(Math.random() * backArray.length)
            $front[backArray[randomNum]].src = `../img/gatito${elemento}.jpg`
            backArray.splice(randomNum, 1)

            randomNum2 = Math.floor(Math.random() * backArray.length)
            $front[backArray[randomNum2]].src = `../img/gatito${elemento}.jpg`
            backArray.splice(randomNum2, 1)
        })
    }
    habilitarInput();

}



function manejarInputUsuario(e) {
    const $card = e.currentTarget;
    girarCarta($card)
    secuenciaInput.push($card)

    if (secuenciaInput.length === 2) {
        bloquearInputUsuario()
        if (secuenciaInput[0].querySelector(".front img").src === secuenciaInput[1].querySelector(".front img").src) {
            setTimeout(function () {
                secuenciaInput[0].className = "invisible"
                secuenciaInput[1].className = "invisible"
                secuenciaInput = []
                habilitarInput();
            }, 1200);
            cartasRestantes -= 2

            if (cartasRestantes === 0) {
                setTimeout(function () {
                    document.querySelector("strong").textContent = `Encontraste todos los gatitos en ${turnosJugados} turnos!`
                }, 1500);
            } else {
                actualizarNumeroRondas(turnosJugados)
            }

        } else {
            setTimeout(function () {
                girarCartaOcultar(secuenciaInput[0])
                girarCartaOcultar(secuenciaInput[1])
                habilitarInput();
                secuenciaInput = []

            }, 1200);
            actualizarNumeroRondas(turnosJugados)

        }
    } else {
        turnosJugados++
        deshabilitarPrimerInput($card);
    }
}

function girarCarta($card) {
    $card.style.transform = "rotateY(180deg)"
}
function girarCartaOcultar($card) {
    $card.style = ""
}

function deshabilitarPrimerInput($card) {
    $card.onclick = function () { }
}

function HabilitarPrimerInput(secuenciaInput) {
    secuenciaInput[0].onclick = manejarInputUsuario
}

function actualizarNumeroRondas(turnosJugados) {
    $rondas.innerText = `Ronda # ${turnosJugados}`
}

function bloquearInputUsuario() {
    $tablero.querySelectorAll(".card").forEach(function ($card) {
        $card.onclick = function () { }
    });
}

function habilitarInput() {
    $tablero.querySelectorAll(".card").forEach(function ($card) {
        $card.onclick = manejarInputUsuario
    });
}