import './style.css';
import * as THREE from 'three';

export function startAnimation(scene, camera, spiller, globals, renderer) {
  const maxHastighed = 0.07;
  const acceleration = 0.01;

  // Video trigger koordinat og tolerance
  const triggerPoint = { x: 0, y: 1, z: -165 };
  const triggerRadius = 10; // hvor tæt spilleren skal være
  let videoTriggered = false;
  let instructionTextElement = null;

  // Funktion til at oprette instruktion tekst
  function createInstructionText() {
    if (instructionTextElement) return; // Undgå duplikater
    
    instructionTextElement = document.createElement('div');
    instructionTextElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 4px black;
      z-index: 100;
      pointer-events: none;
    `;
    instructionTextElement.textContent = 'Keep walking to get inside ';
    document.body.appendChild(instructionTextElement);
  }

  // Funktion til at fjerne instruktion tekst
  function removeInstructionText() {
    if (instructionTextElement) {
      document.body.removeChild(instructionTextElement);
      instructionTextElement = null;
    }
  }

  // Funktion til at tjekke afstand til trigger point
  function checkVideoTrigger() {
    const distance = spiller.position.distanceTo(
      new THREE.Vector3(triggerPoint.x, triggerPoint.y, triggerPoint.z)
    );

    // Vis tekst når spilleren er tæt på (men ikke helt inde i trigger zone)
    if (distance < triggerRadius + 5 && distance >= triggerRadius && !videoTriggered) {
      createInstructionText();
    } else if (distance >= triggerRadius + 5 || videoTriggered) {
      removeInstructionText();
    }

    // DEBUG - se hvad der sker
    if (spiller.position.z < -170) {
      console.log("Distance:", distance.toFixed(2), "Position:", spiller.position.z.toFixed(2));
    }

    if (distance < triggerRadius && !videoTriggered) {
      videoTriggered = true;
      removeInstructionText();
      console.log("🎬 VIDEO TRIGGERED!");
      playVideo();
    }
  }

  // Funktion til at afspille video
  function playVideo() {
    console.log("🎥 playVideo() function called!");
    
    // Opret video overlay
    const videoOverlay = document.createElement('div');
    videoOverlay.id = 'videoOverlay';
    videoOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    const video = document.createElement('video');
    video.style.cssText = `
      max-width: 90%;
      max-height: 90%;
    `;
    
    // Ret sti (fjern /public/)
    const videoPath = 'puplic/Lyd/test.mp4';
    console.log("Trying to load video from:", videoPath);
    video.src = videoPath;
    video.controls = true;
    video.autoplay = true;
    
    // Error handling
    video.addEventListener('error', (e) => {
      console.error("❌ Video failed to load!", e);
      console.error("Tried path:", videoPath);
      alert("Video kunne ikke loades. Tjek console for fejl.");
    });
    
    video.addEventListener('loadeddata', () => {
      console.log("✅ Video loaded successfully!");
    });

    // Luk video når den er færdig
    video.addEventListener('ended', () => {
      document.body.removeChild(videoOverlay);
      videoTriggered = false;
    });

    // Tilføj luk knap
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.2);
      border: 2px solid white;
      color: white;
      font-size: 24px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1001;
    `;
    closeBtn.addEventListener('click', () => {
      // Gå tilbage til forsiden (index.html)
      window.location.href = 'index.html';
    });

    videoOverlay.appendChild(video);
    videoOverlay.appendChild(closeBtn);
    document.body.appendChild(videoOverlay);
    
    console.log("Video overlay added to document");
  }

  function animate() {
    requestAnimationFrame(animate);

    // Bevæger spilleren fremad hvis space holdes
    if (globals.isSpacePressed) {
      globals.hastighed += acceleration;
      globals.hastighed = Math.min(globals.hastighed, maxHastighed);
      spiller.position.z -= globals.hastighed;
      spiller.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
    }

    // Tjek for video trigger (tjek altid, ikke kun når space trykkes)
    checkVideoTrigger();

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
        const offsetForward = 20;
        const flyUpSpeed = 1;
        const threshold = 2;

        const spillerPos = spiller.position.clone();
        const rodPos = s.position.clone();

        const forward = new THREE.Vector3(0, 0, -1);
        const targetPos = spillerPos.clone().add(forward.multiplyScalar(offsetForward));

        const dz = spillerPos.z - rodPos.z;

        if (dz < -threshold) {
          s.position.lerp(targetPos, flyUpSpeed);
        }
        return;
      }

      // Smoke (følger spilleren, falder kun i Y)
      if (s.userData.type === "smoke") {
        if (s.userData.velocity === undefined) {
          s.userData.velocity = 0.09;
        }

        s.position.y -= s.userData.velocity;

        const offsetX = -0.5;
        const offsetZ = -20;
        s.position.x = spiller.position.x + offsetX;
        s.position.z = spiller.position.z + offsetZ;

        const minY = -6;
        const maxY = 20;
        if (s.position.y < minY) {
          s.position.y = maxY;
        }

        return;
      }

      //Tunnel følger spiller
      if (s.userData.type === "tunnel") {
        const offset = new THREE.Vector3(0, -1000, 0);
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
