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
// UI UPDATE
// ======================
function updateUI() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = RANKS[data.rankIndex];

  checkOK("flexao");
  checkOK("abdominal");
  checkOK("agachamento");
  checkOK("corrida");
}

function checkOK(type) {
  const ok = document.getElementById(`ok-${type}`);
  ok.innerText = data[type] >= LIMITS[type] ? "✔" : "";
}

// ======================
// MISSÃO
// ======================
function add(type) {
  if (data[type] >= LIMITS[type]) return;

  data[type]++;
  save();
  updateUI();

  checkMissionComplete();
}

function checkMissionComplete() {
  const done =
    data.flexao >= LIMITS.flexao &&
    data.abdominal >= LIMITS.abdominal &&
    data.agachamento >= LIMITS.agachamento &&
    data.corrida >= LIMITS.corrida;

  if (done) {
    levelUp(1);
    resetMission();
  }
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
function levelUp(amount) {
  const oldLevel = data.nivel;
  data.nivel += amount;

  showBox(
    `LEVEL UP!<br>${oldLevel} → ${data.nivel}`
  );

  const newRankIndex = Math.min(
    Math.floor((data.nivel - 1) / 10),
    RANKS.length - 1
  );

  if (newRankIndex > data.rankIndex) {
    const oldRank = RANKS[data.rankIndex];
    data.rankIndex = newRankIndex;
    showBox(
      `RANK UP!<br>${oldRank} → ${RANKS[data.rankIndex]}`
    );
  }

  save();
  updateUI();
}

// ======================
// ANIMAÇÃO
// ======================
function showBox(text) {
  let box = document.createElement("div");
  box.className = "popup";
  box.innerHTML = text;
  document.body.appendChild(box);

  setTimeout(() => box.remove(), 2500);
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
