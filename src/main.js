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
import { happyLys1, happyLys2, happyLys3, happyLys4 } from './happy.js';


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
  camera 
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

  // Få stjernerne til at følge spilleren
  if (globals.activeStars.length > 0) {
    const afstandZ = 3;
    const sideAfstand = 2;
    const højde = -0.39;

    globals.activeStars.forEach((s, idx) => {
      const række = Math.floor(idx / 2);
      const side = (idx % 2 === 0) ? -1 : 1;

      s.position.set(
        spiller.position.x + side * sideAfstand,
        spiller.position.y + højde + Math.sin(Date.now() * 0.005 + idx) * 0.05,
        spiller.position.z - række * afstandZ + 10
      );
    });
  }

// Få fyrværkeriet til at følge spilleren (sidst i stars array)
if (globals.activeStars.length > 0) {
  const firework = globals.activeStars[globals.activeStars.length - 1];

  // Tjek om det er fyrværkeri
  if (firework.scale.x === 2) {
    // Få det til at følge spilleren
    firework.position.set(
      spiller.position.x,
      spiller.position.y - 0.5,
      spiller.position.z - 2
    );

    // Blink-effekt
    const blinkInterval = 50; // ms
    const time = Date.now() % (blinkInterval * 2);
    firework.visible = time < blinkInterval;
  }
}

//Får floor til at følge spillern

  // SkySphere følger spilleren, men roterer ikke
  if (window.skySphere) {
    window.skySphere.position.copy(spiller.position);
  }

  renderer.render(scene, camera);
} 
// Start animation
animate();