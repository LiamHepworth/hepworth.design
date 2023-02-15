import { util } from './utilities';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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
camera.rotation.set(0, 0, 0);

//resize controls
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
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

let designVideoTexture = createVidTexture('./assets/THREE-Videos/design.mp4');
let threeDVideoTexture = createVidTexture('./assets/THREE-Videos/3D.mp4');
let codeVideoTexture = createVidTexture('./assets/THREE-Videos/Code.mp4');


loader.load(
    'assets/monitor.glb', 
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

        monitorModel.traverse(child => {
            if(child.name == 'Screen_01'){
                child.material = createMat();
                child.material.emissiveMap = threeDVideoTexture;
            }
        })
        
        monitorModel2.traverse(child => {
            if(child.name == 'Screen_01'){
                child.material = createMat();
                child.material.emissiveMap = codeVideoTexture;
            }
        })
        
        monitorModel3.traverse(child => {
            if(child.name == 'Screen_01'){
                child.material = createMat();
                child.material.emissiveMap = designVideoTexture;
            }
        })

        scene.add(monitorModel, monitorModel2, monitorModel3);
    }, 	
    (xhr) => {
		console.log((Math.ceil(xhr.loaded / xhr.total * 100) ) + '% loaded');
	}
);

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
        monitorModel.lookAt(pointOfIntersection);
        monitorModel2.lookAt(pointOfIntersection);
        monitorModel3.lookAt(pointOfIntersection);
    }

    renderer.render( scene, camera );
    // composer.render();
};

animate();