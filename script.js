const game = document.getElementById("game");

const taxi = document.getElementById("taxi");
const hat = document.getElementById("hat");

// ===== タクシー位置 =====
let taxiX = window.innerWidth / 2 - 48;
let taxiY = window.innerHeight * 0.5;

// ===== 帽子位置 =====
let hatX = window.innerWidth;
let hatY = 200;

// ===== 帽子速度 =====
const hatSpeed = 8;

// =========================
// タクシー更新
// =========================
function updateTaxi() {
  taxi.style.left = taxiX + "px";
  taxi.style.top = taxiY + "px";
}

// =========================
// 帽子更新
// =========================
function updateHat() {

  hatX -= hatSpeed;

  // 画面外へ行ったら右へ戻す
  if (hatX < -80) {

    hatX = window.innerWidth + Math.random() * 300;

    // 高さランダム
    hatY = Math.random() * (game.clientHeight - 120);
  }

  hat.style.left = hatX + "px";
  hat.style.top = hatY + "px";
}

// =========================
// 当たり判定
// =========================
function checkCollision() {

  const taxiRect = taxi.getBoundingClientRect();
  const hatRect = hat.getBoundingClientRect();

  const hit =
    taxiRect.left < hatRect.right &&
    taxiRect.right > hatRect.left &&
    taxiRect.top < hatRect.bottom &&
    taxiRect.bottom > hatRect.top;

  if (hit) {
    console.log("帽子に当たった！");
  }
}

// =========================
// ゲームループ
// =========================
function gameLoop() {

  updateHat();

  checkCollision();

  requestAnimationFrame(gameLoop);
}

// =========================
// タップ移動
// =========================
game.addEventListener("pointerdown", (e) => {

  const rect = game.getBoundingClientRect();

  taxiX = e.clientX - rect.left - 48;
  taxiY = e.clientY - rect.top - 48;

  // ===== 画面外防止 =====
  taxiX = Math.max(
    0,
    Math.min(taxiX, rect.width - 96)
  );

  taxiY = Math.max(
    0,
    Math.min(taxiY, rect.height - 96)
  );

  updateTaxi();
});

// =========================
// 初期化
// =========================
updateTaxi();

hat.style.left = hatX + "px";
hat.style.top = hatY + "px";

gameLoop();
