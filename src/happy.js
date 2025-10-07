import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const manager = new THREE.LoadingManager();

// Preloadede modeller (globalt)
export let preloadedStar = null;
export let preloadedFirework = null;
export let preloadedFloor = null;

manager.onLoad = () => {
  console.log("✅ Alle modeller er preloaded!");
};

// Preload stjerne
loader.load('modeler/HappyLys/star.glb', (gltf) => {
  preloadedStar = gltf.scene;
  preloadedStar.scale.set(0.5, 0.5, 0.5);
  preloadedStar.rotation.y = Math.PI;
});

// Preload fyrværkeri
loader.load('modeler/HappyLys/glitter_flow.glb', (gltf) => {
  preloadedFirework = gltf.scene;
  preloadedFirework.scale.set(2, 1, 2);
  const fwLight = new THREE.PointLight(0xe100ff, 10, 50);
  preloadedFirework.add(fwLight);
});

// Preload floor
loader.load('modeler/HappyLys/greenfloor.glb', (gltf) => {
  preloadedFloor = gltf.scene;
  preloadedFloor.scale.set(1, 1, 1
  );
});
 //test2
// Stage 1 - happy lys
export function happyLys1(scene, camera) {
  const lights = [];

  // Himmel
  const color = 0xeb1043;
  const happysol1 = new THREE.DirectionalLight(color, 1);
  happysol1.position.set(5, 30, 10);
  happysol1.target.position.set(10, 5, -30);
  scene.add(happysol1, happysol1.target);
  lights.push(happysol1, happysol1.target);

  // Måne
  const happyMåne1 = new THREE.DirectionalLight(0xeb1043, 10);
  happyMåne1.position.set(20, 10, -40);
  happyMåne1.target.position.set(10, 5, -30);
  scene.add(happyMåne1, happyMåne1.target);
  lights.push(happyMåne1, happyMåne1.target);

  // Lamper over vagten
  const happyLamper1 = new THREE.PointLight(0x10e0eb, 30, 1);
  happyLamper1.position.set(0.9, 3.5, 2.1);
  scene.add(happyLamper1);
  const happyLamper1nr2 = happyLamper1.clone();
  happyLamper1nr2.position.set(-0.9, 3.5, 2.1);
  scene.add(happyLamper1nr2);
  lights.push(happyLamper1, happyLamper1nr2);

  const stars = [];
  return { lights, stars };
}

// Stage 2 - happy lys + stjerner
export function happyLys2(scene, camera) {
  const lights = [];

  // Himmel
  const happysol2 = new THREE.DirectionalLight(0x13fc03, 1);
  happysol2.position.set(5, 30, 10);
  happysol2.target.position.set(10, 5, -30);
  scene.add(happysol2, happysol2.target);
  lights.push(happysol2, happysol2.target);

  // Måne
  const happyMåne2 = new THREE.DirectionalLight(0xeb1043, 10);
  happyMåne2.position.set(20, 10, -40);
  happyMåne2.target.position.set(10, 5, -30);
  scene.add(happyMåne2, happyMåne2.target);
  lights.push(happyMåne2, happyMåne2.target);

  // Lamper over vagten
  const happyLamper2 = new THREE.PointLight(0x13fc03, 30, 1);
  happyLamper2.position.set(0.9, 3.5, 2.1);
  scene.add(happyLamper2);
  const happyLamper1nr2 = happyLamper2.clone();
  happyLamper1nr2.position.set(-0.9, 3.5, 2.1);
  scene.add(happyLamper1nr2);
  lights.push(happyLamper2, happyLamper1nr2);

  // Stjerner
const stars = [];
  if (preloadedStar) {
    const antalRækker = 10;
    for (let i = 0; i < antalRækker; i++) {
      const sLeft = preloadedStar.clone(true);
      const sRight = preloadedStar.clone(true);
      scene.add(sLeft, sRight);
      stars.push(sLeft, sRight);
    }
  } else {
    console.warn("⚠️ Stjerne-model ikke loadet endnu!");
  }

  return { lights, stars };
}

// Stage 3 - Med fyrværkeri!
export function happyLys3(scene, camera) {
  const { lights, stars } = happyLys2(scene, camera);
let firework = null

  // Himmel
  const happysol3 = new THREE.DirectionalLight(0x00fbff, 10);
  happysol3.position.set(5, 30, 10);
  happysol3.target.position.set(10, 5, -30);
  scene.add(happysol3, happysol3.target);
  lights.push(happysol3, happysol3.target);

  // Måne
  const happyMåne3 = new THREE.DirectionalLight(0x850772, 10);
  happyMåne3.position.set(20, 10, -40);
  happyMåne3.target.position.set(10, 5, -30);
  scene.add(happyMåne3, happyMåne3.target);
  lights.push(happyMåne3, happyMåne3.target);

  // Tilføj fyrværkeri
if (preloadedFirework) {
    const firework = preloadedFirework.clone(true);
    scene.add(firework);
    stars.push(firework);
  } else {
    console.warn("⚠️ Fyrværkeri-model ikke loadet endnu!");
  }

  return { lights, stars };
}

// Stage 4 - stjerner + fyrværkeri + gulv
export function happyLys4(scene, camera) {
  // Genbrug alt fra Stage 3
const { lights, stars } = happyLys2(scene, camera);

  // Ekstra lys ovenpå Stage 3
  const happysol4 = new THREE.DirectionalLight(0xff0000, 50);
  happysol4.position.set(5, 30, 10);
  happysol4.target.position.set(10, 5, -30);
  scene.add(happysol4, happysol4.target);
  lights.push(happysol4, happysol4.target);

  const happyMåne4 = new THREE.DirectionalLight(0x00ff00, 40);
  happyMåne4.position.set(20, 10, -40);
  happyMåne4.target.position.set(10, 5, -30);
  scene.add(happyMåne4, happyMåne4.target);
  lights.push(happyMåne4, happyMåne4.target);

 // Tilføj fyrværkeri – tættere på
  if (preloadedFirework) {
    const firework = preloadedFirework.clone(true);
    firework.position.set(0, 1, -2); 
    scene.add(firework);
    stars.push(firework);
  } else {
    console.warn("⚠️ Fyrværkeri-model ikke loadet endnu!");
  }

  // Tilføj gulv (nyt element)
  if (preloadedFloor) {
    const floor = preloadedFloor.clone(true);
    floor.position.set(0, 0, 0);
    scene.add(floor);
    stars.push(floor);
  } else {
    console.warn("⚠️ Floor-model ikke loadet endnu!");
  }

  return { lights, stars };
}

// Stage 5
export function happyLys5(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}

// Stage 6
export function happyLys6(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}

// Stage 7
export function happyLys7(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}

// Stage 8
export function happyLys8(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}

// Stage 9
export function happyLys9(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}


// Stage 10 - Final stage!
export function happyLys10(scene) {
  const lights = [];
  const stars = [];
  return { lights, stars };
}