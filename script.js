// ========================
// SOLO LEVELING SYSTEM
// ========================

// ---------- CONFIG ----------
const RANKS = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];
const MAX = {
  flexao: 100,
  abdominal: 100,
  agachamento: 100,
  corrida: 5
};

// ---------- SAVE ----------
let data = JSON.parse(localStorage.getItem("solo_system")) || {
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0,
  nivel: 1,
  rankIndex: 0,
  streak: 0,
  lastComplete: null
};

// ---------- UI ----------
function atualizarUI() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = RANKS[data.rankIndex];

  document.getElementById("ok-flexao").innerText =
    data.flexao >= MAX.flexao ? "✔" : "";

  document.getElementById("ok-abdominal").innerText =
    data.abdominal >= MAX.abdominal ? "✔" : "";

  document.getElementById("ok-agachamento").innerText =
    data.agachamento >= MAX.agachamento ? "✔" : "";

  document.getElementById("ok-corrida").innerText =
    data.corrida >= MAX.corrida ? "✔" : "";
}

// ---------- SAVE ----------
function salvar() {
  localStorage.setItem("solo_system", JSON.stringify(data));
}

// ---------- ADD GENERIC ----------
function add(tipo) {
  if (data[tipo] >= MAX[tipo]) {
    data[tipo] = MAX[tipo];
    atualizarUI();
    return;
  }

  data[tipo]++;
  atualizarUI();
  checarConclusao();
  salvar();
}

// ---------- BUTTONS ----------
function treinarFlexao() { add("flexao"); }
function treinarAbdominal() { add("abdominal"); }
function treinarAgachamento() { add("agachamento"); }
function treinarCorrida() { add("corrida"); }

// ---------- CHECK COMPLETE ----------
function checarConclusao() {
  const completa =
    data.flexao >= MAX.flexao &&
    data.abdominal >= MAX.abdominal &&
    data.agachamento >= MAX.agachamento &&
    data.corrida >= MAX.corrida;

  if (completa) {
    subirNivel();
    atualizarStreak();
    resetarMissao();
  }
}

// ---------- LEVEL ----------
function subirNivel() {
  const oldLevel = data.nivel;
  data.nivel++;

  mostrarMensagem(
    `LEVEL UP!<br>${oldLevel} → ${data.nivel}`
  );

  checarRank();
}

// ---------- RANK ----------
function checarRank() {
  if (data.rankIndex >= RANKS.length - 1) return;

  if (data.nivel % 10 === 0) {
    const oldRank = RANKS[data.rankIndex];
    data.rankIndex++;
    const newRank = RANKS[data.rankIndex];

    mostrarMensagem(
      `RANK UP!<br>${oldRank} → ${newRank}`
    );

    if (newRank === "S+++") {
      mostrarMensagem(
        "Olá caçador.<br>Eu sou o sistema.<br><br>Você atingiu o NÍVEL MÁXIMO de poder já visto na história.<br><br>PARABÉNS!",
        true
      );
    }
  }
}

// ---------- STREAK ----------
function atualizarStreak() {
  const hoje = new Date().toDateString();

  if (data.lastComplete === hoje) return;

  if (data.lastComplete) {
    const ontem = new Date(Date.now() - 86400000).toDateString();
    data.streak = data.lastComplete === ontem ? data.streak + 1 : 1;
  } else {
    data.streak = 1;
  }

  data.lastComplete = hoje;
}

// ---------- RESET ----------
function resetarMissao() {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;
}

// ---------- MESSAGE ----------
function mostrarMensagem(texto, especial = false) {
  const box = document.createElement("div");
  box.className = especial ? "level-up special" : "level-up";
  box.innerHTML = texto;

  document.body.appendChild(box);

  setTimeout(() => box.remove(), 3500);
}

// ---------- INIT ----------
atualizarUI();
salvar();
