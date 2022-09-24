let pageMainSection = document.querySelector('#page-main-section');
const pageBody = document.querySelector('body')
const headerSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('#header')
const burgerMenuMobile = document.querySelector('.burger-menu');

const backgroundColourDark = 'rgb(23, 23, 23)';
const backgroundColourBlue = 'rgb(0, 146, 189)';

let menuItemsAreClicked = false;

(function mobileMenuPopUp(){

    let oldHeader = ''

    let menuContainer = document.createElement('nav')
    let menuList = document.createElement('ul');

    let menuListNames = ['home', 'work', 'about', 'contact'];
    let menuListIds = ['home-button', 'work-button', 'about-button', 'contact-button']

    let menuListItems = [];           //the actual <li> elements

    for(let i = 0; i < 4; i++){
        menuListItems[i] = document.createElement('li');
        menuListItems[i].innerText = menuListNames[i].toUpperCase();
        menuListItems[i].id = menuListIds[i];
        menuListItems[i].classList.add('headers', 'sub-header', 'menu-list-items');
        menuList.appendChild(menuListItems[i])
    }
    
    menuContainer.appendChild(menuList);
    menuContainer.classList.add('grid-background', 'grid-light', 'blue', 'vertical-center', 'menu-container');
    menuList.classList.add('vertical-center', 'menu-list') 

    burgerMenuMobile.addEventListener('click', function(e){
        function showMenu(){

        oldHeader = pageHeader.innerText
        
        pageMainSection.appendChild(menuContainer);
        burgerMenuMobile.innerText = 'close';
        pageHeader.innerText = 'MENU';


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
        pageHeader.innerText = oldHeader;
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

let helperFunc = {
    resetPage: (containerName) => {
        containerName.innerHTML = '';
        burgerMenuMobile.innerText = 'menu';
        pageHeader.innerText = 'HEPWORTH.\n DESIGN' ;
        pageBody.classList.add('grid-background');
        pageMainSection.classList.remove('grid-container', 'generic-flex-container');    
    },

    createBlueGridFiller: () => {
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grid-sections');
        return gridFiller;    
    }, 

    expandingSection: (arrowName, targetContainer, childIndex) => {
        let arrowIsClicked = undefined;
    
        arrowName.addEventListener('click', function(){
                if(arrowIsClicked == false || arrowIsClicked == undefined){
                    targetContainer.classList.add('expanded');                        //fit content, auto overflow
                    targetContainer.children[childIndex].style.color = '#cccccc';     //removes the text gradient effect from the text
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
    }, 

    resetScrollPosition: () => {
        window.scrollTo(0, 0);
        console.log('scroll to top');    
    }, 

    setAttributes: (el, attrs) => {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
          };
      
    }
}

class Project {
    constructor(name, type, images, videos, embeddedContent, description, thumbnail) {
        this.name = name;
        this.type = type;
        this.images = images;
        this.videos = videos;
        this.embeddedContent = embeddedContent;
        this.description = description;
        this.thumbnail = thumbnail;
    };
    
    thumbnailCreation(container){
        let thumbnail = new Image();
        thumbnail.src = this.thumbnail;
        thumbnail.classList.add('thumbnail');
        container.appendChild(thumbnail);
    };

    carouselCreation(container){

        function createVideos(index, item){
            let video = document.createElement('video');
            helperFunc.setAttributes(video, {autoplay: 'autoplay', loop: true, controls: true});

            video.classList.add('videos');

            let source = document.createElement('source');
            helperFunc.setAttributes(source, {src: item.videos[index], type:'video/mp4'});
            
            video.oncanplay = () => {
                video.muted = true;
                video.play();
            }
            
            video.appendChild(source);
            container.appendChild(video)
            
        }

        if(this.videos !== null){
            if(this.videos.length > 1){
                for(let i = 0; i <this.videos.length; i++){
                    createVideos(i, this)
                } 
            } else if (this.videos.length = 1) {
                createVideos(0, this)
            };
        } else if(this.images !== null){
            let imageStore = [];
            
            for(let i = 0; i < this.images.length; i++){
                    imageStore[i] = new Image();
                    imageStore[i].src = this.images[i];
                    container.appendChild(imageStore[i]);
                }; 
        }
          
    };

    pushProjectPageHistory(){
        history.pushState(this.name, null, null);
        helperFunc.resetScrollPosition();
    };

};

let projectList = [
    new Project('UNREAL TEST', 'poster', ['/projects/unreal/image01.png', '/projects/unreal/image02.png'], null, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png')
]; 

let displayPage = {
    home: function displayHomePage(){
        helperFunc.resetPage(pageMainSection);
    }, 
    
    work: function displayWorkPage(){
        helperFunc.resetPage(pageMainSection);
        
        pageMainSection.classList.add('grid-container');
        
        for(let i = 0; i < projectList.length; i++){
            projectList[i].thumbnailCreation(pageMainSection);    
        };

        let thumbNails = document.querySelectorAll('.thumbnail');
        
        thumbNails.forEach(function(thumbnail){  
            thumbnail.addEventListener('click', function(){
                console.log('clicked proj');

                let currentPage = Array.from(thumbNails).indexOf(thumbnail)
                console.log(currentPage);
                displayPage.project(currentPage);

                projectList[currentPage].pushProjectPageHistory();
            });
        });
    },

    project: function displayProjectPage(projectIndex){

        helperFunc.resetPage(pageMainSection);

        pageHeader.innerText = projectList[projectIndex].name.toUpperCase();
        pageBody.classList.remove('grid-background');

        let projectTextContainer = document.createElement('section');                           //creates a container for the whole text/button top section.
        projectTextContainer.classList.add('project-all-text-container')
        
        let descriptionTextContainer = document.createElement('div')                            //creates an expandable container for all project text.
        descriptionTextContainer.classList.add('project-description-text-container');

        let textTypeOfProject = document.createElement('p');                                     //project type
        textTypeOfProject.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;  // '\u00A0' adds a space
        textTypeOfProject.classList.add('body-text', 'project-text') 

        let textProjectDescription = document.createElement('p');                               //project description
        textProjectDescription.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        textProjectDescription.classList.add('body-text', 'project-text');
        
        let dropDownArrow = document.createElement('span');
        dropDownArrow.innerText = 'expand_more'
        dropDownArrow.classList.add('material-symbols-outlined', 'dropdown-arrow');
        
        pageMainSection.appendChild(projectTextContainer);
        projectTextContainer.appendChild(descriptionTextContainer);
        descriptionTextContainer.append(textTypeOfProject);
        
        if(projectList[projectIndex].description !== null){                                   //resize if no desc
            descriptionTextContainer.append(textProjectDescription);
            projectTextContainer.appendChild(helperFunc.expandingSection(dropDownArrow, descriptionTextContainer, 1));
        } else if(projectList[projectIndex].description === null){
            descriptionTextContainer.classList.add('expanded');
        };

        let imageContainer = document.createElement('section');
        imageContainer.classList.add('grid-container', 'grid-background', 'project-image-container');
        
        projectList[projectIndex].carouselCreation(imageContainer);
        pageMainSection.appendChild(imageContainer);
    },
    
    about: function displayAboutPage(){
        helperFunc.resetPage(pageMainSection);
        
        pageHeader.innerText = 'ABOUT';
        pageBody.classList.remove('grid-background');
        
        pageMainSection.className = 'generic-flex-container';
        
        let aboutTextSection = document.createElement('div');
        aboutTextSection.classList.add('description-text-container')
        pageMainSection.appendChild(aboutTextSection);
        
        let aboutText = document.createElement('p')
        aboutText.innerText = ('Liam Hepworth is a graphic designer, 3D Artist and JavaScript  developer working in the North-West of England.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor libero sed diam tempus, sit amet tempus justo pellentesque. Fusce porta dapibus vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non ante id est porttitor feugiat. Morbi eu augue nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla non sem at augue fermentum malesuada. Phasellus vitae porttitor nunc. Fusce commodo lacinia metus, quis congue ligula finibus nec. ')
        aboutText.classList.add('body-text', 'description-text')
        aboutTextSection.appendChild(aboutText);
        
        pageMainSection.appendChild(helperFunc.createBlueGridFiller());
    }, 
    
    contact: function displayContactPage(){
        helperFunc.resetPage(pageMainSection);
        console.log('displaying contact page');

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-background');
        pageMainSection.className = 'generic-flex-container';

        let contactFormContainer = document.createElement('div');
        contactFormContainer.classList.add('description-text-container')
        pageMainSection.appendChild(contactFormContainer);

        let contactDescription = document.createElement('p');
        contactDescription.classList.add('body-text', 'description-text')
        contactDescription.innerText = ("If you've made it this far, I'd love to hear from you. Drop me a line below.")
        contactFormContainer.appendChild(contactDescription);
        
        let contactForm = document.createElement('form');
        helperFunc.setAttributes(contactForm, {id: 'contact-form', action: 'https://formsubmit.co/ajax/80ca32f4e9acd49c7ce1361df5b9e12a', method: 'POST'});
        
        let emailInput = document.createElement('input');
        helperFunc.setAttributes(emailInput, {placeholder: 'Email', type: 'email', id: 'email-input', name: 'email', required: true});

        let subjectInput = document.createElement('input');
        helperFunc.setAttributes(subjectInput, {placeholder: 'Subject', type: 'text', id: 'subject-input', name: 'subject', required: true});
        
        let messageInput = document.createElement('textarea');
        helperFunc.setAttributes(messageInput, {placeholder: 'Message', type: 'text', id: 'message-input', name: 'message', required: true});
        
        let honeyPot = document.createElement('input')
        helperFunc.setAttributes(honeyPot, {type: 'hidden', name: '_honey', style: 'display: none;'});
        
        let submitButton = document.createElement('input');
        helperFunc.setAttributes(submitButton, {type: 'submit', value: 'Send', id: 'submit-button', name: 'submit'});

        contactForm.append(emailInput, subjectInput, messageInput, honeyPot, submitButton);
        
        contactFormContainer.appendChild(contactForm);

        pageMainSection.appendChild(helperFunc.createBlueGridFiller());

        contactForm.addEventListener('submit', (e) =>{

            e.preventDefault;

            let mail = {
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            };

            fetch("https://formsubmit.co/ajax/80ca32f4e9acd49c7ce1361df5b9e12a", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: mail.email,
                    subject: mail.subject, 
                    message: mail.message
                })
                })
                .then((response) =>{
                    if(response.status==200){
                        alert('Message sent succesfully!');
                    } else {
                        alert('Something went wrong');
                    }
                })
                .then(displayPage.contact())
            .catch(error => console.log(error));
        })
    }
};

displayPage.project(0);
