let estadoHorno = 'apagado', videoHornoActual, puertaHorno, puertaBloqueada = false;
//comensemos con la puerta del horno

window.onload = () => {
    videoHornoActual = document.getElementById('video-horno'); //colocar el video del horno con el id
    puertaHorno = document.getElementById('puerta-horno')//id del horno
//detectar que se toca el horno
    puertaHorno.onclick = () =>{
        avanzarAnimation();
    }

    function avanzarAnimation (){
    switch (estadoHorno){
            case 'apagado':
                //cuando el horno este apagado debe reproducir las siguentes aciones a base a esto
                //reproducir el sonido de la puerta abriendose
                reproducirSonido ('puerta',false);
                 //bloquear la puerta para evitar que el usuario interactue con el programa para no resetiar la animacion
                 bloquearPuerta(true);
                //mostrar la etiqueta de video 
                mostrarVideo();
                //reproducir el video inical
                reproducirVideo('horno-abriendo-puerta');
                //cambia el estado del horno al cocinando
                cuandoTermineAvazarA('cocinando')
            break;

            case 'cocinando':
                //reproducir el video de la tarta cocinandose
                reproducirVideo('horno-cocinando');
                //reproducir el sonido del timer
                reproducirSonido ('timer',true)
                //cambiar el estado a tarta 
                bloquearPuerta(true)
                cuandoTermineAvazarA('tarta-lista')
            break;
            

            case 'tarta-lista':
                detenerSonido();
                bloquearPuerta(false);
                reproducirVideo('horno-tarta-lista');
                reproducirSonido('campanita', false)
                loopear(10000);
                cuandoTermineAvazarA('tarta-quemandose');
               /* ///frenar los sonidos
                detenerSonido(true)
                //destrabar la puerta
                bloquearPuerta(false);
                //reproducir video de la tarta lista
                reproducirVideo('horno-tarta-lista');
                //reproducir sonido de campanita
                reproducirSonido('campanita',false)
                //loopear para darle tiempo a la tarta
                loopear(10000)
                //cambiar estado a quemada
                cuandoTermineAvazarA('tarta-quemada'); //este fue el erro pusimos quemada

*/
            break;

            case 'tarta-quemandose':
                //frenar los sonidos
                detenerSonido();
                //bloquear nuevamente la puerta
                bloquearPuerta(true);
                //reprodcuir video de tarta quemada
                reproducirVideo('horno-tarta-quemandose');
                //avanzar a siguiente estado
                cuandoTermineAvazarA('tarta-quemada');
            break
        }
    }
    let sonido;
    function reproducirSonido (nombreSonido,loopearSonido){
        sonido = new Audio(`sonido/${nombreSonido}.mp3`) //aqio creamos un nuevo objeto new para que reprodusca el sonido con el nombre del parametro que usemos
        sonido.play();
        sonido.loop = loopearSonido; //si el sonido se repite o no con un true o false
        }

        function mostrarVideo(){
            videoHornoActual.classList.remove("hidden");
        }

        
        function ocultarVideo(){
            videoHornoActual.classList.add("hidden");
        }

        function reproducirVideo(nombreVideo){
            videoHornoActual.src =`video/${nombreVideo}.webm`;//cambia el src del video que le pasamos
            videoHornoActual.play();
        }

        function actualizarEstadoA (estadoNuevo){
            estadoHorno = estadoNuevo;
        }

        function cuandoTermineAvazarA  (estadoNuevo){//esta funcion cambia el estado del horno automaticamente
            videoHornoActual.onended = () =>{
                ///cuando termine de ejecutar el video inicia el siguente
                actualizarEstadoA(estadoNuevo);
                avanzarAnimation();
            }
        }

        function bloquearPuerta (traba){
            puertaBloqueada = traba;
        }
        function detenerSonido (){
            sonido.pause();
        }
        function loopear(tiempo){
            videoHornoActual.loop = true;
            if(tiempo != undefined){
                setTimeout(() =>{
                    desLoopear();
                }, tiempo)
            }
        }
        
        function desLoopear(){
            videoHornoActual.loop = false;
        }
}