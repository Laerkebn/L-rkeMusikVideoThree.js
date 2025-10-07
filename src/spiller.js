import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadPerson(scene, camera) {
  // Spiller
  const spiller = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 2, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff00, transparent: true, opacity: 0 })
  );
  spiller.position.y = 1;
  scene.add(spiller);

  // Hænder
  const loader = new GLTFLoader();
  loader.load('modeler/mennesker/hands.glb', (gltf) => {
    const hands = gltf.scene;

    hands.scale.set(0.01, 0.01, 0.01);
    hands.position.set(0, -0.4, -0.4);

    hands.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color: 0xedb9ad });
      }
    });

    hands.rotation.set(
      THREE.MathUtils.degToRad(-0),
      THREE.MathUtils.degToRad(180),
      THREE.MathUtils.degToRad(0)
    );

    camera.add(hands);
    scene.add(camera);
  }, undefined, (error) => {
    console.error('Error loading hands:', error);
  });

  return spiller;
}
