const ranks = ["F+", "E", "D", "C", "B", "A", "S", "S+", "S++", "S+++"];

let data = JSON.parse(localStorage.getItem("soloSystem")) || {
  nivel: 1,
  rankIndex: 0,
  streak: 0,

  flexao: 0,
  abdominal: 0,
  agachamento: 0,
  corrida: 0,

  bonus: false
};

// chance de missão bônus a cada ciclo
data.bonus = Math.random() < 0.05;

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

  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("rank").innerText = ranks[data.rankIndex];

  localStorage.setItem("soloSystem", JSON.stringify(data));
}

function add(type) {
  if (data[type] < max(type)) {
    data[type]++;
    update();
    checkComplete();
  }
}

function checkComplete() {
  if (
    data.flexao >= max("flexao") &&
    data.abdominal >= max("abdominal") &&
    data.agachamento >= max("agachamento") &&
    data.corrida >= 5
  ) {
    missionComplete();
  }
}

function missionComplete() {
  // streak sobe sempre
  data.streak++;

  // level up
  levelUp(data.bonus ? 2 : 1);

  // reseta missão imediatamente
  resetMission();

  // nova chance de bônus
  data.bonus = Math.random() < 0.05;
}

function resetMission() {
  data.flexao = 0;
  data.abdominal = 0;
  data.agachamento = 0;
  data.corrida = 0;
}

function levelUp(qtd) {
  for (let i = 0; i < qtd; i++) {
    const oldLevel = data.nivel;
    data.nivel++;
    showPopup(`LEVEL UP<br>${oldLevel} → ${data.nivel}`);

    if (
      data.rankIndex < ranks.length - 1 &&
      data.nivel % 10 === 0
    ) {
      const oldRank = ranks[data.rankIndex];
      data.rankIndex++;
      showPopup(`RANK UP<br>${oldRank} → ${ranks[data.rankIndex]}`);
    }
  }
  update();
}

function showPopup(text) {
  const p = document.getElementById("popup");
  p.innerHTML = text;
  p.style.display = "block";
  p.style.animation = "none";
  p.offsetHeight;
  p.style.animation = "popup 2.5s ease forwards";
}

update();
