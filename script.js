// ============================
// DADOS DO JOGADOR
// ============================
let data = {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0,
  nivel: 1,
  rankIndex: 0,
  streak: 0,
  lastComplete: null
};

const ranks = ["F", "F+", "E", "E+", "D", "D+", "C", "C+", "B", "B+", "A", "A+", "S", "S+", "S++", "S+++"];

const metasBase = {
  flexao: 100,
  abdominal: 100,
  agachamento: 100,
  corrida: 5
};

let metas = { ...metasBase };

// ============================
// LOAD / SAVE
// ============================
function salvar() {
  localStorage.setItem("playerData", JSON.stringify(data));
}

function carregar() {
  const salvo = localStorage.getItem("playerData");
  if (salvo) {
    data = JSON.parse(salvo);
  }
}

carregar();

// ============================
// ATUALIZAR TELA
// ============================
function atualizarTela() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = ranks[data.rankIndex];
}

atualizarTela();

// ============================
// TREINOS
// ============================
function treinarFlexao() {
  data.flexao++;
  verificarMissao();
  salvar();
  atualizarTela();
}

function treinarAbdominal() {
  data.abdominal++;
  verificarMissao();
  salvar();
  atualizarTela();
}

function treinarAgachamento() {
  data.agachamento++;
  verificarMissao();
  salvar();
  atualizarTela();
}

function treinarCorrida() {
  data.corrida++;
  verificarMissao();
  salvar();
  atualizarTela();
}

// ============================
// MISSÃO DIÁRIA
// ============================
function verificarMissao() {
  if (
    data.flexao >= metas.flexao &&
    data.abdominal >= metas.abdominal &&
    data.agachamento >= metas.agachamento &&
    data.corrida >= metas.corrida
  ) {
    completarMissao();
  }
}

function completarMissao() {
  subirNivel(1);
  atualizarStreak();
  resetarMissao();
}

// ============================
// RESET MISSÃO
// ============================
function resetarMissao() {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;
}

// ============================
// LEVEL / RANK
// ============================
function subirNivel(qtd) {
  const antigo = data.nivel;
  data.nivel += qtd;

  mostrarPopup(`LEVEL UP! ${antigo} → ${data.nivel}`);

  if (data.nivel % 5 === 0 && data.rankIndex < ranks.length - 1) {
    const rankAntigo = ranks[data.rankIndex];
    data.rankIndex++;
    mostrarPopup(`RANK UP! ${rankAntigo} → ${ranks[data.rankIndex]}`);
  }
}

// ============================
// STREAK
// ============================
function atualizarStreak() {
  const hoje = new Date().toDateString();

  if (data.lastComplete === hoje) return;

  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  if (data.lastComplete === ontem.toDateString()) {
    data.streak++;
  } else {
    data.streak = 1;
  }

  data.lastComplete = hoje;
}

// ============================
// POPUP
// ============================
function mostrarPopup(texto) {
  const div = document.createElement("div");
  div.className = "level-popup";
  div.innerText = texto;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}
