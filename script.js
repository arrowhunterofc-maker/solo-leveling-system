/***********************
 * CONFIGURAÇÕES BASE *
 ***********************/
const DAILY_DATE_KEY = "dailyDate";
const EXTRA_MISSION_KEY = "extraMission";

// objetivos padrão
let objetivoFlexao = 100;
let objetivoAbdominal = 100;
let objetivoAgachamento = 100;
let objetivoCorrida = 5;

// progresso
let flexao = 0;
let abdominal = 0;
let agachamento = 0;
let corrida = 0;

// nível e rank
let nivel = parseInt(localStorage.getItem("nivel")) || 1;
let rankIndex = parseInt(localStorage.getItem("rankIndex")) || 0;

const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

/***********************
 * RESET DIÁRIO *
 ***********************/
function checkDailyReset() {
  const hoje = new Date().toLocaleDateString();
  const lastDate = localStorage.getItem(DAILY_DATE_KEY);

  if (lastDate !== hoje) {
    resetDailyMissions();
    localStorage.setItem(DAILY_DATE_KEY, hoje);
  }
}

function resetDailyMissions() {
  flexao = 0;
  abdominal = 0;
  agachamento = 0;
  corrida = 0;

  // sorteia missão extra (2%)
  const extraMission = Math.random() < 0.02;
  localStorage.setItem(EXTRA_MISSION_KEY, extraMission);

  if (extraMission) {
    objetivoFlexao = 150;
    objetivoAbdominal = 150;
    objetivoAgachamento = 150;
    alert("⚠️ MISSÃO EXTRA ATIVADA!\nObjetivos aumentados hoje!");
  } else {
    objetivoFlexao = 100;
    objetivoAbdominal = 100;
    objetivoAgachamento = 100;
  }

  atualizarTela();
}

/***********************
 * TREINOS *
 ***********************/
function treinarFlexao() {
  if (flexao < objetivoFlexao) {
    flexao++;
    checkComplete();
  }
}

function treinarAbdominal() {
  if (abdominal < objetivoAbdominal) {
    abdominal++;
    checkComplete();
  }
}

function treinarAgachamento() {
  if (agachamento < objetivoAgachamento) {
    agachamento++;
    checkComplete();
  }
}

function treinarCorrida() {
  if (corrida < objetivoCorrida) {
    corrida++;
    checkComplete();
  }
}

/***********************
 * CHECK COMPLETO *
 ***********************/
function checkComplete() {
  atualizarTela();

  if (
    flexao >= objetivoFlexao &&
    abdominal >= objetivoAbdominal &&
    agachamento >= objetivoAgachamento &&
    corrida >= objetivoCorrida
  ) {
    subirNivel();
  }
}

/***********************
 * LEVEL & RANK *
 ***********************/
function subirNivel() {
  const oldLevel = nivel;
  nivel++;
  localStorage.setItem("nivel", nivel);

  mostrarLevelUp(oldLevel, nivel);

  // sobe rank a cada 10 níveis (até S+++)
  if (nivel % 10 === 0 && rankIndex < ranks.length - 1) {
    const oldRank = ranks[rankIndex];
    rankIndex++;
    localStorage.setItem("rankIndex", rankIndex);
    mostrarRankUp(oldRank, ranks[rankIndex]);
  }
}

function mostrarLevelUp(oldL, newL) {
  const msg = document.getElementById("levelUpMessage");
  document.getElementById("oldLevel").innerText = oldL;
  document.getElementById("newLevel").innerText = newL;

  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 3000);
}

function mostrarRankUp(oldR, newR) {
  const msg = document.getElementById("rankUpMessage");
  document.getElementById("oldRank").innerText = oldR;
  document.getElementById("newRank").innerText = newR;

  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 3000);
}

/***********************
 * ATUALIZAR TELA *
 ***********************/
function atualizarTela() {
  document.getElementById("flexao").innerText = flexao;
  document.getElementById("abdominal").innerText = abdominal;
  document.getElementById("agachamento").innerText = agachamento;
  document.getElementById("corrida").innerText = corrida;

  document.getElementById("nivel").innerText = nivel;
  document.getElementById("rank").innerText = ranks[rankIndex];
}

/***********************
 * INICIAR *
 ***********************/
checkDailyReset();
atualizarTela();
