import './style.css';
import * as THREE from 'three';

export default class Sound {
    constructor(camera) {
        this.camera = camera;
        this.listener = new THREE.AudioListener();
        this.loader = new THREE.AudioLoader();
        this.sound = new THREE.Audio(this.listener);
        this.isplaying = false;
        this.soundloaded = false;
        this.camera.add(this.listener);
    }
    
    // FJERNET init() - den er ikke nødvendig

    loadSound(url) {
        console.log('🎵 Loader lyd fra:', url);
        this.loader.load(
            url, 
            (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setLoop(true); // Loop lyden
                this.sound.setVolume(0.5);
                this.soundloaded = true;
                console.log('✅ Lyd indlæst:', url);
            },
            (xhr) => {
                console.log('⏳ Loading:', (xhr.loaded / xhr.total * 100) + '%');
            },
            (error) => {
                console.error('❌ Fejl ved indlæsning af lyd:', url, error);
            }
        );
    }

    playSound() {
        if (!this.isplaying && this.soundloaded) {
            this.sound.play();
            this.isplaying = true;
            console.log('▶️ Afspiller lyd');
        }
    }

    pauseSound() {
        if (this.isplaying) {
            this.sound.pause();
            this.isplaying = false;
        }
    }
}