import * as THREE from 'three';

export const manager = new THREE.LoadingManager();
// // function loadStatus(){
//     let isLoaded
    
//     manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        
//         isLoaded = (Math.ceil(itemsLoaded / itemsTotal * 100))
        
//         // console.log(url + 'Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
//         // console.log(isLoaded + '%')
        
//         console.log(isLoaded)
//         return isLoaded;
//     }
//     // }


// export default isLoaded;
