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
export let preloadedSmoke = null
export let preloadeSmokeRing = null
export let preloadedTunnel = null

manager.onLoad = () => {
  //console.log("✅ Alle modeller er preloaded!");
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
  preloadedRod.scale.set(10, 10, 10);
  preloadedRod.userData.type = "rod";
  const rodLight = new THREE.PointLight(0xff0000, 50, 30);
  preloadedRod.add(rodLight);
});

//preloade smoke
loader.load('modeler/HappyLys/smoke_effect_blue.glb', (gltf) => {
  preloadedSmoke = gltf.scene;
  preloadedSmoke.scale.set(1, 1, 1);
  preloadedSmoke.userData.type = "smoke";
  const smokeLight = new THREE.PointLight(0xff0000, 50, 30);
  preloadedSmoke.add(smokeLight);
});

//preloade smokeRing
loader.load('modeler/HappyLys/smokeRing.glb', (gltf) => {
  preloadeSmokeRing = gltf.scene;
  preloadeSmokeRing.scale.set(1, 1, 1);
  preloadeSmokeRing.userData.type = "smokeRing";
  const smokeRingLight = new THREE.PointLight(0xff0000, 50, 30);
  preloadeSmokeRing.add(smokeRingLight);
});


//preloade Tunnel
loader.load('modeler/HappyLys/tunnel.glb', (gltf) => {
  preloadedTunnel = gltf.scene;
  preloadedTunnel.scale.set(2, 2, 2);
  preloadedTunnel.userData.type = "tunnel";
  const tunnelLight = new THREE.PointLight(0xff0000, 50, 30);
  preloadedTunnel.add(tunnelLight);
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
  //console.log("🔵 Stage 2 kaldt");
  if (globals.stage2Added) {
    //console.log("⚠️ Stage 2 allerede tilføjet");
    return { lights: [], stars: [] };
  }
 if (!preloadedStar) {
    //console.log("❌ Stage 2: preloadedStar er ikke klar endnu!");
    return { lights: [], stars: [] };
  }

  //console.log("✅ Stage 2: Tilføjer stjerner");
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


  //console.log(`✅ Stage 2: Tilføjet ${stars.length} stjerner`);
  globals.stage2Added = true; 
  return { lights, stars };
}

// Stage 3 - tilføj kun NYE lys + fyrværkeri
export function happyLys3(scene, camera, globals) {
  //console.log("🔵 Stage 3 kaldt");
  if (globals.stage3Added) {
    //console.log("⚠️ Stage 3 allerede tilføjet");
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
//console.log(`✅ Stage 3: Tilføjet ${stars.length} stjerner`);
  globals.stage3Added = true; 
  return { lights, stars };
}


// Stage 4 - tilføj kun NYE lys + glitter
export function happyLys4(scene, camera, globals) {
  //.log("🔵 Stage 4 kaldt");
  if (globals.stage4Added) {
    //console.log("⚠️ Stage 4 allerede tilføjet");
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
//console.log(`✅ Stage 4: Tilføjet ${stars.length} stjerner`);
  globals.stage4Added = true; 
  return { lights, stars };
}


// Stage 5 - tilføj kun NYE lys + rod
export function happyLys5(scene, camera, globals) {
  //console.log("🔵 Stage 5 kaldt");
  if (globals.stage5Added) {
    //console.log("⚠️ Stage 5 allerede tilføjet");
    return { lights: [], stars: [] };

  }
  const lights = [];
  const stars = [];

  // Rod (NYT)
  if (preloadedRod) {
    const rod = preloadedRod.clone(true);
    rod.scale.set(5, 5, 5);
    // Permanent rotation
    rod.rotation.set(Math.PI /0.1, Math.PI / 1, 5);

    scene.add(rod);
    stars.push(rod);
  }

  globals.stage5Added = true; 
  return { lights, stars };
}

// Stage 6
export function happyLys6(scene, camera, globals) {
  //console.log("🔵 Stage 6 kaldt");
  if (globals.stage6Added) {
   // console.log("⚠️ Stage 6 allerede tilføjet");
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];
  
  // NYE elementer 
  const nytLys = new THREE.DirectionalLight(0xff00ff, 20);
  nytLys.position.set(5, 30, 10);
  nytLys.target.position.set(10, 5, -30);
  scene.add(nytLys, nytLys.target);
  lights.push(nytLys, nytLys.target);
  
// smoke (NYT)
  if (preloadedSmoke) {
    const smoke = preloadedSmoke.clone(true);
    smoke.position.set(0, 2, -10); // Sæt initial position
    smoke.scale.set(0.03, 0.03, 0.03); // Meget mindre størrelse først
    //console.log("✅ Smoke tilføjet til scene"); // DEBUG

    scene.add(smoke);
    stars.push(smoke);
  }

  globals.stage6Added = true; 
  return { lights, stars }; 
}

// --- Stage 7 ---
export function happyLys7(scene, camera, globals) {
  //.log("🔵 Stage 7 kaldt");
  if (globals.stage7Added) {
    return { lights: [], stars: [] };
  }
  const lights = [];
  const stars = [];

  // smokeRing (NYT)
 if (preloadeSmokeRing) {
  const smokeRing = preloadeSmokeRing.clone(true);
  smokeRing.position.set(0, 10, -10);
smokeRing.scale.set(3, 3, 3);

  scene.add(smokeRing);
  stars.push(smokeRing);
}

  globals.stage7Added = true; 
  return { lights, stars };
}

// Stage 8
export function happyLys8(scene, camera, globals) {
  if (globals.stage8Added) {
    return { lights: [], stars: [] };
  }

  const lights = [];
  const stars = [];

  if (preloadedTunnel) {
    const tunnel = preloadedTunnel.clone(true);

    tunnel.position.set(0, 0, 0); 
    tunnel.rotation.x = -Math.PI / 2;
    tunnel.rotation.y = Math.PI;

    const tunnelLight = new THREE.PointLight(0xffffff, 200, 500);
    tunnel.add(tunnelLight);  // lys følger tunnelen

    scene.add(tunnel);
    stars.push(tunnel, tunnelLight);

    globals.tunnel = tunnel; // 💾 Gem referencen
  }

  globals.stage8Active = true;
  globals.stage8Added = true;

  console.log("🚀 Stage 8 aktiveret!");
  return { lights, stars };
}

