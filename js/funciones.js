$(document).on("ready", generaLetras);

var abecedario = new array();
function generaLetras(){
	abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var letras = "";
	for(i=0; i<27; i++){
		letras += "<li><a id='"+abecedario[i]+"'>"+abecedario[i]+"</a></li>";
	}
	$("#letras").append(letras);
	$("#letras li a").on("click", ValidaLetra);
}


function ValidaLetra(){
	var str = "hola";
	//Recupero el valor de la letra que escribió el jugador
	var letraIngresada = $(this).attr("id");
	//Cambio el estilo para que aparezca la letra presionada
	$("#"+letraIngresada).addClass("Usado");
	//Obtengo la posicion de letra elegida en la palabra a adivinar
	var respuesta = str.indexOf(letraIngresada);
	//Envío a los jugadores la letra que ingresaron
	//socket.emit("recibeLetra",letraIngresada);
	//Si la letra existe dentro de la palabra
	if(respuesta != -1){
		//Contador que se va incrementando conforme haya letras que existan en la palabra
		var contPalabra = parseInt($("#palabra").val());
		contPalabra += 1;
		$("#palabra").val(contPalabra);
		$("#l"+respuesta).val(letraIngresada);
		//Valida si el valor del contador es igual a la longitud de la palabra a adivinar para indicar que ya ganó y deneter el juego
		if(contPalabra == str.length){
			$("#l0").attr('disabled','disabled');
			$("#l1").attr('disabled','disabled');
			$("#l2").attr('disabled','disabled');
			$("#l3").attr('disabled','disabled');
			$("#resultado").show();
			$("#resultado").html("Ganaste :)");
		}
	}
	//Si la letra NO existe dentro de la palabra
	else{
		//Contador para sumar los intentos e ir pintando cada parte del monito ahorcado
		var contador = parseInt($("#contador").val()) + 1;
		switch(contador){
			case 1: 
				//dibuja la cabeza
				$("#cabeza").show();
			break;
			case 2: 
				//dibuja el tronco
				$("#tronco").show();
			break;
			case 3:
				//dibuja el brazo izquierdo
				$("#brazoizquierdo").show();
			break;
			case 4:
				//dibuja el brazo derecho
				$("#brazoderecho").show();
			break;
			case 5:
				//dibuja la pierna izquierda
				$("#pieizquierdo").show();
			break;
			case 6:
				//dibuja la pierna derecha y pierde
				$("#piederecho").show();
				$("#l0").attr('disabled', 'disabled');
				$("#l1").attr('disabled', 'disabled');
				$("#l2").attr('disabled', 'disabled');
				$("#l3").attr('disabled', 'disabled');
				$("#resultado").show();
				$("#resultado").html("Perdiste :(");
			break;
			default : $("#monito").show();	
		}
		$("#contador").val(contador);
	}
}