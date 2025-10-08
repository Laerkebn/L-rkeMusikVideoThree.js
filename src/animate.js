import './style.css';
import * as THREE from 'three';

export function startAnimation(scene, camera, spiller, globals, renderer) {
  const maxHastighed = 0.07;
  const acceleration = 0.01;

  function animate() {
    requestAnimationFrame(animate);

    // Bevæger spilleren fremad hvis space holdes
    if (globals.isSpacePressed) {
      globals.hastighed += acceleration;
      globals.hastighed = Math.min(globals.hastighed, maxHastighed);
      spiller.position.z -= globals.hastighed;
      spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
    }

    // Kamera følger spilleren
    camera.position.copy(spiller.position).add(new THREE.Vector3(0, 1.5, 0));

        // SkySphere følger spilleren (men roterer ikke)
    if (window.skySphere) {
      window.skySphere.position.copy(spiller.position);
    }

    // Opdater alle aktive objekter
    globals.activeStars.forEach((s) => {

      
      // Fyrværkeri (følger kameraet og blinker)
      if (s.userData.type === "firework") {
        const offset = new THREE.Vector3(0, 0, -3);
        offset.applyQuaternion(camera.quaternion);
        s.position.copy(camera.position).add(offset);

        const blinkSpeed = 50;
        const time = Date.now() % (blinkSpeed * 2);
        s.visible = time < blinkSpeed;
        return;
      }

      // Glitter (følger kameraet)
      if (s.userData.type === "glitter") {
        const amplitude = 20;
        const speed = 0.002;
        s.position.set(
          camera.position.x,
          0,
          camera.position.z + Math.sin(Date.now() * speed) * amplitude
        );
        return;
      }


// Rod
if (s.userData.type === "rod") {
  const offsetForward = 20;  // hvor langt foran spilleren den skal stå
  const flyUpSpeed = 1;    // hvor hurtigt den flyver frem
  const threshold = 2;       // hvor langt bagud den må komme før den flyver frem igen

  const spillerPos = spiller.position.clone();
  const rodPos = s.position.clone();

  // Vi bruger en fast bevægelsesretning (langs -Z)
  const forward = new THREE.Vector3(0, 0, -1);
  const targetPos = spillerPos.clone().add(forward.multiplyScalar(offsetForward));

  // Tjek hvor langt bagved roden er ift. spilleren
  const dz = spillerPos.z - rodPos.z;

  if (dz < -threshold) {
    // Hvis roden er foran → gør ingenting
    // Hvis roden er for langt bag → flyv frem foran igen
    s.position.lerp(targetPos, flyUpSpeed);
  }
  return;
}

// Smoke (følger spilleren, falder kun i Y)
if (s.userData.type === "smoke") {
  // Sæt en faldhastighed hvis den ikke allerede findes
  if (s.userData.velocity === undefined) {
    s.userData.velocity = 0.09; // juster hastigheden her
  }

  // Opdater Y
  s.position.y -= s.userData.velocity;

  // Hold X og Z relativt til spilleren
  const offsetX = -0.5; // venstre/højre
  const offsetZ = -20;  // foran/bag spilleren
  s.position.x = spiller.position.x + offsetX;
  s.position.z = spiller.position.z + offsetZ;

  // Når den når for langt ned, reset til toppen
  const minY = -6;   // laveste punkt
  const maxY = 20;   // hvor den respawner
  if (s.position.y < minY) {
    s.position.y = maxY;
  }

  return;
}

//Tunnel følger spiller
if (s.userData.type === "tunnel") {
    const offset = new THREE.Vector3(0, -1000, 0); // Længde foran spilleren
    s.position.copy(spiller.position).add(offset);
}



// Stjerner (følger spilleren)
const idx = globals.activeStars.indexOf(s);
      const afstandZ = 3;
      const sideAfstand = 2;
      const højde = -0.39;
      const række = Math.floor(idx / 2);
      const side = (idx % 2 === 0) ? -1 : 1;

      s.position.set(
        spiller.position.x + side * sideAfstand,
        spiller.position.y + højde + Math.sin(Date.now() * 0.005 + idx) * 0.05,
        spiller.position.z - række * afstandZ + 10
      );
    });



    // Tegn scenen
    renderer.render(scene, camera);
  }

  // Start animation
  animate();
}
