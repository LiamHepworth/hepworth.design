import * as THREE from 'three';

const preloader = document.querySelector('#preload-container')
export const manager = new THREE.LoadingManager();

export function checkThreeIsLoaded(objCheck){

    preloader.style.display = 'block'; //reset pre-loader

    if(objCheck === undefined){ //once models are loaded, remove pre-loader
        manager.onLoad = () => {
            preloader.style.display = 'none';
            return;
        };
    } else if (objCheck){ //if models are already loaded, remove preloader
        preloader.style.display = 'none';
    }
};


export function checkContentIsLoaded(){
    preloader.style.display = 'block'; //reset pre-loader
    window.onload = loaded()

    function loaded(){
        console.log('loaded');
        preloader.style.display = 'none';
    }
}
