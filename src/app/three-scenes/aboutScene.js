import { util } from '../utilities';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { manager } from '../loadTracker.js'

const container = document.querySelector('#page-section-two')

const aboutScene = new THREE.Scene();
aboutScene.fog = new THREE.Fog(0x000000, 13, 40);

//create renderer
let aboutCanvas = util.createEl("canvas", "about-canvas"); //define custom canvas
export const aboutRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: aboutCanvas});
aboutRenderer.shadowMap.enabled = true;
aboutRenderer.outputEncoding = THREE.sRGBEncoding;
aboutRenderer.toneMapping = THREE.ACESFilmicToneMapping;
aboutRenderer.toneMappingExposure = 1.7;

//camera
const aboutCamera = new THREE.PerspectiveCamera( 20, window.innerWidth/window.innerHeight, 0.1, 1000 );
aboutCamera.position.z = 18;
aboutCamera.rotation.set(0, 0, 0)

//set renderer size to be equal to the container element
function renderSize(){
    let contSize = container.getBoundingClientRect();
    aboutRenderer.setSize(contSize.width, contSize.height);
    aboutCamera.aspect = contSize.width / contSize.height;
    aboutCamera.updateProjectionMatrix();
}

//controls
let controls = new OrbitControls( aboutCamera, aboutRenderer.domElement );
controls.enabled = true;
controls.enablePan = false;
controls.enableZoom = false;

controls.minPolarAngle = 1.2;
controls.maxPolarAngle = Math.PI/1.8;
controls.minAzimuthAngle = Math.PI/-6.5;
controls.maxAzimuthAngle = Math.PI/6;

//loading model, adding to scene, setting positions and rotations etc
const loader = new GLTFLoader(manager);

let aboutModels;

loader.load(
    './assets/THREE-Models/aboutModels.glb',
    (gltfScene) => {
        aboutModels = gltfScene.scene;

        //only to be viewed in dekstop in it's curent state;
        aboutModels.position.set(-0.5, -2, 0);
        aboutScene.add(aboutModels);
    }
)

//lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
aboutScene.add( ambientLight );

//clock and timer
let clock = new THREE.Clock();
let time = 0;
let delta = 0;

function aboutCamDistance(){
    if(container.offsetHeight < 300){
        aboutCamera.position.z = 13;     
    } else {
        aboutCamera.position.z = 18;      
    }
}
window.onload = aboutCamDistance();
window.addEventListener('resize', aboutCamDistance);

//animate loop
function animate() {
    requestAnimationFrame(animate);
    renderSize();

    delta = clock.getDelta();
    time += delta;

    if(aboutModels){
        aboutScene.rotation.y = -Math.abs(Math.sin(time/3) * 0.3);
        aboutScene.rotation.x = -Math.abs(Math.sin(time/3) * 0.15);
    }

    aboutRenderer.render( aboutScene, aboutCamera );
};

animate();