let pageMainSection = document.querySelector('#page-main-section');
const pageBody = document.querySelector('body')
const headerSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('#header')
const burgerMenuMobile = document.querySelector('.burger-menu');

const backgroundColourDark = 'rgb(23, 23, 23)';
const backgroundColourBlue = 'rgb(0, 146, 189)';

let menuItemsAreClicked = false;

(function mobileMenuPopUp(){

    let menuContainer = document.createElement('nav')
    let menuList = document.createElement('ul');

    let menuListNames = ['home', 'work', 'about', 'contact'];
    let menuListIds = ['home-button', 'work-button', 'about-button', 'contact-button']

    let menuListItems = [];           //the actual <li> elements

    for(let i = 0; i < 4; i++){
        menuListItems[i] = document.createElement('li');
        menuListItems[i].innerText = menuListNames[i].toUpperCase();
        menuListItems[i].id = menuListIds[i];
        menuListItems[i].classList.add('basic-text', 'sub-header', 'menu-list-items');
        menuList.appendChild(menuListItems[i])
    }
    
    menuContainer.appendChild(menuList);
    menuContainer.classList.add('grid-light', 'blue', 'vertical-center', 'menu-container');
    menuList.classList.add('vertical-center', 'menu-list') 

    burgerMenuMobile.addEventListener('click', function(e){
        function showMenu(){

        pageMainSection.appendChild(menuContainer);
        burgerMenuMobile.innerText = 'close';

        for(let i = 0; i < menuListNames.length; i++){

            let el = {};
            el[menuListNames[i]] = document.querySelector(`#${menuListNames[i]}-button`);  //adds menu elements to DOM and stores in object;

            if(menuItemsAreClicked == false){
                el[menuListNames[i]].addEventListener('click', function displayPageUpdateHistory(){
                    menuItemsAreClicked = true;
                    displayPage[`${menuListNames[i]}`](); //calls display function
                    history.pushState(menuListNames[i], null, null);
                });
            };
        };
    };

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
})();

class Project {
    constructor(name, type, format, media, description) {
        this.name = name;
        this.type = type;
        this.format = format;
        this.media = media;
        this.description = description;
    };
    
    thumbnailCreation(container){
        let img = new Image();
        img.src = this.media[0];
        img.classList.add('thumbnail');
        container.appendChild(img);
    }

    carouselCreation(container){

        let images = [];

        for(let i = 0; i < this.media.length; i++){
            images[i] = new Image();
            images[i].src = this.media[i];
            container.appendChild(images[i]);
        };
    };
};

let projectList = [
    new Project('unreal', 'poster', 'stills', ['projects/unreal/image01.png', 'projects/unreal/image02.png'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.'),
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

(function checkHistory(){
    window.addEventListener('popstate', e => {
        if(e.state === 'home' || e.state === null){
            console.log('home');
            displayPage.home();
        } else if(e.state === 'work'){
            console.log('work');
            displayPage.work();
        } else if(e.state === 'about'){
            console.log('about');
            displayPage.about();            
        } else if(e.state === 'contact'){
            console.log('contact');
            displayPage.contact();          
        } else {
            displayPage.home();
            return;
        };

        // for(let i = 0; i < projectList.length; i++){
        //     if (e.state === projectList[i].toString()){
        //         console.log('working' + i);
        //         displayPage.project(i);
        //     };
        // }
    });
})();

function expandingSection(element, childIndex){
    let dropDownArrow = document.createElement('span');
    dropDownArrow.innerText = 'expand_more'
    dropDownArrow.classList.add('material-symbols-outlined', 'dropdown-arrow');
    
    dropDownArrow.addEventListener('click', function(){
        element.classList.add('expanded');
        element.children[childIndex].style.color = '#cccccc';
    });

    return dropDownArrow;
};


let displayPage = {
    home: function displayHomePage(){
        resetPage(pageMainSection);
    }, 
    
    work: function displayWorkPage(){
        resetPage(pageMainSection);
        
        pageMainSection.classList.add('grid-container', 'work-page')
        
        for(let i = 0; i < projectList.length; i++){
            projectList[i].thumbnailCreation(pageMainSection);    
        };

        let thumbNails = document.querySelectorAll('.thumbnail');
        
        thumbNails.forEach(function(image){  
            image.addEventListener('click', function(){
                displayPage.project(Array.from(thumbNails).indexOf(image));
            });
        });
    },

    project: function displayProjectPage(projectIndex){
        console.log('working');
        console.log(projectIndex);

        resetPage(pageMainSection);
        pageHeader.innerText = projectList[projectIndex].name.toUpperCase();

        let projectTextContainer = document.createElement('section');
        projectTextContainer.classList.add('project-all-text-container')
        
        let descriptionTextContainer = document.createElement('div')
        descriptionTextContainer.classList.add('project-description-text-container');

        let textTypeOfProject = document.createElement('p');
        textTypeOfProject.innerText = `Project Type: ${projectList[projectIndex].type}`;
        textTypeOfProject.classList.add('basic-text', 'project-text')
        
        let textProjectDescription = document.createElement('p');
        textProjectDescription.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        textProjectDescription.classList.add('basic-text', 'project-text');

        pageMainSection.appendChild(projectTextContainer);
        projectTextContainer.append(descriptionTextContainer, expandingSection(descriptionTextContainer, 1));
        descriptionTextContainer.append(textTypeOfProject, textProjectDescription);
        
        let imageContainer = document.createElement('section');
        imageContainer.classList.add('grid-container', 'black', 'project-image-container');

        projectList[projectIndex].carouselCreation(imageContainer);
        pageMainSection.appendChild(imageContainer);

        // history.pushState(projectList[projectIndex], null, null)
        // console.log(history)
    },
    
    about: function displayAboutPage(){
        resetPage(pageMainSection);
        
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
    }, 
    
    contact: function displayContactPage(){
        resetPage(pageMainSection);
    }
};

// displayPage.project(0);