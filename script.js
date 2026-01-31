<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Solo Leveling Simulator</title>
  <link rel="stylesheet" href="style.css">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#0a1428">
</head>
<body>

<!-- ===== TELA INICIAL - NOME DO JOGADOR ===== -->
<div id="loginScreen" class="login-screen">
  <div class="login-box">
    <h2>Insira o seu nome de jogador:</h2>
    <input type="text" id="playerNameInput" placeholder="Seu nome...">
    <button onclick="iniciarJogo()">Iniciar</button>
  </div>
</div>

<!-- ===== SISTEMA PRINCIPAL ===== -->
<div id="gameScreen" class="system-panel">
  <h1>[ MISSÕES DIÁRIAS ]</h1>

  <!-- LOGIN GOOGLE (mantido) -->
  <button onclick="loginGoogle()">Entrar com Google</button>
  <p id="userInfo"></p>
  <button onclick="logout()">Sair</button>

  <ul>
    <li>
      Flexões:
      <span id="flexao">0</span> / 100
      <span id="ok-flexao"></span>
      <button onclick="treinarFlexao()">+1</button>
    </li>
    <li>
      Abdominais:
      <span id="abdominal">0</span> / 100
      <span id="ok-abdominal"></span>
      <button onclick="treinarAbdominal()">+1</button>
    </li>
    <li>
      Agachamentos:
      <span id="agachamento">0</span> / 100
      <span id="ok-agachamento"></span>
      <button onclick="treinarAgachamento()">+1</button>
    </li>
    <li>
      Corrida:
      <span id="corrida">0</span> / 5 km
      <span id="ok-corrida"></span>
      <button onclick="treinarCorrida()">+1</button>
    </li>
  </ul>

  <p class="timer">
    Tempo restante: <span id="tempo">50:00</span>
  </p>
  <button id="startBtn">Iniciar Timer</button>

  <p>Nível: <span id="nivel">1</span></p>
  <p>Rank: <span id="rank">F+</span></p>

  <div class="rank-bar">
    <div id="rankProgress"></div>
  </div>

  <!-- Mensagem de Nível -->
  <div id="levelUpMessage" class="level-up">
    Subiu de Nível! <span id="oldLevel"></span> → <span id="newLevel"></span>
  </div>

  <!-- Mensagem de Rank -->
  <div id="rankUpMessage" class="level-up">
    Subiu de Rank! <span id="oldRank"></span> → <span id="newRank"></span>
  </div>

  <!-- Mensagem especial S+++ -->
  <div id="maxRankMessage" class="level-up special">
    Olá caçador, Eu sou o sistema, e eu quero dizer que você atingiu o nível
    MÁXIMO de poder já visto na história. PARABÉNS!
  </div>
</div>

<!-- ===== FIREBASE ===== -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script>
  const firebaseConfig = {
    apiKey: "AIzaSyCQpG5b-qbB-k0QtFaRQNnW1o68Pwy2Hqc",
    authDomain: "solo-leveling-system-95e2d.firebaseapp.com",
    projectId: "solo-leveling-system-95e2d",
    storageBucket: "solo-leveling-system-95e2d.firebasestorage.app",
    messagingSenderId: "174563314205",
    appId: "1:174563314205:web:0284b7a79571ef099594f4",
    measurementId: "G-VX898GYVXP"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  function loginGoogle() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        document.getElementById("userInfo").innerText =
          `👤 ${user.displayName} (${user.email})`;
      })
      .catch((error) => {
        alert("Erro no login: " + error.message);
      });
  }

  function logout() {
    auth.signOut().then(() => {
      document.getElementById("userInfo").innerText = "";
    });
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("userInfo").innerText =
        `👤 ${user.displayName} (${user.email})`;
    }
  });
</script>

<!-- ===== SCRIPT PRINCIPAL ===== -->
<script src="script.js"></script>

</body>
</html>
