const canvas = document.getElementById('des');
const des = canvas.getContext('2d');

let c1 = new Carro(225, 450, 100, 150, 'darkblue');
let carro = new Carro(225, 600, 45, 100, './assets/carro_01_1.png');
let c2 = new Carro2(400, -40, 65, 120, './assets/carro_02.png');
let c3 = new Carro2(200, -280, 65, 120, './assets/carro_03.png');
let obstaculo1 = new Carro2(700, -40, 70, 60, './assets/tumbleweed.png')
let gasosa = new Carro2(200, -30, 80,80, './assets/gascan.png')
let gasolina = 100
let gasQuantRect = 40

let quantFase2 = 75
let quantFase3 = 150

let numFase = 1

let velocidadeObstaculos = 4
let velocidadeCarros = 6
let gasolinaPorSegundo = .1

let ee = new Estrada(2, 2, 10, 696, 'yellow');
let ed = new Estrada(488, 2, 10, 696, 'yellow');
let ec1 = new Estrada(246, 10, 10, 80, 'yellow');
let ec2 = new Estrada(246, 150, 10, 80, 'yellow');
let ec3 = new Estrada(246, 290, 10, 80, 'yellow');
let ec4 = new Estrada(246, 430, 10, 80, 'yellow');
let ec5 = new Estrada(246, 570, 10, 80, 'yellow');
let ec6 = new Estrada(246, 690, 10, 80, 'yellow');
let ec7 = new Estrada(246, 810, 10, 80, 'yellow');

function print(algo){
    console.log(algo)
}

let t1 = new Text();
let t2 = new Text();
let t3 = new Text();
let t4 = new Text();
let t5 = new Text();
let gasolinaText= new Text();
let t6 = new Text();

let motor = new Audio('./assets/motor.wav');
let batida = new Audio('./assets/batida.mp3');
motor.volume = 0.8;
motor.loop = true;
batida.volume = 0.8;

let jogar = true;

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
}

document.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});


function game_over() {
    if(carro.vida <= 0 || gasolina <= 0) {
        jogar = false;
        motor.pause();
    }
}

function pontos() {
    if(carro.point(c2)) carro.pts += 1;
    if(carro.point(c3)) carro.pts += 1;
}


function colisao() {
    if(carro.colid(c2)) {
        carro.vida -= 1;
        c2.recomeca();
        batida.play();
    }
    if(carro.colid(c3)) {
        carro.vida -= 1;
        c3.recomeca();
        batida.play();
    } 
    if(carro.colid(obstaculo1)) {
        carro.vida -= .5
        obstaculo1.recomeca()
    }
    if(carro.colid(gasosa)) {
        gasosa.recomeca()
        recuperarGasolina(gasQuantRect)
    }
}

function recuperarGasolina(quantGasRec) {
    gasolina += quantGasRec
    carro.pts += 3
    if (gasolina > 100) {
        gasolina = 100
    }
}

function verificarFase() {
    if (carro.pts <= quantFase2) {
        numFase = 1
    } else if (carro.pts >= quantFase2 && carro.pts <= quantFase3) {
        numFase = 2
    } else if (carro.pts >= quantFase3) {
        numFase = 3
    }
}
function atualizarGasolina() {
    gasolina -= gasolinaPorSegundo
}

function fases() {
    if (numFase == 1) {
        velocidadeCarros *= 1
        velocidadeObstaculos *= 1
    } else if (numFase == 2) {
        canvas.style.backgroundImage = 'url(https://i.pinimg.com/736x/c4/97/4c/c4974cdaa4e22452f4b4118c2f9041f9.jpg)'
        velocidadeCarros = 8
        velocidadeObstaculos = 6
    } else if (numFase ==3 ) {
        canvas.style.backgroundImage = 'url(./assets/fase3.png)'
        velocidadeCarros = 12
        velocidadeObstaculos = 8
        ed.des_estrada();
        ee.des_estrada();
    }
}

function desenha() {
    des.clearRect(0, 0, canvas.width, canvas.height);
    
    t1.des_text('Pontos: ', 360, 24, 'yellow', '26px Times');
    t2.des_text(carro.pts, 442, 24, 'yellow', '26px Times');
    t3.des_text('Vida: ', 40, 24, 'yellow', '26px Times');
    t4.des_text(carro.vida, 100, 24, 'yellow', '26px Times');
    gasolinaText.des_text(`Gasolina: ${Math.floor(gasolina)}`, 40, 50)
    t6.des_text(`Fase: ${numFase}`, 220, 35)

    if(jogar) {
        if (numFase != 3){
            ee.des_estrada();
            ed.des_estrada();
            ec1.des_estrada();
            ec2.des_estrada();
            ec3.des_estrada();
            ec4.des_estrada();
            ec5.des_estrada();
            ec6.des_estrada();
            ec7.des_estrada();
        }
        verificarFase();
        fases();
        print(numFase)
        atualizarGasolina(.1);
        obstaculo1.des_car_img();
        c2.des_car_img();
        gasosa.des_car_img();
        c3.des_car_img();
        carro.des_car_img();
    } else {
        c1.des_carro();
        ee.des_estrada();
        ed.des_estrada();
        t5.des_text('F5 para tentar novamente!', 80, 340, 'yellow', '36px Times');
    }  
}

function atualiza() {
    if(jogar) {
        ec1.mov_est();
        ec2.mov_est();
        ec3.mov_est();
        ec4.mov_est();
        ec5.mov_est();
        ec6.mov_est();
        ec7.mov_est();
        obstaculo1.des_car_img();
        carro.mov_carro();
        if (keys.w) carro.dirY = -5; 
        if (keys.s) carro.dirY = 5; 
        if (keys.a) carro.dirX = -5;
        if (keys.d) carro.dirX = 5;   
        
        if (!keys.w && !keys.s) carro.dirY = 0;
        if (!keys.a && !keys.d) carro.dirX = 0;
        gasosa.mov_carro2(velocidadeObstaculos);
        c2.mov_carro2(velocidadeCarros);
        obstaculo1.mov_carro2(velocidadeObstaculos)
        c3.mov_carro2(velocidadeCarros);
        pontos();
        colisao();
        game_over();
    }
}

function main() {
    desenha();
    atualiza();
    requestAnimationFrame(main);
}

main();