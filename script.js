const game = document.getElementById("game");
let butterflyScore = 0;
const scoreText = document.getElementById("scoreText");
const SKY_RATIO = 0.24;
const buildings = document.getElementById("buildings");
let buildingX = 0;
let hatWithOrange = false;
let hatInvincible = false;
let gameOver = false;
let gameOverTimer = null;
const gameOverScreen =
  document.getElementById("gameOverScreen");
const taxi = document.getElementById("taxi");
const hat = document.getElementById("hat");
const roadLine = document.getElementById("roadLine");
let roadX = 0;

const orange = document.getElementById("orange");
let orangeX = window.innerWidth * 0.7;
let orangeY = 300;

let orangeStock = 0;
let firstOrangeCollected = false;
const stock1 = document.getElementById("stock1");
const stock2 = document.getElementById("stock2");
const stock3 = document.getElementById("stock3");

const butterfly = document.getElementById("butterfly");
let butterflyActive = false;

let butterflyX = 0;
let butterflyY = 0;

let butterflyVX = -5;
let butterflyVY = -5;

let butterflyFrame = 0;

gameOverScreen.addEventListener(
  "click",
  resetGame
);


// ===== タクシー位置 =====
let taxiX = window.innerWidth / 2 - 48;
let taxiY = window.innerHeight * 0.5;

// ===== 帽子位置 =====
let hatX = window.innerWidth;
let hatY = 200;

// ===== 帽子速度 =====
const hatSpeed = 8;

// ===== みかん速度 =====
const orangeSpeed = hatSpeed;

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
// ビル生成
// =========================
function createBuildings() {

  buildings.innerHTML = "";

  let buildingHTML = "";

  let totalWidth = 0;

  while (totalWidth < window.innerWidth) {

    // 幅ランダム
    const width =
      40 + Math.random() * 80;

    // 高さランダム
    const height =
      20 + Math.random() * 100;

    buildingHTML += `
      <div class="building"
        style="
          width:${width}px;
          height:${height}px;
        ">
      </div>
    `;

    totalWidth += width + 6;
  }

  // 同じものを2回並べる
  buildings.innerHTML =
    buildingHTML + buildingHTML;
}
// =========================
// ビル移動
// =========================
function updateBuildings() {

  buildingX -= hatSpeed * 0.3;

  // 半分進んだらループ
  if (buildingX <= -window.innerWidth) {
    buildingX = 0;
  }

  buildings.style.left =
    buildingX + "px";
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

  // 通常帽子へ戻す
  hatWithOrange = false;

    hatX = window.innerWidth + Math.random() * 300;

    // 高さランダム
const skyHeight = game.clientHeight * SKY_RATIO;

hatY =
  skyHeight +
  Math.random() * (game.clientHeight - skyHeight - 120);
  }
if (hatWithOrange) {
  hat.src = "orangehat.gif";
} else {
  hat.src = "hat.gif";
}
  // orangehat中は当たり判定なし
if (hatWithOrange) {
  hatInvincible = true;
} else {
  hatInvincible = false;
}
  hat.style.left = hatX + "px";
  hat.style.top = hatY + "px";
}

// =========================
// 当たり判定
// =========================
function checkCollision() {

  // 当たり判定サイズ
  const taxiSize = 84;
  const hatSize = 64;

  const hit =
    taxiX < hatX + hatSize &&
    taxiX + taxiSize > hatX &&
    taxiY < hatY + hatSize &&
    taxiY + taxiSize > hatY;

// 当たり判定無効中
if (hatInvincible) return;

// 当たってなければ終了
if (!hit) return;

  console.log("白いぼうしだ！");

  // =====================
  // 蝶出現（共通）
  // =====================
  butterflyActive = true;

  // 今の帽子位置を保存
  butterflyX = hatX;
  butterflyY = hatY;

  butterflyFrame = 0;

  butterfly.style.display = "block";

// =====================
// 🍊あり
// =====================
if (orangeStock > 0) {

  orangeStock--;
  butterflyScore++;

  scoreText.textContent =
    butterflyScore;
  console.log("夏みかんを置いていった！");

  // 帽子を夏みかん入りへ
  hatWithOrange = true;

// =====================
// 🍊なし
// =====================
} else {

  console.log("ちょうちょが逃げた！");

  clearTimeout(gameOverTimer);

  gameOverTimer = setTimeout(() => {
    gameOver = true;
    gameOverScreen.style.display = "flex";
  }, 400);

  // ← この場合だけ帽子リセット
  hatX = window.innerWidth + Math.random() * 300;

  hatY =
    game.clientHeight * 0.1 +
    Math.random() *
    (game.clientHeight * 0.9 - 120);
}

}
// みかん関数、つまりみかんすう
function updateOrange() {

  orangeX -= orangeSpeed;

  // 画面外
  if (orangeX < -60) {

    orangeX = window.innerWidth + Math.random() * 400;

  const skyHeight = game.clientHeight * SKY_RATIO;

    orangeY =
      skyHeight +
      Math.random() *
      (game.clientHeight - skyHeight - 120);
  }

  orange.style.left = orangeX + "px";
  orange.style.top = orangeY + "px";
}
function checkOrangeCollision() {

  const taxiSize = 96;
  const orangeSize = 36;

  const hit =
    taxiX < orangeX + orangeSize &&
    taxiX + taxiSize > orangeX &&
    taxiY < orangeY + orangeSize &&
    taxiY + taxiSize > orangeY;

  if (hit) {

    // 最大3個
    if (orangeStock < 3) {
      orangeStock++;
    }

    firstOrangeCollected = true;

    // 消す
    orangeX = window.innerWidth + Math.random() * 400;
  }
}
function updateOrangeStockDisplay() {

  const stocks = [stock1, stock2, stock3];

  stocks.forEach((stock, i) => {

    if (i < orangeStock) {

      stock.style.display = "block";

      // タクシー上へ並べる
      stock.style.left =
        (taxiX - 4 + i * 26) + "px";

      stock.style.top =
        (taxiY - 20) + "px";

    } else {

      stock.style.display = "none";
    }
  });
}

// =========================
// ゲームループ
// =========================
createBuildings();
function gameLoop() {

  updateKeyboardMove();

  // GAME OVER中は停止
  if (!gameOver) {

    // 最初に夏みかんを拾うまで帽子を出さない
    if (firstOrangeCollected) {
      updateHat();
    }

    updateOrange();

    updateRoadLine();
    updateBuildings();
    checkCollision();

    checkOrangeCollision();
  }
  updateButterfly();
  updateOrangeStockDisplay();

  requestAnimationFrame(gameLoop);
}
function resetGame() {

  gameOver = false;

  orangeStock = 0;
  firstOrangeCollected = false;

  // タクシー位置
  taxiX = window.innerWidth / 2 - 48;
  taxiY = window.innerHeight * 0.5;

  // 帽子位置
  hatX = window.innerWidth + 300;
  hatY = 200;

  // 夏みかん位置
  orangeX = window.innerWidth * 0.7;
  orangeY = 300;

  // 蝶消す
  butterflyActive = false;
  butterfly.style.display = "none";

  //スコアリセット
  butterflyScore = 0;
  scoreText.textContent = 0;

  gameOverScreen.style.display = "none";

  updateTaxi();

  hat.style.left = hatX + "px";
  hat.style.top = hatY + "px";

  orange.style.left = orangeX + "px";
  orange.style.top = orangeY + "px";
}
// =========================
// スマホ操作
// =========================
game.addEventListener("touchmove", e => {
  if (gameOver) return;

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

const skyHeight = game.clientHeight * SKY_RATIO;

  taxiY = Math.max(
    skyHeight,
    Math.min(taxiY, rect.height - 96)
  );

  updateTaxi();

}, { passive: false });

// =========================
// キーボード操作
// =========================
const keys = {};

document.addEventListener("keydown", e => {
  if (gameOver) return;
  keys[e.key] = true;
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});
function updateKeyboardMove() {

  const speed = 6;

  if (keys["ArrowLeft"]) {
    taxiX -= speed;
  }

  if (keys["ArrowRight"]) {
    taxiX += speed;
  }

  if (keys["ArrowUp"]) {
    taxiY -= speed;
  }

  if (keys["ArrowDown"]) {
    taxiY += speed;
  }

  const rect = game.getBoundingClientRect();

  // 横制限
  taxiX = Math.max(
    0,
    Math.min(taxiX, rect.width - 96)
  );

  // 空侵入禁止
const skyHeight = game.clientHeight * SKY_RATIO;

  taxiY = Math.max(
    skyHeight,
    Math.min(taxiY, rect.height - 96)
  );

  updateTaxi();
}
// =========================
// 初期化
// =========================
updateTaxi();

hat.style.left = hatX + "px";
hat.style.top = hatY + "px";

gameLoop();
