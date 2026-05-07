const taxi = document.getElementById("taxi");
const hat = document.getElementById("hat");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let taxiX = window.innerWidth / 2 - 48;
let hatX = window.innerWidth;

const speed = 8;

// タクシー更新
function updateTaxi() {
  taxi.style.left = taxiX + "px";
}

// 帽子更新
function updateHat() {
  hatX -= speed;

  // 画面外へ行ったら戻す
  if (hatX < -100) {
    hatX = window.innerWidth + Math.random() * 200;
  }

  hat.style.left = hatX + "px";
}

// 当たり判定
function checkCollision() {

  const taxiRect = taxi.getBoundingClientRect();
  const hatRect = hat.getBoundingClientRect();

  if (
    taxiRect.left < hatRect.right &&
    taxiRect.right > hatRect.left &&
    taxiRect.top < hatRect.bottom &&
    taxiRect.bottom > hatRect.top
  ) {
    console.log("帽子に当たった！");
  }
}

// ゲームループ
function gameLoop() {

  updateHat();
  checkCollision();

  requestAnimationFrame(gameLoop);
}

gameLoop();

// 左右移動
leftBtn.addEventListener("click", () => {
  taxiX -= 30;

  if (taxiX < 0) taxiX = 0;

  updateTaxi();
});

rightBtn.addEventListener("click", () => {
  taxiX += 30;

  if (taxiX > window.innerWidth - 96) {
    taxiX = window.innerWidth - 96;
  }

  updateTaxi();
});
