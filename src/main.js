import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sound from './sound.js';
import { loadCity } from './city.js';
import { loadPerson } from './spiller.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { loadLys } from './lys.js';
import { happyLys } from './happy.js';

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
//const popup = document.getElementById("popup");

//popup.querySelector("#closePopup").addEventListener("click", () => {
//popup.style.display = "none";
//});

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
soundFarve.loadSound('/lyd/farve.mp3');

const soundGraa = new Sound(camera);   // den alternative lyd
soundGraa.loadSound('/lyd/graa.mp3');

// Mellemrums events:
let spaceCount = 0;
let isSpacePressed = false;
let hastighed = 0;
let activeHappyLights = [];
const maxHastighed = 0.07; // Maksimal hastighed
const acceleration = 0.01; // Acceleration pr. frame
const maxSpace = 10;
const counterDiv = document.getElementById("spaceCounter");

// Hvis keydown klikkes:
window.addEventListener('keydown', (event) => {
  if(event.code === 'Space' && !event.repeat) {

    // Sæt karakter til at bevæge sig
    isSpacePressed = true;

    // Opdater tæller (+1) for hvert klik
    if(spaceCount < maxSpace) {
      spaceCount++;
      counterDiv.textContent = `Space presses: ${spaceCount}`;
    }

    // Happy lys når space = 1
    if(spaceCount === 1 && activeHappyLights.length === 0) {
      activeHappyLights = happyLys(scene);
    } 
    // Fjern happy lys hvis spaceCount ikke længere = 1
    else if(spaceCount !== 1 && activeHappyLights.length > 0) {
      activeHappyLights.forEach(light => scene.remove(light));
      activeHappyLights = [];
    }

    // Trigger special event hvis maxSpace er nået
    if(spaceCount === maxSpace) {
      triggerSpecialEvent();
    }

    // Musik
    soundGraa.pauseSound();
    soundFarve.playSound();
  }
});

// Hvis keyup klikkes:
window.addEventListener('keyup', (event) => {
  if(event.code === 'Space') {
    // Stop karakteren
    isSpacePressed = false;
    hastighed = 0;

    // Musik
    soundFarve.pauseSound();
    soundGraa.playSound();
  }
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  if (isSpacePressed) {
    // Acceleration: karakteren går hurtigere, når space holdes
    hastighed += acceleration;
    hastighed = Math.min(hastighed, maxHastighed);

    // Bevæg karakter frem
    spiller.position.z -= hastighed;

    // Let op-ned bevægelse
    spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
  }

  // Kamera følger spilleren
  camera.position.copy(spiller.position).add(new THREE.Vector3(0, 1.5, 0));

  // SkySphere følger spilleren, men roterer ikke
  if (window.skySphere) {
    window.skySphere.position.copy(spiller.position);
  }

  renderer.render(scene, camera);
}

// Start animation
animate();