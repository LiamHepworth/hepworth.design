import * as THREE from 'three';

const preloader = document.querySelector('#preload-container')
export const manager = new THREE.LoadingManager();

export function checkThreeIsLoaded(objCheck){

    preloader.style.display = 'block'; //reset pre-loader

    if(objCheck === undefined){ //once models are loaded, remove pre-loader
        manager.onLoad = () => {
            console.log(objCheck);
            console.log('models undefined')
            preloader.style.display = 'none';
            return;
        };
    } else if (objCheck){ //if models are already loaded, remove preloader
        console.log(objCheck);
        preloader.style.display = 'none';
    }
};