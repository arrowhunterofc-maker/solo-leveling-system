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

const metas = {
  flexao: 100,
  abdominal: 100,
  agachamento: 100,
  corrida: 5
};

// ============================
// LOAD / SAVE
// ============================
function salvar() {
  localStorage.setItem("solo_save", JSON.stringify(data));
}

function carregar() {
  const salvo = localStorage.getItem("solo_save");
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
// FUNÇÃO USADA PELO HTML (+1)
// ============================
function add(tipo) {
  if (!data.hasOwnProperty(tipo)) return;

  data[tipo]++;
  verificarMissao();
  salvar();
  atualizarTela();
}

// ============================
// MISSÃO
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
  salvar();
  atualizarTela();
}

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
    const rAntigo = ranks[data.rankIndex];
    data.rankIndex++;
    mostrarPopup(`RANK UP! ${rAntigo} → ${ranks[data.rankIndex]}`);
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

  setTimeout(() => div.remove(), 3000);
}
