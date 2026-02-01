const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

let data = JSON.parse(localStorage.getItem("soloSystem")) || {
  nivel: 1,
  rankIndex: 0,
  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0,
  bonus: false,
  completedToday: false,
  lastDay: ""
};

const today = new Date().toISOString().slice(0, 10);

// RESET DIÁRIO
if (data.lastDay !== today) {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;
  data.completedToday = false;
  data.bonus = Math.random() < 0.05;
  data.lastDay = today;
}

// LIMITES
const maxNormal = 100;
const maxBonus = 150;

function max(type) {
  return data.bonus && type !== "corrida" ? maxBonus : maxNormal;
}

// ATUALIZA TELA
function update() {
  document.getElementById("flexao").innerText = data.flexao;
  document.getElementById("abdominal").innerText = data.abdominal;
  document.getElementById("agachamento").innerText = data.agachamento;
  document.getElementById("corrida").innerText = data.corrida;

  document.getElementById("flexaoMax").innerText = max("flexao");
  document.getElementById("abdominalMax").innerText = max("abdominal");
  document.getElementById("agachamentoMax").innerText = max("agachamento");

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = ranks[data.rankIndex];

  localStorage.setItem("soloSystem", JSON.stringify(data));
}

// ADICIONAR TREINO
function add(type) {
  if (data.completedToday) return;

  if (data[type] < max(type)) {
    data[type]++;
    update();
    checkComplete();
  }
}

// VERIFICA CONCLUSÃO
function checkComplete() {
  if (data.completedToday) return;

  if (
    data.flexao >= max("flexao") &&
    data.abdominal >= max("abdominal") &&
    data.agachamento >= max("agachamento") &&
    data.corrida >= 5
  ) {
    data.completedToday = true;
    levelUp(data.bonus ? 2 : 1);
  }
}

// SUBIR NÍVEL
function levelUp(qtd) {
  for (let i = 0; i < qtd; i++) {
    const oldLevel = data.nivel;
    data.nivel++;
    showPopup(`Level Up! ${oldLevel} → ${data.nivel}`);

    if (
      data.rankIndex < ranks.length - 1 &&
      data.nivel % 10 === 0
    ) {
      const oldRank = ranks[data.rankIndex];
      data.rankIndex++;
      showPopup(`Rank Up! ${oldRank} → ${ranks[data.rankIndex]}`);
    }
  }
  update();
}

// POPUP ANIMADO
function showPopup(text) {
  const p = document.getElementById("popup");
  p.innerText = text;

  p.style.display = "block";
  p.style.animation = "none";
  p.offsetHeight; // força reflow
  p.style.animation = "popup 2.5s ease forwards";
}

// BONUS
function showBonus() {
  const b = document.getElementById("bonus");
  b.innerText = "⚠ MISSÃO BÔNUS ATIVADA!\nObjetivos aumentados!";
  b.style.display = "block";
  b.style.animation = "none";
  b.offsetHeight;
  b.style.animation = "popup 3s ease forwards";
}

if (data.bonus) showBonus();
update();
