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
// camera.rotation.set(0, 0, 0);

//controls
let controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = false;
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = Math.PI/1.5;
// controls.update();

//loading model and adding to scene
const loader = new GLTFLoader();

let monitorModel;
let models = [];

function createVidTexture(src, n){
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

        models[0].position.y = 6;
        models[1].position.y = -2;
        models[2].position.y = -2;
        modelBreakPoints();

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

//responsive models
window.addEventListener('resize', modelBreakPoints);
function modelBreakPoints(){
        if(window.innerWidth > 2000){
            models.forEach(model => model.scale.set(1.1, 1.1, 1.1))
            models[1].position.x = window.innerWidth/167;
            models[2].position.x = - window.innerWidth/167;
        }
        else if(window.innerWidth > 1600){
            models.forEach(model => model.scale.set(1, 1, 1))
            models[1].position.x = window.innerWidth/160;
            models[2].position.x = - window.innerWidth/160; 
        }
        else if(window.innerWidth > 1080){
         models.forEach(model => model.scale.set(0.9, 0.9, 0.9))
            models[1].position.x = window.innerWidth/150;
            models[2].position.x = - window.innerWidth/150; 
        }
        else if(window.innerWidth > 800 && window.innerHeight > 700){
         models.forEach(model => model.scale.set(0.8, 0.8, 0.8))
            models[1].position.x = window.innerWidth/150;
            models[2].position.x = - window.innerWidth/150; 
        }
        else if(window.innerWidth > 600){
            models[1].position.x = window.innerWidth/120;
            models[2].position.x = - window.innerWidth/120; 
            models.forEach(model => model.scale.set(0.8, 0.8, 0.8))

            models[0].rotation.set(0.05, 0.32, 0.02);
            models[0].position.y = 5;
            models[1].rotation.set(-0.05, 0.32, -0.17);
            models[1].position.y = -4;
            models[2].rotation.set(0.23, -0.32, 0.02);
            models[2].position.y = -3;
        }
        else{
            models.forEach(model => model.scale.set(0.7, 0.7, 0.7))
            models[1].position.x = window.innerWidth/100;
            models[2].position.x = - window.innerWidth/100; 

            models[0].rotation.set(0.05, 0.32, 0.02);
            models[0].position.y = 4;
            models[1].rotation.set(-0.05, 0.32, -0.17);
            models[1].position.y = -3;
            models[2].rotation.set(0.23, -0.32, 0.02);
            models[2].position.y = -2;
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

//responsive scene
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('resized')
});

//lighting
const pointLightRight = new THREE.PointLight(0x0092bd, 1, 100)
pointLightRight.position.set(10, 15, -7);
pointLightRight.castShadow = true;
scene.add(pointLightRight);

const pointLightLeft = new THREE.PointLight(0xf71bbd, 1, 100)
pointLightLeft.position.set(-10, 15, -7);
pointLightLeft.castShadow = true;
scene.add(pointLightLeft);

const light = new THREE.HemisphereLight( 0xa4e0d1, 0x8facda, 0.2 );
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
        if(window.innerWidth < 1080){
            // models[0].lookAt(0, 3, 50);
            // models[0].rotation.x += 0.0001
            // models[0].rotation.y += 0.001
            scene.rotation.y += 0.001
            controls.enabled = true;
            controls.enablePan = false;
            controls.update()
        } else {
            scene.rotation.y = 0;
            models[0].lookAt(pointOfIntersection);
            models[1].lookAt(pointOfIntersection);
            models[2].lookAt(pointOfIntersection);
            camera.position.set(0, 3, 50);
            camera.rotation.set(0, 0, 0);
            controls.enabled = false;
        }
    }

    renderer.render( scene, camera );
};

animate();