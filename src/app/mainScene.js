import * as THREE from 'three';
import { Light } from 'three';

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 3, 15);
camera.rotation.set(0, 0, 0);

//geometry and materials
const cubeGeom = new THREE.BoxGeometry( 5, 5, 5 );
const cubeMat = new THREE.MeshStandardMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );

const cubeA = new THREE.Mesh( cubeGeom, cubeMat );
cubeA.castShadow = true;
scene.add( cubeA );

//mouseLook event - makes cubes look at cursor
let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5); //use last control to define intersection distance from object
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let pointOfIntersection = new THREE.Vector3();

document.addEventListener("mousemove", cubeLookAt, false);
function cubeLookAt(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, pointOfIntersection);
    cubeA.lookAt(pointOfIntersection);
}

//lighting
const pointLight = new THREE.PointLight(0xffffff, 1, 50)
pointLight.position.set(10, 5, 7);
pointLight.castShadow = true;
scene.add(pointLight);

//clock and timer
// var clock = new THREE.Clock();
// var time = 0;
// var delta = 0;

//renderer
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
// document.body.appendChild( renderer.domElement );  //append scene to DOM, included in main file;

//animate loop
function animate() {
    requestAnimationFrame( animate );

    // cubeA.rotation.x += 0.01;
    // cubeA.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();