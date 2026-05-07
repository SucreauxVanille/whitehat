const game = document.getElementById("game");

const taxi = document.getElementById("taxi");
const hat = document.getElementById("hat");
const roadLine = document.getElementById("roadLine");
let roadX = 0;

const butterfly = document.getElementById("butterfly");
let butterflyActive = false;

let butterflyX = 0;
let butterflyY = 0;

let butterflyVX = -4;
let butterflyVY = -3;

let butterflyFrame = 0;

// ===== タクシー位置 =====
let taxiX = window.innerWidth / 2 - 48;
let taxiY = window.innerHeight * 0.5;

// ===== 帽子位置 =====
let hatX = window.innerWidth;
let hatY = 200;

// ===== 帽子速度 =====
const hatSpeed = 8;

//ちょうちょ
function updateButterfly() {

  if (!butterflyActive) return;

  butterflyFrame++;

  // 左上へ移動
  butterflyX += butterflyVX;

  // ふわふわ上下
  butterflyY +=
    butterflyVY +
    Math.sin(butterflyFrame * 0.2) * 2;

  butterfly.style.left = butterflyX + "px";
  butterfly.style.top = butterflyY + "px";

  // 画面外で消す
  if (
    butterflyX < -100 ||
    butterflyY < -100
  ) {
    butterflyActive = false;
    butterfly.style.display = "none";
  }
}

// 中央分離帯
function updateRoadLine() {

  roadX -= hatSpeed;

  // ループ
  if (roadX <= -110) {
    roadX = 0;
  }

  roadLine.style.left = roadX + "px";
}
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
const skyHeight = game.clientHeight * 0.1;

hatY =
  skyHeight +
  Math.random() * (game.clientHeight - skyHeight - 120);
  }

  hat.style.left = hatX + "px";
  hat.style.top = hatY + "px";
}

// =========================
// 当たり判定
// =========================
function checkCollision() {

  // 当たり判定サイズ
  const taxiSize = 96;
  const hatSize = 72;

  const hit =
    taxiX < hatX + hatSize &&
    taxiX + taxiSize > hatX &&
    taxiY < hatY + hatSize &&
    taxiY + taxiSize > hatY;

  if (hit) {

    console.log("白いぼうしだ！");

  
    // 蝶出現
    butterflyActive = true;

    butterflyX = hatX;
    butterflyY = hatY;

    butterflyFrame = 0;

    butterfly.style.display = "block";
    // 帽子を消す（右へ戻す）
    hatX = window.innerWidth + Math.random() * 300;
    hatY = Math.random() * (game.clientHeight - 120);
  }
}

// =========================
// ゲームループ
// =========================
function gameLoop() {

  updateHat();

  updateRoadLine();

  updateButterfly();

  checkCollision();

  requestAnimationFrame(gameLoop);
}

// =========================
// スマホ操作
// =========================
game.addEventListener("touchmove", e => {

  e.preventDefault();

  const touch = e.touches[0];
  const rect = game.getBoundingClientRect();

  taxiX = touch.clientX - rect.left - 48;
  taxiY = touch.clientY - rect.top - 48;

  // 画面外防止
  taxiX = Math.max(
    0,
    Math.min(taxiX, rect.width - 96)
  );

  const skyHeight = game.clientHeight * 0.1;

  taxiY = Math.max(
    skyHeight,
    Math.min(taxiY, rect.height - 96)
  );

  updateTaxi();

}, { passive: false });

// =========================
// PC操作
// =========================
game.addEventListener("mousemove", e => {

  if (e.buttons !== 1) return;

  const rect = game.getBoundingClientRect();

  taxiX = e.clientX - rect.left - 48;
  taxiY = e.clientY - rect.top - 48;

  taxiX = Math.max(
    0,
    Math.min(taxiX, rect.width - 96)
  );

  const skyHeight = game.clientHeight * 0.1;

  taxiY = Math.max(
    skyHeight,
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
