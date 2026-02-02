console.log("SCRIPT OK");

// ======================
// CONFIG
// ======================
const RANKS = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];
const LIMITS = {
  flexao: 100,
  abdominal: 100,
  agachamento: 100,
  corrida: 5
};

// ======================
// SAVE BLINDADO
// ======================
let data;

try {
  data = JSON.parse(localStorage.getItem("solo_system"));
} catch {
  data = null;
}

if (!data || typeof data !== "object") {
  data = {
    flexao: 0,
    abdominal: 0,
    agachamento: 0,
    corrida: 0,
    nivel: 1,
    rankIndex: 0
  };
  save();
}

function save() {
  localStorage.setItem("solo_system", JSON.stringify(data));
}

// ======================
// UI
// ======================
function updateUI() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = RANKS[data.rankIndex];

  showCheck("flexao");
  showCheck("abdominal");
  showCheck("agachamento");
  showCheck("corrida");
}

function showCheck(type) {
  document.getElementById(`ok-${type}`).innerText =
    data[type] >= LIMITS[type] ? "✔" : "";
}

// ======================
// MISSÕES
// ======================
function add(type) {
  if (data[type] >= LIMITS[type]) return;

  data[type]++;
  save();
  updateUI();

  if (isMissionComplete()) {
    handleMissionComplete();
  }
}

function isMissionComplete() {
  return (
    data.flexao >= LIMITS.flexao &&
    data.abdominal >= LIMITS.abdominal &&
    data.agachamento >= LIMITS.agachamento &&
    data.corrida >= LIMITS.corrida
  );
}

function handleMissionComplete() {
  levelUp();

  // espera a animação antes de resetar
  setTimeout(() => {
    resetMission();
  }, 2000);
}

function resetMission() {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;

  save();
  updateUI();
}

// ======================
// LEVEL / RANK
// ======================
function levelUp() {
  const oldLevel = data.nivel;
  data.nivel++;

  showPopup(`LEVEL UP!<br>${oldLevel} → ${data.nivel}`);

  const newRankIndex = Math.min(
    Math.floor((data.nivel - 1) / 10),
    RANKS.length - 1
  );

  if (newRankIndex > data.rankIndex) {
    const oldRank = RANKS[data.rankIndex];
    data.rankIndex = newRankIndex;

    setTimeout(() => {
      showPopup(`RANK UP!<br>${oldRank} → ${RANKS[data.rankIndex]}`);
    }, 600);
  }

  save();
  updateUI();
}

// ======================
// POPUP
// ======================
function showPopup(text) {
  const box = document.createElement("div");
  box.className = "popup";
  box.innerHTML = text;
  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 2500);
}

// ======================
// BOTÕES
// ======================
function treinarFlexao() {
  add("flexao");
}
function treinarAbdominal() {
  add("abdominal");
}
function treinarAgachamento() {
  add("agachamento");
}
function treinarCorrida() {
  add("corrida");
}

// ======================
updateUI();
