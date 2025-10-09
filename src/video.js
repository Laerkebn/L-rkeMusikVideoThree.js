import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


// Denne fil deler video-status på tværs af alle moduler
export let videoPlaying = false;

export function setVideoPlaying(state) {
  videoPlaying = state;
}