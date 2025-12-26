<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Orbital Halo</h2>
        <p class="text-sm opacity-70">p5 · particules en orbite, halo dynamique</p>
      </div>

      <div
        class="rounded-xl border border-base-300 bg-base-100 overflow-hidden p-0"
        :class="{ 'anim-off': !animated }"
        :key="renderKey"
      >
        <div ref="mountEl" class="w-full h-[280px]"></div>
      </div>

      <div class="flex items-center justify-between pt-1">
        <button class="btn btn-sm btn-ghost" type="button" @click="reset">
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

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import p5 from "p5"

const mountEl = ref(null)
const animated = ref(false)
const renderKey = ref(0)

let instance = null

const createSketch = () => (p) => {
  let t = 0
  let orbs = []

  const resetScene = () => {
    orbs = []
    const count = 140
    for (let i = 0; i < count; i++) {
      orbs.push({
        a: p.random(p.TWO_PI),
        r: p.random(20, 120),
        s: p.random(0.003, 0.018),
        w: p.random(0.4, 1.6),
        hue: p.random(200, 280),
      })
    }
    p.background(255)
  }

  p.setup = () => {
    const parent = mountEl.value
    const w = parent?.clientWidth || 560
    const h = 280

    p.createCanvas(w, h)
    p.colorMode(p.HSB, 360, 100, 100, 100)
    p.noFill()
    p.pixelDensity(1)
    resetScene()
  }

  p.windowResized = () => {
    const parent = mountEl.value
    if (!parent) return
    p.resizeCanvas(parent.clientWidth, 280)
    resetScene()
  }

  p.draw = () => {
    if (!animated.value) return

    p.noStroke()
    p.fill(255, 18)
    p.rect(0, 0, p.width, p.height)

    const cx = p.width / 2
    const cy = p.height / 2

    // core halo
    p.noStroke()
    p.fill(220, 25, 95, 10)
    p.circle(cx, cy, 220)
    p.fill(260, 30, 95, 8)
    p.circle(cx, cy, 150)

    // orbit ring
    p.stroke(220, 25, 40, 12)
    p.strokeWeight(1)
    p.circle(cx, cy, 240)

    for (const o of orbs) {
      o.a += o.s
      const x = cx + Math.cos(o.a + t) * o.r * 1.45
      const y = cy + Math.sin(o.a + t) * o.r

      p.stroke(o.hue, 70, 90, 22)
      p.strokeWeight(o.w)
      p.point(x, y)

      // tiny trailing line for depth
      const x2 = cx + Math.cos(o.a + t - 0.06) * o.r * 1.45
      const y2 = cy + Math.sin(o.a + t - 0.06) * o.r
      p.stroke(o.hue, 70, 90, 10)
      p.strokeWeight(Math.max(0.6, o.w - 0.4))
      p.line(x2, y2, x, y)
    }

    t += 0.004
  }

  p.__resetScene = resetScene
}

const mount = () => {
  if (!mountEl.value) return
  instance = new p5(createSketch(), mountEl.value)
}

const unmount = () => {
  if (instance) {
    instance.remove()
    instance = null
  }
}

const reset = () => {
  renderKey.value += 1
}

watch(renderKey, () => {
  unmount()
  mount()
})

onMounted(mount)
onBeforeUnmount(unmount)
</script>

<style>
.anim-off canvas {
  filter: saturate(1.05);
}

button.glider-toggle {
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

button.glider-toggle .glider-knob {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background-color: #ffffff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  transition: left 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

button.glider-toggle.is-on {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
}

button.glider-toggle.is-on .glider-knob {
  left: 28px;
}
</style>
