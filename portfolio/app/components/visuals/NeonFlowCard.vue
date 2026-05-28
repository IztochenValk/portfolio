<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Neon Flow</h2>
        <p class="text-sm opacity-70">p5 · flow field, lignes fluides et organiques</p>
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
  let zoff = 0
  let cols = 0
  let rows = 0
  const scl = 16
  let flowfield = []
  let particles = []

  const resetScene = () => {
    const w = p.width
    const h = p.height
    cols = Math.floor(w / scl)
    rows = Math.floor(h / scl)
    flowfield = new Array(cols * rows)

    particles = []
    const count = Math.floor((w * h) / 4500)
    for (let i = 0; i < count; i++) {
      particles.push({
        pos: p.createVector(p.random(w), p.random(h)),
        vel: p.createVector(0, 0),
        acc: p.createVector(0, 0),
        maxSpeed: 2.3,
        hue: p.random(180, 260),
      })
    }

    p.background(255)
  }

  const applyThemeBg = () => {
    // Keep it clean: subtle translucent paint over time
    p.noStroke()
    p.fill(255, 14)
    p.rect(0, 0, p.width, p.height)
  }

  p.setup = () => {
    const parent = mountEl.value
    const w = parent?.clientWidth || 560
    const h = 280

    p.createCanvas(w, h)
    p.colorMode(p.HSB, 360, 100, 100, 100)
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

    applyThemeBg()

    let yoff = 0
    for (let y = 0; y < rows; y++) {
      let xoff = 0
      for (let x = 0; x < cols; x++) {
        const index = x + y * cols
        const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2.2
        const v = p5.Vector.fromAngle(angle)
        v.setMag(0.15)
        flowfield[index] = v
        xoff += 0.12
      }
      yoff += 0.12
    }
    zoff += 0.008

    for (const pt of particles) {
      const x = Math.floor(pt.pos.x / scl)
      const y = Math.floor(pt.pos.y / scl)
      const index = x + y * cols

      const force = flowfield[index]
      if (force) pt.acc.add(force)

      pt.vel.add(pt.acc)
      pt.vel.limit(pt.maxSpeed)
      const prev = pt.pos.copy()
      pt.pos.add(pt.vel)
      pt.acc.mult(0)

      if (pt.pos.x < 0) pt.pos.x = p.width
      if (pt.pos.x > p.width) pt.pos.x = 0
      if (pt.pos.y < 0) pt.pos.y = p.height
      if (pt.pos.y > p.height) pt.pos.y = 0

      p.stroke(pt.hue, 90, 90, 30)
      p.strokeWeight(1.2)
      p.line(prev.x, prev.y, pt.pos.x, pt.pos.y)
    }
  }

  p.keyPressed = () => {
    if (p.key === "r" || p.key === "R") resetScene()
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
