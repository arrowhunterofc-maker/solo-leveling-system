// ===============================
// CONFIGURAÇÃO
// ===============================
const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

// ===============================
// DADOS DO JOGADOR
// ===============================
let nivel = 1;
let rankIndex = 0;

let progresso = {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0
};

// ===============================
// DATA (RESET DIÁRIO)
// ===============================
const hoje = new Date().toDateString();

// ===============================
// SALVAR / CARREGAR
// ===============================
function salvar() {
  localStorage.setItem("solo_save", JSON.stringify({
    nivel,
    rankIndex,
    progresso,
    ultimoDia: hoje
  }));
}

function carregar() {
  const dados = JSON.parse(localStorage.getItem("solo_save"));
  if (!dados) return;

  nivel = dados.nivel;
  rankIndex = dados.rankIndex;

  if (dados.ultimoDia !== hoje) {
    resetarMissao();
  } else {
    progresso = dados.progresso;
  }
}

// ===============================
// TREINOS
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
// MISSÃO COMPLETA
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
// LEVEL / RANK UP
// ===============================
function subirNivel() {
  const nivelAntigo = nivel;
  nivel++;

  mostrarPopup(`LEVEL UP! ${nivelAntigo} → ${nivel}`);

  if (nivel % 10 === 0 && rankIndex < ranks.length - 1) {
    const rankAntigo = ranks[rankIndex];
    rankIndex++;

    mostrarPopup(`RANK UP! ${rankAntigo} → ${ranks[rankIndex]}`);
  }
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
// ATUALIZAR UI
// ===============================
function atualizarTela() {
  document.getElementById("flexao").innerText = progresso.flexao;
  document.getElementById("abdominal").innerText = progresso.abdominal;
  document.getElementById("agachamento").innerText = progresso.agachamento;
  document.getElementById("corrida").innerText = progresso.corrida;

  document.getElementById("nivel").innerText = nivel;
  document.getElementById("rank").innerText = ranks[rankIndex];

  salvar();
}

// ===============================
// POPUP
// ===============================
function mostrarPopup(texto) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");

  popupText.innerText = texto;
  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2500);
}

// ===============================
// INICIAR
// ===============================
carregar();
atualizarTela();
