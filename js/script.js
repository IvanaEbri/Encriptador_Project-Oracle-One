//_______diccionario de encriptado_______
const diccionario={
    'e':'enter',
    'i':'imes',
    'a':'ai',
    'o':'ober',
    'u':'ufat'
}

//_______variables_______
const textoIngresado=document.querySelector(".ingreso");
const textoResultado=document.querySelector(".resultado");
const botonEncriptar=document.querySelector(".encriptar");
const botonDesencriptar=document.querySelector(".desencriptar");
const botonCopiado=document.querySelector(".copiar");
const mensajeCopiado=document.querySelector(".copiado");
let textoCopiar= '';

//_______funcion encriptar_______
function encriptar(){
    let textoEncriptado=textoIngresado.value
    if (validarIngreso(textoEncriptado)){
        // recorriendo el diccionario puedo añadir cifrados y que continue funcionando el codigo
        for (const [key, value] of Object.entries(diccionario)) {
            textoEncriptado = textoEncriptado.replaceAll(key, value);
            // busca la llave y reemplaza por el valor
            }
        mostrarTexto(textoEncriptado);
        textoCopiar=textoEncriptado;
    } else {
        errorIngreso()
    }
}

//_______funcion desencriptar_______
function desencriptar(){
    let textoDesencriptado = textoIngresado.value;
    if (validarIngreso(textoDesencriptado)){
        for (const [key, value] of Object.entries(diccionario)) {
        textoDesencriptado = textoDesencriptado.replaceAll(value, key);
        // busca el valor y reemplaza por la llave
        }
        mostrarTexto(textoDesencriptado);
        textoCopiar=textoDesencriptado;
    } else{
        errorIngreso()
    }
}

//_______funcion mostrar texto_______
function mostrarTexto(resultado){
    textoResultado.innerHTML=resultado;
    botonCopiado.style.visibility='visible';
    ingresoBlanco();
}

//_______funcion ingreso de texto en blanco_______
function ingresoBlanco(){
    textoIngresado.value = '';        
    textoIngresado.setAttribute('placeholder', "Ingrese el texto aquí");
}

//_______validar lo ingresado_______
function validarIngreso(texto){
    const regex = /^[a-z0-9!¡ .¿?,\s]*$/g;
    return(texto.match(regex) && texto.trim() != '')
}

//_______error ingreso no valido_______
function errorIngreso(){
    ingresoBlanco();
    alert("Ingrese el texto en minusculas y sin acentos")
}

//_______efuncion limpier resultado_______
function limpiarResultado(){
    textoResultado.innerHTML="<b>El resultado se mostrara acá</b>"
}

//_______evento al boton_______
botonEncriptar.addEventListener("click", encriptar);
botonDesencriptar.addEventListener("click", desencriptar);
botonCopiado.addEventListener("click",copiarResultado);

//_______funcion copiar_______
function copiarResultado(){
    navigator.clipboard.writeText(textoCopiar)
        .then(() => {
            mensajeCopiado.innerHTML =
            `Texto copiado satisfactoriamente`
            setTimeout(()=>{
                mensajeCopiado.innerHTML = ''
            }, 2000)
            botonCopiado.style.visibility='hidden';
            limpiarResultado();
        })
        .catch(()=> alert("Something went wrong"));
}