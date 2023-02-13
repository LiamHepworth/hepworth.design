import { util } from './utilities';
import * as THREE from 'three';

//scene
const scene = new THREE.Scene();

//renderer
let mainCanvas = util.createEl("canvas", "main-canvas"); //define custom canvas
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: mainCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
// document.body.appendChild( renderer.domElement );  //append scene to DOM, included in main file;

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

//geometry and materials
const cubeGeom = new THREE.BoxGeometry( 6, 6, 6 );
const cubeMat = new THREE.MeshStandardMaterial( {color: 0x0092bd, side: THREE.DoubleSide} );

(function createModels(){

    let models = []
    
    for(let i = 0; i < 3; i++){
        models[i] = new THREE.Mesh( cubeGeom, cubeMat );
        models[i].castShadow = true;
        scene.add(models[i]);
    }

    //FIX - doesn't resize on window.
    models[0].position.set(window.innerWidth/150, 0, 0)
    models[1].position.set(0, 5, 0)
    models[2].position.set(-Math.abs(window.innerWidth/150), 0, 0)


    //mouseLook event - makes cubes look at cursor
    let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5); //use last control to define intersection distance from object
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let pointOfIntersection = new THREE.Vector3();
    
    document.addEventListener("mousemove", function cubeLookAt(e){
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
    
        for(let i = 0; i < 3; i++){
            models[i].lookAt(pointOfIntersection);
        }
    });
})();

//lighting
const ambLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 50)
pointLight.position.set(0, 10, 10);
pointLight.castShadow = true;
scene.add(pointLight);

//clock and timer
// var clock = new THREE.Clock();
// var time = 0;
// var delta = 0;

//animate loop
function animate() {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();