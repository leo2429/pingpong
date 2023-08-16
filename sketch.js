let jogadorHumano, jogadorRobo;
let bola;
let alturaJogador = 80;
let larguraJogador = 10;
let tamanhoBola = 10;
let velocidadeJogador = 5;
let velocidadeBolaX = 5;
let velocidadeBolaY = 5;
let pontuacaoJogadorHumano = 0;
let pontuacaoJogadorRobo = 0;

function setup() {
  createCanvas(800, 400);
  
  jogadorHumano = createVector(larguraJogador, height / 2 - alturaJogador / 2);
  jogadorRobo = createVector(width - larguraJogador * 2, height / 2 - alturaJogador / 2);
  bola = createVector(width / 2, height / 2);
}

function draw() {
  background(0);
  
  // Movimentação do jogador humano
  if (keyIsDown(UP_ARROW)) {
    jogadorHumano.y -= velocidadeJogador;
  } else if (keyIsDown(DOWN_ARROW)) {
    jogadorHumano.y += velocidadeJogador;
  }
  
  // Limitar movimentação do jogador humano dentro da tela
  jogadorHumano.y = constrain(jogadorHumano.y, 0, height - alturaJogador);
  
  // Movimentação do jogador robô
  // Lógica do jogador robô: segue a bola apenas quando a bola está se movendo em sua direção
  if (velocidadeBolaX > 0) {
    if (bola.y < jogadorRobo.y + alturaJogador / 2) {
      jogadorRobo.y -= velocidadeJogador;
    } else if (bola.y > jogadorRobo.y + alturaJogador / 2) {
      jogadorRobo.y += velocidadeJogador;
    }
  }
  
  // Limitar movimentação do jogador robô dentro da tela
  jogadorRobo.y = constrain(jogadorRobo.y, 0, height - alturaJogador);
  
  // Movimentação da bola
  bola.x += velocidadeBolaX;
  bola.y += velocidadeBolaY;
  
  // Verificar colisão com os jogadores
  if (bola.x - tamanhoBola / 2 <= larguraJogador + larguraJogador &&
      bola.y - tamanhoBola / 2 >= jogadorHumano.y &&
      bola.y + tamanhoBola / 2 <= jogadorHumano.y + alturaJogador) {
    velocidadeBolaX *= -1;
  }
  
  if (bola.x + tamanhoBola / 2 >= width - larguraJogador - larguraJogador &&
      bola.y - tamanhoBola / 2 >= jogadorRobo.y &&
      bola.y + tamanhoBola / 2 <= jogadorRobo.y + alturaJogador) {
    velocidadeBolaX *= -1;
  }
  
  // Verificar colisão com as bordas
  if (bola.y - tamanhoBola / 2 <= 0 || bola.y + tamanhoBola / 2 >= height) {
    velocidadeBolaY *= -1;
  }
  
  // Verificar colisão com as bordas laterais
  if (bola.x - tamanhoBola / 2 <= 0) {
    velocidadeBolaX *= -1;
    pontuacaoJogadorRobo++;
    resetarBola();
  }
  
  if (bola.x + tamanhoBola / 2 >= width) {
    velocidadeBolaX *= -1;
    pontuacaoJogadorHumano++;
    resetarBola();
  }
  
  // Desenhar jogador humano
  fill(255);
  rect(jogadorHumano.x, jogadorHumano.y, larguraJogador, alturaJogador);
  
  // Desenhar jogador robô
  rect(jogadorRobo.x, jogadorRobo.y, larguraJogador, alturaJogador);
  
  // Desenhar bola
  ellipse(bola.x, bola.y, tamanhoBola, tamanhoBola);
  
  // Exibir pontuação
  textSize(32);
  fill(255);
  text(pontuacaoJogadorHumano, width / 4, 50);
  text(pontuacaoJogadorRobo, width / 4 * 3, 50);
}

function resetarBola() {
  bola.x = width / 2;
  bola.y = height / 2;
  velocidadeBolaX = random([-1, 1]) * 5;
  velocidadeBolaY = random([-1, 1]) * 5;
}
