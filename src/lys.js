import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadLys(scene) {
// Himmel
const color = 0x92bdd1;
const intensity = 1;
const sol = new THREE.DirectionalLight(color, intensity);
sol.position.set(5, 30, 10);
sol.target.position.set(10, 5, -30);
scene.add(sol);
scene.add(sol.target);

// Måne
const Måne = new THREE.DirectionalLight(0x3572ab, 10);
Måne.position.set(20, 10, -40);
Måne.target.position.set(10, 5, -30);
scene.add(Måne);
scene.add(Måne.target);

// Lamper over vagten
const Lamper = new THREE.PointLight(0xebbf10, 30, 1);
Lamper.position.set(0.9, 3.5, 2.1);
scene.add(Lamper);
scene.add(Lamper.target);
const Lamper2 = Lamper.clone();
Lamper2.position.set(-0.9, 3.5, 2.1);
scene.add(Lamper2);
scene.add(Lamper2.target);
}
