import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCity(scene) {
  // Loader baggrund 
  const loaderBagrund = new THREE.TextureLoader();
  loaderBagrund.load('/Billeder/nattehimmel.jpg', function (texture) {
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      color: 0x888888 // gråtoning/dæmpning
    });

    const skySphere = new THREE.Mesh(geometry, material);
    scene.add(skySphere);
    window.skySphere = skySphere;
  });

  // Byen
  const loaderCity = new GLTFLoader();
  loaderCity.load('modeler/city.glb', (gltf) => {
    const city = gltf.scene;
    city.scale.set(1, 1, 1);
    city.position.set(5, 1, -40);
    
    scene.add(city);

    const city2 = city.clone();
    city2.rotation.y = Math.PI;
    city2.position.set(-4.8, 1, -116);
    
    scene.add(city2);
  });

  // Ekstra bygning
  const loadbuilding = new GLTFLoader();
  loadbuilding.load('modeler/building.glb', (gltf) => {
    const building = gltf.scene;
    building.scale.set(2, 2, 2);
    building.position.set(20, -35, 5);
    building.rotation.y = Math.PI;

    scene.add(building);
  });

  // Club
  const loaderClub = new GLTFLoader();
  loaderClub.load('modeler/club.glb', (gltf) => {
    const club = gltf.scene;
    club.scale.set(0.01, 0.01, 0.01);
    club.position.set(-0, 1, 2);
    club.rotation.y = Math.PI;

    scene.add(club);
  });

  // Fence
  const loaderFence = new GLTFLoader();
  loaderFence.load('modeler/fence.glb', (gltf) => {
    const fence = gltf.scene;
    fence.scale.set(0.03, 0.03, 0.03);
    fence.position.set(9, 1, 2.4);
    fence.rotation.y = Math.PI / 2;

  scene.add(fence);
});

  // Lille hegn
  const loaderHegn = new GLTFLoader();
  loaderHegn.load('modeler/lillehegn.glb', (gltf) => {
    const lillehegn = gltf.scene;
    lillehegn.scale.set(1.8, 1.4, 1.5);
    lillehegn.position.set(1.2, 1, 0.9);

  lillehegn.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhongMaterial({ color: 0x439bc4 });
    }
  });

scene.add(lillehegn);
  });

  // Vagt
  const loaderVagt = new GLTFLoader();
  loaderVagt.load('modeler/vagt.glb', (gltf) => {
    const vagt = gltf.scene;
    vagt.scale.set(1.8, 1.4, 1.5);
    vagt.position.set(0, 1, 2);
    vagt.rotation.y = Math.PI;
    scene.add(vagt);

  });

  // Grid 
  // const gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);
}
