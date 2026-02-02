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
// SAVE / LOAD
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
    rankIndex: 0,
    streak: 0,
    lastCompleteDate: null
  };
  save();
}

function save() {
  localStorage.setItem("solo_system", JSON.stringify(data));
}

// ======================
// UI
// ======================
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

function updateUI() {
  setText("flexao", data.flexao);
  setText("abdominal", data.abdominal);
  setText("agachamento", data.agachamento);
  setText("corrida", data.corrida);

  setText("nivel", data.nivel);
  setText("rank", RANKS[data.rankIndex]);
  setText("streak", data.streak);
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

// ======================
// STREAK
// ======================
function handleStreak() {
  const today = new Date().toISOString().split("T")[0];

  if (!data.lastCompleteDate) {
    data.streak = 1;
  } else {
    const last = new Date(data.lastCompleteDate);
    const diffDays =
      (new Date(today) - last) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      data.streak++;
    } else if (diffDays > 1) {
      data.streak = 1;
    }
  }

  data.lastCompleteDate = today;
}

// ======================
// CONCLUSÃO DA MISSÃO
// ======================
function handleMissionComplete() {
  handleStreak();

  // nível normal
  levelUp();

  // bônus de streak a cada 7 dias
  if (data.streak > 0 && data.streak % 7 === 0) {
    setTimeout(() => {
      const oldLevel = data.nivel;
      data.nivel++;
      showPopup(`BONUS DE STREAK! 🔥<br>${oldLevel} → ${data.nivel}`);
      save();
      updateUI();
    }, 1200);
  }

  setTimeout(resetMission, 2500);
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
    }, 700);
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
// BOTÕES (+1)
// ======================
function treinarFlexao() { add("flexao"); }
function treinarAbdominal() { add("abdominal"); }
function treinarAgachamento() { add("agachamento"); }
function treinarCorrida() { add("corrida"); }

// ======================
updateUI();
