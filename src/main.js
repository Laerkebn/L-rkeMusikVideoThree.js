import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sound from './sound.js';
import { loadCity } from './city.js';
import { loadPerson } from './spiller.js';


// Scene
const scene = new THREE.Scene();

// kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// lys
const ambientLight = new THREE.AmbientLight(0x7393B3, 1); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tilføj byen + baggrund + objekter
loadCity(scene);


//tilføj spiller og hænder
const spiller = loadPerson(scene, camera);

let isSpacePressed = false;

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

// Spiller kontrol (kun fremad)
let hastighed = 0
const maxHastighed = 0.05; // Maksimal hastighed
const acceleration = 0.01; // Acceleration pr. frame
window.addEventListener('keydown', (event) => {
  if(event.key === ' ' || event.key === 'Space') {
    isSpacePressed = true;
    hastighed += acceleration;
    hastighed = Math.min(hastighed, maxHastighed); // Maks hastighed
  };
});

// Når man slipper space → stop farvelyd, spil grålyd
window.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    isSpacePressed = false;
    soundFarve.pauseSound();
    soundGraa.playSound();
    hastighed = 0; // stop
  }
});

// Lyd setup
const soundFarve = new Sound(camera);  // den primære lyd
soundFarve.loadSound('/lyd/farve.mp3');

const soundGraa = new Sound(camera);   // den alternative lyd
soundGraa.loadSound('/lyd/graa.mp3');

// Når man trykker space → spil farve, stop grå
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    soundGraa.pauseSound();
    soundFarve.playSound();
  }
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  if (isSpacePressed) {
    spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05; // Let op og ned bevægelse 
  }
  // Kamera følger spilleren
  spiller.position.z -= hastighed;
  
  //console.log(hastighed);
  camera.position.copy(spiller.position).add(new THREE.Vector3(0, 1.5, 0));

  // SkySphere følger spilleren, men roterer ikke
  if (window.skySphere) {
    window.skySphere.position.copy(spiller.position);
  }

  renderer.render(scene, camera);
}

// Start animation
animate();
