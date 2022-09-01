let pageMainSection = document.querySelector('#page-main-section');
const pageBody = document.querySelector('body')
const headerSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('#header')
const burgerMenuMobile = document.querySelector('.burger-menu');

const backgroundColourDark = 'rgb(23, 23, 23)';
const backgroundColourBlue = 'rgb(0, 146, 189)';

(function mobileMenuPopUp(){

    let menuContainer = document.createElement('div')
    let menuList = document.createElement('ul');

    let menuListNames = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];
    let menuListIds = ['home-button', 'work-button', 'about-button', 'contact-button']

    let menuListItems = [];           //the actual <li> elements

    for(let i = 0; i < 4; i++){
        menuListItems[i] = document.createElement('li');
        menuListItems[i].innerText = menuListNames[i];
        menuListItems[i].id = menuListIds[i];
        menuListItems[i].classList.add('basic-text', 'sub-header', 'menu-list-items');
        menuList.appendChild(menuListItems[i])
    }
    
    menuContainer.appendChild(menuList);
    menuContainer.classList.add('grid-light', 'blue', 'vertical-center', 'menu-container');
    menuList.classList.add('vertical-center', 'menu-list') 

    burgerMenuMobile.addEventListener('click', function(){
    function showMenu(){
            pageMainSection.appendChild(menuContainer);
            burgerMenuMobile.innerText = 'close';

            displayHomePage();
            displayWorkPage();
            displayAboutPage();
            displayContactPage()
        }
        
    function hideMenu(){        
        pageMainSection.removeChild(menuContainer); 
        burgerMenuMobile.innerText = 'menu';
    }
    
    if(burgerMenuMobile.innerText === 'close'){
        hideMenu();
        console.log('hiding Menu');
    } else if(burgerMenuMobile.innerText === 'menu'){
        showMenu();
        console.log('showing Menu');
    }
    })
})()


class Project {
    constructor(name, type, format, media, description) {
        this.name = name;
        this.type = type;
        this.format = format;
        this.media = media;
        this.description = description;
    };

    addProjectToList(){
        projectList.push(this);
        return this
    };
    
    thumbnailCreation(container){
        let img = new Image();
        img.src = this.media[0];
        container.appendChild(img);
    }

    carouselCreation(container){

        let images = [];

        for(let i = 0; i < this.media.length; i++){
            images[i] = new Image();
            images[i].src = this.media[i];
            container.appendChild(images[i]);
        }
    };
};


let projectList = [
    new Project('unreal', 'poster', 'stills', ['projects/unreal/image01.png', 'projects/unreal/image02.png'], 'standard placeholder description'),
    new Project('severe', 'poster', 'stills', ['projects/severe/image01.jpg'], 'severe placeholder description')
];

function resetPage(containerName){
    containerName.innerHTML = '';
    burgerMenuMobile.innerText = 'menu';
    pageHeader.innerText = 'HEPWORTH.\n DESIGN' ;
    pageBody.classList.add('grid-dark')
    pageMainSection.classList.remove('grid-container', 'generic-flex-container');
}

function createBlueGridFiller(){
    let gridFiller = document.createElement('div');
    gridFiller.classList.add('blue', 'grid-light', 'grid-sections');
    return gridFiller;
}

// function checkState(){

//     switch(e = PopStateEvent)
// }

window.addEventListener('popstate', e => {
    console.log(e.state);
})

function displayHomePage(){
    const homePageButton = document.querySelector('#home-button');
    
    homePageButton.addEventListener('click', function(){
        resetPage(pageMainSection);
        history.pushState('home', null, 'home');
    });
};

function displayWorkPage(){
    const workPageButton = document.querySelector('#work-button');
    
    workPageButton.addEventListener('click', function(){
        resetPage(pageMainSection);
        history.pushState('work', null, 'work');
        
        pageMainSection.classList.add('grid-container')

        for(let i = 0; i < projectList.length; i++){
            projectList[i].thumbnailCreation(pageMainSection);

        }

    });
};

function displayAboutPage(){
    const aboutPageButton = document.querySelector('#about-button');

    aboutPageButton.addEventListener('click', function(){
        resetPage(pageMainSection);
        console.log('about linked')

        pageHeader.innerText = 'ABOUT';
        pageBody.classList.remove('grid-dark');

        pageMainSection.className = 'generic-flex-container';

        let aboutTextSection = document.createElement('div');
        aboutTextSection.classList.add('description-text-container')
        pageMainSection.appendChild(aboutTextSection);

        let aboutText = document.createElement('p')
        aboutText.innerText = ('Liam Hepworth is a graphic designer, 3D Artist and JavaScript  developer working in the North-West of England.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor libero sed diam tempus, sit amet tempus justo pellentesque. Fusce porta dapibus vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non ante id est porttitor feugiat. Morbi eu augue nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla non sem at augue fermentum malesuada. Phasellus vitae porttitor nunc. Fusce commodo lacinia metus, quis congue ligula finibus nec. ')
        aboutText.classList.add('basic-text', 'description-text')
        aboutTextSection.appendChild(aboutText);

        pageMainSection.appendChild(createBlueGridFiller());
    });
}

function displayContactPage(){
    const contactPageButton = document.querySelector('#contact-button');
    
    contactPageButton.addEventListener('click', function(){
        resetPage(pageMainSection);
    });
};