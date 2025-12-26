<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl overflow-hidden">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Prism Tilt</h2>
        <p class="text-sm opacity-70">Glass shimmer + tilt</p>
      </div>

      <div
        class="rounded-xl border border-base-300 bg-base-100 overflow-hidden p-3"
        :class="{ 'anim-off': !animated }"
        :key="renderKey"
      >
        <div class="prism-wrap" @pointermove="onMove" @pointerleave="onLeave">
          <div class="prism-card" :style="tiltStyle">
            <div class="shine"></div>
            <div class="grain"></div>

            <div class="content">
              <div class="text-sm opacity-70">Interactive</div>
              <div class="mt-1 text-xl font-semibold">Hover me</div>
              <div class="mt-2 text-sm opacity-70 max-w-[36ch]">
                Effet prisme + reflets dynamiques. Hyper clean pour un portfolio.
              </div>

              <div class="mt-5 flex gap-2">
                <span class="badge badge-outline">Glass</span>
                <span class="badge badge-outline">Shimmer</span>
                <span class="badge badge-outline">CSS</span>
              </div>
            </div>
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

      <div class="text-xs opacity-70">Pointer parallax · shimmer visible</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const animated = ref(true)
const renderKey = ref(0)
const mx = ref(0.5)
const my = ref(0.5)

function resetAnimation() {
  renderKey.value += 1
}

function onMove(e: PointerEvent) {
  if (!animated.value) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  mx.value = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
  my.value = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))
}

function onLeave() {
  mx.value = 0.5
  my.value = 0.5
}

const tiltStyle = computed(() => {
  const rx = (0.5 - my.value) * 10
  const ry = (mx.value - 0.5) * 14
  return {
    transform: animated.value ? `rotateX(${rx}deg) rotateY(${ry}deg)` : "none",
  }
})
</script>

<style scoped>
.anim-off * { animation-play-state: paused !important; }

.prism-wrap { perspective: 900px; }
.prism-card{
  position: relative;
  height: 360px;
  border-radius: 20px;
  border: 1px solid hsl(var(--bc)/.25);
  overflow: hidden;
  background:
    radial-gradient(900px 500px at 20% 20%, rgba(59,130,246,0.20), transparent 60%),
    radial-gradient(900px 500px at 80% 25%, rgba(168,85,247,0.18), transparent 60%),
    radial-gradient(900px 600px at 40% 90%, rgba(34,197,94,0.14), transparent 60%),
    linear-gradient(135deg, rgba(255,255,255,0.10), rgba(0,0,0,0.06));
  transform-style: preserve-3d;
  transition: transform 160ms cubic-bezier(.2,.8,.2,1);
  will-change: transform;
}

.shine{
  position:absolute;
  inset:-70%;
  background: linear-gradient(120deg,
    transparent 35%,
    rgba(255,255,255,0.45) 50%,
    transparent 65%
  );
  transform: translate3d(-20%,-10%,0) rotate(12deg);
  animation: sweep 2.9s ease-in-out infinite;
  opacity: 0.95;
  mix-blend-mode: overlay;
}

.grain{
  position:absolute; inset:0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  opacity: 0.10;
  mix-blend-mode: overlay;
}

.content{
  position: relative;
  z-index: 2;
  padding: 22px;
  transform: translateZ(20px);
}

@keyframes sweep{
  0%{ transform: translate3d(-28%,-12%,0) rotate(12deg); opacity: .35; }
  45%{ opacity: 1; }
  55%{ opacity: 1; }
  100%{ transform: translate3d(28%,12%,0) rotate(12deg); opacity: .35; }
}

/* toggle */
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
  .shine{ animation:none!important; }
  .prism-card{ transition:none!important; transform:none!important; }
}
</style>
