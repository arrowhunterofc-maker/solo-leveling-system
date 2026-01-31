// ===== CONTADORES =====
let flexao = 0;
let abdominal = 0;
let agachamento = 0;
let corrida = 0;
let nivel = 1; // nível inicial

// ===== FUNÇÕES DE TREINO =====
function treinarFlexao() {
  if (flexao < 100 && !tempoAcabou) {
    flexao++;
    document.getElementById("flexao").innerText = flexao;
    if (flexao === 100) document.getElementById("ok-flexao").innerText = " ✔️";
    verificarNivel();
  }
}

function treinarAbdominal() {
  if (abdominal < 100 && !tempoAcabou) {
    abdominal++;
    document.getElementById("abdominal").innerText = abdominal;
    if (abdominal === 100) document.getElementById("ok-abdominal").innerText = " ✔️";
    verificarNivel();
  }
}

function treinarAgachamento() {
  if (agachamento < 100 && !tempoAcabou) {
    agachamento++;
    document.getElementById("agachamento").innerText = agachamento;
    if (agachamento === 100) document.getElementById("ok-agachamento").innerText = " ✔️";
    verificarNivel();
  }
}

function treinarCorrida() {
  if (corrida < 5 && !tempoAcabou) {
    corrida++;
    document.getElementById("corrida").innerText = corrida;
    if (corrida === 5) document.getElementById("ok-corrida").innerText = " ✔️";
    verificarNivel();
  }
}

// ===== FUNÇÃO DE NÍVEL =====
function verificarNivel() {
  if (flexao === 100 && abdominal === 100 && agachamento === 100 && corrida === 5) {
    subirNivel();
  }
}

function subirNivel() {
  const oldLevel = nivel;
  nivel++;
  document.getElementById("nivel").innerText = nivel;

  // Mostrar a animação
  const message = document.getElementById("levelUpMessage");
  document.getElementById("oldLevel").innerText = oldLevel;
  document.getElementById("newLevel").innerText = nivel;
  message.style.display = "block";

  // Esconder a mensagem após 2.5 segundos
  setTimeout(() => {
    message.style.display = "none";
  }, 2500);

  // Resetar missões para o próximo dia
  flexao = 0;
  abdominal = 0;
  agachamento = 0;
  corrida = 0;

  document.getElementById("flexao").innerText = flexao;
  document.getElementById("abdominal").innerText = abdominal;
  document.getElementById("agachamento").innerText = agachamento;
  document.getElementById("corrida").innerText = corrida;
  
  document.getElementById("ok-flexao").innerText = "";
  document.getElementById("ok-abdominal").innerText = "";
  document.getElementById("ok-agachamento").innerText = "";
  document.getElementById("ok-corrida").innerText = "";
}

// ===== TIMER DE 50 MINUTOS =====
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
