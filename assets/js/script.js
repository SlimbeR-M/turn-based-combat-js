let modulo = (()=>{
    const btnAtacar = document.querySelector("#atacar"),
        btnDefender = document.querySelector("#defender"),
        btnCurarse = document.querySelector("#curarse"),
        btnReiniciar = document.querySelector("#reiniciar"),
        VidaJugador = document.querySelector("#jugador"),
        vidaComputadora = document.querySelector("#computadora"),
        suceso = document.querySelector("#movimiento");

    let jugadorHP = 100;
    let computadoraHP = 100;
    let turnoJugador = true;
    let defendiendo = false;
    btnReiniciar.style.display = "none";

    const Reiniciar = ()=> {
        jugadorHP = 100;
        computadoraHP = 100;
        turnoJugador = true;
        defendiendo = false;
        btnReiniciar.style.display = "none";
        suceso.innerHTML = "";
        renderizar();
    }

    const mensajes = (texto)=> {
        const li = document.createElement("li");
        li.textContent = texto;
        suceso.prepend(li);
    }

    const atacar = ()=> {
        let dañoJugador = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
        computadoraHP -= dañoJugador;
        mensajes(`El jugador realizo un ataque de ${dañoJugador}`);
        turnoJugador = false;
    }

    const evaluarDaño = (daño)=> {
        if(defendiendo){
            daño = Math.floor(daño/2);
            defendiendo = false;
        }
        jugadorHP -= daño;
        mensajes(`La computadora realizo un ataque de ${daño}`);
    }


    const atacarComputadora = ()=> {
        if(turnoJugador === false){
            let daño = Math.floor(Math.random() * (20 - 5 + 1)) +1;
            evaluarDaño(daño);
        }
    }

    const atacarComputadoraMas = ()=> {
        if(turnoJugador === false){
            let daño = Math.floor(Math.random() * (40 - 20 + 1)) +1;
            evaluarDaño(daño);
        }
    }

    const defender = ()=> {
        defendiendo = true;
        mensajes(`El jugador esta defendiendo`);
        turnoJugador = false;
    }

    const curarse = ()=> {
        jugadorHP += 15;
        mensajes(`El jugador se curo`);
        turnoJugador = false;
    }

    const bloquearBotones = () => {
        btnAtacar.disabled = true;
        btnCurarse.disabled = true;
        btnDefender.disabled = true;
    }

    const desbloquearBotones = () => {
        btnAtacar.disabled = false;
        btnCurarse.disabled = false;
        btnDefender.disabled = false;
    }

    const evaluar = ()=> {
        if(jugadorHP > 100) jugadorHP = 100;
        if(jugadorHP < 0) jugadorHP = 0;
        if(computadoraHP < 0) computadoraHP = 0;
        ganador();
    }

    const ganador = ()=> {
        if(jugadorHP === 0) {
            alert("Perdiste");
            bloquearBotones();
            btnReiniciar.style.display = "inline-block";
        } else if(computadoraHP === 0) {
            alert("Ganaste")
            bloquearBotones();
            btnReiniciar.style.display = "inline-block";
        }
    }

    const renderizar = ()=> {
        VidaJugador.innerText = `${jugadorHP}%`;
        vidaComputadora.innerText = `${computadoraHP}%`;

        VidaJugador.style.width = `${jugadorHP}%`;
        vidaComputadora.style.width = `${computadoraHP}%`;
    }

    const turnoEnemigo = ()=> {
        let caso = Math.floor(Math.random() * 2);
        switch(caso){
            case 0:
                atacarComputadora();
                break;
            case 1:
                atacarComputadoraMas();
                break;
        }
    }

    const turnoDeJugador = (accion)=>{
        
        accion();
        evaluar();
        renderizar();
        setTimeout(()=>{
            turnoEnemigo();
            evaluar();
            renderizar();
            
        },1000);
    }

    btnAtacar.addEventListener("click", ()=> turnoDeJugador(atacar));

    btnCurarse.addEventListener("click", ()=> turnoDeJugador(curarse));

    btnDefender.addEventListener("click", ()=> turnoDeJugador(defender));

    btnReiniciar.addEventListener("click", ()=> Reiniciar());
})();