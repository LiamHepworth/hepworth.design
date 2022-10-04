const fullPage = document.querySelector('html')
const pageBody = document.querySelector('body');
const pageMainSection = document.querySelector('#page-main-section');
const pageHeaderSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('.header');
const burgerMenuMobile = document.querySelector('#burger-menu');
const menuContainer = document.createElement('nav');
const bottomNavBar = document.querySelector('.bar.bottom-bar');

let util = {
    resetPage: (containerName) => {
        containerName.innerHTML = '';
        fullPage.style.overflow = 'visible'                 
        pageHeader.innerText = 'HEPWORTH.DESIGN';
        pageBody.style.overflow = 'visible'
        pageBody.classList.add('grid-background');
        pageMainSection.className = '';
    },

    appendHeader: (headerText, menuStatus, container) => {
        pageHeader.innerText = headerText;
        burgerMenuMobile.innerText = menuStatus;

        pageHeaderSection.append(pageHeader, burgerMenuMobile)
        container.appendChild(pageHeaderSection)
    },

    createBlueGridFiller: () => {
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grow');
        return gridFiller;    
    }, 

    expandingSection: (trigger, outerContainer, innerContainerIndex) => {  //innerContainerIndex lets you determine which child container you actually want to expand
        let arrowIsClicked = undefined;
    
        trigger.addEventListener('click', function(){
                if(arrowIsClicked == false || arrowIsClicked == undefined){
                    outerContainer.classList.add('expanded');                        //fit content, auto overflow
                    outerContainer.children[innerContainerIndex].style.color = '#cccccc';     //removes the text gradient effect from the text
                    trigger.style.transform = 'rotate(180deg)';                     //rotates arrow in preparation to collapse container
                    arrowIsClicked = true;                                            //switches to true so that when arrow is clicked, the following code runs:
                } else if (arrowIsClicked == true){
                    outerContainer.classList.remove('expanded');
                    outerContainer.children[innerContainerIndex].style.color = '#ffffff00';
                    trigger.style.transform = 'rotate(0deg)';
                    arrowIsClicked = false;
                };
            });
    
        return trigger;                                                            
    }, 

    resetScrollPosition: () => {
        window.scrollTo(0, 0);
    }, 

    setAttributes: (el, attrs) => {
        for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
          };
      
    },

    createLinkedIcon: (iconName, URL) => {
        //create link
        let link = document.createElement('a')
        util.setAttributes(link, {'href': URL, 'class': 'link-container'})

        //create SVG 
        let icon = document.createElement('svg')
        util.setAttributes(icon, {'data-feather': iconName, 'class': 'basic-icon larger-icon'})
        link.appendChild(icon)

        return link
    },

    elementHasId: (element, hasId, idName) => {
        if(hasId === false){
            element.removeAttribute('id');
        } else if(hasId === true){
            element.setAttribute('id', idName)
        } else {
            element.id = idName;
        }
    },

    blueMenuBar: (pageIndex) => {
        if(window.innerWidth > 1080){
            let container = menuContainer.children;
            let nav = container[container.length -1]
            let listItem = nav.children[pageIndex]
    
            for(let i = 0; i < 4; i++){
                if(i == pageIndex){
                    listItem.classList.add('solid-blue')
                } else {
                    nav.children[i].classList.remove('solid-blue')
                }
            }
        }
    }
};

const socialLinks = {
    instagram: util.createLinkedIcon('instagram', 'https://www.instagram.com/hepworth.design/?hl=en'),
    linkedIn: util.createLinkedIcon('linkedin', 'https://www.linkedin.com/in/liam-moses-b64754182/')
}

function navCreation(){

    //name/text for each menu item
    const menuListNames = ['home', 'work', 'about', 'contact']

    //nav header elements
    const navHead = {
        headerSection: document.createElement('div'),
        menuHeader: document.createElement('h1'),
        closeMenu: document.createElement('span'),
    }
    
    //main list and list items for nav
    const navList = {
        menuList: document.createElement('ul'),
        menuListItems: [], //to store <li> elements 
    };

    const linkSection = document.createElement('span');

    //create the list items for the nav
    (function menuListCreation(){
        for(let i = 0; i < menuListNames.length; i++){
            navList.menuListItems[i] = document.createElement('li');
            navList.menuListItems[i].innerText = menuListNames[i].toUpperCase();
            navList.menuListItems[i].setAttribute('id', 'menu-item')
            navList.menuList.appendChild(navList.menuListItems[i]);
        };
    })();

    //toggle the display of elements which are stored in an object
    function displayEl(object, displayStyle){
        for(let property in object){
            object[property].style.display = displayStyle;
        }
    }

    //clear the classList of elements in an object
    function clearClasses(object) {
        for(let property in object){
            object[property].className = ''
    
            if(object[property].length > 1){
                for(let i = 0; i < object[property].length; i++){
                    object[property][i].className = '';
                }
            }
        };
    };

    function menuAnimation(input){
        if(input === 'clear'){

            function hideMenu(){
                pageMainSection.removeChild(menuContainer);
                pageBody.classList.remove('noScroll');
                fullPage.style.overflow = 'visible'                 
                pageBody.style.overflow = 'visible'
            };
            setTimeout(menuContainer.classList.remove('menu-appear'), 300);
            setTimeout(hideMenu, 300);

        } else if(input === 'play'){
            //hiding overflow to ensure scroll bars don't appear, removed on resetPage and hideMenu()
            pageMainSection.appendChild(menuContainer);
            fullPage.style.overflow = 'hidden'                 
            pageBody.style.overflow = 'hidden'
            pageBody.classList.add('noScroll');
            util.resetScrollPosition();
            menuContainer.classList.add('menu-appear');
        };
    }

    function mobileNav(){

        //clear list elements classList, hide links, show header section
        clearClasses(navList);
        linkSection.style.display = 'none';
        displayEl(navHead, 'flex');

        // creating and styling DOM elements
        menuContainer.className = 'blue grid-background grid-light menu-container';

        navHead.headerSection.className = 'header-section';
        
        navHead.menuHeader.className = 'header';
        navHead.menuHeader.innerText = 'MENU';
        
        navHead.closeMenu.className = 'material-symbols-outlined basic-icon';
        navHead.closeMenu.innerText = 'close';
    
        navList.menuList.className = 'vertical-center menu-list' 

        navList.menuListItems.forEach(el => el.setAttribute('class', 'header sub-header menu-list-items')) 

        //appending DOM elements to the menu container
        navHead.headerSection.append(navHead.menuHeader, navHead.closeMenu);
        menuContainer.append(navHead.headerSection, navList.menuList);
    };

    //show mobile menu on burgermenu click
    burgerMenuMobile.addEventListener('click', function(){
        menuAnimation('play');
    });
    
    //hide menu on close button click
    navHead.closeMenu.addEventListener('click', function(){
        menuAnimation('clear');
    }); 

    function desktopNav(){

        //clear list elements classList, show links, hide header section
        clearClasses(navList);
        linkSection.style.display = 'flex';
        displayEl(navHead, 'none')

        //apply new classes to list items
        navList.menuListItems.forEach(el => el.setAttribute('class', 'body-text')) 

        //append elements
        bottomNavBar.appendChild(menuContainer);
        menuContainer.appendChild(navList.menuList);
        navList.menuListItems[3].appendChild(linkSection); 
        linkSection.append(socialLinks.instagram, socialLinks.linkedIn);
    };

    //display the nav style which corresponds to the screen size
    function displayNav(){
        if(window.innerWidth < 1080){
            console.log('mobile')
            mobileNav();
        } else if(window.innerWidth >= 1080){
            console.log('desktop')
            desktopNav();
        }; 
    };

    displayNav()

    //check screen size
    window.addEventListener('resize', () => {
        displayNav()
        //update SVG's
        feather.replace();
    });

    //add a listener to each list item which leads to it's corresponding page
    function makeMenuItemsClickable(){
        navList.menuListItems.forEach((el) => {
            el.addEventListener('click', () => {
                //gets the index of whatever el was clicked
                let ind = Array.from(navList.menuListItems).indexOf(el);
                //ensures that if an item is clicked, the menu slides away, doesn't disappear
                menuAnimation('clear');
                setTimeout(displayPage[menuListNames[ind]], 300);
                //push history state
                history.pushState(menuListNames[ind], null, null);
                return;
            });
        });
    };  

    makeMenuItemsClickable();
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
            util.setAttributes(video, {autoplay: 'autoplay', loop: true, controls: true});

            video.classList.add('videos');

            let source = document.createElement('source');
            util.setAttributes(source, {src: item.videos[index], type:'video/mp4'});
            
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
        util.resetScrollPosition();
    };
};

let projectList = [
    new Project('UNREAL TEST', 'poster', ['/projects/unreal/image01.png', '/projects/unreal/image02.png'], null, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
]; 

let displayPage = {
    home: () => {
        util.resetPage(pageMainSection);
        util.elementHasId(pageHeader, true, 'primary-header');
        util.appendHeader('HEPWORTH.DESIGN', 'menu', pageMainSection);
        util.blueMenuBar(0);
    }, 
    
    work: () => {
        util.resetPage(pageMainSection);
        util.elementHasId(pageHeader, true, 'primary-header');
        util.appendHeader('HEPWORTH.DESIGN', 'menu', pageMainSection);
        util.blueMenuBar(1);
        pageMainSection.classList.add('grid-container', 'two-column', 'work-page-container');

        for (let i = 0; i < projectList.length; i++) {
            projectList[i].thumbnailCreation(pageMainSection); //create thumbnails to display
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

    project: (projectIndex) => {
        util.resetPage(pageMainSection);
        util.elementHasId(pageHeader, false);
        util.appendHeader(projectList[projectIndex].name.toUpperCase(), 'menu', pageMainSection);

        util.blueMenuBar(1);
        pageMainSection.classList.add('grid-container');

        pageBody.classList.remove('grid-background');

        //create outer container for expandable section, which includes text + dropdown button
        let projectTextOuterContainer = document.createElement('section');
        projectTextOuterContainer.classList.add('outer-content-container');

        //create container for just the text
        let projectTextContainer = document.createElement('div');
        projectTextContainer.classList.add('expanding-text-container');

        //project type text, '\u00A0' adds a space when adding innerText
        let projectTypeText = document.createElement('p');
        projectTypeText.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;
        projectTypeText.classList.add('body-text', 'project-text');

        //project description text
        let projectDescriptionText = document.createElement('p');
        projectDescriptionText.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        projectDescriptionText.classList.add('body-text', 'project-text');

        //drop-down button
        let dropDownArrow = document.createElement('span');
        dropDownArrow.innerText = 'expand_more';
        dropDownArrow.classList.add('material-symbols-outlined', 'dropdown-arrow');

        pageMainSection.appendChild(projectTextOuterContainer);
        projectTextOuterContainer.appendChild(projectTextContainer);
        projectTextContainer.append(projectTypeText);

        //check if project object has a .description, if not, apply different styling.
        if (projectList[projectIndex].description !== null) { //resize if no desc
            projectTextContainer.append(projectDescriptionText);
            projectTextOuterContainer.appendChild(util.expandingSection(dropDownArrow, projectTextContainer, 1));
        } else if (projectList[projectIndex].description === null) {
            projectTextContainer.classList.add('expanded');
        };

        //create container for carousel of images, create carousel, append
        let projectImageContainer = document.createElement('section');
        projectImageContainer.classList.add('grid-background', 'project-image-container');

        projectList[projectIndex].carouselCreation(projectImageContainer);
        pageMainSection.appendChild(projectImageContainer);
    },
    
    about: () => {
        util.resetPage(pageMainSection);
        util.elementHasId(pageHeader, false);
        util.appendHeader('ABOUT', 'menu', pageMainSection);

        util.blueMenuBar(2);

        pageHeader.innerText = 'ABOUT';
        pageBody.classList.remove('grid-background');

        pageMainSection.className = 'column-flex-container';

        let aboutTextSection = document.createElement('div');
        aboutTextSection.classList.add('content-container');
        pageMainSection.appendChild(aboutTextSection);

        let aboutText = document.createElement('p');
        aboutText.innerText = ('Liam Hepworth is a graphic designer, 3D Artist and JavaScript  developer working in the North-West of England.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor libero sed diam tempus, sit amet tempus justo pellentesque. Fusce porta dapibus vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non ante id est porttitor feugiat. Morbi eu augue nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla non sem at augue fermentum malesuada. Phasellus vitae porttitor nunc. Fusce commodo lacinia metus, quis congue ligula finibus nec. ');
        aboutText.classList.add('body-text');
        aboutTextSection.appendChild(aboutText);

        let linkSection = document.createElement('div');
        linkSection.classList.add('content-container');

        let gridFiller = util.createBlueGridFiller();
        pageMainSection.appendChild(gridFiller);

        function appendLinks() {
            linkSection.append(socialLinks.instagram, socialLinks.linkedIn);
            pageMainSection.insertBefore(linkSection, gridFiller);
            feather.replace(); //updates icons as SVG's
        };

        //define a variable to hold timeout function
        let time;

        //call once resize is complete
        function checkWinSize() {
            if (window.innerWidth < 1080) {
                appendLinks();
            } else {
                return;
            };
        }

        checkWinSize();

        //on resize, clear existing timeout function
        window.onresize = function () {
            clearTimeout(time);
            //then, call the function again with a 1ms buffer to prevent it running until resize end. 
            time = setTimeout(function () {
                checkWinSize();
            }, 100);
        };


    }, 
    
    contact: () => {
        util.resetPage(pageMainSection);
        util.elementHasId(pageHeader, false);
        util.appendHeader('CONTACT', 'menu', pageMainSection);

        util.blueMenuBar(3);

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-background');
        pageMainSection.className = 'column-flex-container';

        let contactFormContainer = document.createElement('div');
        contactFormContainer.classList.add('content-container');
        pageMainSection.appendChild(contactFormContainer);

        let contactDescription = document.createElement('p');
        contactDescription.classList.add('body-text');
        contactDescription.innerText = ("If you've made it this far, I'd love to hear from you. Drop me a line below.");
        contactFormContainer.appendChild(contactDescription);

        //create form and set attributes
        let contactForm = document.createElement('form');
        util.setAttributes(contactForm, { id: 'contact-form', action: 'https://formsubmit.co/ajax/80ca32f4e9acd49c7ce1361df5b9e12a', method: 'POST' });

        let emailInput = document.createElement('input');
        util.setAttributes(emailInput, { placeholder: 'Email', type: 'email', id: 'email-input', name: 'email', required: true });

        let subjectInput = document.createElement('input');
        util.setAttributes(subjectInput, { placeholder: 'Subject', type: 'text', id: 'subject-input', name: 'subject', required: true });

        let messageInput = document.createElement('textarea');
        util.setAttributes(messageInput, { placeholder: 'Message', type: 'text', id: 'message-input', name: 'message', required: true });

        let honeyPot = document.createElement('input');
        util.setAttributes(honeyPot, { type: 'hidden', name: '_honey', style: 'display: none;' });

        let submitButton = document.createElement('input');
        util.setAttributes(submitButton, { type: 'submit', value: 'Send', id: 'submit-button', name: 'submit' });

        contactForm.append(emailInput, subjectInput, messageInput, honeyPot, submitButton);
        contactFormContainer.appendChild(contactForm);
        pageMainSection.appendChild(util.createBlueGridFiller());

        contactForm.addEventListener('submit', (e) => {

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
                .then((response) => {
                    if (response.status == 200) {
                        alert('Message sent succesfully!');
                    } else {
                        alert('Something went wrong');
                    }
                })
                .then(displayPage.contact())
                .catch(error => console.log(error));
        });
    }
};