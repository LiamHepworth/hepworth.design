import { util } from './utilities';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//scene
const scene = new THREE.Scene();

//renderer
let mainCanvas = util.createEl("canvas", "main-canvas"); //define custom canvas
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: mainCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.7;

//camera
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 3, 50);

//controls
let controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = false;
//Sets min/max anglies for vertical orbiting
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = Math.PI/1.5;

//loading model, adding to scene, setting positions and rotations etc
const loader = new GLTFLoader();

let monitorModel;
let models = [];

function createVidTexture(src, _n){
    let vid = document.createElement('video');
    vid.loop = true;
    vid.muted = 'muted';
    vid.controls = false;
    vid.src = src;
    vid.load();
    vid.play();

    let final = new THREE.VideoTexture(vid);
    final.flipY = false;

    return final;
}

function createMat(){
    let mat = new THREE.MeshStandardMaterial({
        color : new THREE.Color(0x000000),
        roughness : 0.7,
        emissive :  new THREE.Color(0x0092bd),
        emissiveIntensity : 0.7,
    });

    return mat;
}

function applyMat(modelNum, textureName){
    models[modelNum].traverse(child => {
        if(child.name == 'Screen_01'){
            child.material = createMat();
            child.material.emissiveMap = textureName;
        }
    })
}

let designVideoTexture = createVidTexture('./assets/THREE-Videos/design.mp4');
let threeDVideoTexture = createVidTexture('./assets/THREE-Videos/3D.mp4');
let codeVideoTexture = createVidTexture('./assets/THREE-Videos/Code.mp4'); 

loader.load(
    'assets/monitor.glb', 
    (gltfScene) => {
        monitorModel = gltfScene.scene;

        models.push(monitorModel);
        models.push(monitorModel.clone());
        models.push(monitorModel.clone());

        responsiveScene();

        applyMat(0, threeDVideoTexture);
        applyMat(1, codeVideoTexture);
        applyMat(2, designVideoTexture);

        scene.add(models[0], models[1], models[2]);
        return models;
    }, 	
    (xhr) => {
		console.log((Math.ceil(xhr.loaded / xhr.total * 100) ) + '% loaded');
	}
);

function desktopSceneSetup(spacing){
    scene.rotation.y = 0;
    camera.position.set(0, 3, 50);
    camera.rotation.set(0, 0, 0);
    controls.enabled = false;

    models[0].position.x = 0;
    models[1].position.x = window.innerWidth/spacing;
    models[2].position.x = - window.innerWidth/spacing;

    models[0].position.y = 6;
    models[1].position.y = -2;
    models[2].position.y = -2;
}

function MobileSceneSetup(axis, mNaught, mOne, mTwo){
    controls.enabled = true;
    controls.enablePan = false;

    models[0].rotation.set(0.05, 0.32, 0.02);
    models[1].rotation.set(-0.05, 0.32, -0.17);
    models[2].rotation.set(0.23, -0.32, 0.02);

    models[0].position[axis] = mNaught;
    models[1].position[axis] = mOne;
    models[2].position[axis]= mTwo;
}

function mobileModelRotation(){
    //offset all rotation coords to give more of a random look.
    models[0].rotation.set(0.05, 0.32, 0.02);
    models[1].rotation.set(-0.05, 0.32, -0.17);
    models[2].rotation.set(0.23, -0.32, 0.02);
}

//responsive models + scene
window.addEventListener('resize', responsiveScene);
function responsiveScene(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerWidth > 2000){
        models.forEach(model => model.scale.set(1.1, 1.1, 1.1));
        desktopSceneSetup(167);
    }
    else if(window.innerWidth > 1600){
        models.forEach(model => model.scale.set(1, 1, 1));
        desktopSceneSetup(160);
    }
    else if(window.innerWidth > 1080){
        models.forEach(model => model.scale.set(0.9, 0.9, 0.9));
        desktopSceneSetup(150);
    }
    else if(window.innerWidth > 800){
        models.forEach(model => model.scale.set(0.8, 0.8, 0.8));
        mobileModelRotation();
        MobileSceneSetup('y', 5, -4, -3);
        MobileSceneSetup('x', 0, 5, -5);
    }
    else if(window.innerWidth > 600){
        models.forEach(model => model.scale.set(0.8, 0.8, 0.8));
        mobileModelRotation();
        MobileSceneSetup('y', 6.5, 0, -6.5);
        MobileSceneSetup('x', 2, -3.5, 3.5);
    }
    else{
        models.forEach(model => model.scale.set(0.7, 0.7, 0.7));
        mobileModelRotation();
        MobileSceneSetup('y', 4.5, -1.5, -7);
        MobileSceneSetup('x', 1.5, -1.7, 1.3);
    }
}

//mouseLook event + Raycaster - makes model look at cursor
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

//lighting
const pointLightRight = new THREE.PointLight(0x0092bd, 1, 100);
pointLightRight.position.set(10, 15, -7);
pointLightRight.castShadow = true;
scene.add(pointLightRight);

const pointLightLeft = new THREE.PointLight(0xf71bbd, 1, 100);
pointLightLeft.position.set(-10, 15, -7);
pointLightLeft.castShadow = true;
scene.add(pointLightLeft);

const light = new THREE.HemisphereLight( 0xa4e0d1, 0x8facda, 0.2 );
scene.add( light );

//clock and timer
let clock = new THREE.Clock();
let time = 0;
let delta = 0;

//animate loop
function animate() {
    requestAnimationFrame(animate);

    delta = clock.getDelta();
    time += delta;

    //if statement to check whether model has loaded before applying rotation
    if(monitorModel){
        if(window.innerWidth < 1080){
            scene.rotation.y = -0.5 + Math.abs(Math.sin(time/3) * 0.5);
            controls.update()
        } else {
            models[0].lookAt(pointOfIntersection);
            models[1].lookAt(pointOfIntersection);
            models[2].lookAt(pointOfIntersection);
        }
    }
    renderer.render( scene, camera );
};

animate();