// ===== ELEMENTOS =====
const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startGameBtn");
const nameInput = document.getElementById("playerNameInput");

// ===== DADOS =====
let nivel = 1;
let rankIndex = 0;
const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

let progresso = {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0
};

// ===== INICIAR =====
startBtn.addEventListener("click", () => {
  const nome = nameInput.value.trim();
  if (!nome) {
    alert("Digite seu nome!");
    return;
  }

  localStorage.setItem("playerName", nome);
  mostrarJogo();
});

// ===== MOSTRAR JOGO =====
function mostrarJogo() {
  loginScreen.style.display = "none";
  gameScreen.style.display = "block";
  atualizarTela();
}

// ===== AO ABRIR SITE =====
window.addEventListener("load", () => {
  const nome = localStorage.getItem("playerName");
  if (nome) {
    mostrarJogo();
  } else {
    loginScreen.style.display = "flex";
    gameScreen.style.display = "none";
  }
});

// ===== TREINOS =====
function treinarFlexao() {
  if (progresso.flexao < 100) progresso.flexao++;
  verificarMissao();
  atualizarTela();
}

function treinarAbdominal() {
  if (progresso.abdominal < 100) progresso.abdominal++;
  verificarMissao();
  atualizarTela();
}

function treinarAgachamento() {
  if (progresso.agachamento < 100) progresso.agachamento++;
  verificarMissao();
  atualizarTela();
}

function treinarCorrida() {
  if (progresso.corrida < 5) progresso.corrida++;
  verificarMissao();
  atualizarTela();
}

// ===== MISSÃO COMPLETA =====
function verificarMissao() {
  if (
    progresso.flexao >= 100 &&
    progresso.abdominal >= 100 &&
    progresso.agachamento >= 100 &&
    progresso.corrida >= 5
  ) {
    subirNivel();
    resetar();
  }
}

// ===== NÍVEL / RANK =====
function subirNivel() {
  nivel++;

  if (nivel % 10 === 0 && rankIndex < ranks.length - 1) {
    rankIndex++;
  }
}

// ===== RESET =====
function resetar() {
  progresso = { flexao: 0, abdominal: 0, agachamento: 0, corrida: 0 };
}

// ===== UI =====
function atualizarTela() {
  document.getElementById("flexao").innerText = progresso.flexao;
  document.getElementById("abdominal").innerText = progresso.abdominal;
  document.getElementById("agachamento").innerText = progresso.agachamento;
  document.getElementById("corrida").innerText = progresso.corrida;

  document.getElementById("nivel").innerText = nivel;
  document.getElementById("rank").innerText = ranks[rankIndex];
}
