// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2

// Variáveis das Raquetes
let xRaqueteP1 = 5
let yRaqueteP1 = 150
let xRaqueteP2 = 585
let yRaqueteP2 = 150
let larguraRaquete = 10
let alturaRaquete = 90
let borda = 20
let chanceErro = 30


let colidiu = false
let velocidadeYOponente;

// Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//placar do jogo
let pontosP1 = 0;
let pontosP2 = 0;

// Criar tela de jogo
function setup() {
    createCanvas(600, 400);
    trilha.loop()
}

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function incluiPlacar() {
    textAlign(CENTER);
    textSize(16);
    fill(255);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(pontosP1, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosP2, 470, 26);
}

// Iniciar o jogo
function draw() {
    background(0);
    incluiPlacar()
    marcaPontos()
  
    criaBolinha()
  
    movimentaBolinha()
    verificaColisaoBorda()
  
    criaRaquete()
    criaRaqueteOponente()
  
    movimentaRaquete()
    movimentaRaqueteOponente()
  
    verificaColisaoRaquete()
    verificaColisaoRaqueteOponente()

  
  
}

// Cria a bolinha na tela de jogo
function criaBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

// Velocidade de movimentação da bolinha 
function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

// Colisão da bolinha com as bordas da tela de jogo
function verificaColisaoBorda(){
    if(xBolinha+ raio > width  || xBolinha -raio < 0){
      velocidadeXBolinha *= -1
    }
    if(yBolinha + raio> height  || yBolinha -raio < 0){
      velocidadeYBolinha *= -1
    }
}

// Cria Raquete do jogador
function criaRaquete(){
  rect(xRaqueteP1, yRaqueteP1, larguraRaquete, alturaRaquete, borda)
}

// Cria Raquete do oponente
function criaRaqueteOponente(){
  rect(xRaqueteP2, yRaqueteP2, larguraRaquete, alturaRaquete, borda)
}

// Controle da raquete
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaqueteP1 -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteP1 += 5;
  }
}


// Controle automático da raquete do oponente
function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteP2 - alturaRaquete / 2 - chanceErro;
    yRaqueteP2 += velocidadeYOponente
}

// Colisao da raquete do jogador com a bolinha
function verificaColisaoRaquete(){
   colidiu = collideRectCircle(xRaqueteP1, yRaqueteP1, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio)
  if (colidiu){
    velocidadeXBolinha *= -1
    //aumenta velocidade da bolinha qnd jogador acerta
    velocidadeXBolinha++
    raquetada.play()
  }
}

// Colisao da raquete do oponente com a bolinha
function verificaColisaoRaqueteOponente(){
   colidiu = collideRectCircle(xRaqueteP2, yRaqueteP2, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio)
  if (colidiu){
    velocidadeXBolinha *= -1
    //aumenta velocidade da bolinha qnd oponente acerta
    raquetada.play()
    if(pontosP1 - pontosP2 > 3){
      velocidadeXBolinha--
    }
  }
}

// Marcação de pontos
function marcaPontos(){
  if(xBolinha > 590){
    pontosP1++
    ponto.play()
  }
  if (xBolinha < 10){
    pontosP2++
    ponto.play()
    velocidadeXBolinha = 6
  }
}
