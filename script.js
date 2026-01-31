// ===============================
// DADOS DO JOGADOR
// ===============================
let nivel = 1;
let rankIndex = 0;
let tempo = 50 * 60;
let timerInterval = null;

const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

let progresso = {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0
};

// ===============================
// SALVAR / CARREGAR
// ===============================
function salvar() {
  const dados = {
    nivel,
    rankIndex,
    tempo,
    progresso
  };
  localStorage.setItem("solo_save", JSON.stringify(dados));
}

function carregar() {
  const dados = JSON.parse(localStorage.getItem("solo_save"));
  if (!dados) return;

  nivel = dados.nivel;
  rankIndex = dados.rankIndex;
  tempo = dados.tempo;
  progresso = dados.progresso;

  atualizarTela();
}

// ===============================
// TELA INICIAL
// ===============================
function iniciarJogo() {
  const nome = document.getElementById("playerNameInput").value.trim();

  if (nome === "") {
    alert("Digite seu nome!");
    return;
  }

  localStorage.setItem("playerName", nome);

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  carregar();
}

// ===============================
// AO CARREGAR O SITE
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const nome = localStorage.getItem("playerName");

  if (nome) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    carregar();
  } else {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("gameScreen").style.display = "none";
  }
});

// ===============================
// MISSÕES
// ===============================
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

// ===============================
// VERIFICA MISSÃO COMPLETA
// ===============================
function verificarMissao() {
  if (
    progresso.flexao >= 100 &&
    progresso.abdominal >= 100 &&
    progresso.agachamento >= 100 &&
    progresso.corrida >= 5
  ) {
    subirNivel();
    resetarMissao();
  }
}

// ===============================
// NÍVEL / RANK
// ===============================
function subirNivel() {
  const nivelAntigo = nivel;
  nivel++;

  mostrarMensagem(
    "Subiu de Nível!",
    `${nivelAntigo} → ${nivel}`
  );

  if (nivel % 10 === 0 && rankIndex < ranks.length - 1) {
    const rankAntigo = ranks[rankIndex];
    rankIndex++;

    mostrarMensagem(
      "Subiu de Rank!",
      `${rankAntigo} → ${ranks[rankIndex]}`
    );

    if (ranks[rankIndex] === "S+++") {
      mostrarMensagem(
        "SISTEMA",
        "Olá caçador, Eu sou o sistema, e quero dizer que você atingiu o nível MÁXIMO de poder já visto na história. PARABÉNS!"
      );
    }
  }

  salvar();
}

// ===============================
// RESET MISSÃO
// ===============================
function resetarMissao() {
  progresso = {
    flexao: 0,
    abdominal: 0,
    agachamento: 0,
    corrida: 0
  };
}

// ===============================
// TIMER
// ===============================
document.getElementById("startBtn").addEventListener("click", () => {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    tempo--;
    atualizarTela();

    if (tempo <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("⛔ Tempo acabou! Penalidade aplicada.");
    }
  }, 1000);
});

// ===============================
// ATUALIZAR TELA
// ===============================
function atualizarTela() {
  document.getElementById("nivel").innerText = nivel;
  document.getElementById("rank").innerText = ranks[rankIndex];

  document.getElementById("flexao").innerText = progresso.flexao;
  document.getElementById("abdominal").innerText = progresso.abdominal;
  document.getElementById("agachamento").innerText = progresso.agachamento;
  document.getElementById("corrida").innerText = progresso.corrida;

  const min = String(Math.floor(tempo / 60)).padStart(2, "0");
  const sec = String(tempo % 60).padStart(2, "0");
  document.getElementById("tempo").innerText = `${min}:${sec}`;

  salvar();
}

// ===============================
// POPUP CENTRAL
// ===============================
function mostrarMensagem(titulo, texto) {
  const popup = document.getElementById("popup");
  const title = document.getElementById("popupTitle");
  const text = document.getElementById("popupText");

  if (!popup || !title || !text) return;

  title.innerText = titulo;
  text.innerText = texto;

  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}
