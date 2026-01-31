// ===== CONTADORES =====
let flexao = 0;
let abdominal = 0;
let agachamento = 0;
let corrida = 0;
let nivel = 1;

const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];
let rankIndex = 0;

// ===== TREINO =====
function treinarFlexao() {
  if (flexao < 100 && !tempoAcabou) {
    flexao++;
    document.getElementById("flexao").innerText = flexao;
    if (flexao === 100) document.getElementById("ok-flexao").innerText = " ✔️";
    verificarMissaoCompleta();
  }
}

function treinarAbdominal() {
  if (abdominal < 100 && !tempoAcabou) {
    abdominal++;
    document.getElementById("abdominal").innerText = abdominal;
    if (abdominal === 100) document.getElementById("ok-abdominal").innerText = " ✔️";
    verificarMissaoCompleta();
  }
}

function treinarAgachamento() {
  if (agachamento < 100 && !tempoAcabou) {
    agachamento++;
    document.getElementById("agachamento").innerText = agachamento;
    if (agachamento === 100) document.getElementById("ok-agachamento").innerText = " ✔️";
    verificarMissaoCompleta();
  }
}

function treinarCorrida() {
  if (corrida < 5 && !tempoAcabou) {
    corrida++;
    document.getElementById("corrida").innerText = corrida;
    if (corrida === 5) document.getElementById("ok-corrida").innerText = " ✔️";
    verificarMissaoCompleta();
  }
}

// ===== VERIFICA MISSÃO =====
function verificarMissaoCompleta() {
  if (flexao === 100 && abdominal === 100 && agachamento === 100 && corrida === 5) {
    subirNivel();
  }
}

// ===== SUBIR NÍVEL =====
function subirNivel() {
  const oldLevel = nivel;
  nivel++;
  document.getElementById("nivel").innerText = nivel;

  // Mensagem nível
  const levelMsg = document.getElementById("levelUpMessage");
  document.getElementById("oldLevel").innerText = oldLevel;
  document.getElementById("newLevel").innerText = nivel;
  levelMsg.style.display = "block";
  setTimeout(() => { levelMsg.style.display = "none"; }, 2500);

  // Resetar missões
  flexao = 0; abdominal = 0; agachamento = 0; corrida = 0;
  document.getElementById("flexao").innerText = flexao;
  document.getElementById("abdominal").innerText = abdominal;
  document.getElementById("agachamento").innerText = agachamento;
  document.getElementById("corrida").innerText = corrida;
  document.getElementById("ok-flexao").innerText = "";
  document.getElementById("ok-abdominal").innerText = "";
  document.getElementById("ok-agachamento").innerText = "";
  document.getElementById("ok-corrida").innerText = "";

  // Atualiza barra de progresso
  atualizarBarraRank();

  // Subir rank se não é máximo
  if (nivel % 10 === 0 && rankIndex < ranks.length - 1) {
    subirRank();
  }
}

// ===== SUBIR RANK =====
function subirRank() {
  const oldRank = ranks[rankIndex];
  rankIndex++;
  const newRank = ranks[rankIndex];
  document.getElementById("rank").innerText = newRank;

  // Mensagem rank
  const rankMsg = document.getElementById("rankUpMessage");
  document.getElementById("oldRank").innerText = oldRank;
  document.getElementById("newRank").innerText = newRank;
  rankMsg.style.display = "block";
  setTimeout(() => { rankMsg.style.display = "none"; }, 2500);

  // Mensagem especial S+++
  if (newRank === "S+++") {
    const msg = document.getElementById("maxRankMessage");
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 5000);
  }

  // Atualiza barra de progresso
  atualizarBarraRank();
}

// ===== BARRA DE PROGRESSO =====
function atualizarBarraRank() {
  const rankBar = document.getElementById("rankProgress");
  if (rankIndex < ranks.length - 1) {
    let progresso = ((nivel % 10) / 10) * 100;
    rankBar.style.width = progresso + "%";
    rankBar.style.background = "linear-gradient(90deg, #4fc3ff, #00ffff)";
  } else {
    rankBar.style.width = "100%";
    rankBar.style.background = "linear-gradient(90deg, #ffcc00, #ffd700)";
  }
}

// ===== TIMER 50 MIN =====
let timerInterval;
let tempoMinutos = 50;
let tempoSegundos = 0;
let timerAtivo = false;
let tempoAcabou = false;

document.getElementById("startBtn").addEventListener("click", function() {
  if (!timerAtivo) {
    timerAtivo = true;
    timerInterval = setInterval(contarTempo, 1000);
  }
});

function contarTempo() {
  if (tempoSegundos === 0) {
    if (tempoMinutos === 0) {
      clearInterval(timerInterval);
      tempoAcabou = true;
      alert("⏰ Tempo esgotado! Penalidade aplicada: NÃO USAR INTERNET POR 1 DIA");
      return;
    } else {
      tempoMinutos--;
      tempoSegundos = 59;
    }
  } else {
    tempoSegundos--;
  }

  let minStr = tempoMinutos < 10 ? "0" + tempoMinutos : tempoMinutos;
  let segStr = tempoSegundos < 10 ? "0" + tempoSegundos : tempoSegundos;
  document.getElementById("tempo").innerText = minStr + ":" + segStr;
}

// ===== Inicializa barra ao carregar =====
window.onload = function() {
  atualizarBarraRank();
}
