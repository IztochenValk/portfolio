const W = 900;
const H = 500;

const CHUNK_W = 120;
const GROUND_H = 26;

const GRAVITY_Y = 1400;
const JUMP_VY = 650;

// Le monde défile TOUJOURS à cette vitesse (runner)
const SCROLL_SPEED = 260;

// Mario ne “ralentit” que RELATIVEMENT à l’écran (en modifiant sa vitesse X)
const MARIO_RUN_SPEED = 120;    // avance relative
const MARIO_BRAKE_SPEED = -90;  // recule relative quand tu maintiens ←
const MARIO_PUSH_SPEED = 80;    // poussé par l’écran si collé à gauche
const MARIO_RIGHT_BOOST = 260; // quand on appuie à droite

const PLATFORM_H = 22;
const PLATFORM_Y_LEVELS = [H - 200, H - 260];

const COYOTE_TIME = 0.09;
const JUMP_BUFFER = 0.12;
const JUMP_CUT = 0.55;

const HAZARD_W = 36;
const HAZARD_H_MIN = 76;
const HAZARD_H_MAX = 96;



let player, chunks, platforms, hazards;
let scoreText, hintText;
let cursors, spaceKey;
let slowTouch = false;
let gameOver = false;
let score = 0;

let lastOnGround = 0;
let lastJumpPressed = -999;
let jumpHeld = false;

let genState;

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: W,
  height: H,
  backgroundColor: "#eaf2ff",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GRAVITY_Y },
      debug: true
    }
  },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: { preload, create, update }
};

new Phaser.Game(config);

// Hitbox Mario alignée dynamiquement à son displaySize (sans toucher à x/y)
function syncMarioBody(sprite, {
  widthRatio = 0.55,
  heightRatio = 0.86,
  offsetYRatio = 0.08
} = {}) {
  const bw = sprite.displayWidth * widthRatio;
  const bh = sprite.displayHeight * heightRatio;

  sprite.body.setSize(bw / sprite.scaleX, bh / sprite.scaleY, false);

  const offX = (sprite.displayWidth - bw) / 2 / sprite.scaleX;
  const offY =
    (sprite.displayHeight - bh) / 2 / sprite.scaleY +
    (sprite.displayHeight * offsetYRatio) / sprite.scaleY;

  sprite.body.setOffset(offX, offY);
}

function preload() {
  this.load.spritesheet("mario", "assets/img/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
    margin: 0,
    spacing: 0
  });
}

function create() {
  const scene = this;

  gameOver = false;
  score = 0;

  lastOnGround = 0;
  lastJumpPressed = -999;
  jumpHeld = false;
  slowTouch = false;

  const g = scene.make.graphics({ x: 0, y: 0, add: false });

  // --- Textures ground/platform/hazard/spark ---
  // ground
  if (!scene.textures.exists("ground")) {
    g.clear();
    g.fillStyle(0x111827, 1);
    g.fillRect(0, 0, CHUNK_W, GROUND_H);
    g.fillStyle(0x22c55e, 1);
    g.fillRect(0, 0, CHUNK_W, 4);
    g.generateTexture("ground", CHUNK_W, GROUND_H);
  }

  // platform (même style que ground mais plus fin)
  if (!scene.textures.exists("platform")) {
    g.clear();
    g.fillStyle(0x0b1220, 1);
    g.fillRect(0, 0, CHUNK_W, PLATFORM_H);
    g.fillStyle(0x22c55e, 1);
    g.fillRect(0, 0, CHUNK_W, 3);
    g.generateTexture("platform", CHUNK_W, PLATFORM_H);
  }

  // hazard (poteau rouge avec top gris)
  if (!scene.textures.exists("hazard")) {
    g.clear();
    g.fillStyle(0xef4444, 1);
    g.fillRect(0, 0, 46, 80);

    g.fillStyle(0x9ca3af, 1);
    g.fillRect(0, 0, 46, 8);

    g.fillStyle(0x000000, 0.15);
    g.fillRect(0, 8, 46, 3);

    g.fillStyle(0xfca5a5, 1);
    for (let y = 10; y < 80; y += 10) g.fillTriangle(0, y + 5, 10, y, 10, y + 10);
    for (let y = 10; y < 80; y += 10) g.fillTriangle(46, y + 5, 36, y, 36, y + 10);

    g.generateTexture("hazard", 46, 80);
  }

  // spark
  if (!scene.textures.exists("spark")) {
    g.clear();
    g.fillStyle(0xfbbf24, 1);
    g.fillCircle(6, 6, 6);
    g.generateTexture("spark", 12, 12);
  }

  // --- Groups ---
  chunks = scene.physics.add.group({ allowGravity: false, immovable: true });
  platforms = scene.physics.add.group({ allowGravity: false, immovable: true });
  hazards = scene.physics.add.group({ allowGravity: false, immovable: true });

  // --- Anims ---
  if (!scene.anims.exists("mario-idle")) {
    scene.anims.create({
      key: "mario-idle",
      frames: [{ key: "mario", frame: 0 }],
      frameRate: 1,
      repeat: -1
    });

    scene.anims.create({
      key: "mario-run",
      frames: [
        { key: "mario", frame: 1 },
        { key: "mario", frame: 2 },
        { key: "mario", frame: 3 },
        { key: "mario", frame: 2 }
      ],
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "mario-jump",
      frames: [{ key: "mario", frame: 5 }],
      frameRate: 1,
      repeat: -1
    });

    scene.anims.create({
      key: "mario-dead",
      frames: [{ key: "mario", frame: 4 }],
      frameRate: 1,
      repeat: -1
    });
  }

  // --- Player ---
  player = scene.physics.add.sprite(160, H - 120, "mario", 0);
  player.setDisplaySize(48, 48);
  player.setMaxVelocity(700, 1400);
  player.setCollideWorldBounds(true);
  player.play("mario-run", true);

  syncMarioBody(player);
  player.on(Phaser.Animations.Events.ANIMATION_UPDATE, () => syncMarioBody(player));

  // --- Colliders ---
  scene.physics.add.collider(player, chunks);

  // Plateformes one-way (collision uniquement par dessus)
  scene.physics.add.collider(
    player,
    platforms,
    null,
    (p, pf) => {
      if (gameOver) return false;

      // Si Mario monte, on traverse (pas de collision dessous)
      if (p.body.velocity.y < 0) return false;

      // Tolérance pour accepter l’atterrissage même si petite pénétration
      const TOL = 10;

      // On autorise collision seulement si les pieds sont au-dessus du haut de la plateforme
      return p.body.bottom <= pf.body.top + TOL;
    }
  );

  // Hazards: mort si contact latéral/dessous, safe si posé sur le top (gris)
  scene.physics.add.collider(player, hazards, (p, hz) => {
    if (gameOver) return;

    const fromTop = p.body.touching.down && p.body.velocity.y >= 0;
    if (fromTop) return;

    die(scene);
  });

  // --- Input ---
  cursors = scene.input.keyboard.createCursorKeys();
  spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  scene.input.keyboard.on("keydown-R", () => scene.scene.restart());

  scene.input.on("pointerdown", (p) => {
    if (gameOver) {
      scene.scene.restart();
      return;
    }

    // zone gauche = frein “arcade”
    if (p.x < scene.scale.width * 0.33) {
      slowTouch = true;
    } else {
      lastJumpPressed = scene.time.now / 1000;
      jumpHeld = true;
    }
  });

  scene.input.on("pointerup", () => {
    slowTouch = false;
    jumpHeld = false;
  });

  scene.input.on("pointerout", () => {
    slowTouch = false;
    jumpHeld = false;
  });

  // --- UI ---
  scoreText = scene.add.text(14, 10, "Score: 0", {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    fontSize: "18px",
    color: "#0f172a"
  });

  hintText = scene.add.text(
    14,
    34,
    "Jump: Space/Up/Tap | Brake: Left key / Hold left side | Restart: R",
    {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      fontSize: "14px",
      color: "#334155"
    }
  );

  // --- Generation ---
  genState = makeGeneratorState();
  const visibleChunks = Math.ceil(W / CHUNK_W) + 7;

  let x = -CHUNK_W;
  for (let i = 0; i < visibleChunks; i++) {
    x += CHUNK_W;
    generateNextAt(scene, x);
  }
}

function update(_, dtMs) {
  const scene = this;
  const dt = dtMs / 1000;
  if (gameOver) return;

  // ----- INPUT -----
  const braking = cursors.left.isDown;
  const pushingRight = cursors.right.isDown;

  // Jump press
  if (
    Phaser.Input.Keyboard.JustDown(spaceKey) ||
    Phaser.Input.Keyboard.JustDown(cursors.up)
  ) {
    lastJumpPressed = scene.time.now / 1000;
    jumpHeld = true;
  }

  // Jump release
  if (
    Phaser.Input.Keyboard.JustUp(spaceKey) ||
    Phaser.Input.Keyboard.JustUp(cursors.up)
  ) {
    jumpHeld = false;
  }

  // ----- FLOOR / COYOTE / BUFFER -----
  const now = scene.time.now / 1000;
  const onFloor = player.body.blocked.down || player.body.touching.down;

  if (onFloor) lastOnGround = now;

  const canCoyote = now - lastOnGround <= COYOTE_TIME;
  const buffered = now - lastJumpPressed <= JUMP_BUFFER;

  if (buffered && canCoyote) {
    player.setVelocityY(-JUMP_VY);
    lastJumpPressed = -999;
  }

  // Jump cut
  if (!jumpHeld && player.body.velocity.y < 0) {
    player.setVelocityY(player.body.velocity.y * JUMP_CUT);
  }

  // ----- MARIO X MOVEMENT -----
  const baseTargetX = W * 0.20;
  const maxRightX = W * 0.60;

  const kReturn = 4.0;  // rappel vers la position cible
  const dead = 2.0;     // zone morte anti-jitter

  let vx = MARIO_RUN_SPEED;

if (braking) {
  vx = MARIO_BRAKE_SPEED;

  // frein renforcé si Mario est trop à droite
  const dx = baseTargetX - player.x;
  if (dx < 0) {
    vx += dx * 6.0; // force de rappel supplémentaire vers la gauche
  }
}


  // Appui à droite : liberté contrôlée
  if (pushingRight) {
    vx = MARIO_RIGHT_BOOST;

    if (player.x > maxRightX) {
      vx *= 0.6; // résistance douce à droite
    }
  }

  // Retour automatique vers la position cible
  if (!pushingRight && !braking) {
    const dx = baseTargetX - player.x;
    if (Math.abs(dx) > dead) {
      vx += dx * kReturn;
    }
  }

  // Anti-blocage bord gauche
  if (player.body.left < 6) {
    vx = Math.max(vx, MARIO_PUSH_SPEED);
  }

  vx = Phaser.Math.Clamp(vx, -180, 320);
  player.setVelocityX(vx);

  // ----- ANIMS -----
  if (!onFloor) {
    if (player.anims.currentAnim?.key !== "mario-jump") {
      player.play("mario-jump", true);
    }
  } else {
    if (player.anims.currentAnim?.key !== "mario-run") {
      player.play("mario-run", true);
    }
  }

  // ----- SCROLL MONDE (constant) -----
  const dxWorld = SCROLL_SPEED * dt;

  chunks.getChildren().forEach(o => {
    o.x -= dxWorld;
    if (o.body) o.body.updateFromGameObject();
  });

  platforms.getChildren().forEach(o => {
    o.x -= dxWorld;
    if (o.body) o.body.updateFromGameObject();
  });

  hazards.getChildren().forEach(o => {
    o.x -= dxWorld;
    if (o.body) o.body.updateFromGameObject();
  });

  // ----- GENERATION -----
  recycleAndGenerate(scene);

  // ----- SCORE -----
  score += dt;
  scoreText.setText("Score: " + Math.floor(score * 10));
}


function doJump() {
  if (gameOver) return;
  player.setVelocityY(-JUMP_VY);
}

function die(scene) {
  gameOver = true;

  if (player.anims.currentAnim?.key !== "mario-dead") player.play("mario-dead", true);

  const particles = scene.add.particles(0, 0, "spark", {
    x: player.x,
    y: player.y,
    speed: { min: 80, max: 220 },
    lifespan: { min: 160, max: 320 },
    quantity: 18,
    scale: { start: 1, end: 0 },
    emitting: false
  });

  particles.explode(18, player.x, player.y);
  scene.time.delayedCall(350, () => particles.destroy());

  hintText.setText("Game Over - Press R or Tap");
}

function scrollGroup(group, dt) {
  group.getChildren().forEach((o) => {
    o.x = Math.round(o.x - SCROLL_SPEED * dt);
    if (o.body) o.body.updateFromGameObject();
  });
}

function recycleAndGenerate(scene) {
  const rightmost = getRightmostX(chunks, platforms);
  const needRightEdge = W + CHUNK_W * 4;

  destroyOffscreen(chunks);
  destroyOffscreen(platforms);
  destroyOffscreen(hazards);

  let x = rightmost;
  while (x < needRightEdge) {
    x += CHUNK_W;
    generateNextAt(scene, x);
  }
}

function destroyOffscreen(group) {
  group.getChildren().forEach((o) => {
    if (o.x < -CHUNK_W * 2) o.destroy();
  });
}

function getRightmostX(g1, g2) {
  let maxX = -Infinity;
  g1.getChildren().forEach((o) => (maxX = Math.max(maxX, o.x)));
  g2.getChildren().forEach((o) => (maxX = Math.max(maxX, o.x)));
  if (!Number.isFinite(maxX)) return -CHUNK_W;
  return maxX;
}

function makeGeneratorState() {
  return {
    groundY: H - 40,
    sinceLastGap: 999,
    gapRemaining: 0,
    safeLandingRemaining: 0,
    platformRemaining: 0,
    platformY: PLATFORM_Y_LEVELS[0]
  };
}

function maxJumpDistanceAtSpeed() {
  const tAir = (2 * JUMP_VY) / GRAVITY_Y;
  return SCROLL_SPEED * tAir * 0.78;
}

function canReachPlatformY(y) {
  const hMax = (JUMP_VY * JUMP_VY) / (2 * GRAVITY_Y);
  const playerFeetY = genState.groundY - GROUND_H / 2 - 27;
  const needed = playerFeetY - y;
  return needed < hMax * 0.85;
}

function generateNextAt(scene, x) {
  const st = genState;

  const maxGapPx = maxJumpDistanceAtSpeed();
  const maxGapChunks = Math.max(1, Math.floor(maxGapPx / CHUNK_W - 1));
  const allowedGapChunks = Phaser.Math.Clamp(maxGapChunks, 1, 3);

  if (st.gapRemaining > 0) {
    st.gapRemaining--;
    st.sinceLastGap = 0;
    maybeSpawnPlatform(scene, x, true);
    return;
  }

  // Ground
  const ground = scene.add.image(x, st.groundY, "ground");
  ground.setDisplaySize(CHUNK_W, GROUND_H);
  scene.physics.add.existing(ground);
  ground.body.setAllowGravity(false);
  ground.body.setImmovable(true);
  ground.body.setSize(ground.width, ground.height, true); // source pixels, centré
  chunks.add(ground);

  st.sinceLastGap++;

  if (st.safeLandingRemaining > 0) {
    st.safeLandingRemaining--;
    maybeSpawnPlatform(scene, x, false);
    return;
  }

  const gapChance = st.sinceLastGap > 6 ? 0.22 : 0.08;
  if (Math.random() < gapChance) {
    const gapLen = Phaser.Math.Between(1, allowedGapChunks);
    if (st.sinceLastGap >= 2) {
      st.gapRemaining = gapLen;
      st.safeLandingRemaining = 2;
      st.sinceLastGap = 0;
      return;
    }
  }

  if (Math.random() < 0.16) {
    spawnHazard(scene, x + Phaser.Math.Between(-20, 20), st.groundY);
  }

  maybeSpawnPlatform(scene, x, false);
}

function spawnHazard(scene, x, groundY) {
  const h = Math.random() < 0.25 ? HAZARD_H_MAX : HAZARD_H_MIN;
  const topY = groundY - GROUND_H / 2 - h / 2;

  const hz = scene.add.sprite(x, topY, "hazard");
  hz.setDisplaySize(HAZARD_W, h);

  scene.physics.add.existing(hz);
  hz.body.setAllowGravity(false);
  hz.body.setImmovable(true);

  // important: body centré et basé sur pixels SOURCE
  hz.body.setSize(hz.width, hz.height, true);

  hazards.add(hz);
  return hz;
}

function maybeSpawnPlatform(scene, x, duringGap) {
  const st = genState;

  if (st.platformRemaining > 0) {
    st.platformRemaining--;
    spawnPlatformChunk(scene, x, st.platformY);

    if (!duringGap && Math.random() < 0.08) {
      spawnHazard(scene, x + Phaser.Math.Between(-20, 20), st.platformY + PLATFORM_H / 2 + 2);
    }
    return;
  }

  const startChance = duringGap ? 0.04 : 0.10;
  if (Math.random() < startChance) {
    const y = PLATFORM_Y_LEVELS[Math.floor(Math.random() * PLATFORM_Y_LEVELS.length)];
    if (!canReachPlatformY(y)) return;

    st.platformY = y;
    st.platformRemaining = Phaser.Math.Between(1, 3);
    spawnPlatformChunk(scene, x, y);
  }
}

function spawnPlatformChunk(scene, x, y) {
  const pf = scene.add.image(x, y, "platform");
  pf.setDisplaySize(CHUNK_W, PLATFORM_H);

  scene.physics.add.existing(pf);
  pf.body.setAllowGravity(false);
  pf.body.setImmovable(true);

  // important: body centré et basé sur pixels SOURCE
  pf.body.setSize(pf.width, pf.height, true);

  platforms.add(pf);
  return pf;
}
