<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl">
    <div class="card-body gap-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 class="card-title">Sakura Breeze</h2>
          <p class="text-sm opacity-70">Expérimentation SVG · pétales dans la brise</p>
        </div>

        <button class="btn btn-sm btn-ghost" type="button" @click="resetAnimation">
          Reset
        </button>
      </div>

      <div
        class="sakura-shell rounded-xl border border-base-300 bg-base-100 overflow-hidden p-3"
        :class="{ 'anim-off': !animated }"
      >
        <div class="sakura-stage" :key="renderKey" v-html="svg"></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import svgRaw from "@/assets/svg/sakura-breeze.svg?raw"

const animated = ref(false)
const renderKey = ref(0)

function stripSvgStyles(raw: string) {
  return raw.replace(/<style[\s\S]*?<\/style>/gi, "")
}

const svg = ref(stripSvgStyles(String(svgRaw)))

function resetAnimation() {
  renderKey.value += 1
}
</script>

<style scoped>
/* Pause animations uniquement dans la card */
.anim-off :deep(*) {
  animation-play-state: paused !important;
}

/* Stage isolé */
.sakura-stage {
  width: 100%;
}

/* SVG injecté via v-html, donc :deep obligatoire */
.sakura-stage :deep(svg) {
  width: 100%;
  max-width: 1024px;
  height: auto;
  display: block;
  margin: 0 auto;
  overflow: visible;
}

/* Empêche toute règle svg interne de “re-déborder” */
.sakura-stage :deep(svg) :where(svg) {
  width: auto;
  height: auto;
}

/* ---------- Animations (scopées) ---------- */

/* Shadow flottante, si ton SVG a un filtre softShadow */
.sakura-stage :deep([filter="url(#softShadow)"]),
.sakura-stage :deep(.soft-shadow) {
  transform-box: fill-box;
  transform-origin: 50% 55%;
  animation: softShadowFloat 5.2s cubic-bezier(.45, 0, .55, 1) infinite;
  will-change: transform;
}

/* Fleurs qui tournent */
.sakura-stage :deep(.spin-flower) {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: spin360 9s linear infinite;
  will-change: transform;
}
.sakura-stage :deep(.spin-flower--slow) {
  animation-duration: 14s;
}
.sakura-stage :deep(.spin-flower--fast) {
  animation-duration: 6.5s;
}
.sakura-stage :deep(.spin-flower--d1) {
  animation-delay: .6s;
}
.sakura-stage :deep(.spin-flower--d2) {
  animation-delay: 1.4s;
}
.sakura-stage :deep(.spin-flower--d3) {
  animation-delay: 2.2s;
}

/* Pétales qui drift */
.sakura-stage :deep(.sakura-petal) {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: petal-drift 9s linear infinite;
  will-change: transform, opacity;
}
.sakura-stage :deep(.sakura-petal--slow) {
  animation-duration: 12s;
}
.sakura-stage :deep(.sakura-petal--fast) {
  animation-duration: 7s;
}
.sakura-stage :deep(.sakura-petal--d1) {
  animation-delay: -1.5s;
}
.sakura-stage :deep(.sakura-petal--d2) {
  animation-delay: -3.2s;
}
.sakura-stage :deep(.sakura-petal--d3) {
  animation-delay: -5.1s;
}

/* Branch sway */
.sakura-stage :deep(.branch-sway) {
  transform-box: view-box;
  transform-origin: 960px 220px;
  animation: branchSwayMain 5.8s cubic-bezier(.45, 0, .55, 1) infinite;
  will-change: transform;
}
.sakura-stage :deep(.branch-sway--secondary) {
  transform-box: view-box;
  transform-origin: 520px 635px;
  animation: branchSwaySmall 6.6s cubic-bezier(.45, 0, .55, 1) infinite;
  animation-delay: -1.2s;
  will-change: transform;
}
.sakura-stage :deep(.branch-sway--tertiary) {
  transform-box: view-box;
  transform-origin: 932.303px 509.018px;
  animation: branchSwaySmall 5.8s cubic-bezier(.45, 0, .55, 1) infinite;
  will-change: transform;
}

/* Keyframes */
@keyframes softShadowFloat {
  0% { transform: translate3d(0px, 0px, 0); }
  20% { transform: translate3d(10.6px, 2.1px, 0); }
  45% { transform: translate3d(-5.2px, 1.4px, 0); }
  70% { transform: translate3d(2.4px, -1.8px, 0); }
  90% { transform: translate3d(-1.2px, -0.8px, 0); }
  100% { transform: translate3d(0px, 0px, 0); }
}

@keyframes spin360 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes petal-drift {
  0% { transform: translate(0px, -40px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  50% { transform: translate(60px, 220px) rotate(160deg); }
  100% { transform: translate(120px, 520px) rotate(360deg); opacity: 0; }
}

@keyframes branchSwayMain {
  0% { transform: rotate(0deg) translateX(0); }
  50% { transform: rotate(-1.2deg) translateX(-6px); }
  100% { transform: rotate(0deg) translateX(0); }
}

@keyframes branchSwaySmall {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-0.6deg); }
  100% { transform: rotate(0deg); }
}

/* Toggle glider */
.glider-toggle {
  width: 54px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid hsl(var(--bc) / 0.35) !important;
  background-color: #d1d5db !important;
  position: relative;
  cursor: pointer;
  padding: 0;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  transition: background-color 180ms ease, border-color 180ms ease;
}

.glider-toggle .glider-knob {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background-color: #ffffff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  transition: left 200ms cubic-bezier(.4, 0, .2, 1);
}

.glider-toggle.is-on {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
}

.glider-toggle.is-on .glider-knob {
  left: 28px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .sakura-stage :deep(*) {
    animation: none !important;
    transition: none !important;
  }
}
</style>
