import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sound from './sound.js';


//Scene
const scene = new THREE.Scene();

// kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//lys
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Loader baggrund 
const loaderBagrund = new THREE.TextureLoader();
loaderBagrund.load('/Billeder/nattehimmel.jpg', function (texture) {
  const geometry = new THREE.SphereGeometry(500, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });

  const skySphere = new THREE.Mesh(geometry, material);
  scene.add(skySphere);
  window.skySphere = skySphere; 
});

//byen
const loaderCity = new GLTFLoader();
loaderCity.load('modeler/city.glb', (gltf) => {
  const city = gltf.scene;
  city.scale.set(1, 1, 1);     
  city.position.set(5, 1, -40);
  scene.add(city);

  // Lav en kopi
  const city2 = city.clone();

  //Roter 180° omkring y-aksen
  city2.rotation.y = Math.PI; // 180 grader

  // Flyt den nye by i forlængelse af den første
  city2.position.set(-4.8, 1, -116);
  scene.add(city2);

}, undefined, (error) => {
  console.error('Error loading city:', error);
});

//Club
const loaderClub = new GLTFLoader();
loaderClub.load('modeler/club.glb', (gltf) => {
  const club = gltf.scene;
  club.scale.set(0.01, 0.01, 0.01);     
  club.position.set(-0, 1, 2);
  scene.add(club);

  //Roter 180° omkring y-aksen
  club.rotation.y = Math.PI; // 180 grader
}, undefined, (error) => {
  console.error('Error loading club:', error);
});


//fence
const loaderFence = new GLTFLoader();
loaderFence.load('modeler/fence.glb', (gltf) => {
  const fence = gltf.scene;
  fence.scale.set(0.03, 0.03, 0.03);
  fence.position.set(9, 1, 2.4);
  scene.add(fence);
//Roter 90° omkring y-aksen
  fence.rotation.y = Math.PI / 2; 
}, 
undefined, (error) => {
  console.error('Error loading fence:', error);
}); 

//wall
const loaderWall = new GLTFLoader();
loaderWall.load('modeler/wall.glb', (gltf) => {
  const wall = gltf.scene;
  wall.scale.set(5, 10, 5);
  wall.position.set(50, 0, 15);
  scene.add(wall);
  
  //Roter 90° omkring y-aksen
  wall.rotation.y = Math.PI / 2;
  
  // Lav en kopi
  const wall2 = wall.clone();
  wall2.position.set(50, 40, 15);
  scene.add(wall2);
  //roter 90° omkring x-aksen
  wall2.rotation.x = Math.PI;
}, undefined, (error) => {
  console.error('Error loading wall:', error);
});

//lillehegn 
const loaderHegn = new GLTFLoader();
loaderHegn.load('modeler/lillehegn.glb', (gltf) => {
  const lillehegn = gltf.scene;
  lillehegn.scale.set(1.8, 1.4, 1.5);
  lillehegn.position.set(1.2, 1, 0.9);
  scene.add(lillehegn);
}, undefined, (error) => {
  console.error('Error loading lillehegn:', error);
});

//vagt
const loaderVagt = new GLTFLoader();
loaderVagt.load('modeler/vagt.glb', (gltf) => {
  const vagt = gltf.scene;
  vagt.scale.set(1.8, 1.4, 1.5);
  vagt.position.set(0, 1, 2);
  scene.add(vagt);

  //Roter 180° omkring y-aksen
  vagt.rotation.y = Math.PI; 
}, undefined, (error) => {
  console.error('Error loading vagt:', error);
});
// Grid
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

// Spiller
const spiller = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 2, 0.5),
  new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 })
);
spiller.position.y = 1;
scene.add(spiller);

// Hænder
const loader = new GLTFLoader();
let hands;

loader.load('modeler/hands.glb', (gltf) => {
  hands = gltf.scene;

  // Skaler og positionér hænderne
hands.scale.set(0.01, 0.01, 0.01); 
hands.position.set(0, -0.4, -0.4)

  hands.traverse((child) => {
  if (child.isMesh) {
    child.material = new THREE.MeshBasicMaterial({ color: 0xedb9ad });
  }
});

  // Drej hænderne (rotation i radianer!)
  hands.rotation.set(
    THREE.MathUtils.degToRad(-0),  // X-akse (op/ned tilt)
    THREE.MathUtils.degToRad(180),   // Y-akse (drej til siderne)
    THREE.MathUtils.degToRad(0)    // Z-akse (vinkel)
  );

  // Tilføj hænderne til kameraet
  camera.add(hands);
  scene.add(camera); // vigtig! kamera skal være i scenen for at vise hænder
}, undefined, (error) => {
  console.error('Error loading hands:', error);
});

// Jorden
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(6, 1, 300),
  new THREE.MeshBasicMaterial({transparent: true, opacity: 0})
);
ground.position.y = -0.5;
scene.add(ground);

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
window.addEventListener('keydown', (event) => {
  if(event.key === ' ' || event.key === 'Space') {
    spiller.position.z -= 0.1;
  }
});

// Lyd setup
const soundFarve = new Sound(camera);    // den primære lyd
soundFarve.loadSound('/lyd/farve.mp3');

const soundGraa = new Sound(camera);      // den alternative lyd
soundGraa.loadSound('/lyd/graa.mp3');

// Når man trykker space → spil farve, stop grå
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    soundGraa.pauseSound();
    soundFarve.playSound();
  }
});

// Når man slipper space → stop farve, spil grå
window.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    soundFarve.pauseSound();
    soundGraa.playSound();
  }
});


// Animation
function animate() {
  requestAnimationFrame(animate);

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
