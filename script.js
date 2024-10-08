//variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variaveis da velocidade de Bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
let raqueteComprimento = 10;
let raqueteLargura = 90;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let velocidadeyOponente;

//variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogos
let raquetada;
let ponto;
let trilha;

let ceu;

let chanceDeErrar = 0;


function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
  ceu = loadImage("ceu.webp")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(ceu);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  gameOver()
}
  
  
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}
  
  
function movimentaBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha; 
}
  
  
function verificaColisaoBorda() {
  
   if(xBolinha + raio > width  ||
    xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
     
  }
  //width é a borda do deixo x
  
  if(yBolinha + raio > height  ||
    yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
  //heigth é a borda do eixo y
  //+= é o valor de umavariavel somado ao valor da próxima varivel de uma forma abreviada !
}
  
function mostraRaquete(x,y) {
  rect(x,y,raqueteComprimento,raqueteLargura);
}

function mostraRaqueteOponente() {
  rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteLargura);
}


  
function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
}
  
}

function verificaColisaoRaquete() {
  if(xBolinha - raio < xRaquete + raqueteComprimento 
    && yBolinha - raio < yRaquete + raqueteLargura
    && yBolinha + raio > yRaquete) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y) {
  colidiu = 
collideRectCircle(x, y, raqueteComprimento, raqueteLargura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
  velocidadeyOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeyOponente + chanceDeErrar;
  calculaChanceDeErrar();
}


function incluiPlacar() {
  textAlign(CENTER,CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(130, 14, 40 ,20);
  fill(255);
  stroke("White");
  text(meusPontos, 150, 26);
  fill(color(255,140,0));
  rect(430, 14, 40 ,20);
  fill(255);
  stroke("White");
  text(pontosOponente, 450, 26);
}
 function marcaPonto() {
   if(xBolinha > 590) {
     meusPontos += 1;
     ponto.play();
   }
   if(xBolinha < 10) {
     pontosOponente += 1;
     ponto.play();
   }
 }

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23;
    }
}

function gameOver(){
  if(pontosOponente > 4){
    velocidadexBolinha = 0;
    velocidadeyBolinha = 0;
    xBolinha = 300;
    yBolinha = 200;
    clear();
    background(0);
    textSize(90);
    fill(("lightgreen"));
    stroke("green");
    text("Você Perdeu !!!",300,200);
    textAlign(CENTER,CENTER);   
  }
  if(meusPontos > 4){
    velocidadexBolinha = 0;
    velocidadeyBolinha = 0;
    xBolinha = 300;
    yBolinha = 200;
    clear();
    background(0);
    textSize(90);
    fill(("lightgreen"));
    stroke("green");
    text("Você Ganhou !!!",300,200);
    textAlign(CENTER,CENTER);
    
  }
}
