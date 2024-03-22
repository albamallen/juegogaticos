class PantallaInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaInicio' });
    }

    preload() {
        // Cargar imágenes
        this.load.image('backgroundHabitacion', 'assets/habitacion.jpg');
        this.load.image('popup', 'assets/overlay.png');
        this.load.image('pecera', 'assets/pecerablanco.png');
        this.load.image('ventana', 'assets/ventanablanco.png');
        this.load.image('nevera', 'assets/neverablanco.png');
        this.load.image('gato1', 'assets/gato1.png');
        this.load.image('gato2', 'assets/gato2.png');
        this.load.image('gato3', 'assets/gato3.png');
        this.load.image('vidascorazon', 'assets/corazon.PNG');
    }

    create() {
        if (this.game.config.vidas == null)
            this.game.config.vidas = 7;

        this.cameras.main.setBackgroundColor('#000');
        this.backgroundHabitacion = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundHabitacion')
            .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height).setDepth(500);

        this.instrucciones = this.add.text(1300, 300, 'adivina donde se puede jugar', { fontSize: '20px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.pecera = this.add.image(730, 947, 'pecera');
        this.pecera.setInteractive().on('pointerdown', () => { this.onJuegoClick(1, this.pecera); });
        if (this.game.config.peceraRealizado) {
            this.pecera.setDepth(0);
            this.pecera.disableInteractive();
        }
        else {
            this.pecera.setDepth(750);
        };

        this.ventana = this.add.image(775, 456, 'ventana').setDepth(501);
        this.ventana.setInteractive().on('pointerdown', () => { this.onJuegoClick(2, this.ventana); });
        if (this.game.config.ventanaRealizado) {
            this.ventana.setDepth(0);
            this.ventana.disableInteractive();
        }
        else {
            this.ventana.setDepth(750)
        };

        this.nevera = this.add.image(1728, 863, 'nevera').setDepth(501);
        this.nevera.setInteractive().on('pointerdown', () => { this.onJuegoClick(3, this.nevera); });
        if (this.game.config.comidaRealizado) {
            this.nevera.setDepth(0);
            this.nevera.disableInteractive();
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

        this.vidascorazon = this.add.image(1800, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastext = this.add.text(1735, 75, `${this.game.config.vidas}`, { fontSize: '50px', fill: '#000' });
        this.vidastext.setDepth(501);

        if (this.game.config.vidas == 0) {
            this.instrucciones.text = 'te has quedado sin vidas';
            this.instrucciones.setDepth(501);
        }
    }


    update() {

    }

    onJuegoClick(juego, boton) {
        if (juego == this.game.config.juegoSeleccionado) {
            this.game.config.juegoSeleccionado = 0;
            boton.setDepth(999);
            this.instrucciones.text = 'adivina donde se puede jugar';
        } else if (!this.game.config.juegoSeleccionado) {
            this.game.config.juegoSeleccionado = juego;
            boton.setDepth(0);
            this.instrucciones.text = 'Seleciona un gato';
        }
    }

    onGatoClick(gato, boton) {
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
        this.load.image('pajaro3', 'assets/azulejodelasmontañas3.png');
        this.load.image('pajaro4', 'assets/gorrion4.png');
        this.load.image('pajaro5', 'assets/picogrueso5.png');
        this.load.image('pajaro6', 'assets/martingigante6.png');

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

        this.instrucciones = this.add.text(1300, 300, 'selecciona un pajaro', { fontSize: '20px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.preguntapajaro = this.add.text(540, 300, 'adivina el nombre del pájaro', { fontSize: '50px', fill: '#000' });
        this.preguntapajaro.setDepth(0);

        this.infopajaro = this.add.text(540, 400, 'info', { fontSize: '50px', fill: '#000' });
        this.infopajaro.setDepth(0);

        this.respuestaPajaro1 = this.add.text(1100, 500, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPajaro1.setDepth(0);
        this.respuestaPajaro2 = this.add.text(1100, 700, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPajaro2.setDepth(0);
        this.respuestaPajaro3 = this.add.text(1100, 900, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPajaro3.setDepth(0);

        this.vidascorazon = this.add.image(1800, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextPajaros = this.add.text(1735, 75, `${this.game.config.vidas}`, { fontSize: '50px', fill: '#000' });
        this.vidastextPajaros.setDepth(501);
        this.numeroPajaros = this.add.image(1600, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.numeroPajarosText = this.add.text(1535, 75, `${this.aciertos}/3`, { fontSize: '50px', fill: '#000' });
        this.numeroPajarosText.setDepth(501);

        this.pajaro1 = this.add.image(1400, 500, 'pajaro1').setDepth(502);
        this.pajaro2 = this.add.image(400, 600, 'pajaro2').setDepth(502);
        this.pajaro3 = this.add.image(500, 700, 'pajaro3').setDepth(502);
        this.pajaro4 = this.add.image(600, 800, 'pajaro4').setDepth(502);
        this.pajaro5 = this.add.image(700, 900, 'pajaro5').setDepth(502);
        this.pajaro6 = this.add.image(1400, 1000, 'pajaro6').setDepth(502);

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
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

        this.overlay.setDepth(800)
        this.instrucciones.text = `Seleciona un pajaro`; // ${pajaro}`;
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
            this.preguntapajaro.text = infoPajaros[this.pajaroSeleccionado].nombre;
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

        this.load.image('overlay', 'assets/overlay.png');

        this.load.json('infoPeces', 'data/peces.json');
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

        this.instrucciones = this.add.text(1300, 300, 'selecciona un pez', { fontSize: '20px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.preguntapez = this.add.text(540, 300, 'adivina el nombre del pájaro', { fontSize: '50px', fill: '#000' });
        this.preguntapez.setDepth(0);

        this.infopez = this.add.text(540, 400, 'info', { fontSize: '50px', fill: '#000' });
        this.infopez.setDepth(0);

        this.respuestaPez1 = this.add.text(1100, 500, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPez1.setDepth(0);
        this.respuestaPez2 = this.add.text(1100, 700, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPez2.setDepth(0);
        this.respuestaPez3 = this.add.text(1100, 900, '', { fontSize: '40px', fill: '#000' });
        this.respuestaPez3.setDepth(0);

        this.vidascorazon = this.add.image(1800, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextPeces = this.add.text(1735, 75, `${this.game.config.vidas}`, { fontSize: '50px', fill: '#000' });
        this.vidastextPeces.setDepth(501);
        this.numeroPeces = this.add.image(1600, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.numeroPecesText = this.add.text(1535, 75, `${this.aciertos}/3`, { fontSize: '50px', fill: '#000' });
        this.numeroPecesText.setDepth(501);

        this.pez1 = this.add.image(1400, 500, 'pez1').setDepth(502);
        this.pez2 = this.add.image(400, 600, 'pez2').setDepth(502);
        this.pez3 = this.add.image(500, 700, 'pez3').setDepth(502);
        this.pez4 = this.add.image(600, 800, 'pez4').setDepth(502);
        this.pez5 = this.add.image(700, 900, 'pez5').setDepth(502);
        this.pez6 = this.add.image(1400, 1000, 'pez6').setDepth(502);

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
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
        this.instrucciones.text = `Seleciona un pez`; // ${pez}`;
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
            this.preguntapez.text = infoPeces[this.pezSeleccionado].nombre;
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

        this.load.image('backgroundNevera', 'assets/ventana.jpeg');
        this.load.image('comida1', 'assets/cardenal1.png');
        this.load.image('comida2', 'assets/picogordotigrillo2.png');
        this.load.image('comida3', 'assets/azulejodelasmontañas3.png');
        this.load.image('comida4', 'assets/gorrion4.png');
        this.load.image('comida5', 'assets/picogrueso5.png');
        this.load.image('comida6', 'assets/martingigante6.png');
        this.load.image('comida7', 'assets/pez1.png');
        this.load.image('comida8', 'assets/pez2.png');
        this.load.image('comida9', 'assets/pez3.png');
        this.load.image('comida10', 'assets/pez4.png');
        this.load.image('comida11', 'assets/pez5.png');
        this.load.image('comida12', 'assets/pez6.png');

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

        this.instrucciones = this.add.text(1300, 300, 'selecciona un comida', { fontSize: '20px', fill: '#000' });
        this.instrucciones.setDepth(501);

        this.preguntacomida = this.add.text(540, 300, 'adivina el nombre del pájaro', { fontSize: '50px', fill: '#000' });
        this.preguntacomida.setDepth(0);

        this.infocomida = this.add.text(540, 400, 'info', { fontSize: '50px', fill: '#000' });
        this.infocomida.setDepth(0);

        this.respuestaComida1 = this.add.text(1100, 500, 'Sí', { fontSize: '40px', fill: '#000' });
        this.respuestaComida1.setDepth(0);
        this.respuestaComida2 = this.add.text(1100, 700, 'No', { fontSize: '40px', fill: '#000' });
        this.respuestaComida2.setDepth(0);

        this.vidascorazon = this.add.image(1800, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.vidastextcomida = this.add.text(1735, 75, `${this.game.config.vidas}`, { fontSize: '50px', fill: '#000' });
        this.vidastextcomida.setDepth(501);
        this.numerocomida = this.add.image(1600, 100, 'vidascorazon').setDepth(501).setScale(0.3);
        this.numerocomidaText = this.add.text(1535, 75, `${this.aciertos}/6`, { fontSize: '50px', fill: '#000' });
        this.numerocomidaText.setDepth(501);

        this.comida1 = this.add.image(1200, 500, 'comida1').setDepth(502);
        this.comida2 = this.add.image(400, 600, 'comida2').setDepth(502);
        this.comida3 = this.add.image(500, 700, 'comida3').setDepth(502);
        this.comida4 = this.add.image(600, 800, 'comida4').setDepth(502);
        this.comida5 = this.add.image(400, 900, 'comida5').setDepth(502);
        this.comida6 = this.add.image(1400, 1000, 'comida6').setDepth(502);
        this.comida7 = this.add.image(1500, 500, 'comida7').setDepth(502);
        this.comida8 = this.add.image(1200, 600, 'comida8').setDepth(502);
        this.comida9 = this.add.image(1600, 700, 'comida9').setDepth(502);
        this.comida10 = this.add.image(1700, 800, 'comida10').setDepth(502);
        this.comida11 = this.add.image(800, 900, 'comida11').setDepth(502);
        this.comida12 = this.add.image(1200, 1000, 'comida12').setDepth(502);

        this.overlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setDepth(0).setScale(0.5);
        this.OKText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
        this.OKText.setDepth(0);
        this.OKText.setInteractive().on('pointerdown', () => { this.onOKClick(); });
        this.OKText.disableInteractive();
        this.OKFinalText = this.add.text(1100, 1100, 'OK', { fontSize: '100px', fill: '#000' });
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

        this.respuestaComida1.setInteractive().on('pointerdown', () => { this.onRespuestaClick(true, this.respuestaCorrecta); });
        this.respuestaComida2.setInteractive().on('pointerdown', () => { this.onRespuestaClick(false, this.respuestaCorrecta); });

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

        this.comidaSeleccionado = comida - 1;

        let infoComida = this.cache.json.get('infoComidas');
        const l = infoComida.length;

        this.overlay.setDepth(800)
        this.preguntacomida.text = `${infoComida[this.comidaSeleccionado].nombre}`;
        switch (comida) {
            case 1:
                this.comidaOverlay = this.add.image(650, 700, `comida1`).setDepth(850);
                break;
            case 2:
                this.comidaOverlay = this.add.image(650, 700, `comida2`).setDepth(850);
                break;
            case 3:
                this.comidaOverlay = this.add.image(650, 700, `comida3`).setDepth(850);
                break;
            case 4:
                this.comidaOverlay = this.add.image(650, 700, `comida4`).setDepth(850);
                break;
            case 5:
                this.comidaOverlay = this.add.image(650, 700, `comida5`).setDepth(850);
                break;
            case 6:
                this.comidaOverlay = this.add.image(650, 700, `comida6`).setDepth(850);
                break;
            case 7:
                this.comidaOverlay = this.add.image(650, 700, `comida7`).setDepth(850);
                break;
            case 8:
                this.comidaOverlay = this.add.image(650, 700, `comida8`).setDepth(850);
                break;
            case 9:
                this.comidaOverlay = this.add.image(650, 700, `comida9`).setDepth(850);
                break;
            case 10:
                this.comidaOverlay = this.add.image(650, 700, `comida10`).setDepth(850);
                break;
            case 11:
                this.comidaOverlay = this.add.image(650, 700, `comida11`).setDepth(850);
                break;
            case 12:
                this.comidaOverlay = this.add.image(650, 700, `comida12`).setDepth(850);
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
        this.infocomida.text = `${infoComidas[this.comidaSeleccionado].info}`;
        this.infocomida.setDepth(999);
        if (respuesta == correcta) {
            this.aciertos++;
            this.preguntacomida.text = infoComidas[this.comidaSeleccionado].nombre;
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

        this.preguntacomida.text = `Seleciona un comida`; // ${comida}`;


        if (this.game.config.vidas == 0) this.scene.start('PantallaInicio');
        if (this.aciertos >= 6) {
            this.overlay.setDepth(900);
            this.preguntacomida.setDepth(999);
            this.preguntacomida.text = `Juego finalizado`;
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
        scene: [PantallaInicio, PantallaVentana, PantallaPecera,PantallaNevera],
        vidas: 7,
        peceraRealizado: false,
        ventanaRealizado: false,
        comidaRealizado: false,
        juegoSeleccionado: 0
    };

    let game = new Phaser.Game(config);
};