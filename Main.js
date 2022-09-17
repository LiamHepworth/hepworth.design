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

            if(menuItemsAreClicked == false){  //prevents listener being re-applied every time the menu opens
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

    pushProjectPageHistory(){
        history.pushState(this.name, null, null);
        resetScrollPosition();
    };
};

let projectList = [
    new Project('UNREAL TEST', 'poster', 'stills', ['projects/unreal/image01.png', 'projects/unreal/image02.png'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.'),
    new Project('severe', 'poster', 'stills', ['projects/severe/image01.jpg'], 'severe placeholder description')
];

function resetPage(containerName){
    containerName.innerHTML = '';
    burgerMenuMobile.innerText = 'menu';
    pageHeader.innerText = 'HEPWORTH.\n DESIGN' ;
    pageBody.classList.add('grid-dark')
    pageMainSection.classList.remove('grid-container', 'generic-flex-container');
};

function createBlueGridFiller(){
    let gridFiller = document.createElement('div');
    gridFiller.classList.add('blue', 'grid-light', 'grid-sections');
    return gridFiller;
};

(function checkHistory(){
    window.addEventListener('popstate', e => {

        console.log(e.state);

        for(let i = 0; i < projectList.length; i++){
            if(e.state === 'home' || e.state === null || e.state === undefined){
                displayPage.home();
                return;
            } else if(e.state === 'work'){
                displayPage.work();
                return;
            } else if(e.state === 'about'){
                displayPage.about();  
                return;          
            } else if(e.state === 'contact'){
                displayPage.contact(); 
                return;         
            } else if(e.state === projectList[i].name){
                displayPage.project(i);
            };
        };
    });
})();

function expandingSection(arrowName, targetContainer, childIndex){

    let arrowIsClicked = undefined;
    
    arrowName.addEventListener('click', function(){
            if(arrowIsClicked == false || arrowIsClicked == undefined){
                targetContainer.classList.add('expanded');
                targetContainer.children[childIndex].style.color = '#cccccc';
                arrowName.style.transform = 'rotate(180deg)';
                arrowIsClicked = true;
            } else if (arrowIsClicked == true){
                targetContainer.classList.remove('expanded');
                targetContainer.children[childIndex].style.color = '#ffffff00';
                arrowName.style.transform = 'rotate(0deg)';
                arrowIsClicked = false;
            };
        });

    return arrowName;
};

function resetScrollPosition(){
    window.scrollTo(0, 0);
    console.log('scroll to top')
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    };
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
                console.log('clicked proj');

                let currentPage = Array.from(thumbNails).indexOf(image)
                console.log(currentPage);
                displayPage.project(currentPage);

                projectList[currentPage].pushProjectPageHistory();
            });
        });
    },

    project: function displayProjectPage(projectIndex){

        resetPage(pageMainSection);

        pageHeader.innerText = projectList[projectIndex].name.toUpperCase();
        pageBody.classList.remove('grid-dark');

        let projectTextContainer = document.createElement('section');
        projectTextContainer.classList.add('project-all-text-container')
        
        let descriptionTextContainer = document.createElement('div')
        descriptionTextContainer.classList.add('project-description-text-container');

        let textTypeOfProject = document.createElement('p');
        textTypeOfProject.innerText = `Project Type: ${projectList[projectIndex].type}`;
        textTypeOfProject.classList.add('body-text', 'project-text')
        
        let textProjectDescription = document.createElement('p');
        textProjectDescription.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        textProjectDescription.classList.add('body-text', 'project-text');

        let dropDownArrow = document.createElement('span');
        dropDownArrow.innerText = 'expand_more'
        dropDownArrow.classList.add('material-symbols-outlined', 'dropdown-arrow');

        pageMainSection.appendChild(projectTextContainer);
        projectTextContainer.append(descriptionTextContainer, dropDownArrow);
        descriptionTextContainer.append(textTypeOfProject, textProjectDescription);

        expandingSection(dropDownArrow, descriptionTextContainer, 1);
        
        let imageContainer = document.createElement('section');
        imageContainer.classList.add('grid-container', 'grid-dark', 'project-image-container');
        
        projectList[projectIndex].carouselCreation(imageContainer);
        pageMainSection.appendChild(imageContainer);
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
        aboutText.classList.add('body-text', 'description-text')
        aboutTextSection.appendChild(aboutText);
        
        pageMainSection.appendChild(createBlueGridFiller());
    }, 
    
    contact: function displayContactPage(){
        resetPage(pageMainSection);
        console.log('displaying contact page');

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-dark');
        pageMainSection.className = 'generic-flex-container';

        let contactFormContainer = document.createElement('div');
        contactFormContainer.classList.add('description-text-container')
        pageMainSection.appendChild(contactFormContainer);

        let contactDescription = document.createElement('p');
        contactDescription.classList.add('body-text', 'description-text')
        contactDescription.innerText = ("If you've made it this far, I'd love to hear from you. Drop me a line below.")
        contactFormContainer.appendChild(contactDescription);
        
        let contactForm = document.createElement('form');
        
        // let emailLabel = document.createElement('label')
        let emailInput = document.createElement('input');
        setAttributes(emailInput, {placeholder: 'email', name: 'emailInput'})
        
        // let subjectLabel = document.createElement('label')
        let subjectInput = document.createElement('input');
        
        // let messageLabel = document.createElement('label')
        let messageInput = document.createElement('input');
        
        let submitButton = document.createElement('input');
        
        contactForm.append(emailInput, subjectInput, messageInput, submitButton);
        
        contactFormContainer.appendChild(contactForm);


        pageMainSection.appendChild(createBlueGridFiller());
    }
};

displayPage.contact();