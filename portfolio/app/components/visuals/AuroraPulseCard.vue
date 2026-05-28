<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl overflow-hidden">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Aurora Pulse</h2>
        <p class="text-sm opacity-70">Aurora gradient + glow drift</p>
      </div>

      <div
        class="rounded-xl border border-base-300 bg-base-100 overflow-hidden p-3"
        :class="{ 'anim-off': !animated }"
        :key="renderKey"
      >
        <div class="aurora-stage">
          <div class="blob blob-a"></div>
          <div class="blob blob-b"></div>
          <div class="blob blob-c"></div>

          <div class="grid"></div>

          <div class="caption">
            <div class="caption-title">Live Aurora</div>
            <div class="caption-sub">Blend + blur + motion</div>
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

      <div class="text-xs opacity-70">CSS only · visible motion</div>
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

.aurora-stage{
  position: relative;
  height: 360px;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(180deg, rgba(20,20,30,0.08), rgba(0,0,0,0.06));
}

/* contraster + mouvement évident */
.blob{
  position:absolute;
  inset:-40%;
  border-radius:999px;
  filter: blur(46px);
  opacity: 0.95;
  will-change: transform;
}

.blob-a{
  background:
    radial-gradient(circle at 30% 35%, rgba(59,130,246,0.95), transparent 55%),
    radial-gradient(circle at 70% 65%, rgba(34,197,94,0.85), transparent 55%);
  animation: driftA 6.8s ease-in-out infinite;
}

.blob-b{
  background:
    radial-gradient(circle at 35% 70%, rgba(168,85,247,0.85), transparent 55%),
    radial-gradient(circle at 75% 30%, rgba(251,191,36,0.75), transparent 60%);
  opacity: 0.75;
  animation: driftB 8.2s ease-in-out infinite;
}

.blob-c{
  background:
    radial-gradient(circle at 55% 45%, rgba(20,184,166,0.85), transparent 55%),
    radial-gradient(circle at 25% 75%, rgba(239,68,68,0.55), transparent 62%);
  opacity: 0.55;
  animation: driftC 9.4s ease-in-out infinite;
}

.grid{
  position:absolute;
  inset:0;
  opacity: 0.14;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.28) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.20) 1px, transparent 1px);
  background-size: 56px 56px;
  mix-blend-mode: overlay;
}

.caption{
  position:absolute;
  left:16px;
  bottom:16px;
  z-index: 5;
  border-radius: 12px;
  border: 1px solid hsl(var(--bc) / 0.18);
  background: rgba(0,0,0,0.16);
  backdrop-filter: blur(10px);
  padding: 10px 12px;
}
.caption-title{ font-size:12px; font-weight:600; opacity:.92; }
.caption-sub{ margin-top:2px; font-size:11px; opacity:.72; }

@keyframes driftA{
  0%{ transform: translate3d(-6%,-4%,0) rotate(0deg) scale(1); }
  50%{ transform: translate3d(7%,5%,0) rotate(10deg) scale(1.06); }
  100%{ transform: translate3d(-6%,-4%,0) rotate(0deg) scale(1); }
}
@keyframes driftB{
  0%{ transform: translate3d(9%,-6%,0) rotate(0deg) scale(1.02); }
  50%{ transform: translate3d(-10%,7%,0) rotate(-12deg) scale(1.08); }
  100%{ transform: translate3d(9%,-6%,0) rotate(0deg) scale(1.02); }
}
@keyframes driftC{
  0%{ transform: translate3d(0%,10%,0) rotate(0deg) scale(1.04); }
  50%{ transform: translate3d(0%,-10%,0) rotate(14deg) scale(1.0); }
  100%{ transform: translate3d(0%,10%,0) rotate(0deg) scale(1.04); }
}

/* toggle (identique Sakura) */
button.glider-toggle{
  width:54px;height:28px;border-radius:999px;
  border:1px solid hsl(var(--bc)/.35)!important;
  background-color:#d1d5db!important;
  position:relative;cursor:pointer;padding:0;outline:none;
  appearance:none;-webkit-appearance:none;
  transition: background-color 180ms ease, border-color 180ms ease;
}
button.glider-toggle .glider-knob{
  width:22px;height:22px;border-radius:999px;background:#fff!important;
  box-shadow:0 2px 6px rgba(0,0,0,.25);
  position:absolute;top:50%;left:4px;transform:translateY(-50%);
  transition:left 200ms cubic-bezier(.4,0,.2,1);
}
button.glider-toggle.is-on{ background:#3b82f6!important;border-color:#3b82f6!important; }
button.glider-toggle.is-on .glider-knob{ left:28px; }

@media (prefers-reduced-motion: reduce){
  .blob{ animation:none!important; }
}
</style>
