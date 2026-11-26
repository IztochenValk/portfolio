<template>
  <div
    class="absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full"
    />
    <!-- Fondu vers la section suivante -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-base-100" />
  </div>
</template>

<script setup lang="ts">
// Réseau de particules léger en canvas natif (pas de dépendance).
// Lent et discret : points qui dérivent, liens quand ils sont proches,
// légère attraction au curseur. Couleur reprise du thème DaisyUI.
const canvas = ref<HTMLCanvasElement | null>(null)

type P = { x: number, y: number, vx: number, vy: number }

let raf = 0
let particles: P[] = []
let w = 0
let h = 0
let dpr = 1
let color = "99, 102, 241"
const mouse = { x: -9999, y: -9999 }
const LINK = 140

function readColor() {
  const probe = document.createElement("span")
  probe.className = "text-primary"
  probe.style.display = "none"
  document.body.appendChild(probe)
  const css = getComputedStyle(probe).color
  probe.remove()
  // DaisyUI 5 renvoie de l'oklch : on laisse le canvas convertir en RGB
  const c = document.createElement("canvas").getContext("2d")
  if (!c) return
  c.fillStyle = css
  c.fillRect(0, 0, 1, 1)
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data
  color = `${r}, ${g}, ${b}`
}

function resize() {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth
  h = el.clientHeight
  el.width = w * dpr
  el.height = h * dpr
  // Densité proportionnelle à la surface, plafonnée pour rester léger
  const count = Math.min(90, Math.round((w * h) / 16000))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }))
}

function frame(animate: boolean) {
  const ctx = canvas.value?.getContext("2d")
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    if (animate) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const d = Math.hypot(dx, dy)
      if (d < 180 && d > 1) {
        p.vx += (dx / d) * 0.004
        p.vy += (dy / d) * 0.004
      }
      p.vx *= 0.995
      p.vy *= 0.995
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
    }
    ctx.fillStyle = `rgba(${color}, 0.55)`
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]!
      const b = particles[j]!
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d < LINK) {
        ctx.strokeStyle = `rgba(${color}, ${0.22 * (1 - d / LINK)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }
}

function loop() {
  frame(true)
  raf = requestAnimationFrame(loop)
}

function onMove(e: PointerEvent) {
  const r = canvas.value?.getBoundingClientRect()
  if (!r) return
  mouse.x = e.clientX - r.left
  mouse.y = e.clientY - r.top
}
function onLeave() {
  mouse.x = mouse.y = -9999
}
function onVisibility() {
  cancelAnimationFrame(raf)
  if (!document.hidden && !reduced) raf = requestAnimationFrame(loop)
}

let reduced = false
let observer: MutationObserver | undefined

onMounted(() => {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  readColor()
  resize()
  window.addEventListener("resize", resize)
  window.addEventListener("pointermove", onMove)
  document.addEventListener("pointerleave", onLeave)
  document.addEventListener("visibilitychange", onVisibility)
  // Le thème clair/sombre change data-theme sur <html> : on relit la couleur
  observer = new MutationObserver(readColor)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] })
  if (reduced) frame(false)
  else raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener("resize", resize)
  window.removeEventListener("pointermove", onMove)
  document.removeEventListener("pointerleave", onLeave)
  document.removeEventListener("visibilitychange", onVisibility)
  observer?.disconnect()
})
</script>
