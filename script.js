// =======================
// CONFIGURAÇÃO INICIAL
// =======================

const RANKS = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

const DEFAULT_DATA = {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0,
  nivel: 1,
  rankIndex: 0,
  streak: 0
};

let data = JSON.parse(localStorage.getItem("solo_system"));

if (!data) {
  data = { ...DEFAULT_DATA };
  save();
}

// =======================
// SALVAR / ATUALIZAR UI
// =======================

function save() {
  localStorage.setItem("solo_system", JSON.stringify(data));
}

function updateUI() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = RANKS[data.rankIndex];

  document.getElementById("ok-flexao").innerText = data.flexao >= 100 ? "✔" : "";
  document.getElementById("ok-abdominal").innerText = data.abdominal >= 100 ? "✔" : "";
  document.getElementById("ok-agachamento").innerText = data.agachamento >= 100 ? "✔" : "";
  document.getElementById("ok-corrida").innerText = data.corrida >= 5 ? "✔" : "";
}

updateUI();

// =======================
// BOTÕES +1
// =======================

function treinarFlexao() {
  if (data.flexao < 100) {
    data.flexao++;
    checkComplete();
    save();
    updateUI();
  }
}

function treinarAbdominal() {
  if (data.abdominal < 100) {
    data.abdominal++;
    checkComplete();
    save();
    updateUI();
  }
}

function treinarAgachamento() {
  if (data.agachamento < 100) {
    data.agachamento++;
    checkComplete();
    save();
    updateUI();
  }
}

function treinarCorrida() {
  if (data.corrida < 5) {
    data.corrida++;
    checkComplete();
    save();
    updateUI();
  }
}

// =======================
// CHECK MISSÃO COMPLETA
// =======================

function checkComplete() {
  if (
    data.flexao >= 100 &&
    data.abdominal >= 100 &&
    data.agachamento >= 100 &&
    data.corrida >= 5
  ) {
    completeMission();
  }
}

// =======================
// MISSÃO COMPLETA
// =======================

function completeMission() {
  levelUp(1);

  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;

  save();
  updateUI();
}

// =======================
// LEVEL UP
// =======================

function levelUp(amount) {
  const oldLevel = data.nivel;
  data.nivel += amount;

  showLevelUp(oldLevel, data.nivel);

  const newRankIndex = Math.min(
    Math.floor((data.nivel - 1) / 10),
    RANKS.length - 1
  );

  if (newRankIndex > data.rankIndex) {
    const oldRank = RANKS[data.rankIndex];
    data.rankIndex = newRankIndex;
    const newRank = RANKS[data.rankIndex];
    showRankUp(oldRank, newRank);
  }

  save();
  updateUI();
}

// =======================
// ANIMAÇÕES
// =======================

function showLevelUp(oldL, newL) {
  const box = document.getElementById("levelUpMessage");
  document.getElementById("oldLevel").innerText = oldL;
  document.getElementById("newLevel").innerText = newL;

  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), 3000);
}

function showRankUp(oldR, newR) {
  const box = document.getElementById("rankUpMessage");
  document.getElementById("oldRank").innerText = oldR;
  document.getElementById("newRank").innerText = newR;

  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), 3500);
}
