let pageMainSection = document.querySelector('#page-main-section');
let headerSection = document.querySelector('#header-section');
const burgerMenuMobile = document.querySelector('.burger-menu');

let backgroundColourDark = 'rgb(23, 23, 23)';
let backgroundColourBlue = 'rgb(0, 146, 189)';

(function mobileMenuPopUp(){

        let menuContainer = document.createElement('div')
        let menuList = document.createElement('ul');
        let menuListNames = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];
        let menuListItems = [];
    
        for(let i = 0; i < 4; i++){
            menuListItems[i] = document.createElement('li');
            menuListItems[i].innerText = menuListNames[i];
            menuListItems[i].classList.add('basic-text', 'sub-header', 'menu-list-items');
            menuList.appendChild(menuListItems[i])
        }
        
        menuContainer.appendChild(menuList);
        menuContainer.classList.add('menu-container', 'vertical-center')
        menuList.classList.add('menu-list', 'vertical-center') 

    burgerMenuMobile.addEventListener('click', function(){
    function showMenu(){
            pageMainSection.appendChild(menuContainer);
            burgerMenuMobile.innerText = 'close';
        }
        
        function hideMenu(){        
            pageMainSection.removeChild(menuContainer); 
            burgerMenuMobile.innerText = 'menu';
    }
    
    if(burgerMenuMobile.innerText == 'close'){
        hideMenu();
        console.log('hiding Menu');
    } else if(burgerMenuMobile.innerText == 'menu'){
        showMenu();
        console.log('showing Menu');
    }
    })
})()

// function clearPage(containerName){
//     containerName.innerHTML = '';
// }

class Project {
    constructor(name, type, format, media, description) {
        this.name = name;
        this.type = type;
        this.format = format;
        this.media = media;
        this.description = description;
    }
}

function imageCreation(imageLocation, container){
    let img = new Image();
    img.src = imageLocation;
    container.appendChild(img);
}

let projectList = []

projectList[0] = new Project('unreal', 'poster', 'stills', ['projects/unreal/image01.png', 'projects/unreal/image02.png'], 'standard placeholder description');
imageCreation(projectList[0].media[0], pageMainSection)