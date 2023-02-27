import * as THREE from 'three';

const preloader = document.querySelector('#preload-container')
export const manager = new THREE.LoadingManager();

export function threeIsLoaded(objCheck){
    preloader.style.display = 'block'; //reset pre-loader
    if(objCheck === undefined){ //once models are loaded, remove pre-loader
        manager.onLoad = () => {
            preloader.style.display = 'none';
        };
    } else if (objCheck){ //if models are already loaded, remove preloader
        preloader.style.display = 'none';
    };
};


export function contentIsLoaded(){
    preloader.style.display = 'block'; //reset pre-loader
    window.onload = loaded()

    function loaded(){
        preloader.style.display = 'none';
    }

    //NOTE - use timeout if you're wanting to add an animation to the preloader
    // window.setTimeout(function(){
    //     window.onload = preloader.style.display = 'none'}, 
    //     500
    // )
}