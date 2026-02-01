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

  if (data.bonus) showBonus();
}

const maxNormal = 100;
const maxBonus = 150;

function max(type) {
  return data.bonus && type !== "corrida" ? maxBonus : maxNormal;
}

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

function add(type) {
  if (data.completedToday) return;

  if (data[type] < max(type)) {
    data[type]++;
    checkComplete();
    update();
  }
}

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

function levelUp(qtd) {
  for (let i = 0; i < qtd; i++) {
    const oldLevel = data.nivel;
    data.nivel++;
    popup(`Level Up! ${oldLevel} → ${data.nivel}`);

    if (
      data.rankIndex < ranks.length - 1 &&
      data.nivel % 10 === 0
    ) {
      const oldRank = ranks[data.rankIndex];
      data.rankIndex++;
      popup(`Rank Up! ${oldRank} → ${ranks[data.rankIndex]}`);
    }
  }
}

function popup(text) {
  const p = document.getElementById("popup");
  p.innerText = text;
  p.style.animation = "none";
  p.offsetHeight;
  p.style.animation = "";
}

function showBonus() {
  const b = document.getElementById("bonus");
  b.innerText = "⚠ MISSÃO BÔNUS ATIVADA!\nObjetivos aumentados!";
  b.style.animation = "none";
  b.offsetHeight;
  b.style.animation = "";
}

update();

