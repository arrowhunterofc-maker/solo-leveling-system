// ===== CONTADORES =====
let flexao = 0;
let abdominal = 0;
let agachamento = 0;
let corrida = 0;

// ===== FUNÇÕES DE TREINO =====
function treinarFlexao() {
  if (flexao < 100) {
    flexao++;
    document.getElementById("flexao").innerText = flexao;

    if (flexao === 100) {
      document.getElementById("ok-flexao").innerText = " ✔️";
    }
  }
}

function treinarAbdominal() {
  if (abdominal < 100) {
    abdominal++;
    document.getElementById("abdominal").innerText = abdominal;

    if (abdominal === 100) {
      document.getElementById("ok-abdominal").innerText = " ✔️";
    }
  }
}

function treinarAgachamento() {
  if (agachamento < 100) {
    agachamento++;
    document.getElementById("agachamento").innerText = agachamento;

    if (agachamento === 100) {
      document.getElementById("ok-agachamento").innerText = " ✔️";
    }
  }
}

function treinarCorrida() {
  if (corrida < 5) {
    corrida++;
    document.getElementById("corrida").innerText = corrida;

    if (corrida === 5) {
      document.getElementById("ok-corrida").innerText = " ✔️";
    }
  }
}
