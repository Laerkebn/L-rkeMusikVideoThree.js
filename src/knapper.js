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
} from './happy.js';

export function setupKeyboard(scene, globals) {
  const maxSpace = 8;

  // Gem alle stages permanent (genbruges hver gang)
  if (!globals.permanentStages) {
    globals.permanentStages = {
      lights: [],
      stars: []
    };
  }

  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !event.repeat) {
      globals.isSpacePressed = true;

      if (globals.spaceCount < maxSpace) {
        globals.spaceCount++;
        globals.counterDiv.textContent = `Pills Counter: ${globals.spaceCount}`;

        // Skift pillebillede
const pillImage = document.getElementById("pillImage");
const pillImages = [
  "/Billeder/Piller7.svg",
  "/Billeder/Piller6.svg",
  "/Billeder/Piller5.svg",
  "/Billeder/Piller4.svg",
  "/Billeder/Piller3.svg",
  "/Billeder/Piller2.svg",
  "/Billeder/Piller1.svg",
  "/Billeder/Piller0.svg",
  "/Billeder/Piller0.svg"
];

// Skift kun hvis vi ikke går ud over arrayets længde
if (pillImage && globals.spaceCount <= pillImages.length) {
  pillImage.src = pillImages[globals.spaceCount - 1];
}
      }

      const stageFunctions = [
        happyLys1,
        happyLys2,
        happyLys3,
        happyLys4,
        happyLys5,
        happyLys6,
        happyLys7,
        happyLys8,
      ];

      // Tilføj ALLE stages op til det nuværende level
      for (let i = 0; i < globals.spaceCount; i++) {
        if (stageFunctions[i]) {
          const { lights, stars } = stageFunctions[i](scene, globals.camera, globals);
          
          // Gem permanent (så de kan genbruges)
          globals.permanentStages.lights.push(...lights);
          globals.permanentStages.stars.push(...stars);
          
          // Tilføj også til aktive (så de kan fjernes ved keyup)
          globals.activeHappyLights.push(...lights);
          globals.activeStars.push(...stars);
        }
      }

      // Musik
      globals.soundGraa.pauseSound();
      globals.soundFarve.playSound();
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      globals.isSpacePressed = false;
      globals.hastighed = 0;

      // Fjern alle aktive lys fra scenen
      globals.activeHappyLights.forEach(light => scene.remove(light));
      globals.activeHappyLights = [];

      // Fjern alle aktive stjerner fra scenen
      globals.activeStars.forEach(star => {
        if (star.parent) scene.remove(star);
      });
      globals.activeStars = [];

      // VIGTIGT: Reset stage flags så de kan tilføjes igen
      globals.stage1Added = false;
      globals.stage2Added = false;
      globals.stage3Added = false;
      globals.stage4Added = false;
      globals.stage5Added = false;
      globals.stage6Added = false;
      globals.stage7Added = false;

      // Musik
      globals.soundFarve.pauseSound();
      globals.soundGraa.playSound();
    }
  });
}