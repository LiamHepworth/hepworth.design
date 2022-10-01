const fullPage = document.querySelector('html')
const pageBody = document.querySelector('body');
let pageMainSection = document.querySelector('#page-main-section');
const pageHeader = document.querySelector('#header');
const burgerMenuMobile = document.querySelector('#burger-menu');
const menuContainer = document.createElement('nav');

let helperFunc = {
    menuAnimation: (input) => {
        if(input === 'clear'){
            menuContainer.classList.remove('menu-appear');
            pageBody.classList.remove('noScroll');
        } else if(input === 'play'){
            //hiding overflow to ensure scroll bars don't appear, removed on resetPage and hideMenu()
            fullPage.style.overflow = 'hidden'                 
            pageBody.style.overflow = 'hidden'
            pageBody.classList.add('noScroll');
            helperFunc.resetScrollPosition();
            menuContainer.classList.add('menu-appear');
        };
    },

    resetPage: (containerName) => {
        helperFunc.menuAnimation('clear');
        fullPage.style.overflow = 'visible'                 
        pageBody.style.overflow = 'visible'
        containerName.innerHTML = '';
        pageHeader.innerText = 'HEPWORTH.DESIGN';
        pageBody.classList.add('grid-background');
        pageMainSection.classList.remove('grid-container', 'column-flex-container', 'work-page-container');    
    },

    clearContainer: (containerName) => {
        containerName.innerHTML = ''
    },

    createBlueGridFiller: () => {
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grow');
        return gridFiller;    
    }, 

    expandingSection: (arrowName, targetContainer, childIndex) => {  //childIndex lets you determine which child container you actually want to expand
        let arrowIsClicked = undefined;
    
        arrowName.addEventListener('click', function(){
                if(arrowIsClicked == false || arrowIsClicked == undefined){
                    targetContainer.classList.add('expanded');                        //fit content, auto overflow
                    targetContainer.children[childIndex].style.color = '#cccccc';     //removes the text gradient effect from the text
                    arrowName.style.transform = 'rotate(180deg)';                     //rotates arrow in preparation to collapse container
                    arrowIsClicked = true;                                            //switches to true so that when arrow is clicked, the following code runs:
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
      
    },

    createLinkedIcon: (iconName, URL, containerName) => {
        //create link
        let link = document.createElement('a')
        helperFunc.setAttributes(link, {'href': URL, 'class': 'link-container'})

        //create SVG 
        let icon = document.createElement('svg')
        link.appendChild(icon)
        helperFunc.setAttributes(icon, {'data-feather': iconName, 'class': 'basic-icon larger-icon'})

        //append SVG to link, link to page
        containerName.appendChild(link); 
        link.appendChild(icon);
    },

    getRange: (start, int, end) => {
            if(start <= int && int <= end){
                // console.log(int + ' is in range')
                return true;
            }else{
                return false
            };
    }
};

function navCreation(){
    //ensures history doesn't get pushed more than once per page/eventListener is only added once to menu icon
    let menuItemsAreClicked = false; 

    let menuListNames = ['home', 'work', 'about', 'contact'];
    let menuListElements = []; //to store DOM <li> elements  

    let menuList = document.createElement('ul');
    let closeMenuMobile;

    let menuDOMElements;

    function createMenuEls(){
        for(let i = 0; i < menuListNames.length; i++){
            menuListElements[i] = document.createElement('li');
            menuListElements[i].innerText = menuListNames[i].toUpperCase();
            menuListElements[i].setAttribute('id', 'menu-item')
            menuList.appendChild(menuListElements[i])
        };
    }

    if(window.innerWidth < 1080){
        console.log('mobile')

        //creating and styling DOM elements
        menuContainer.classList.add('blue', 'grid-background', 'grid-light', 'menu-container', 'static');
    
        const menuHeaderSection = document.createElement('div');
        menuHeaderSection.className = 'header-section';
        
        const menuHeader = document.createElement('h1');
        menuHeader.className = 'header';
        menuHeader.innerText = 'MENU';
        
        closeMenuMobile = document.createElement('span');
        closeMenuMobile.innerText = 'close';
        closeMenuMobile.classList.add('material-symbols-outlined', 'basic-icon');
    
        menuList.classList.add('vertical-center', 'menu-list') 

        createMenuEls();
        menuDOMElements = menuList.querySelectorAll('#menu-item');

        menuListElements.forEach(el => el.setAttribute('class', 'header sub-header menu-list-items')) 

        //appending DOM elements to the menu container
        menuHeaderSection.append(menuHeader, closeMenuMobile);
        menuContainer.append(menuHeaderSection, menuList);

        burgerMenuMobile.addEventListener('click', function(e){
            (function showMenu(){
                //appending menu container to the page
                pageMainSection.appendChild(menuContainer);
                makeMenuItemsClickable();
            })();
            helperFunc.menuAnimation('play');
        });
        
        closeMenuMobile.addEventListener('click', function(){
            function hideMenu(){
                pageMainSection.removeChild(menuContainer);
                fullPage.style.overflow = 'visible'                 
                pageBody.style.overflow = 'visible'
            };
            helperFunc.menuAnimation('clear');
            setTimeout(hideMenu, 300);
        }); 

    } else if(window.innerWidth >= 1080){

        console.log('desktop')
        let bottomNavBar = document.querySelector('.bar.bottom-bar');
        helperFunc.clearContainer(bottomNavBar);
        bottomNavBar.appendChild(menuContainer);
        menuContainer.appendChild(menuList);

        createMenuEls();
        menuDOMElements = menuList.querySelectorAll('#menu-item');

        console.log(menuListElements)
        menuListElements.forEach(el => el.setAttribute('class', 'body-text')) 

        let linkSection = document.createElement('span');
        helperFunc.createLinkedIcon('instagram', 'https://www.instagram.com/hepworth.design/?hl=en', linkSection);
        helperFunc.createLinkedIcon('linkedin', 'https://www.linkedin.com/in/liam-moses-b64754182/', linkSection);

        menuListElements[3].appendChild(linkSection);
        makeMenuItemsClickable();
    }; 

    function makeMenuItemsClickable(){
        if(menuItemsAreClicked == false){
            menuDOMElements.forEach((el) => {
                el.addEventListener('click', () => {
                    //prevents listener being applied twice
                    menuItemsAreClicked = true;  
                    //gets the index of whatever el was clicked
                    let ind = Array.from(menuDOMElements).indexOf(el);
                    //ensures that if an item is clicked, the menu slides away, doesn't disappear
                    helperFunc.menuAnimation('clear');
                    setTimeout(displayPage[menuListNames[ind]], 300);
                    history.pushState(menuListNames[ind], null, null);
                    return;
                });
            });
        };
    }    
};

navCreation();

(function checkHistory(){
    window.addEventListener('popstate', e => {
        //loop is used to determine if e.state matches the name of any of the projects in the list
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
            
            video.oncanplay = () => {  //ensures video autoplays when page is fully loaded
                video.muted = true;
                video.play();
            }
            
            video.appendChild(source);
            container.appendChild(video)
        };

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
        pageMainSection.classList.add('grid-container', 'work-page-container');
        
        for(let i = 0; i < projectList.length; i++){
            projectList[i].thumbnailCreation(pageMainSection);    //create thumbnails to display
        };

        let thumbNails = document.querySelectorAll('.thumbnail');
        
        thumbNails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', function () {
                let currentPage = Array.from(thumbNails).indexOf(thumbnail);
                displayPage.project(currentPage);
                projectList[currentPage].pushProjectPageHistory();
            });
        });
    },

    project: function displayProjectPage(projectIndex){
        helperFunc.resetPage(pageMainSection);
        pageMainSection.classList.add('grid-container');

        pageHeader.innerText = projectList[projectIndex].name.toUpperCase();
        pageBody.classList.remove('grid-background');

        //create outer container for expandable section, which includes text + dropdown button
        let projectTextOuterContainer = document.createElement('section');     
        projectTextOuterContainer.classList.add('outer-content-container')

        //create container for just the text
        let projectTextContainer = document.createElement('div')
        projectTextContainer.classList.add('expanding-text-container');

        //project type, '\u00A0' adds a space when adding innerText
        let projectTypeText = document.createElement('p');                                     
        projectTypeText.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;
        projectTypeText.classList.add('body-text', 'project-text') 

        //project description
        let projectDescriptionText = document.createElement('p');                               
        projectDescriptionText.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        projectDescriptionText.classList.add('body-text', 'project-text');
        
        //drop-down button
        let dropDownArrow = document.createElement('span');
        dropDownArrow.innerText = 'expand_more'
        dropDownArrow.classList.add('material-symbols-outlined', 'dropdown-arrow');

        pageMainSection.appendChild(projectTextOuterContainer);
        projectTextOuterContainer.appendChild(projectTextContainer);
        projectTextContainer.append(projectTypeText);
        
        //check if project object has a .description, if not, apply different styling.
        if(projectList[projectIndex].description !== null){                                   //resize if no desc
            projectTextContainer.append(projectDescriptionText);
            projectTextOuterContainer.appendChild(helperFunc.expandingSection(dropDownArrow, projectTextContainer, 1));
        } else if(projectList[projectIndex].description === null){
            projectTextContainer.classList.add('expanded');
        };

        //create container for carousel of images, create carousel, append
        let projectImageContainer = document.createElement('section');
        projectImageContainer.classList.add('grid-background', 'project-image-container');
        
        projectList[projectIndex].carouselCreation(projectImageContainer);
        pageMainSection.appendChild(projectImageContainer);
    },
    
    about: function displayAboutPage(){
        helperFunc.resetPage(pageMainSection);
        
        pageHeader.innerText = 'ABOUT';
        pageBody.classList.remove('grid-background');
        
        pageMainSection.className = 'column-flex-container';
        
        let aboutTextSection = document.createElement('div');
        aboutTextSection.classList.add('content-container')
        pageMainSection.appendChild(aboutTextSection);
        
        let aboutText = document.createElement('p')
        aboutText.innerText = ('Liam Hepworth is a graphic designer, 3D Artist and JavaScript  developer working in the North-West of England.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor libero sed diam tempus, sit amet tempus justo pellentesque. Fusce porta dapibus vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non ante id est porttitor feugiat. Morbi eu augue nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla non sem at augue fermentum malesuada. Phasellus vitae porttitor nunc. Fusce commodo lacinia metus, quis congue ligula finibus nec. ')
        aboutText.classList.add('body-text')
        aboutTextSection.appendChild(aboutText);

        let linkSection = document.createElement('div');
        linkSection.classList.add('content-container');
        helperFunc.createLinkedIcon('instagram', 'https://www.instagram.com/hepworth.design/?hl=en', linkSection);
        helperFunc.createLinkedIcon('linkedin', 'https://www.linkedin.com/in/liam-moses-b64754182/', linkSection);
        
        pageMainSection.appendChild(linkSection);
        pageMainSection.appendChild(helperFunc.createBlueGridFiller());
        
        //ensure feather SVG data is updated when the page completes loading;
        feather.replace(); 
    }, 
    
    contact: function displayContactPage(){
        helperFunc.resetPage(pageMainSection);
        console.log('displaying contact page');

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-background');
        pageMainSection.className = 'column-flex-container';

        let contactFormContainer = document.createElement('div');
        contactFormContainer.classList.add('content-container')
        pageMainSection.appendChild(contactFormContainer);

        let contactDescription = document.createElement('p');
        contactDescription.classList.add('body-text')
        contactDescription.innerText = ("If you've made it this far, I'd love to hear from you. Drop me a line below.")
        contactFormContainer.appendChild(contactDescription);
        
        //create form and set attributes
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

// let breakPoints = {
//     mobile: helperFunc.getRange(1, window.innerWidth, 800),
//     smallScreen: helperFunc.getRange(800, window.innerWidth, 1080),
//     largeScreen: helperFunc.getRange(1080, window.innerWidth, 2500)
// };

window.addEventListener('resize', () => {    //need to clear desktop nav, mobile Nav loses functionality
    // if(helperFunc.getRange(1, window.innerWidth, 800) === true){
    //     console.log('MOBILE TRUE')
    //     navCreation();
    //     return
    // } else if(helperFunc.getRange(800, window.innerWidth, 1080) === true){
    //     console.log('Small Screen TRUE')
    //     navCreation();
    //     return
    // } else if(helperFunc.getRange(1080, window.innerWidth, 2500) === true){
    //     console.log('Large Screen TRUE')
    //     navCreation();
    //     return
    // }

    if(window.innerWidth < 800){
        console.log('mobile')
    } else if (window.innerWidth > 800){
        console.log('desktop')
    }
});

// displayPage.about();