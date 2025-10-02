import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


//pille 1
export function happyLys(scene) {
    const lights = [];

    // Himmel
    const color = 0xeb1043;
    const intensity = 1;
    const happysol1 = new THREE.DirectionalLight(color, intensity);
    happysol1.position.set(5, 30, 10);
    happysol1.target.position.set(10, 5, -30);
    scene.add(happysol1);
    scene.add(happysol1.target);
    lights.push(happysol1, happysol1.target);

    // Måne
    const happyMåne1 = new THREE.DirectionalLight(0xeb1043, 10);
    happyMåne1.position.set(20, 10, -40);
    happyMåne1.target.position.set(10, 5, -30);
    scene.add(happyMåne1);
    scene.add(happyMåne1.target);
    lights.push(happyMåne1, happyMåne1.target);

    // Lamper over vagten
    const happyLamper1 = new THREE.PointLight(0x10e0eb, 30, 1);
    happyLamper1.position.set(0.9, 3.5, 2.1);
    scene.add(happyLamper1);
    const happyLamper1nr2 = happyLamper1.clone();
    happyLamper1nr2.position.set(-0.9, 3.5, 2.1);
    scene.add(happyLamper1nr2);
    lights.push(happyLamper1, happyLamper1nr2);

    return lights; // returner lysene, så vi kan fjerne dem senere
}
