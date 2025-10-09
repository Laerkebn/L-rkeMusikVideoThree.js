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
import { happyLys1, happyLys2, happyLys3, happyLys4, happyLys5, happyLys6, happyLys7, happyLys8} from './happy.js';
import { startAnimation } from './animate.js';

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
};


// Setup keyboard events (styrer lys/stjerner på space-klik)
setupKeyboard(scene, globals);

// Start animationen (dette starter animate loop'et)
startAnimation(scene, camera, spiller, globals, renderer);

