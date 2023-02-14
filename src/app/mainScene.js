import { util } from './utilities';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader'
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader'

//scene
const scene = new THREE.Scene();

//renderer
let mainCanvas = util.createEl("canvas", "main-canvas"); //define custom canvas
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: mainCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

//camera
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 3, 50);
camera.rotation.set(0, 0, 0);

//post processing
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.antialias = true;
composer.addPass(renderScene);

let LUTLoader = new LUTCubeLoader();
LUTLoader.load('./assets/3D-LUT/Cobi 3.CUBE', function(result){

    let lutPass = new LUTPass();
    lutPass.lut = result.texture;
    lutPass.intensity = 0.5;

    composer.addPass(lutPass);
})

let fxaaPass = new ShaderPass( FXAAShader );

let pixelRatio = renderer.getPixelRatio();
let fxaaUniforms = fxaaPass.material.uniforms;

fxaaUniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
fxaaUniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );

composer.addPass(fxaaPass);

//resize controls
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    pixelRatio = renderer.getPixelRatio();

    fxaaUniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaUniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
}

//mouseLook event - makes model look at cursor
let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5); //use last control to define intersection distance from object
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let pointOfIntersection = new THREE.Vector3();

document.addEventListener("mousemove", function modelLookAt(e){
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, pointOfIntersection);
});

//loading model and adding to scene
const loader = new GLTFLoader();

let monitorModel;
let monitorModel2;
let monitorModel3;

loader.load(
    'assets/monitorModel.glb', 
    (gltfScene) => {
        monitorModel = gltfScene.scene;
        monitorModel2 = monitorModel.clone();
        monitorModel3 = monitorModel.clone();

        monitorModel.scale.set(4, 4, 4);
        monitorModel.position.y = 6;

        monitorModel2.scale.set(4, 4, 4);
        monitorModel2.position.set(12, -2, 0);

        monitorModel3.scale.set(4, 4, 4);
        monitorModel3.position.set(-12, -2, 0);  

        scene.add(monitorModel);
        scene.add(monitorModel2);
        scene.add(monitorModel3);

        // let screen = monitor.traverse()
        console.log(monitorModel)
    }, 	
    (xhr) => {
		console.log((Math.ceil(xhr.loaded / xhr.total * 100) ) + '% loaded');
	}
);

//lighting
const pointLightRight = new THREE.PointLight(0xccdbd7, 2, 100)
pointLightRight.position.set(10, 15, -7);
pointLightRight.castShadow = true;
scene.add(pointLightRight);

const pointLightLeft = new THREE.PointLight(0xccdbd7, 2, 100)
pointLightLeft.position.set(-10, 15, -7);
pointLightLeft.castShadow = true;
scene.add(pointLightLeft);

const light = new THREE.HemisphereLight( 0xe8bee6, 0x8facda, 1.2 );
scene.add( light );

//clock and timer
// var clock = new THREE.Clock();
// var time = 0;
// var delta = 0;

//animate loop
function animate() {
    requestAnimationFrame(animate);

    //if statement to check whether model has loaded before applying rotation
    if(monitorModel){
        monitorModel.lookAt(pointOfIntersection);
        monitorModel2.lookAt(pointOfIntersection);
        monitorModel3.lookAt(pointOfIntersection);
    }

    // renderer.render( scene, camera );
    composer.render();
};

animate();