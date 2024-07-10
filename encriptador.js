const encriptarDiccionario = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
};

const desencriptarDiccionario = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
};

function encriptarTexto(texto) {
    let textoEncriptado = texto
        .split("")
        .map((char) => encriptarDiccionario[char] || char)
        .join("");
    return textoEncriptado;
}

function desencriptarTexto(texto) {
    let textoDesencriptado = texto;
    Object.keys(desencriptarDiccionario).forEach((key) => {
        textoDesencriptado = textoDesencriptado.replace(
            new RegExp(key, "g"),
            desencriptarDiccionario[key]
        );
    });
    return textoDesencriptado;
}

function toggleMensajeElementos(show) {
    const mensaje = document.querySelector(".result-mensaje");
    const descripcion = document.querySelector(".result-mensaje-descripcion");
    [mensaje, descripcion].forEach((element) => {
        element.style.display = show ? "block" : "none";
    });
}
function toggleImagen(show) {
    const imagen = document.getElementById("imagen");
    imagen.style.display = show ? "block" : "none";
}
function checkAdvertencia(texto) {
    const advertenciaElement = document.querySelector(
        ".area__centro__inferior__advertencia"
    );
    if (/[A-ZÁÉÍÓÚÑ0-9]/.test(texto)) {
        advertenciaElement.style.display = "block";
    } else {
        advertenciaElement.style.display = "none";
    }
}

document
    .querySelector(".area__centro__inferior__botones__encriptar")
    .addEventListener("click", function () {
        const texto = document
            .querySelector(".area__centro__textarea")
            .value.trim();
        if (texto === "") {
            toggleMensajeElementos(true);
            toggleImagen(true);
            document.querySelector(".mensaje__boton").style.display = "none"; // Ocultar botón copiar
        } else {
            const encriptado = encriptarTexto(texto);
            document.getElementById("result").value = encriptado;
            toggleMensajeElementos(false);
            toggleImagen(false);
            document.querySelector(".mensaje__boton").style.display = "block"; // Mostrar botón copiar
        }
        checkAdvertencia(texto);
    });

document
    .querySelector(".area__centro__inferior__botones__desencriptar")
    .addEventListener("click", function () {
        const texto = document
            .querySelector(".area__centro__textarea")
            .value.trim();
        if (texto === "") {
            toggleMensajeElementos(true);
            toggleImagen(false);
            document.querySelector(".mensaje__boton").style.display = "none"; // Ocultar botón copiar
        } else {
            const desencriptado = desencriptarTexto(texto);
            document.getElementById("result").value = desencriptado;
            toggleMensajeElementos(false);
            toggleImagen(false);
            document.querySelector(".mensaje__boton").style.display = "block"; // Mostrar botón copiar
        }
        checkAdvertencia(texto);
    });

document
    .querySelector(".area__centro__textarea")
    .addEventListener("input", function () {
        const texto = this.value.trim();
        if (texto === "") {
            toggleMensajeElementos(true);
            toggleImagen(true);
            document.getElementById("result").value = "";
            document.querySelector(".mensaje__boton").style.display = "none"; // Ocultar botón copiar
        } else {
            document.querySelector(".mensaje__boton").style.display = "none"; // Mantener oculto botón copiar hasta encriptar/desencriptar
        }
        checkAdvertencia(texto);
    });

document
    .querySelector(".mensaje__boton")
    .addEventListener("click", function () {
        const resultArea = document.getElementById("result");
        resultArea.select();
        document.execCommand("copy");
    });

document.querySelector(".area__centro__inferior__advertencia").style.display =
    "none";
document.querySelector(".mensaje__boton").style.display = "none";
toggleMensajeElementos(true);
