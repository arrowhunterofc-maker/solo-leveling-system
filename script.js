// ========================
// CONFIGURAÇÕES
// ========================
const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

const goals = {
  flexao: 100,
  abdominal: 100,
  agachamento: 100,
  corrida: 5
};

// ========================
// SAVE / LOAD
// ========================
let data = JSON.parse(localStorage.getItem("solo_system")) || {
  nivel: 1,
  rankIndex: 0,
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0
};

save();
updateUI();

// ========================
// FUNÇÕES DE TREINO
// ========================
function treinarFlexao() {
  add("flexao", 1);
}

function treinarAbdominal() {
  add("abdominal", 1);
}

function treinarAgachamento() {
  add("agachamento", 1);
}

function treinarCorrida() {
  add("corrida", 1);
}

function add(tipo, valor) {
  if (data[tipo] >= goals[tipo]) return;

  data[tipo] += valor;

  if (data[tipo] > goals[tipo]) {
    data[tipo] = goals[tipo];
  }

  save();
  updateUI();
  checkComplete();
}

// ========================
// CHECK MISSÃO COMPLETA
// ========================
function checkComplete() {
  const complete =
    data.flexao >= goals.flexao &&
    data.abdominal >= goals.abdominal &&
    data.agachamento >= goals.agachamento &&
    data.corrida >= goals.corrida;

  if (complete) {
    levelUp();
    resetMissions();
  }
}

// ========================
// LEVEL UP
// ========================
function levelUp() {
  const oldLevel = data.nivel;
  data.nivel++;

  showLevelUp(oldLevel, data.nivel);

  // Rank sobe a cada 10 níveis
  if (data.rankIndex < ranks.length - 1) {
    if (data.nivel % 10 === 0) {
      const oldRank = ranks[data.rankIndex];
      data.rankIndex++;
      showRankUp(oldRank, ranks[data.rankIndex]);
    }
  }

  save();
  updateUI();
}

// ========================
// RESET MISSÕES
// ========================
function resetMissions() {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;

  save();
  updateUI();
}

// ========================
// UI
// ========================
function updateUI() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = ranks[data.rankIndex];

  document.getElementById("ok-flexao").innerText =
    data.flexao >= goals.flexao ? "✅" : "";

  document.getElementById("ok-abdominal").innerText =
    data.abdominal >= goals.abdominal ? "✅" : "";

  document.getElementById("ok-agachamento").innerText =
    data.agachamento >= goals.agachamento ? "✅" : "";

  document.getElementById("ok-corrida").innerText =
    data.corrida >= goals.corrida ? "✅" : "";
}

// ========================
// ANIMAÇÕES
// ========================
function showLevelUp(oldLv, newLv) {
  const box = document.getElementById("levelUpMessage");
  box.innerHTML = `LEVEL UP<br>${oldLv} → ${newLv}`;
  box.style.display = "flex";

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

function showRankUp(oldRank, newRank) {
  const box = document.getElementById("rankUpMessage");
  box.innerHTML = `RANK UP<br>${oldRank} → ${newRank}`;
  box.style.display = "flex";

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

// ========================
// SAVE
// ========================
function save() {
  localStorage.setItem("solo_system", JSON.stringify(data));
}
