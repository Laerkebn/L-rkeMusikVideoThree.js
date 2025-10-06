import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Stage 1 - happy lys
export function happyLys1(scene) {
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
export function happyLys2(scene) {
  const lights = [];

  // Himmel
  const happysol1 = new THREE.DirectionalLight(0x13fc03, 1);
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
  const happyLamper1 = new THREE.PointLight(0x13fc03, 30, 1);
  happyLamper1.position.set(0.9, 3.5, 2.1);
  scene.add(happyLamper1);
  const happyLamper1nr2 = happyLamper1.clone();
  happyLamper1nr2.position.set(-0.9, 3.5, 2.1);
  scene.add(happyLamper1nr2);
  lights.push(happyLamper1, happyLamper1nr2);

  // ⭐ Stjerner
  const loader = new GLTFLoader();
  const stars = [];
  const antalRækker = 10;

  loader.load('modeler/HappyLys/star.glb', (gltf) => {
    const baseStar = gltf.scene;
    baseStar.scale.set(0.5, 0.5, 0.5);
    baseStar.rotation.y = Math.PI;

    for (let i = 0; i < antalRækker; i++) {
      const sLeft = baseStar.clone(true);
      const sRight = baseStar.clone(true);
      scene.add(sLeft, sRight);
      stars.push(sLeft, sRight);
    }
  });

  return { lights, stars };
}

// Stage 3 - Design your own!
export function happyLys3(scene) {     
  const lights = [];

  // Himmel
  const happysol1 = new THREE.DirectionalLight(0x00fbff, 10);
  happysol1.position.set(5, 30, 10);
  happysol1.target.position.set(10, 5, -30);
  scene.add(happysol1, happysol1.target);
  lights.push(happysol1, happysol1.target);

  // Måne
  const happyMåne1 = new THREE.DirectionalLight(0x850772, 10);
  happyMåne1.position.set(20, 10, -40);
  happyMåne1.target.position.set(10, 5, -30);
  scene.add(happyMåne1, happyMåne1.target);
  lights.push(happyMåne1, happyMåne1.target);

  // ⭐ Stjerner
  const loader = new GLTFLoader();
  const stars = [];
  const antalRækker = 10;

  loader.load('modeler/HappyLys/star.glb', (gltf) => {
    const baseStar = gltf.scene;
    baseStar.scale.set(0.5, 0.5, 0.5);
    baseStar.rotation.y = Math.PI;

    for (let i = 0; i < antalRækker; i++) {
      const sLeft = baseStar.clone(true);
      const sRight = baseStar.clone(true);
      scene.add(sLeft, sRight);
      stars.push(sLeft, sRight);
    }
  });

/// 🔹 Load firework og hæft på kameraet
loader.load('public/modeler/HappyLys/fireworkred.glb', (gltf) => {
  const firework = gltf.scene;
   firework.scale.set(2, 1, 2);
  firework.position.set(0, -2, -2); // placering i forhold til spilleren
  camera.add(firework); // Fyrværkeriet følger kameraets rotation

  // 🔹 Opret lys der følger fyrværkeriet
  const fwLight = new THREE.PointLight(0xe100ff, 10, 50);
  fwLight.position.set(0, 0, 0); 
  firework.add(fwLight);

  window.firework = { white: firework, light: fwLight };
});
  return { lights, stars };
}

// Stage 4
export function happyLys4(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 5
export function happyLys5(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 6
export function happyLys6(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 7
export function happyLys7(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 8
export function happyLys8(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 9
export function happyLys9(scene) {
  const lights = [];
  const stars = [];

  // Your design here

  return { lights, stars };
}

// Stage 10 - Final stage!
export function happyLys10(scene) {
  const lights = [];
  const stars = [];

  // Your epic finale design here

  return { lights, stars };
}