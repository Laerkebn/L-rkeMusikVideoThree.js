import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { 
  happyLys1, 
  happyLys2, 
  happyLys3, 
  happyLys4, 
  happyLys5, 
  happyLys6, 
  happyLys7, 
  happyLys8, 
  happyLys9, 
  happyLys10 
} from './happy.js';

export function setupKeyboard(scene, globals) {
  const maxSpace = 10;

  // Array of all happy-lys stages (index 0 = stage 1)
  const happyStages = [
    happyLys1, 
    happyLys2, 
    happyLys3, 
    happyLys4, 
    happyLys5, 
    happyLys6, 
    happyLys7, 
    happyLys8, 
    happyLys9, 
    happyLys10
  ]; 

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

      // Automatically call the correct stage function
      const stageIndex = globals.spaceCount - 1; // Convert to 0-based index
      
      if (stageIndex >= 0 && stageIndex < happyStages.length) {
        const stageFunction = happyStages[stageIndex];
        const stageResult = stageFunction(scene, globals.camera);
        globals.activeHappyLights = stageResult.lights;
        globals.activeStars = stageResult.stars || [];
      }

      // Trigger special event hvis maxSpace er nået
      if (globals.spaceCount === maxSpace) {
        console.log('Max space reached! Stage 10 complete!');
        // You can add a special function here if needed
        // triggerSpecialEvent();
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

      // Fjern stjernerne også
      if (globals.activeStars && globals.activeStars.length > 0) {
        globals.activeStars.forEach(star => {
          if (star.parent) {
            scene.remove(star);
          }
        });
        globals.activeStars = [];
      }

      // Musik
      globals.soundFarve.pauseSound();
      globals.soundGraa.playSound();
    }
  });
}