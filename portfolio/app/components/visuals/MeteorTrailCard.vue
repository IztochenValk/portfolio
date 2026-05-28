<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl overflow-hidden">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Meteor Trail</h2>
        <p class="text-sm opacity-70">Starfield + meteors + maelstrom core</p>
      </div>

      <div
        class="rounded-xl border border-base-300 bg-base-100 overflow-hidden p-3"
        :class="{ 'anim-off': !animated }"
        :key="renderKey"
      >
        <div class="space-stage">
          <div class="maelstrom">
            <div class="maelstrom-ring ring-a"></div>
            <div class="maelstrom-ring ring-b"></div>
            <div class="maelstrom-ring ring-c"></div>

            <div class="vapor vapor-a"></div>
            <div class="vapor vapor-b"></div>

            <div class="spark-field"></div>
          </div>

          <div class="stars"></div>

          <div class="meteor meteor-a"></div>
          <div class="meteor meteor-b"></div>
          <div class="meteor meteor-c"></div>

          <div class="space-caption">
            <div class="caption-title">Maelstrom Core</div>
            <div class="caption-sub">Rotation + volutes + meteors</div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-1">
        <button class="btn btn-sm btn-ghost" type="button" @click="resetAnimation">
          Reset animation
        </button>

        <div class="flex items-center gap-3">
          <span class="text-xs opacity-70">Animation</span>

          <button
            type="button"
            class="glider-toggle"
            :class="{ 'is-on': animated }"
            role="switch"
            :aria-checked="animated ? 'true' : 'false'"
            @click="animated = !animated"
          >
            <span class="glider-knob" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <div class="text-xs opacity-70">CSS only · high contrast</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const animated = ref(true)
const renderKey = ref(0)
function resetAnimation() {
  renderKey.value += 1
}
</script>

<style scoped>
.anim-off * { animation-play-state: paused !important; }

.space-stage{
  position: relative;
  height: 360px;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;

  background:
    radial-gradient(900px 520px at 20% 20%, rgba(59,130,246,0.16), transparent 60%),
    radial-gradient(900px 520px at 80% 30%, rgba(168,85,247,0.16), transparent 60%),
    radial-gradient(900px 600px at 40% 90%, rgba(34,197,94,0.10), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.16));
}

/* ====== MAELSTROM ====== */
.maelstrom{
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

/* rings */
.maelstrom-ring{
  position: absolute;
  left: 50%;
  top: 52%;
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  filter: blur(0.2px);
  opacity: 0.95;
  will-change: transform, opacity;
}

.ring-a{
  background:
    conic-gradient(
      from 0deg,
      rgba(255,0,92,0.00),
      rgba(255,0,92,0.95),
      rgba(180,0,255,0.95),
      rgba(255,0,92,0.95),
      rgba(255,0,92,0.00)
    );
  mask-image: radial-gradient(circle, transparent 58%, rgba(0,0,0,1) 63%, rgba(0,0,0,1) 70%, transparent 74%);
  animation: spin 2.6s linear infinite;
  filter: drop-shadow(0 0 26px rgba(255,0,92,0.35)) drop-shadow(0 0 38px rgba(180,0,255,0.22));
}

.ring-b{
  width: 220px;
  height: 220px;
  top: 50%;
  background:
    conic-gradient(
      from 120deg,
      rgba(255,0,92,0.00),
      rgba(255,0,92,0.85),
      rgba(180,0,255,0.95),
      rgba(255,0,92,0.75),
      rgba(255,0,92,0.00)
    );
  mask-image: radial-gradient(circle, transparent 52%, rgba(0,0,0,1) 58%, rgba(0,0,0,1) 66%, transparent 72%);
  animation: spinReverse 3.4s linear infinite;
  opacity: 0.85;
  filter: drop-shadow(0 0 18px rgba(255,0,92,0.30)) drop-shadow(0 0 30px rgba(180,0,255,0.20));
}

.ring-c{
  width: 160px;
  height: 160px;
  top: 50%;
  background:
    conic-gradient(
      from 240deg,
      rgba(255,0,92,0.00),
      rgba(255,0,92,0.75),
      rgba(180,0,255,0.95),
      rgba(255,0,92,0.65),
      rgba(255,0,92,0.00)
    );
  mask-image: radial-gradient(circle, transparent 46%, rgba(0,0,0,1) 54%, rgba(0,0,0,1) 62%, transparent 72%);
  animation: spin 1.9s linear infinite;
  opacity: 0.8;
}

/* vapor wisps */
.vapor{
  position: absolute;
  left: 50%;
  top: 52%;
  width: 520px;
  height: 420px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  filter: blur(28px);
  opacity: 0.55;
  will-change: transform, opacity;
}

.vapor-a{
  background:
    radial-gradient(circle at 35% 45%, rgba(255,0,92,0.35), transparent 55%),
    radial-gradient(circle at 65% 55%, rgba(180,0,255,0.30), transparent 58%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), transparent 60%);
  animation: vaporDrift 6.2s ease-in-out infinite;
}

.vapor-b{
  width: 460px;
  height: 360px;
  top: 50%;
  background:
    radial-gradient(circle at 60% 40%, rgba(255,0,92,0.28), transparent 56%),
    radial-gradient(circle at 40% 60%, rgba(180,0,255,0.26), transparent 58%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 62%);
  opacity: 0.42;
  animation: vaporDrift2 7.6s ease-in-out infinite;
}

/* spark */
.spark-field{
  position: absolute;
  left: 50%;
  top: 52%;
  width: 320px;
  height: 320px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background:
    radial-gradient(2px 2px at 22% 36%, rgba(255,255,255,0.55), transparent 55%),
    radial-gradient(1px 1px at 64% 28%, rgba(255,255,255,0.45), transparent 55%),
    radial-gradient(1px 1px at 58% 62%, rgba(255,255,255,0.40), transparent 55%),
    radial-gradient(2px 2px at 38% 70%, rgba(255,255,255,0.50), transparent 55%);
  opacity: 0.7;
  animation: spark 2.2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.25));
}

@keyframes spin{
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes spinReverse{
  to { transform: translate(-50%, -50%) rotate(-360deg); }
}
@keyframes vaporDrift{
  0%,100%{ transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.48; }
  50%{ transform: translate(-50%, -50%) rotate(18deg) scale(1.05); opacity: 0.62; }
}
@keyframes vaporDrift2{
  0%,100%{ transform: translate(-50%, -50%) rotate(0deg) scale(1.02); opacity: 0.34; }
  50%{ transform: translate(-50%, -50%) rotate(-16deg) scale(1.08); opacity: 0.52; }
}
@keyframes spark{
  0%,100%{ opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
  50%{ opacity: 0.9; transform: translate(-50%, -50%) scale(1.06); }
}

/* ====== STARS (simple, visible) ====== */
/* ====== STARFIELD ULTRA VISIBLE ====== */
.stars{
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* étoiles principales */
.stars::before{
  content:"";
  position:absolute;
  top: 14%;
  left: 10%;
  width: 4px;          /* PLUS GROS */
  height: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,1);

  box-shadow:
    /* ligne 1 */
    40px 18px rgba(255,255,255,0.95),
    110px 36px rgba(255,255,255,0.90),
    200px 12px rgba(255,255,255,1),
    290px 44px rgba(255,255,255,0.85),
    360px 20px rgba(255,255,255,0.95),

    /* ligne 2 */
    22px 92px rgba(255,255,255,0.85),
    96px 118px rgba(255,255,255,0.95),
    180px 100px rgba(255,255,255,0.90),
    260px 130px rgba(255,255,255,1),
    340px 112px rgba(255,255,255,0.85),

    /* ligne 3 */
    32px 180px rgba(255,255,255,0.80),
    120px 200px rgba(255,255,255,0.95),
    210px 190px rgba(255,255,255,0.90),
    300px 220px rgba(255,255,255,1),
    380px 200px rgba(255,255,255,0.85);

  /* GLOW FORT */
  filter:
    drop-shadow(0 0 6px rgba(255,255,255,0.9))
    drop-shadow(0 0 14px rgba(255,255,255,0.6))
    drop-shadow(0 0 28px rgba(180,0,255,0.35));

  opacity: 1;
  animation: twinkle 2.2s ease-in-out infinite;
}

/* micro étoiles supplémentaires */
.stars::after{
  content:"";
  position:absolute;
  inset: -10%;
  background:
    radial-gradient(2px 2px at 18% 26%, rgba(255,255,255,0.6), transparent 55%),
    radial-gradient(2px 2px at 42% 38%, rgba(255,255,255,0.55), transparent 55%),
    radial-gradient(2px 2px at 68% 22%, rgba(255,255,255,0.6), transparent 55%),
    radial-gradient(2px 2px at 78% 62%, rgba(255,255,255,0.5), transparent 55%),
    radial-gradient(2px 2px at 52% 82%, rgba(255,255,255,0.55), transparent 55%);
  opacity: 0.9;
}

/* twinkle bien perceptible */
@keyframes twinkle{
  0%,100%{
    opacity: 0.65;
    transform: scale(1);
  }
  50%{
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
