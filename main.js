class PantallaStart extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaStart' });
    }
    preload() {
        this.load.image('backgroundPuerta', 'assets/puerta.jpg');
        this.load.audio('door', 'assets/door.mp3');
    }
    create() {
        this.cameras.main.setBackgroundColor('#fff9dc');
        this.cameras.main.setBackgroundColor('#000');
        this.backgroundPuerta = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundPuerta')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.start = this.add.text(1020, 1200, 'EMPEZAR', { fontFamily: 'Arial', fontSize: '60px', fill: '#000' });
        this.start.setDepth(550);
        this.start.setInteractive().on('pointerdown', () => { this.onStartClick(); });
        this.door = this.sound.add('door');

    }
    onStartClick(juego, boton) {
        this.door.play();
        this.scene.start('PantallaInicio');
    }
}


class PantallaInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaInicio' });
    }

    preload() {
        // Cargar imágenes
        this.load.image('backgroundHabitacion', 'assets/habitacion.jpg');
        this.load.image('overlay', 'assets/overlay.png');
        this.load.image('pecera', 'assets/pecerablanco.png');
        this.load.image('ventana', 'assets/ventanablanco.png');
        this.load.image('nevera', 'assets/neverablanco.png');
        this.load.image('gato1', 'assets/gato1.png');
        this.load.image('gato2', 'assets/gato2.png');
        this.load.image('gato3', 'assets/gato3.png');
        this.load.image('vidascorazon', 'assets/corazon.PNG');
        this.load.image('imagenFinalBien', 'assets/gordofeliz.png');
        this.load.image('imagenFinalMal', 'assets/copitriste.png');  
        this.load.image('boton', 'assets/boton.png');

        this.load.audio('soundgordo', 'assets/soundgordo.mp3');
        this.load.audio('soundcopi', 'assets/soundcopi.mp3');
        this.load.audio('soundchispo', 'assets/soundchispo.mp3');
        this.load.audio('happycat', 'assets/happycat.mp3');
        this.load.audio('angrycat', 'assets/angrycat.mp3');
        this.load.audio('bird', 'assets/bird.mp3');
        this.load.audio('bubble', 'assets/bubble.mp3');
        this.load.audio('can', 'assets/can.mp3');

    }



    create() {
        if (this.game.config.vidas == null)
            this.game.config.vidas = 7;

        this.cameras.main.setBackgroundColor('#000');
        this.backgroundHabitacion = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundHabitacion')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.instrucciones = this.add.text(1300, 250, 'Selecciona un minijuego\n(ventana, pecera o nevera)', { fontFamily: 'Arial', fontSize: '50px', fill: '#000', wordWrap: { width: 700, useAdvancedWrap: true } });
        this.instrucciones.setDepth(501);
        this.instrucciones.setWordWrapWidth(700);

        this.reiniciar = this.add.text(1020, 920, 'Reinicia el juego', { fontFamily: 'Arial', fontSize: '50px', fill: '#000', wordWrap: { width: 400, useAdvancedWrap: true } });
        this.reiniciar.setDepth(0);
        this.reiniciar.setWordWrapWidth(400);
        this.boton = this.add.image(1200, 950, 'boton').setDepth(0);
        this.gatoFinalBien = this.add.image(730, 947, 'imagenFinalBien').setDepth(0);
        this.gatoFinalMal = this.add.image(730, 947, 'imagenFinalMal').setDepth(0);

        this.soundgordo = this.sound.add('soundgordo');
        this.soundcopi = this.sound.add('soundcopi');
        this.soundchispo = this.sound.add('soundchispo');
        this.happycat = this.sound.add('happycat');
        this.angrycat = this.sound.add('angrycat');
        this.bird = this.sound.add('bird');
        this.bubble = this.sound.add('bubble');
        this.can = this.sound.add('can');

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);

        this.pecera = this.add.image(730, 947, 'pecera');
        this.pecera.setInteractive().on('pointerdown', () => { this.onJuegoClick(1, this.pecera); });
        if (this.game.config.peceraRealizado) {
            this.pecera.setDepth(0);
            this.pecera.disableInteractive();
            this.bubble.play();
        }
        else {
            this.pecera.setDepth(750);
        };

        this.ventana = this.add.image(775, 456, 'ventana').setDepth(501);
        this.ventana.setInteractive().on('pointerdown', () => { this.onJuegoClick(2, this.ventana); });
        if (this.game.config.ventanaRealizado) {
            this.ventana.setDepth(0);
            this.ventana.disableInteractive();
            this.bird.play();
        }
        else {
            this.ventana.setDepth(750)
        };

        this.nevera = this.add.image(1728, 863, 'nevera').setDepth(501);
        this.nevera.setInteractive().on('pointerdown', () => { this.onJuegoClick(3, this.nevera); });
        if (this.game.config.comidaRealizado) {
            this.nevera.setDepth(0);
            this.nevera.disableInteractive();
            this.can.play();
        }
        else {
            this.nevera.setDepth(750);
        }

        this.gato1 = this.add.image(1308, 763, 'gato1').setDepth(501);
        this.gato2 = this.add.image(528, 1203, 'gato2').setDepth(501);
        this.gato3 = this.add.image(1000, 1020, 'gato3').setDepth(501);
        this.gato1.setInteractive().on('pointerdown', () => { this.onGatoClick(1, this.gato1); });
        this.gato2.setInteractive().on('pointerdown', () => { this.onGatoClick(2, this.gato2); });
        this.gato3.setInteractive().on('pointerdown', () => { this.onGatoClick(3, this.gato3); });

        this.vidascorazon = this.add.image(1800, 160, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastext = this.add.text(1735, 130, `${this.game.config.vidas}`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.vidastext.setDepth(501);

        this.reiniciar.setInteractive().on('pointerdown', () => { this.onReiniciarClick(); });
        this.reiniciar.disableInteractive();

        if (this.game.config.vidas == 0) {
            this.ventanaFinal(false);
            this.instrucciones = this.add.text(600, 300, 'Has perdido.\nTe has quedado sin vidas', { fontFamily: 'Arial', fontSize: '50px', fill: '#000', wordWrap: { width: 600, useAdvancedWrap: true } });
            this.instrucciones.setDepth(950);
            this.instrucciones.setWordWrapWidth(600);
        }
        if (this.game.config.peceraRealizado && this.game.config.ventanaRealizado && this.game.config.comidaRealizado) {
            //TODO mostrar ventana has ganado
            this.ventanaFinal(true);
            this.instrucciones = this.add.text(600, 300, 'Has ganado!', { fontFamily: 'Arial', fontSize: '50px', fill: '#000', wordWrap: { width: 400, useAdvancedWrap: true } });
            this.instrucciones.setDepth(950);
            this.instrucciones.setWordWrapWidth(400);
        }
    }

    ventanaFinal(estado) {
        this.ventana.disableInteractive();
        this.pecera.disableInteractive();
        this.nevera.disableInteractive();
        this.gato1.disableInteractive();
        this.gato2.disableInteractive();
        this.gato3.disableInteractive();
        this.reiniciar.setInteractive().setDepth(999);
        this.boton.setDepth(950).setScale(0.5);
        this.overlay.setDepth(900);
        if(estado){
            this.gatoFinalBien.setDepth(999).setScale(2);
            this.instrucciones.setDepth(0);
            this.happycat.play();
        }else{
            this.gatoFinalMal.setDepth(999).setScale(2);
            this.instrucciones.setDepth(0);
            this.angrycat.play();
        }
       
    }

    onReiniciarClick(){
        window.location.reload();
    }

    update() {

    }

    onJuegoClick(juego, boton) {
        
        if (juego == this.game.config.juegoSeleccionado) {
            switch (juego) {
                case 1:
                    this.bubble.play();
                    break;
                case 2:
                    this.bird.play();
                    break;
                case 3:
                    this.can.play();
                    break;
            }
            this.game.config.juegoSeleccionado = 0;
            boton.setDepth(999);
            this.instrucciones.text = 'Selecciona un minijuego\n(ventana, pecera o nevera)';
        } else if (!this.game.config.juegoSeleccionado) {
            switch (juego) {
                case 1:
                    this.bubble.play();
                    break;
                case 2:
                    this.bird.play();
                    break;
                case 3:
                    this.can.play();
                    break;
            }
            this.game.config.juegoSeleccionado = juego;
            boton.setDepth(0);
            this.instrucciones.text = 'Seleciona un gato';
            
        }
        
    }

    onGatoClick(gato, boton) {
        switch (gato) {
            case 1:
                this.soundgordo.play();
                break;
            case 2:
                this.soundcopi.play();
                break;
            case 3:
                this.soundchispo.play();
                break;
        }
        if (!this.game.config.juegoSeleccionado) return;
        if (this.game.config.juegoSeleccionado != gato) {
            this.instrucciones.text = 'El gato no quiere jugar';
        } else {
            //this.instrucciones.text = `gato seleccionado ${this.game.config.juegoSeleccionado}`;

            switch (this.game.config.juegoSeleccionado) {
                case 1:
                    this.game.config.peceraRealizado = true;
                    this.scene.start('PantallaPecera');
                    break;
                case 2:
                    this.game.config.ventanaRealizado = true;
                    this.scene.start('PantallaVentana');
                    break;
                case 3:
                    this.game.config.comidaRealizado = true;
                    this.scene.start('PantallaNevera');
                    break;

                default: this.instrucciones.text = 'ningún juego seleccionado';
            }
            this.game.config.juegoSeleccionado = 0;
        }
    }
}

class PantallaVentana extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaVentana' });
    }

    preload() {
        // Cargar imágenes
        this.load.image('backgroundVentana', 'assets/ventana.jpeg');
        this.load.image('pajaro1', 'assets/cardenal1.png');
        this.load.image('pajaro2', 'assets/picogordotigrillo2.png');
        this.load.image('pajaro3', 'assets/azulejodelasmontanas3.png');
        this.load.image('pajaro4', 'assets/gorrion4.png');
        this.load.image('pajaro5', 'assets/picogrueso5.png');
        this.load.image('pajaro6', 'assets/martingigante6.png');
        this.load.image('pajaro', 'assets/pajaro.png');

        this.load.audio('bird', 'assets/bird.mp3');
        this.load.image('overlay', 'assets/overlay.png');

        this.load.json('infoPajaros', 'data/data.json');
    }


    create() {
        this.aciertos = 0;
        this.respuestaCorrecta = 0;
        this.pajaroSeleccionado = 0;
        this.pajaroRealizado = [false, false, false, false, false, false];

        // Fondo negro para la pantalla de inicio
        this.cameras.main.setBackgroundColor('#000');
        this.backgroundVentana = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundVentana')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.instrucciones = this.add.text(230, 200, 'Selecciona un pajaro', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.preguntapajaro = this.add.text(500, 300, 'Adivina el nombre del pájaro', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.preguntapajaro.setDepth(0);

        this.infopajaro = this.add.text(940, 400, 'info', { fontFamily: 'Arial', fontSize: '25px', fill: '#000', wordWrap: { width: 500, useAdvancedWrap: true } });
        this.infopajaro.setDepth(0);
        this.infopajaro.setWordWrapWidth(600);

        this.respuestaPajaro1 = this.add.text(1000, 500, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPajaro1.setDepth(0);
        this.respuestaPajaro2 = this.add.text(1000, 700, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPajaro2.setDepth(0);
        this.respuestaPajaro3 = this.add.text(1000, 900, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPajaro3.setDepth(0);

        this.vidascorazon = this.add.image(1800, 160, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextPajaros = this.add.text(1735, 130, `${this.game.config.vidas}`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.vidastextPajaros.setDepth(501);
        this.numeroPajaros = this.add.image(1650, 205, 'pajaro').setDepth(501).setScale(0.3);
        this.numeroPajarosText = this.add.text(1520, 180, `${this.aciertos}/3`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.numeroPajarosText.setDepth(501);

        this.pajaro1 = this.add.image(1300, 500, 'pajaro1').setDepth(502);
        this.pajaro2 = this.add.image(300, 500, 'pajaro2').setDepth(502);
        this.pajaro3 = this.add.image(400, 690, 'pajaro3').setDepth(502);
        this.pajaro4 = this.add.image(300, 860, 'pajaro4').setDepth(502);
        this.pajaro5 = this.add.image(800, 820, 'pajaro5').setDepth(502);
        this.pajaro6 = this.add.image(1400, 1000, 'pajaro6').setDepth(502);

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKFinalText.setDepth(0);
        this.OKFinalText.setInteractive().on('pointerdown', () => { this.onOKFinalClick(); });
        this.OKFinalText.disableInteractive();

        this.pajaro1.setInteractive().on('pointerdown', () => { this.onPajaroClick(1, this.pajaro1); });
        this.pajaro2.setInteractive().on('pointerdown', () => { this.onPajaroClick(2, this.pajaro2); });
        this.pajaro3.setInteractive().on('pointerdown', () => { this.onPajaroClick(3, this.pajaro3); });
        this.pajaro4.setInteractive().on('pointerdown', () => { this.onPajaroClick(4, this.pajaro4); });
        this.pajaro5.setInteractive().on('pointerdown', () => { this.onPajaroClick(5, this.pajaro5); });
        this.pajaro6.setInteractive().on('pointerdown', () => { this.onPajaroClick(6, this.pajaro6); });

        this.respuestaPajaro1.setInteractive().on('pointerdown', () => { this.onRespuestaClick(1, this.respuestaCorrecta); });
        this.respuestaPajaro2.setInteractive().on('pointerdown', () => { this.onRespuestaClick(2, this.respuestaCorrecta); });
        this.respuestaPajaro3.setInteractive().on('pointerdown', () => { this.onRespuestaClick(3, this.respuestaCorrecta); });

        this.bird = this.sound.add('bird');
    }


    update() {

    }

    onPajaroClick(pajaro) {

        this.pajaro1.disableInteractive();
        this.pajaro2.disableInteractive();
        this.pajaro3.disableInteractive();
        this.pajaro4.disableInteractive();
        this.pajaro5.disableInteractive();
        this.pajaro6.disableInteractive();

        this.pajaroSeleccionado = pajaro - 1;

        this.bird.play();
        this.overlay.setDepth(800)
        this.preguntapajaro.text = `Adivina el nombre del pájaro`; // ${pajaro}`;
        switch (pajaro) {
            case 1:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro1`).setDepth(850);
                break;
            case 2:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro2`).setDepth(850);
                break;
            case 3:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro3`).setDepth(850);
                break;
            case 4:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro4`).setDepth(850);
                break;
            case 5:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro5`).setDepth(850);
                break;
            case 6:
                this.pajaroOverlay = this.add.image(650, 700, `pajaro6`).setDepth(850);
                break;

            default:

        }

        let infoPajaros = this.cache.json.get('infoPajaros');

        this.respuestaCorrecta = parseInt(Math.random() * 3) + 1;
        let aleatorio1 = 0;
        let aleatorio2 = 0;
        switch (this.respuestaCorrecta) {
            case 1:
                this.respuestaPajaro1.text = infoPajaros[pajaro - 1].nombre;
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pajaro);
                this.respuestaPajaro2.text = infoPajaros[aleatorio1 - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pajaro || aleatorio2 == aleatorio1);
                this.respuestaPajaro3.text = infoPajaros[aleatorio2 - 1].nombre;
                break;
            case 2:
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pajaro);
                this.respuestaPajaro1.text = infoPajaros[aleatorio1 - 1].nombre;
                this.respuestaPajaro2.text = infoPajaros[pajaro - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pajaro || aleatorio2 == aleatorio1);
                this.respuestaPajaro3.text = infoPajaros[aleatorio2 - 1].nombre;
                break;
            case 3:
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pajaro);
                this.respuestaPajaro1.text = infoPajaros[aleatorio1 - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pajaro || aleatorio2 == aleatorio1);
                this.respuestaPajaro2.text = infoPajaros[aleatorio2 - 1].nombre;
                this.respuestaPajaro3.text = infoPajaros[pajaro - 1].nombre;
                break;
        }

        this.respuestaPajaro1.setInteractive();
        this.respuestaPajaro2.setInteractive();
        this.respuestaPajaro3.setInteractive();

        this.preguntapajaro.setDepth(860);
        this.respuestaPajaro1.setDepth(900);
        this.respuestaPajaro2.setDepth(900);
        this.respuestaPajaro3.setDepth(900);

    }

    onRespuestaClick(respuesta, correcta) {
        this.respuestaPajaro1.disableInteractive();
        this.respuestaPajaro2.disableInteractive();
        this.respuestaPajaro3.disableInteractive();

        this.respuestaPajaro1.setDepth(0);
        this.respuestaPajaro2.setDepth(0);
        this.respuestaPajaro3.setDepth(0);
        this.OKText.setInteractive();
        this.OKText.setDepth(999);

        if (respuesta == correcta) {
            let infoPajaros = this.cache.json.get('infoPajaros');
            this.aciertos++;
            this.pajaroRealizado[this.pajaroSeleccionado] = true;
            this.preguntapajaro.text = `${infoPajaros[this.pajaroSeleccionado].nombre}. Respuesta correcta`;
            this.infopajaro.text = infoPajaros[this.pajaroSeleccionado].info;
            this.infopajaro.setDepth(999);
            this.numeroPajarosText.text = `${this.aciertos}/3`;
        } else {
            this.game.config.vidas--;
            this.preguntapajaro.text = `Respuesta incorrecta`;
            this.vidastextPajaros.text = `${this.game.config.vidas}`;
        }
    }

    onOKClick() {
        this.preguntapajaro.setDepth(0);
        this.infopajaro.setDepth(0);
        this.respuestaPajaro1.setDepth(0);
        this.respuestaPajaro2.setDepth(0);
        this.respuestaPajaro3.setDepth(0);
        this.OKText.disableInteractive();
        this.OKText.setDepth(0);
        this.pajaroOverlay.setDepth(0);
        this.overlay.setDepth(0);
        if (!this.pajaroRealizado[0]) this.pajaro1.setInteractive();
        if (!this.pajaroRealizado[1]) this.pajaro2.setInteractive();
        if (!this.pajaroRealizado[2]) this.pajaro3.setInteractive();
        if (!this.pajaroRealizado[3]) this.pajaro4.setInteractive();
        if (!this.pajaroRealizado[4]) this.pajaro5.setInteractive();
        if (!this.pajaroRealizado[5]) this.pajaro6.setInteractive();

        this.preguntapajaro.text = `Seleciona un pajaro`; // ${pajaro}`;


        if (this.game.config.vidas == 0) this.scene.start('PantallaInicio');
        if (this.aciertos >= 3) {
            this.overlay.setDepth(900);
            this.preguntapajaro.setDepth(999);
            this.preguntapajaro.text = `Juego finalizado`;
            this.numeroPajaros = this.add.image(1000, 650, 'pajaro').setDepth(999);
            this.numeroPajarosText = this.add.text(940, 775, `${this.aciertos}/3`, { fontFamily: 'Arial', fontSize: '80px', fill: '#000' });
            this.numeroPajarosText.setDepth(999);
            this.OKFinalText.setInteractive();
            this.OKFinalText.setDepth(999);
        }
    }

    onOKFinalClick() {
        this.scene.start('PantallaInicio');
    }
}
class PantallaPecera extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaPecera' });
    }

    preload() {
        // Cargar imágenes
        this.load.image('backgroundPecera', 'assets/pecera.jpeg');
        this.load.image('pez1', 'assets/pez1.png');
        this.load.image('pez2', 'assets/pez2.png');
        this.load.image('pez3', 'assets/pez3.png');
        this.load.image('pez4', 'assets/pez4.png');
        this.load.image('pez5', 'assets/pez5.png');
        this.load.image('pez6', 'assets/pez6.png');
        this.load.image('pez', 'assets/pez.png');
        this.load.image('boton', 'assets/boton.png');

        this.load.image('overlay', 'assets/overlay.png');

        this.load.json('infoPeces', 'data/peces.json');
        this.load.audio('bubble', 'assets/bubble.mp3');
    }


    create() {
        this.aciertos = 0;
        this.respuestaCorrecta = 0;
        this.pezSeleccionado = 0;
        this.pezRealizado = [false, false, false, false, false, false];

        // Fondo negro para la pantalla de inicio
        this.cameras.main.setBackgroundColor('#000');
        this.backgroundPecera = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundPecera')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.instrucciones = this.add.text(1000, 300, 'Selecciona un pez', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.preguntapez = this.add.text(400, 300, 'Adivina el nombre del pez', { fontSize: '50px', fill: '#000' });
        this.preguntapez.setDepth(0);

        this.infopez = this.add.text(940, 400, 'info', { fontFamily: 'Arial', fontSize: '25px', fill: '#000', wordWrap: { width: 500, useAdvancedWrap: true } });
        this.infopez.setDepth(0);
        this.infopez.setWordWrapWidth(600);

        this.respuestaPez1 = this.add.text(1100, 500, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPez1.setDepth(0);
        this.respuestaPez2 = this.add.text(1100, 700, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPez2.setDepth(0);
        this.respuestaPez3 = this.add.text(1100, 900, '', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaPez3.setDepth(0);

        // this.respuestaPez1width = this.respuestaPez1.width;
        // this.respuestaPez1height = this.respuestaPez1.height;
        
        // this.boton1 = this.add.image(1100,500, 'boton').setDepth(0);

        this.vidascorazon = this.add.image(1740, 210, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextPeces = this.add.text(1660, 185, `${this.game.config.vidas}`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.vidastextPeces.setDepth(501);
        this.numeroPeces = this.add.image(1590, 210, 'pez').setDepth(501).setScale(0.3);
        this.numeroPecesText = this.add.text(1460, 185, `${this.aciertos}/3`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.numeroPecesText.setDepth(501);

        this.pez1 = this.add.image(1200, 650, 'pez1').setDepth(502);
        this.pez2 = this.add.image(300, 600, 'pez2').setDepth(502);
        this.pez3 = this.add.image(700, 700, 'pez3').setDepth(502);
        this.pez4 = this.add.image(600, 1000, 'pez4').setDepth(502);
        this.pez5 = this.add.image(1000, 900, 'pez5').setDepth(502);
        this.pez6 = this.add.image(1600, 1000, 'pez6').setDepth(502);

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKFinalText.setDepth(0);
        this.OKFinalText.setInteractive().on('pointerdown', () => { this.onOKFinalClick(); });
        this.OKFinalText.disableInteractive();

        this.pez1.setInteractive().on('pointerdown', () => { this.onPezClick(1, this.pez1); });
        this.pez2.setInteractive().on('pointerdown', () => { this.onPezClick(2, this.pez2); });
        this.pez3.setInteractive().on('pointerdown', () => { this.onPezClick(3, this.pez3); });
        this.pez4.setInteractive().on('pointerdown', () => { this.onPezClick(4, this.pez4); });
        this.pez5.setInteractive().on('pointerdown', () => { this.onPezClick(5, this.pez5); });
        this.pez6.setInteractive().on('pointerdown', () => { this.onPezClick(6, this.pez6); });

        this.respuestaPez1.setInteractive().on('pointerdown', () => { this.onRespuestaClick(1, this.respuestaCorrecta); });
        this.respuestaPez2.setInteractive().on('pointerdown', () => { this.onRespuestaClick(2, this.respuestaCorrecta); });
        this.respuestaPez3.setInteractive().on('pointerdown', () => { this.onRespuestaClick(3, this.respuestaCorrecta); });

        this.bubble = this.sound.add('bubble');
    }


    update() {

    }

    onPezClick(pez) {

        this.pez1.disableInteractive();
        this.pez2.disableInteractive();
        this.pez3.disableInteractive();
        this.pez4.disableInteractive();
        this.pez5.disableInteractive();
        this.pez6.disableInteractive();

        this.pezSeleccionado = pez - 1;

        this.overlay.setDepth(800)
        this.bubble.play();
        this.preguntapez.text = `Adivina el nombre del pez`; // ${pez}`;
        switch (pez) {
            case 1:
                this.pezOverlay = this.add.image(650, 700, `pez1`).setDepth(850);
                break;
            case 2:
                this.pezOverlay = this.add.image(650, 700, `pez2`).setDepth(850);
                break;
            case 3:
                this.pezOverlay = this.add.image(650, 700, `pez3`).setDepth(850);
                break;
            case 4:
                this.pezOverlay = this.add.image(650, 700, `pez4`).setDepth(850);
                break;
            case 5:
                this.pezOverlay = this.add.image(650, 700, `pez5`).setDepth(850);
                break;
            case 6:
                this.pezOverlay = this.add.image(650, 700, `pez6`).setDepth(850);
                break;

            default:

        }

        let infoPeces = this.cache.json.get('infoPeces');

        this.respuestaCorrecta = parseInt(Math.random() * 3) + 1;
        let aleatorio1 = 0;
        let aleatorio2 = 0;
        switch (this.respuestaCorrecta) {
            case 1:
                this.respuestaPez1.text = infoPeces[pez - 1].nombre;
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pez);
                this.respuestaPez2.text = infoPeces[aleatorio1 - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pez || aleatorio2 == aleatorio1);
                this.respuestaPez3.text = infoPeces[aleatorio2 - 1].nombre;
                break;
            case 2:
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pez);
                this.respuestaPez1.text = infoPeces[aleatorio1 - 1].nombre;
                this.respuestaPez2.text = infoPeces[pez - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pez || aleatorio2 == aleatorio1);
                this.respuestaPez3.text = infoPeces[aleatorio2 - 1].nombre;
                break;
            case 3:
                do {
                    aleatorio1 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio1 == pez);
                this.respuestaPez1.text = infoPeces[aleatorio1 - 1].nombre;
                do {
                    aleatorio2 = parseInt(Math.random() * 6) + 1;
                } while (aleatorio2 == pez || aleatorio2 == aleatorio1);
                this.respuestaPez2.text = infoPeces[aleatorio2 - 1].nombre;
                this.respuestaPez3.text = infoPeces[pez - 1].nombre;
                break;
        }

        this.respuestaPez1.setInteractive();
        this.respuestaPez2.setInteractive();
        this.respuestaPez3.setInteractive();

        this.preguntapez.setDepth(860);
        this.respuestaPez1.setDepth(900);
        this.respuestaPez2.setDepth(900);
        this.respuestaPez3.setDepth(900);
        // this.boton1.setScale(this.respuestaPez1width / this.boton1.width, this.respuestaPez1height / this.boton1.height);
        // this.boton1.setDepth(910);
    }

    onRespuestaClick(respuesta, correcta) {
        this.respuestaPez1.disableInteractive();
        this.respuestaPez2.disableInteractive();
        this.respuestaPez3.disableInteractive();

        this.respuestaPez1.setDepth(0);
        this.respuestaPez2.setDepth(0);
        this.respuestaPez3.setDepth(0);
        this.OKText.setInteractive();
        this.OKText.setDepth(999);

        if (respuesta == correcta) {
            let infoPeces = this.cache.json.get('infoPeces');
            this.aciertos++;
            this.pezRealizado[this.pezSeleccionado] = true;
            this.preguntapez.text = `${infoPeces[this.pezSeleccionado].nombre}. Respuesta correcta`;
            this.infopez.text = infoPeces[this.pezSeleccionado].info;
            this.infopez.setDepth(999);
            this.numeroPecesText.text = `${this.aciertos}/3`;
        } else {
            this.game.config.vidas--;
            this.preguntapez.text = `Respuesta incorrecta`;
            this.vidastextPeces.text = `${this.game.config.vidas}`;
        }
    }

    onOKClick() {
        this.preguntapez.setDepth(0);
        this.infopez.setDepth(0);
        this.respuestaPez1.setDepth(0);
        this.respuestaPez2.setDepth(0);
        this.respuestaPez3.setDepth(0);
        this.OKText.disableInteractive();
        this.OKText.setDepth(0);
        this.pezOverlay.setDepth(0);
        this.overlay.setDepth(0);
        if (!this.pezRealizado[0]) this.pez1.setInteractive();
        if (!this.pezRealizado[1]) this.pez2.setInteractive();
        if (!this.pezRealizado[2]) this.pez3.setInteractive();
        if (!this.pezRealizado[3]) this.pez4.setInteractive();
        if (!this.pezRealizado[4]) this.pez5.setInteractive();
        if (!this.pezRealizado[5]) this.pez6.setInteractive();

        this.preguntapez.text = `Seleciona un pez`; // ${pez}`;


        if (this.game.config.vidas == 0) this.scene.start('PantallaInicio');
        if (this.aciertos >= 3) {
            this.overlay.setDepth(900);
            this.preguntapez.setDepth(999);
            this.preguntapez.text = `Juego finalizado`;
            this.numeroPeces = this.add.image(1000, 700, 'pez').setDepth(999);
            this.numeroPecesText = this.add.text(940, 775, `${this.aciertos}/3`, { fontFamily: 'Arial', fontSize: '80px', fill: '#000' });
            this.numeroPecesText.setDepth(999);
            this.OKFinalText.setInteractive();
            this.OKFinalText.setDepth(999);
        }
    }

    onOKFinalClick() {
        this.scene.start('PantallaInicio');
    }
}






class PantallaNevera extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaNevera' });
    }

    preload() {
        // Cargar imágenes
        this.load.json('infoComidas', 'data/comida.json');
        // let infoComidas = this.cache.json.get('infoComidas');
        // const l = infoComidas.length;
        // for (let i=0; i<l; i++){
        //     this.load.image(`comida${i}`, `${infoComidas[i].foto}`);    
        // }

        this.load.image('backgroundNevera', 'assets/nevera.jpg');
        this.load.image('comida1', 'assets/guisantes.png');
        this.load.image('comida2', 'assets/zanahoria.png');
        this.load.image('comida3', 'assets/huevococido.png');
        this.load.image('comida4', 'assets/brocoli.png');
        this.load.image('comida5', 'assets/sandia.png');
        this.load.image('comida6', 'assets/melocoton.png');
        this.load.image('comida7', 'assets/chorizo.png');
        this.load.image('comida8', 'assets/cebolla.png');
        this.load.image('comida9', 'assets/chocolate.png');
        this.load.image('comida10', 'assets/uva.png');
        this.load.image('comida11', 'assets/aguacate.png');
        this.load.image('comida12', 'assets/naranja.png');
        this.load.image('comida13', 'assets/limon.png');
        this.load.image('cubiertos', 'assets/cubiertos.png');

        this.load.audio('can', 'assets/can.mp3');

        this.load.image('overlay', 'assets/overlay.png');

    }


    create() {
        this.aciertos = 0;
        this.respuestaCorrecta = 0;
        this.comidaeleccionado = 0;
        this.comidaRealizado = [false, false, false, false, false, false, false, false, false, false, false, false];

        // Fondo negro para la pantalla de inicio
        this.cameras.main.setBackgroundColor('#000');
        this.backgroundNevera = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundNevera')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.instrucciones = this.add.text(100, 300, 'Selecciona una comida', { fontFamily: 'Arial', fontSize: '50px', fill: '#000', wordWrap: { width: 300, useAdvancedWrap: true } });
        this.instrucciones.setDepth(501);
        this.instrucciones.setWordWrapWidth(300);

        this.preguntacomida = this.add.text(440, 300, '', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.preguntacomida.setDepth(0);

        this.infocomida = this.add.text(840, 400, 'info', { fontFamily: 'Arial', fontSize: '25px', fill: '#000', wordWrap: { width: 500, useAdvancedWrap: true } });
        this.infocomida.setDepth(0);
        this.infocomida.setWordWrapWidth(600);

        this.respuestaComida1 = this.add.text(1100, 500, 'Sí', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaComida1.setDepth(0);
        this.respuestaComida2 = this.add.text(1100, 700, 'No', { fontFamily: 'Arial', fontSize: '40px', fill: '#000' });
        this.respuestaComida2.setDepth(0);

        this.vidascorazon = this.add.image(1800, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextcomida = this.add.text(1735, 75, `${this.game.config.vidas}`, { fontSize: '50px', fill: '#000' });
        this.vidastextcomida.setDepth(501);
        this.numerocomida = this.add.image(1660, 100, 'cubiertos').setDepth(501).setScale(0.3);
        this.numerocomidaText = this.add.text(1535, 75, `${this.aciertos}/6`, { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.numerocomidaText.setDepth(501);

        this.comida1 = this.add.image(1250, 360, 'comida1').setDepth(502);
        this.comida2 = this.add.image(700, 840, 'comida2').setDepth(502);
        this.comida3 = this.add.image(1320, 700, 'comida3').setDepth(502);
        this.comida4 = this.add.image(560, 510, 'comida4').setDepth(502);
        this.comida5 = this.add.image(640, 1100, 'comida5').setDepth(502);
        this.comida6 = this.add.image(950, 1100, 'comida6').setDepth(502);
        this.comida7 = this.add.image(850, 540, 'comida7').setDepth(502);
        this.comida8 = this.add.image(1670, 370, 'comida8').setDepth(502);
        this.comida9 = this.add.image(1600, 700, 'comida9').setDepth(502);
        this.comida10 = this.add.image(1500, 1120, 'comida10').setDepth(502);
        this.comida11 = this.add.image(1450, 340, 'comida11').setDepth(502);
        this.comida12 = this.add.image(860, 250, 'comida12').setDepth(502);
        this.comida13 = this.add.image(620, 270, 'comida13').setDepth(502);


        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1000, 'Siguiente', { fontFamily: 'Arial', fontSize: '50px', fill: '#000' });
        this.OKFinalText.setDepth(0);
        this.OKFinalText.setInteractive().on('pointerdown', () => { this.onOKFinalClick(); });
        this.OKFinalText.disableInteractive();

        this.comida1.setInteractive().on('pointerdown', () => { this.onComidaClick(1); });
        this.comida2.setInteractive().on('pointerdown', () => { this.onComidaClick(2, this.comida2); });
        this.comida3.setInteractive().on('pointerdown', () => { this.onComidaClick(3, this.comida3); });
        this.comida4.setInteractive().on('pointerdown', () => { this.onComidaClick(4, this.comida4); });
        this.comida5.setInteractive().on('pointerdown', () => { this.onComidaClick(5, this.comida5); });
        this.comida6.setInteractive().on('pointerdown', () => { this.onComidaClick(6, this.comida6); });
        this.comida7.setInteractive().on('pointerdown', () => { this.onComidaClick(7, this.comida7); });
        this.comida8.setInteractive().on('pointerdown', () => { this.onComidaClick(8, this.comida8); });
        this.comida9.setInteractive().on('pointerdown', () => { this.onComidaClick(9, this.comida9); });
        this.comida10.setInteractive().on('pointerdown', () => { this.onComidaClick(10, this.comida10); });
        this.comida11.setInteractive().on('pointerdown', () => { this.onComidaClick(11, this.comida11); });
        this.comida12.setInteractive().on('pointerdown', () => { this.onComidaClick(12, this.comida12); });
        this.comida13.setInteractive().on('pointerdown', () => { this.onComidaClick(13, this.comida13); });


        this.respuestaComida1.setInteractive().on('pointerdown', () => { this.onRespuestaClick(true, this.respuestaCorrecta); });
        this.respuestaComida2.setInteractive().on('pointerdown', () => { this.onRespuestaClick(false, this.respuestaCorrecta); });

        this.can = this.sound.add('can');
    }


    update() {

    }

    onComidaClick(comida) {

        this.comida1.disableInteractive();
        this.comida2.disableInteractive();
        this.comida3.disableInteractive();
        this.comida4.disableInteractive();
        this.comida5.disableInteractive();
        this.comida6.disableInteractive();
        this.comida7.disableInteractive();
        this.comida8.disableInteractive();
        this.comida9.disableInteractive();
        this.comida10.disableInteractive();
        this.comida11.disableInteractive();
        this.comida12.disableInteractive();
        this.comida13.disableInteractive();

        this.can.play();

        this.comidaSeleccionado = comida - 1;

        let infoComida = this.cache.json.get('infoComidas');
        const l = infoComida.length;

        this.overlay.setDepth(800)
        this.preguntacomida.text = `Pueden comer ${infoComida[this.comidaSeleccionado].nombre} los gatos?`;
        switch (comida) {
            case 1:
                this.comidaOverlay = this.add.image(600, 700, `comida1`).setDepth(850);
                break;
            case 2:
                this.comidaOverlay = this.add.image(600, 700, `comida2`).setDepth(850);
                break;
            case 3:
                this.comidaOverlay = this.add.image(600, 700, `comida3`).setDepth(850);
                break;
            case 4:
                this.comidaOverlay = this.add.image(600, 700, `comida4`).setDepth(850);
                break;
            case 5:
                this.comidaOverlay = this.add.image(600, 700, `comida5`).setDepth(850);
                break;
            case 6:
                this.comidaOverlay = this.add.image(600, 700, `comida6`).setDepth(850);
                break;
            case 7:
                this.comidaOverlay = this.add.image(600, 700, `comida7`).setDepth(850);
                break;
            case 8:
                this.comidaOverlay = this.add.image(600, 700, `comida8`).setDepth(850);
                break;
            case 9:
                this.comidaOverlay = this.add.image(600, 700, `comida9`).setDepth(850);
                break;
            case 10:
                this.comidaOverlay = this.add.image(600, 700, `comida10`).setDepth(850);
                break;
            case 11:
                this.comidaOverlay = this.add.image(600, 700, `comida11`).setDepth(850);
                break;
            case 12:
                this.comidaOverlay = this.add.image(600, 700, `comida12`).setDepth(850);
                break;
            case 13:
                this.comidaOverlay = this.add.image(600, 700, `comida13`).setDepth(850);
                break;

            default:

        }

        this.respuestaCorrecta = infoComida[this.comidaSeleccionado].info;

        this.respuestaComida1.setInteractive();
        this.respuestaComida2.setInteractive();

        this.preguntacomida.setDepth(860);
        this.respuestaComida1.setDepth(900);
        this.respuestaComida2.setDepth(900);

    }

    onRespuestaClick(respuesta, correcta) {
        this.respuestaComida1.disableInteractive();
        this.respuestaComida2.disableInteractive();

        this.respuestaComida1.setDepth(0);
        this.respuestaComida2.setDepth(0);
        this.OKText.setInteractive();
        this.OKText.setDepth(999);

        this.comidaRealizado[this.comidaSeleccionado] = true;
        let infoComidas = this.cache.json.get('infoComidas');
        this.infocomida.text = `${infoComidas[this.comidaSeleccionado].informar}`;
        this.infocomida.setDepth(999);
        if (respuesta == correcta) {
            this.aciertos++;
            this.preguntacomida.text = `${infoComidas[this.comidaSeleccionado].nombre}. Respuesta correcta`;
            // this.preguntacomida.text = infoComidas[this.comidaSeleccionado].informar;
            this.numerocomidaText.text = `${this.aciertos}/6`;
        } else {
            this.game.config.vidas--;
            this.preguntacomida.text = `${infoComidas[this.comidaSeleccionado].nombre}. Respuesta incorrecta`;
            this.vidastextcomida.text = `${this.game.config.vidas}`;
        }
    }

    onOKClick() {
        this.preguntacomida.setDepth(0);
        this.infocomida.setDepth(0);
        this.respuestaComida1.setDepth(0);
        this.respuestaComida2.setDepth(0);
        this.OKText.disableInteractive();
        this.OKText.setDepth(0);
        this.comidaOverlay.setDepth(0);
        this.overlay.setDepth(0);
        if (!this.comidaRealizado[0]) this.comida1.setInteractive();
        if (!this.comidaRealizado[1]) this.comida2.setInteractive();
        if (!this.comidaRealizado[2]) this.comida3.setInteractive();
        if (!this.comidaRealizado[3]) this.comida4.setInteractive();
        if (!this.comidaRealizado[4]) this.comida5.setInteractive();
        if (!this.comidaRealizado[5]) this.comida6.setInteractive();
        if (!this.comidaRealizado[6]) this.comida7.setInteractive();
        if (!this.comidaRealizado[7]) this.comida8.setInteractive();
        if (!this.comidaRealizado[8]) this.comida9.setInteractive();
        if (!this.comidaRealizado[9]) this.comida10.setInteractive();
        if (!this.comidaRealizado[10]) this.comida11.setInteractive();
        if (!this.comidaRealizado[11]) this.comida12.setInteractive();
        if (!this.comidaRealizado[12]) this.comida13.setInteractive();


        this.preguntacomida.text = `Seleciona un comida`; // ${comida}`;


        if (this.game.config.vidas == 0) this.scene.start('PantallaInicio');
        if (this.aciertos >= 6) {
            this.overlay.setDepth(900);
            this.preguntacomida.setDepth(999);
            this.preguntacomida.text = `Juego finalizado`;
            this.numerocomida = this.add.image(1000, 600, 'cubiertos').setDepth(999);
            this.numerocomidaText = this.add.text(940, 775, `${this.aciertos}/6`, { fontFamily: 'Arial', fontSize: '80px', fill: '#000' });
            this.numerocomidaText.setDepth(999);
            this.OKFinalText.setInteractive();
            this.OKFinalText.setDepth(999);
        }
    }

    onOKFinalClick() {
        this.scene.start('PantallaInicio');
    }
}



window.onload = function () {
    let config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: '1920',
            height: '1392'
        },
        scene: [PantallaStart, PantallaInicio, PantallaVentana, PantallaPecera, PantallaNevera],
        vidas: 7,
        peceraRealizado: false,
        ventanaRealizado: false,
        comidaRealizado: false,
        juegoSeleccionado: 0
    };

    let game = new Phaser.Game(config);
};
