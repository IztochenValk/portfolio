<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title">Particle Network</h2>
        <p class="text-sm opacity-70">p5 · réseau interactif, attraction au curseur</p>
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
  let pts = []
  let mouse = { x: 0, y: 0, active: false }

  const resetScene = () => {
    pts = []
    const count = 70
    for (let i = 0; i < count; i++) {
      pts.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.6, 0.6),
        vy: p.random(-0.6, 0.6),
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
    p.pixelDensity(1)
    resetScene()
  }

  p.windowResized = () => {
    const parent = mountEl.value
    if (!parent) return
    p.resizeCanvas(parent.clientWidth, 280)
    resetScene()
  }

  p.mouseMoved = () => {
    mouse.x = p.mouseX
    mouse.y = p.mouseY
    mouse.active = p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height
  }

  p.mouseOut = () => {
    mouse.active = false
  }

  p.draw = () => {
    if (!animated.value) return

    p.noStroke()
    p.fill(255, 18)
    p.rect(0, 0, p.width, p.height)

    const linkDist = 95
    const attract = 0.02

    for (const a of pts) {
      if (mouse.active) {
        const dx = mouse.x - a.x
        const dy = mouse.y - a.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d > 0 && d < 160) {
          a.vx += dx * attract / 160
          a.vy += dy * attract / 160
        }
      }

      a.x += a.vx
      a.y += a.vy

      if (a.x < 0) a.x = p.width
      if (a.x > p.width) a.x = 0
      if (a.y < 0) a.y = p.height
      if (a.y > p.height) a.y = 0

      a.vx *= 0.99
      a.vy *= 0.99
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]
        const b = pts[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < linkDist) {
          const alpha = p.map(d, 0, linkDist, 22, 0)
          p.stroke(220, 25, 35, alpha)
          p.strokeWeight(1)
          p.line(a.x, a.y, b.x, b.y)
        }
      }
    }

    for (const a of pts) {
      p.noStroke()
      p.fill(220, 35, 25, 30)
      p.circle(a.x, a.y, 6)
      p.fill(220, 35, 85, 20)
      p.circle(a.x, a.y, 14)
    }
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
