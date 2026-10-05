import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

// Escultura homínida generada como campo de distancias con signo (SDF):
// cápsulas ahusadas y elipsoides unidos con una unión suave, que da hombros,
// cuello y caderas continuos en vez de piezas pegadas. Luego se poligoniza
// una sola vez con marching cubes. Medidas en metros, figura mirando a +z.

const smin = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * k * 0.25
}

function capsule(a, b, ra, rb, k = 0.04) {
  const ba = new THREE.Vector3().subVectors(b, a)
  const l2 = ba.lengthSq()
  return {
    k,
    box: aabb([a, b], Math.max(ra, rb)),
    d(x, y, z) {
      const px = x - a.x, py = y - a.y, pz = z - a.z
      let h = (px * ba.x + py * ba.y + pz * ba.z) / l2
      h = h < 0 ? 0 : h > 1 ? 1 : h
      const dx = px - ba.x * h, dy = py - ba.y * h, dz = pz - ba.z * h
      return Math.sqrt(dx * dx + dy * dy + dz * dz) - (ra + (rb - ra) * h)
    },
  }
}

// Elipsoide (aproximación de Inigo Quilez), con giro opcional sobre el eje x.
function ellipsoid(c, r, k = 0.04, rotX = 0) {
  const cs = Math.cos(-rotX), sn = Math.sin(-rotX)
  const R = Math.max(r.x, r.y, r.z)
  return {
    k,
    box: aabb([c], R),
    d(x, y, z) {
      let px = x - c.x, py = y - c.y, pz = z - c.z
      if (rotX) {
        const ny = py * cs - pz * sn
        pz = py * sn + pz * cs
        py = ny
      }
      const k0 = Math.sqrt((px / r.x) ** 2 + (py / r.y) ** 2 + (pz / r.z) ** 2)
      const k1 = Math.sqrt((px / (r.x * r.x)) ** 2 + (py / (r.y * r.y)) ** 2 + (pz / (r.z * r.z)) ** 2)
      return k1 === 0 ? -Math.min(r.x, r.y, r.z) : (k0 * (k0 - 1)) / k1
    },
  }
}

function aabb(points, pad) {
  const min = new THREE.Vector3(Infinity, Infinity, Infinity)
  const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity)
  points.forEach((p) => {
    min.min(p)
    max.max(p)
  })
  return { min: min.subScalar(pad), max: max.addScalar(pad) }
}

const V = (x, y, z) => new THREE.Vector3(x, y, z)
const dirFrom = (fwd, side = 0) => V(side, -Math.cos(fwd), Math.sin(fwd)).normalize()

export function buildPrimitives(body, cc) {
  const { h, leg, arm, lean, knee, shoulders, jaw, brow, bulk } = body
  const funnel = body.funnel ?? 0
  const glob = body.glob ?? 0.3
  const P = []

  const legL = h * leg
  const thigh = legL * 0.52
  const shin = legL * 0.48
  const torso = h * 0.3
  const armL = h * arm
  const upper = armL * 0.47
  const fore = armL * 0.43
  const sw = h * shoulders * bulk
  const R = 0.098 * Math.cbrt(cc / 1350)
  const lr = (0.038 + 0.014 * bulk) * (h / 1.6) + 0.012
  const hw = sw * 0.2

  // Piernas: la izquierda relajada (rodilla algo flexionada, pie adelantado).
  const a1s = [knee * 0.9 + 0.1, knee * 0.9]
  const a2s = [a1s[0] - (knee * 1.7 + 0.22), a1s[1] - knee * 1.7]
  const hipY = 0.075 + thigh * Math.cos(a1s[1]) + shin * Math.cos(a2s[1])
  ;[-1, 1].forEach((s, i) => {
    const hip = V(s * hw, hipY, 0)
    const kneeP = hip.clone().addScaledVector(dirFrom(a1s[i], s * 0.04), thigh)
    const ankle = kneeP.clone().addScaledVector(dirFrom(a2s[i], s * 0.01), shin)
    P.push(capsule(hip, kneeP, lr * 1.55, lr * 1.08, 0.05))
    P.push(capsule(kneeP, ankle, lr * 1.12, lr * 0.62, 0.03))
    // Gemelo
    P.push(ellipsoid(kneeP.clone().lerp(ankle, 0.3).add(V(0, 0, -lr * 0.35)), V(lr * 0.95, shin * 0.22, lr * 0.95), 0.03))
    P.push(ellipsoid(V(ankle.x, Math.max(ankle.y - 0.03, 0.03), ankle.z + 0.055), V(0.042, 0.03, 0.105 + 0.01 * bulk), 0.03))
  })

  // Tronco, inclinado hacia delante `lean` radianes.
  const u = V(0, Math.cos(lean), Math.sin(lean))
  const pelvis = V(0, hipY + 0.03, 0)
  const at = (k) => pelvis.clone().addScaledVector(u, torso * k)
  P.push(ellipsoid(at(0.05), V(sw * 0.37, 0.11, 0.115 * bulk), 0.06, lean))
  P.push(ellipsoid(at(0.36), V(sw * (0.29 + funnel * 0.06), torso * 0.3, 0.1 * bulk), 0.07, lean))
  // Caja torácica: en embudo (ancha abajo) en australopitecos, en barril en Homo.
  P.push(ellipsoid(at(0.6), V(sw * (0.33 + funnel * 0.05), torso * 0.26, 0.12 * bulk), 0.07, lean))
  P.push(ellipsoid(at(0.8), V(sw * (0.38 - funnel * 0.07), torso * 0.2, 0.11 * bulk), 0.06, lean))
  // Glúteos
  P.push(ellipsoid(at(0.04).add(V(0, -0.02, -0.06)), V(sw * 0.33, 0.1, 0.09), 0.05, lean))

  // Brazos: cuelgan casi verticales; en las especies antiguas, más largos.
  const shoulderLine = at(0.9)
  ;[-1, 1].forEach((s) => {
    const sh = shoulderLine.clone().add(V(s * sw * 0.42, -0.015, -0.01))
    const ud = V(s * 0.1, -1, 0.04 + lean * 0.2).normalize()
    const elbow = sh.clone().addScaledVector(ud, upper)
    const fd = V(s * 0.04, -1, 0.22 + lean * 0.25).normalize()
    const wrist = elbow.clone().addScaledVector(fd, fore)
    P.push(ellipsoid(sh.clone().add(V(s * 0.01, 0.005, 0)), V(lr * 1.35, lr * 1.25, lr * 1.35), 0.05))
    P.push(capsule(sh, elbow, lr * 1.08, lr * 0.82, 0.04))
    P.push(capsule(elbow, wrist, lr * 0.85, lr * 0.6, 0.03))
    P.push(ellipsoid(wrist.clone().addScaledVector(fd, 0.055), V(0.022, 0.06, 0.04), 0.025))
    // Trapecio: une hombro y cuello
    P.push(capsule(sh.clone().add(V(-s * 0.02, 0.01, 0)), at(1.0).add(V(0, 0.02, -0.01)), lr * 0.8, lr * 0.9, 0.05))
  })

  // Cuello y cabeza. La cabeza se mantiene erguida aunque el tronco se incline.
  const neckBase = at(0.98)
  const nd = V(0, Math.cos(lean * 0.55), Math.sin(lean * 0.55))
  const headBase = neckBase.clone().addScaledVector(nd, 0.08)
  P.push(capsule(neckBase, headBase, lr * 1.0, lr * 0.92, 0.04))
  const hc = headBase.clone().add(V(0, R * 0.58, R * 0.16))
  // Bóveda craneal: globular en sapiens, larga y baja en el resto.
  P.push(ellipsoid(hc.clone().add(V(0, R * (0.12 + 0.12 * glob), -R * (0.1 + 0.14 * (1 - glob)))), V(R * 0.9, R * (0.74 + 0.22 * glob), R * (1.1 - 0.06 * glob)), 0.02))
  // Cara y hocico, mandíbula, arco superciliar, nariz y mentón.
  const face = hc.clone().add(V(0, -R * 0.42, R * 0.5 + jaw * 0.03))
  P.push(ellipsoid(face, V(0.052, 0.07, 0.05 + jaw * 0.028), 0.025))
  P.push(ellipsoid(hc.clone().add(V(0, -R * 0.95, R * 0.36 + jaw * 0.035)), V(0.043, 0.026, 0.042 + jaw * 0.024), 0.02))
  if (brow > 0.1) {
    const by = R * 0.05
    const bz = R * 0.7 + jaw * 0.02
    P.push(capsule(hc.clone().add(V(-0.045, by, bz - 0.01)), hc.clone().add(V(0.045, by, bz - 0.01)), 0.008 + brow * 0.012, 0.008 + brow * 0.012, 0.015))
  }
  P.push(ellipsoid(face.clone().add(V(0, R * 0.02, 0.04 + jaw * 0.015)), V(0.013 + bulk * 0.004, 0.022, 0.016 + (1 - jaw) * 0.006), 0.012))
  if (glob > 0.9) P.push(ellipsoid(hc.clone().add(V(0, -R * 1.12, R * 0.6)), V(0.02, 0.016, 0.014), 0.015))
  ;[-1, 1].forEach((s) => P.push(ellipsoid(hc.clone().add(V(s * R * 0.86, -R * 0.05, -R * 0.05)), V(0.012, 0.026, 0.018), 0.012)))

  return P
}

const cache = new Map()

// Devuelve un Mesh (MarchingCubes) ya poligonizado; el material se aporta fuera.
export function buildHomininMesh(id, body, cc, material, res = 92) {
  if (cache.has(id)) return cache.get(id)
  const prims = buildPrimitives(body, cc)
  const S = Math.max(body.h + 0.25, 1.2) // lado del cubo de muestreo
  const cy = S / 2 - 0.02
  const mc = new MarchingCubes(res, material, false, false, 200000)
  mc.isolation = 0
  const half = res / 2
  const f = mc.field
  const cell = S / res
  for (let k = 0; k < res; k++) {
    const z = ((k - half) / half) * (S / 2)
    for (let j = 0; j < res; j++) {
      const y = ((j - half) / half) * (S / 2) + cy
      for (let i = 0; i < res; i++) {
        const x = ((i - half) / half) * (S / 2)
        let d = Infinity
        for (let p = 0; p < prims.length; p++) {
          const pr = prims[p]
          const b = pr.box
          // Descarta primitivas lejanas sin evaluarlas.
          if (x < b.min.x - pr.k || x > b.max.x + pr.k || y < b.min.y - pr.k || y > b.max.y + pr.k || z < b.min.z - pr.k || z > b.max.z + pr.k) continue
          d = smin(d, pr.d(x, y, z), pr.k)
        }
        // MarchingCubes considera «dentro» los valores altos.
        f[i + j * res + k * res * res] = d === Infinity ? -cell * 4 : -d
      }
    }
  }
  mc.update()
  mc.scale.setScalar(S / 2)
  mc.position.y = cy
  mc.frustumCulled = false
  cache.set(id, mc)
  return mc
}
