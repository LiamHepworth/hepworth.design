import { util } from '../utilities';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { manager } from '../loadTracker.js'

const container = document.querySelector('#page-section-two')

//scene
const contactScene = new THREE.Scene();

//create renderer
let contactCanvas = util.createEl("canvas", "contact-canvas"); //define custom canvas
export const contactRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: contactCanvas});
contactRenderer.shadowMap.enabled = true;
contactRenderer.outputEncoding = THREE.sRGBEncoding;
contactRenderer.toneMapping = THREE.ACESFilmicToneMapping;
contactRenderer.toneMappingExposure = 1.7;

//camera
const contactCamera = new THREE.PerspectiveCamera( 20, window.innerWidth/window.innerHeight, 0.1, 1000 );
contactCamera.position.z = 30;
contactCamera.rotation.set(0, 0, 0)

//set renderer size to be equal to the container element
function renderSize(){
    let contSize = container.getBoundingClientRect();
    contactRenderer.setSize(contSize.width, contSize.height);
    contactCamera.aspect = contSize.width / contSize.height;
    contactCamera.updateProjectionMatrix();
}

//objects
const loader = new GLTFLoader(manager);

let contactModels;
let cubeOne, cubeTwo, cubeThree;

loader.load(
    'assets/THREE-Models/contactModels.glb',
    (gltfScene) => {
        contactModels = gltfScene.scene;

        //only to be viewed in dekstop in it's curent state;
        contactModels.position.set(0, 0, 0);
        contactScene.add(contactModels);

        contactModels.traverse(child => {
            if(child.name === 'cubeOne'){
                cubeOne = child;
            }
            if(child.name === 'cubeTwo'){
                cubeTwo = child;
            }
            if(child.name === 'cubeThree'){
                cubeThree = child;
            }
        })
    }
)

//controls
let controls = new OrbitControls( contactCamera, contactRenderer.domElement );
controls.enabled = true;
controls.enablePan = false;
controls.enableZoom = false;

controls.minPolarAngle = 1.2;
controls.maxPolarAngle = Math.PI/1.8;

controls.minAzimuthAngle = Math.PI/-4;
controls.maxAzimuthAngle = Math.PI/6;

//lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
contactScene.add( ambientLight );

//clock and timer
let clock = new THREE.Clock();
let time = 0;
let delta = 0;

// function contactCamDistance(){
//     if(container.offsetHeight < 300){
//         contactCamera.position.z = 12;
//         contactCamera.position.y = -0.5;        
//     } else {
//         contactCamera.position.z = 30;
//         contactCamera.position.y = -0;        
//     }
// }
// window.onload = () => {
//     setTimeout(contactCamDistance(), 3000)
// }
// window.addEventListener('resize', contactCamDistance);

//animate loop
function animate() {
    requestAnimationFrame(animate);
    renderSize();

    delta = clock.getDelta();
    time += delta;

    if(cubeOne && cubeTwo && cubeThree){
        cubeOne.rotation.y += 0.01
        cubeTwo.rotation.y += 0.01
        cubeThree.rotation.y += 0.01
    }

    if(contactModels){
        contactModels.rotation.y = -Math.abs(Math.sin(time/1) * 0.4) + Math.PI / 2;
    }

    contactRenderer.render( contactScene, contactCamera );
};

animate();