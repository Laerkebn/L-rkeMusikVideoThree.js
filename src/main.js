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
import { setupKeyboard } from './knapper.js';
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

// happy lys:
 // Himmel
    const color = 0x13fc03;
    const intensity = 1;
    const happysol1 = new THREE.DirectionalLight(color, intensity);
    happysol1.position.set(5, 30, 10);
    happysol1.target.position.set(10, 5, -30);
    scene.add(happysol1);
    scene.add(happysol1.target);

    // Måne
    const happyMåne1 = new THREE.DirectionalLight(0xeb1043, 10);
    happyMåne1.position.set(20, 10, -40);
    happyMåne1.target.position.set(10, 5, -30);
    scene.add(happyMåne1);
    scene.add(happyMåne1.target);
   

    // Lamper over vagten
    const happyLamper1 = new THREE.PointLight(0x13fc03, 30, 1);
    happyLamper1.position.set(0.9, 3.5, 2.1);
    scene.add(happyLamper1);
    const happyLamper1nr2 = happyLamper1.clone();
    happyLamper1nr2.position.set(-0.9, 3.5, 2.1);
    scene.add(happyLamper1nr2);

 // star
 let star;

const loaderstar = new GLTFLoader();
loaderstar.load('modeler/HappyLys/star.glb', (gltf) => {
  star = gltf.scene; // brug global variabel
  star.scale.set(0.5, 0.5, 0.5);
 
  star.rotation.y = Math.PI;
  scene.add(star);
});

// Lyd setup
const soundFarve = new Sound(camera);  // den primære lyd
soundFarve.loadSound('/lyd/farve.mp3');

const soundGraa = new Sound(camera);   // den alternative lyd
soundGraa.loadSound('/lyd/graa.mp3');

// Globale variabler, som keyboard.js og animate kan bruge
const globals = {
  isSpacePressed: false,
  hastighed: 0,
  activeHappyLights: [],
  spaceCount: 0,
  counterDiv: document.getElementById("spaceCounter"),
  soundFarve,
  soundGraa
};

// Setup keyboard events
setupKeyboard(scene, globals);

// Animation
const maxHastighed = 0.07;
const acceleration = 0.01;

function animate() {
  requestAnimationFrame(animate);

  if (globals.isSpacePressed) {
    globals.hastighed += acceleration;
    globals.hastighed = Math.min(globals.hastighed, maxHastighed);
    spiller.position.z -= globals.hastighed;
    spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
  }

  // Kamera følger spilleren
  camera.position.copy(spiller.position).add(new THREE.Vector3(0, 1.5, 0));

if (star) {
  star.position.copy(spiller.position).add(new THREE.Vector3(2, -0.3, 0));
}
  // SkySphere følger spilleren, men roterer ikke
  if (window.skySphere) {
    window.skySphere.position.copy(spiller.position);
  }

  renderer.render(scene, camera);
}

// Start animation
animate();