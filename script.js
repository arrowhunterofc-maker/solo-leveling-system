// ===== CONTADORES =====
let flexao = 0;
let abdominal = 0;
let agachamento = 0;
let corrida = 0;

// ===== FUNÇÕES DE TREINO =====
function treinarFlexao() {
  if (flexao < 100 && !tempoAcabou) {
    flexao++;
    document.getElementById("flexao").innerText = flexao;
    if (flexao === 100) {
      document.getElementById("ok-flexao").innerText = " ✔️";
    }
  }
}

function treinarAbdominal() {
  if (abdominal < 100 && !tempoAcabou) {
    abdominal++;
    document.getElementById("abdominal").innerText = abdominal;
    if (abdominal === 100) {
      document.getElementById("ok-abdominal").innerText = " ✔️";
    }
  }
}

function treinarAgachamento() {
  if (agachamento < 100 && !tempoAcabou) {
    agachamento++;
    document.getElementById("agachamento").innerText = agachamento;
    if (agachamento === 100) {
      document.getElementById("ok-agachamento").innerText = " ✔️";
    }
  }
}

function treinarCorrida() {
  if (corrida < 5 && !tempoAcabou) {
    corrida++;
    document.getElementById("corrida").innerText = corrida;
    if (corrida === 5) {
      document.getElementById("ok-corrida").innerText = " ✔️";
    }
  }
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
