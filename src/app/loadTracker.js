import * as THREE from 'three';

export const manager = new THREE.LoadingManager();

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log('Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
}