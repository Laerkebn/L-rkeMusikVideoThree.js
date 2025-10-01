import './style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export default class Sound {
    constructor(camera) {
        this.camera = camera;
        this.listener = new THREE.AudioListener();
        this.loader = new THREE.AudioLoader();
        this.sound = new THREE.Audio(this.listener);
        this.isplaying = false;
        this.soundloaded = false;
        this.init();    
    }

    init() {
        this.camera.add(this.listener);
        this.sound = new THREE.Audio(this.listener);
        this.loadSound('/lyd/test.mp3');
    }

    loadSound(url) {
        this.loader.load(url, (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.soundloaded = true;
        });
    }
   playSound() {
    if(!this.isplaying && this.soundloaded) {
        this.sound.play();
        this.isplaying = true;
    }
   }
    pauseSound() {
        if(this.isplaying) {
            this.sound.pause();
            this.isplaying = false;
        }
    }
}