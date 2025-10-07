import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const manager = new THREE.LoadingManager();

// Preloadede modeller (globalt)
export let preloadedStar = null;
export let preloadedFirework = null;
export let preloadedGlitter = null;
export let preloadedRod = null;

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
loader.load('modeler/HappyLys/fireworks.glb', (gltf) => {
  preloadedFirework = gltf.scene;
  preloadedFirework.scale.set(1, 1, 1);
  preloadedFirework.userData.type = "firework";
  const fwLight = new THREE.PointLight(0xe100ff, 10, 50);
  preloadedFirework.add(fwLight);
});

// Preload glitter
loader.load('modeler/HappyLys/glitter_flow.glb', (gltf) => {
  preloadedGlitter = gltf.scene;
  preloadedGlitter.scale.set(20, 20, 20);
  preloadedGlitter.userData.type = "glitter";
});

// Preload rod
loader.load('modeler/HappyLys/rod.glb', (gltf) => {
  preloadedRod = gltf.scene;
  preloadedRod.scale.set(20, 20, 20);
  preloadedRod.userData.type = "rod";
  const rodLight = new THREE.PointLight(0xff0000, 50, 30);
  preloadedRod.add(rodLight);
});

// Stage 1 - kun lys
export function happyLys1(scene, camera, globals) {
  if (globals.stage1Added) return { lights: [], stars: [] };
  const lights = [];
  const stars = [];


  // Himmel
  const happysol1 = new THREE.DirectionalLight(0xeb1043, 1);
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

    globals.stage1Added = true;

  return { lights, stars };
}

// Stage 2 - tilføj NYE lys + stjerner
export function happyLys2(scene, camera, globals) {
  console.log("🔵 Stage 2 kaldt");
  if (globals.stage2Added) {
    console.log("⚠️ Stage 2 allerede tilføjet");
    return { lights: [], stars: [] };
  }
 if (!preloadedStar) {
    console.log("❌ Stage 2: preloadedStar er ikke klar endnu!");
    return { lights: [], stars: [] };
  }

  console.log("✅ Stage 2: Tilføjer stjerner");
  const lights = [];
  const stars = [];

    // NYE lys til stage 2
  const happysol2 = new THREE.DirectionalLight(0x13fc03, 10);
  happysol2.position.set(5, 30, 10);
  happysol2.target.position.set(10, 5, -30);
  scene.add(happysol2, happysol2.target);
  lights.push(happysol2, happysol2.target);

  const happyMåne2 = new THREE.DirectionalLight(0xeb1043, 10);
  happyMåne2.position.set(20, 10, -40);
  happyMåne2.target.position.set(10, 5, -30);
  scene.add(happyMåne2, happyMåne2.target);
  lights.push(happyMåne2, happyMåne2.target);

  const happyLamper2 = new THREE.PointLight(0x13fc03, 30, 10);
  happyLamper2.position.set(0.9, 3.5, 2.1);
  scene.add(happyLamper2);
  const happyLamper2nr2 = happyLamper2.clone();
  happyLamper2nr2.position.set(-0.9, 3.5, 2.1);
  scene.add(happyLamper2nr2);
  lights.push(happyLamper2, happyLamper2nr2);

  // Stjerner (NYE)
  const antalRækker = 10;
  for (let i = 0; i < antalRækker; i++) {
    const sLeft = preloadedStar.clone(true);
    const sRight = preloadedStar.clone(true);
    scene.add(sLeft, sRight);
    stars.push(sLeft, sRight);
  }


  console.log(`✅ Stage 2: Tilføjet ${stars.length} stjerner`);
  globals.stage2Added = true; 
  return { lights, stars };
}

// Stage 3 - tilføj kun NYE lys + fyrværkeri
export function happyLys3(scene, camera, globals) {
  console.log("🔵 Stage 3 kaldt");
  if (globals.stage3Added) {
    console.log("⚠️ Stage 3 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];

  // Fyrværkeri (NYT)
  if (preloadedFirework) {
    const firework = preloadedFirework.clone(true);
    scene.add(firework);
    stars.push(firework);
  }
console.log(`✅ Stage 3: Tilføjet ${stars.length} stjerner`);
  globals.stage3Added = true; 
  return { lights, stars };
}


// Stage 4 - tilføj kun NYE lys + glitter
export function happyLys4(scene, camera, globals) {
  console.log("🔵 Stage 4 kaldt");
  if (globals.stage4Added) {
    console.log("⚠️ Stage 4 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];

  // Glitter (NYT)
  if (preloadedGlitter) {
    const glitter = preloadedGlitter.clone(true);
    glitter.scale.set(2, 2, 2);
    scene.add(glitter);
    stars.push(glitter);
  }
console.log(`✅ Stage 4: Tilføjet ${stars.length} stjerner`);
  globals.stage4Added = true; 
  return { lights, stars };
}


// Stage 5 - tilføj kun NYE lys + rod
export function happyLys5(scene, camera, globals) {
  console.log("🔵 Stage 5 kaldt");
  if (globals.stage5Added) {
    console.log("⚠️ Stage 5 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];

  // Rod (NYT)
  if (preloadedRod) {
    const rod = preloadedRod.clone(true);
    rod.scale.set(2, 2, 2);
    scene.add(rod);
    stars.push(rod);
  }
  console.log(`✅ Stage 5: Tilføjet ${stars.length} stjerner`);
  globals.stage5Added = true; 
  return { lights, stars };
}

// Stage 6
export function happyLys6(scene, camera, globals) {
  console.log("🔵 Stage 6 kaldt");
  if (globals.stage6Added) {
    console.log("⚠️ Stage 6 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];
  
  // Tilføj dine NYE elementer her
  const nytLys = new THREE.DirectionalLight(0xff00ff, 20);
  nytLys.position.set(5, 30, 10);
  nytLys.target.position.set(10, 5, -30);
  scene.add(nytLys, nytLys.target);
  lights.push(nytLys, nytLys.target);
  
console.log(`✅ Stage 6: Tilføjet ${stars.length} stjerner`);
  globals.stage6Added = true; 
  return { lights, stars };
}


// --- Stage 7 ---
export function happyLys7(scene, camera, globals) {
  console.log("🔵 Stage 7 kaldt");
  if (globals.stage7Added) {
    console.log("⚠️ Stage 7 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  //if (!preloadedFirework) return { lights: [], stars: [] };
  const lights = [];
  const stars = [];

 console.log(`✅ Stage 7: Tilføjet ${stars.length} stjerner`);
  globals.stage7Added = true; 
  return { lights, stars };
}

// --- Stage 8 ---
export function happyLys8(scene, camera, globals) {
  console.log("🔵 Stage 8 kaldt");
  if (globals.stage8Added) {
    console.log("⚠️ Stage 8 allerede tilføjet");
    return { lights: [], stars: [] };
  }
    //if (!preloadedFirework) return { lights: [], stars: [] };
  const lights = [];
  const stars = [];
  
  console.log(`✅ Stage 8: Tilføjet ${stars.length} stjerner`);
  globals.stage8Added = true; 
  return { lights, stars };
}

// --- Stage 9 ---
export function happyLys9(scene, camera, globals) {
  console.log("🔵 Stage 9 kaldt");
  if (globals.stage9Added) {
    console.log("⚠️ Stage 9 allerede tilføjet");
    return { lights: [], stars: [] };
  }
      //if (!preloadedFirework) return { lights: [], stars: [] };
  const lights = [];
  const stars = [];

  console.log(`✅ Stage 9: Tilføjet ${stars.length} stjerner`);
  globals.stage9Added = true; 
  return { lights, stars };
}


// --- Stage 10 ---
export function happyLys10(scene, camera, globals) {
  console.log("🔵 Stage 10 kaldt");
  if (globals.stage10Added) {
    console.log("⚠️ Stage 10 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];
  console.log(`✅ Stage 10: Tilføjet ${stars.length} stjerner`);
  globals.stage10Added = true; 
  return { lights, stars };
}
