import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { happyLys } from './happy.js';


export function setupKeyboard(scene, globals) {
  const maxSpace = 10;

  // Keydown
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !event.repeat) {
      // Sæt karakter til at bevæge sig
      globals.isSpacePressed = true;

      // Opdater tæller (+1)
      if (globals.spaceCount < maxSpace) {
        globals.spaceCount++;
        globals.counterDiv.textContent = `Space presses: ${globals.spaceCount}`;
      }

      // Happy lys når space = 1 og space holdes
      if (globals.spaceCount === 1 && globals.activeHappyLights.length === 0) {
        globals.activeHappyLights = happyLys(scene);
      }

      // Trigger special event hvis maxSpace er nået
      if (globals.spaceCount === maxSpace) {
        triggerSpecialEvent();
      }

      // Musik
      globals.soundGraa.pauseSound();
      globals.soundFarve.playSound();
    }
  });

  // Keyup
  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      // Stop karakteren
      globals.isSpacePressed = false;
      globals.hastighed = 0;

      // Fjern lysene igen når man slipper space
      if (globals.activeHappyLights.length > 0) {
        globals.activeHappyLights.forEach(light => scene.remove(light));
        globals.activeHappyLights = [];
      }

      // Musik
      globals.soundFarve.pauseSound();
      globals.soundGraa.playSound();
    }
  });
}
