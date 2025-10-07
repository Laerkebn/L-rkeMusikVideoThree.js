import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sound from './sound.js';
import { loadCity } from './city.js';
import { loadPerson } from './spiller.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { loadLys } from './lys.js';
import { setupKeyboard } from './knapper.js';
import { happyLys1, happyLys2, happyLys3, happyLys4, happyLys5, happyLys6, happyLys7, happyLys8, happyLys9, happyLys10} from './happy.js';


// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

// Scene
const scene = new THREE.Scene();

// kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

//popup
const popup = document.getElementById("popup");

popup.querySelector("#closePopup").addEventListener("click", () => {
popup.style.display = "none";
});

// lys 
loadLys(scene);

// Tilføj byen + baggrund + objekter
loadCity(scene);

//tilføj spiller og hænder
const spiller = loadPerson(scene, camera);

// PointerLockControls
const controls = new PointerLockControls(camera, renderer.domElement);
document.body.addEventListener('click', () => {
  controls.lock();
});

// Responsive window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lyd setup
const soundFarve = new Sound(camera);  // den primære lyd
soundFarve.loadSound('/public/lyd/farve.mp3'); 

const soundGraa = new Sound(camera);   // den alternative lyd
soundGraa.loadSound('/public/lyd/graa.mp3');

// Globale variabler, som keyboard.js og animate kan bruge
const globals = {
  isSpacePressed: false,
  hastighed: 0,
  activeHappyLights: [],
  activeStars: [],
  spaceCount: 0,
  counterDiv: document.getElementById("spaceCounter"),
  soundFarve,
  soundGraa,
  camera, 
  stage1Added: false,
  stage2Added: false,
  stage3Added: false,
  stage4Added: false,
  stage5Added: false,
  stage6Added: false,
  stage7Added: false,
  stage8Added: false,
  stage9Added: false,
  stage10Added: false
};

// Setup keyboard events (styrer lys/stjerner på space-klik)
setupKeyboard(scene, globals);

// Animation
const maxHastighed = 0.07;
const acceleration = 0.01;

function animate() {
  requestAnimationFrame(animate);

  // Bevæger spilleren fremad hvis space holdes
if (globals.isSpacePressed) {
    globals.hastighed += acceleration;
    globals.hastighed = Math.min(globals.hastighed, maxHastighed);
    spiller.position.z -= globals.hastighed;
    spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
  }

  // Kamera følger spilleren
  camera.position.copy(spiller.position).add(new THREE.Vector3(0, 1.5, 0));
// Opdater alle aktive objekter
globals.activeStars.forEach((s) => {
  // Fyrværkeri (følger kameraet og blinker)
  if (s.userData.type === "firework") {
    const offset = new THREE.Vector3(0, 0, -3);
    offset.applyQuaternion(camera.quaternion);
    s.position.copy(camera.position).add(offset);

    const blinkSpeed = 50;
    const time = Date.now() % (blinkSpeed * 2);
    s.visible = time < blinkSpeed;
    return; // Spring stjerne-logik over
  }

  // Glitter (følger kameraet)
  if (s.userData.type === "glitter") {
    const amplitude = 20;
    const speed = 0.002;

    s.position.set(
      camera.position.x,
      0,
      camera.position.z + Math.sin(Date.now() * speed) * amplitude
    );
    return; // Spring stjerne-logik over
  }

  // Rod
  if (s.userData.type === "rod") {
    const amplitude = 20;
    const speed = 0.002;
    s.position.set(
      camera.position.x,
      0,
      camera.position.z + Math.sin(Date.now() * speed) * amplitude
    );
    return; // Spring stjerne-logik over
  }

  // 🌟 Stjerner (følger spilleren) - FIXED: fjernet isFirework check
  const idx = globals.activeStars.indexOf(s);
  const afstandZ = 3;
  const sideAfstand = 2;
  const højde = -0.39;
  const række = Math.floor(idx / 2);
  const side = (idx % 2 === 0) ? -1 : 1;

  s.position.set(
    spiller.position.x + side * sideAfstand,
    spiller.position.y + højde + Math.sin(Date.now() * 0.005 + idx) * 0.05,
    spiller.position.z - række * afstandZ + 10
  );
});

  // SkySphere følger spilleren (men roterer ikke)
  if (window.skySphere) {
    window.skySphere.position.copy(spiller.position);
  }

  // Tegn scenen
  renderer.render(scene, camera);
}

// Start animation
animate();