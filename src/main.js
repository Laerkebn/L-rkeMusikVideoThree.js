import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log("THREE");
// Scene
const scene = new THREE.Scene();

// Camera position
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 4.5;
camera.position.y = 1.5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
requestAnimationFrame(animate);
renderer.render(scene, camera);

// Jorden
const ground = new THREE.Mesh(
new THREE.BoxGeometry( 6, 1, 300),
new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
);
ground.position.y = -1;
scene.add( ground );

// Spiller
const spiller = new THREE.Mesh(
new THREE.BoxGeometry( 0.5, 0.5, 0.5),
new THREE.MeshBasicMaterial( { color: 0xff0000 } )
);
scene.add( spiller );

//grid
const gridHelper = new THREE.GridHelper( 100, 100 );
scene.add( gridHelper );
// Animation
function animate() {
    requestAnimationFrame( animate ); // dette laver loopet

    renderer.render( scene, camera );
}
//Responsive window
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
       
    })

    //Spiller kontrol
    window.addEventListener("keydown", (event) => {
        if(event.key === "ArrowUp") {
            spiller.position.z -= 0.1;
        }
    })

// Start animation
animate();