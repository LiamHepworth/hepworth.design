import { monitorModels, mainRenderer } from "./app/three-scenes/mainScene"
import { aboutRenderer } from "./app/three-scenes/aboutScene";
import { contactRenderer } from "./app/three-scenes/contactScene";
import { util } from "./app/utilities";
import { projectList } from "./app/projects";
import { Page, Section } from "./app/pageSections";
import {threeIsLoaded, contentIsLoaded} from "./app/loadTracker"

const fullPage = document.querySelector('html')
const pageBody = document.querySelector('body');
const pageHeaderSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('.header');
const burgerMenuMobile = document.querySelector('#burger-menu');
const menuContainer = document.createElement('nav');
const bottomNavBar = document.querySelector('.bar.bottom-bar');
const curs = document.querySelector('.cursor');
const preloader = document.querySelector('#preload-container')

let pageContents = new Page(document.querySelector('#page-contents'), pageBody, pageBody);
let pageSectionOne = new Section(document.querySelector('#page-section-one'), pageHeaderSection, pageHeader, burgerMenuMobile)
let pageSectionTwo = new Section(document.querySelector('#page-section-two'))

//cursor styling
document.addEventListener('mousemove', (e) => {
    let x = e.clientX - 15;
    let y = e.clientY - 15;
    
    curs.style.left = x + "px";
    curs.style.top = y + "px";
}); 

const socialLinks = {
    instagram: util.createLinkedIcon('instagram', 'https://www.instagram.com/hepworth.design/?hl=en'),
    linkedIn: util.createLinkedIcon('linkedin', 'https://www.linkedin.com/in/liam-moses-b64754182/')
}

function navCreation(){

    //name + text for each menu item
    const menuListNames = ['home', 'work', 'about', 'contact']

    //mobile nav header elements
    const navHead = {
        navHeaderSection: document.createElement('div'),
        navMenuHeader: document.createElement('h1'),
        navCloseMenu: document.createElement('span'),
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
            // navList.menuListItems[i].setAttribute('id', 'menu-item') //FIX - ID applied to multiple items - may not be needed.
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
    function clearObjectClasses(object) {
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
                pageContents.el.removeChild(menuContainer);
                pageBody.classList.remove('noScroll');
                fullPage.style.overflow = 'visible'                 
                pageBody.style.overflow = 'visible'
            };

            setTimeout(menuContainer.classList.remove('menu-appear'), 300);
            setTimeout(hideMenu, 300);

        } else if(input === 'play'){
            //hiding overflow to ensure scroll bars don't appear, removed on resetPage() and hideMenu()
            pageContents.el.appendChild(menuContainer);
            fullPage.style.overflow = 'hidden'                 
            pageBody.style.overflow = 'hidden'
            pageBody.classList.add('noScroll');
            util.resetScrollPosition();
            menuContainer.classList.add('menu-appear');
        };
    }

    function mobileNav(){

        //clear list elements classList, hide links, show header section
        clearObjectClasses(navList);
        linkSection.style.display = 'none';
        displayEl(navHead, 'flex');

        // creating and styling DOM elements
        menuContainer.className = 'blue grid-background grid-light menu-container';

        navHead.navHeaderSection.className = 'header-section';
        
        navHead.navMenuHeader.className = 'header';
        navHead.navMenuHeader.innerText = 'MENU';
        
        navHead.navCloseMenu.className = 'material-symbols-outlined basic-icon';
        navHead.navCloseMenu.innerText = 'close';
    
        navList.menuList.className = 'vertical-center menu-list' 

        navList.menuListItems.forEach(el => el.setAttribute('class', 'header sub-header menu-list-items')) 

        //appending DOM elements to the menu container
        navHead.navHeaderSection.append(navHead.navMenuHeader, navHead.navCloseMenu);
        menuContainer.append(navHead.navHeaderSection, navList.menuList);
    };

    //show mobile menu on burgermenu click
    burgerMenuMobile.addEventListener('click', function(){
        menuAnimation('play');
    });
    
    //hide menu on close button click
    navHead.navCloseMenu.addEventListener('click', function(){
        menuAnimation('clear');
    }); 

    function desktopNav(){

        //clear list elements classList, show social links, hide menu header section
        clearObjectClasses(navList);
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
            mobileNav();
        } else {
            desktopNav();
        }; 
    };

    displayNav()

    //check screen size
    window.addEventListener('resize', () => {
        displayNav()
        //update SVG's when desktop nav is loaded
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

let displayPage = {
    home: () => {
        
        threeIsLoaded(monitorModels);

        pageContents.reset();
        pageSectionOne.clear();
        pageSectionTwo.clear();

        //append THREE scene
        pageSectionTwo.el.appendChild(mainRenderer.domElement);

        pageSectionOne.appendHeader('HEPWORTH.DESIGN', 'menu');
        pageHeader.classList = 'header large-header-alignment'

        const homeHeaderColour = util.createBackdrop(pageHeader, 0, 7.3, 1, 0.4);
        pageHeaderSection.appendChild(homeHeaderColour);
        
        function checkHomeWindowSize(){
            if(window.innerWidth >= 1080){
                pageSectionOne.el.classList.add('work-header-container');
                pageHeaderSection.className = 'large-header-section'
                homeHeaderColour.style.display = 'block'
                util.blueMenuBar(0, menuContainer);
                
            }else if(window.innerWidth < 1080){
                pageHeaderSection.className = 'header-section'
                homeHeaderColour.style.display = 'none'
            };
        };

        checkHomeWindowSize();

        window.addEventListener('resize', function(){
            if(history.state === 'home' || history.state === null){
                checkHomeWindowSize();
            };
        });
    }, 
    
    work: () => {

        contentIsLoaded();

        pageContents.reset()
        pageSectionOne.clear()
        pageSectionTwo.clear()
        
        pageSectionOne.appendHeader('HEPWORTH.DESIGN', 'menu');
        pageHeader.classList = 'header large-header-alignment'

        const workHeaderColour = util.createBackdrop(pageHeader, 0, 7.3, 1, 0.4);
        pageHeaderSection.appendChild(workHeaderColour);
        
        pageSectionOne.el.classList.add('work-header-container');
        pageSectionTwo.el.classList.add('grid-container', 'gallery', 'work-page-container');

        for (let i = 0; i < projectList.length; i++) {
            projectList[i].thumbnailCreation(pageSectionTwo.el); //create project thumbnails
        };

        let thumbNails = document.querySelectorAll('.thumbnail');

        thumbNails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', function () {
                let currentPage = Array.from(thumbNails).indexOf(thumbnail);       //get the index of the current project from nodeList
                displayPage.project(currentPage);                                  //display the selected page when corresponding thumbnail is clicked
                projectList[currentPage].pushProjectPageHistory();
            });
        });

        function checkWorkWindowSize(){
            if(window.innerWidth >= 1080){
                pageHeaderSection.className = 'large-header-section'
                workHeaderColour.style.display = 'block'
                
                util.blueMenuBar(1, menuContainer);
            }else if(window.innerWidth < 1080){
                pageHeaderSection.className = 'header-section'
                workHeaderColour.style.display = 'none'
            };
        };

        checkWorkWindowSize();

        window.addEventListener('resize', function(){
            if(history.state === 'work'){
                checkWorkWindowSize();
            };
        });
    },

    project: (projectIndex) => {

        contentIsLoaded();

        pageContents.reset()
        pageSectionOne.clear()
        pageSectionOne.el.className = 'proj-text-container'
        pageSectionTwo.clear()
        
        pageSectionOne.appendHeader(projectList[projectIndex].name.toUpperCase(), 'menu', 'header small-header');
        // pageHeaderSection.className = 'header-section'

        let currentProject = projectList[projectIndex];

        //hide the grid background
        pageBody.classList.remove('grid-background');

        //create outer container for expandable section, which includes all text + dropdown button
        const projectInfoContainer = util.createEl('section', 'outer-content-container', pageSectionOne.el);
        
        //create container for just the text (project "type" + description)
        const projectTextContainer = util.createEl('div', 'expanding-text-container', projectInfoContainer);
        
        //project "type" text, '\u00A0' adds a space when adding innerText
        const projectType = util.createEl('p', 'body-text project-text', projectTextContainer);
        projectType.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;
        
        //project description text
        const projectDescription = util.createEl('p', 'body-text');
        projectType.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;
        projectDescription.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        
        //text gradient overlay
        const gradientOverlay = util.createEl('div', 'gradient-overlay', pageSectionOne.el);
        
        //drop-down button
        const dropDownArrow = util.createEl('span', 'material-symbols-outlined arrows dropdown-arrow');
        dropDownArrow.innerText = 'expand_more';
        
        //create container for carousel of images, create carousel, append
        const projectImageContainer = util.createEl('section', 'grid-background project-image-container', pageSectionTwo.el);
        projectList[projectIndex].carouselCreation(projectImageContainer);

        //Arrows just become hidden under bottom bar when in mobile view, not actually removed.
        (function carouselImageFocus(){

        //create side arrows to scroll carousel for desktop layout
        const leftArrow = util.createEl('span', 'arrows carousel-arrows material-symbols-outlined');
        leftArrow.innerText = 'expand_more';
        leftArrow.style.transform = 'rotate(90deg)'; 
        
        const rightArrow = util.createEl('span', 'arrows carousel-arrows material-symbols-outlined');
        rightArrow.innerText = 'expand_more';
        rightArrow.style.transform = 'rotate(-90deg)'; 

            let images = [];
            images = projectImageContainer.children

            let currentIndex = 0
            let currentImage = images[currentIndex];

            rightArrow.addEventListener('click', function(){
                if(currentIndex < images.length - 1){
                    currentIndex ++
                    currentImage = images[currentIndex]

                    currentImage.scrollIntoView({
                        behavior: 'smooth',
                    });
                } else {
                    return
                }
            })
            
            leftArrow.addEventListener('click', function(){
                if(currentIndex > 0){
                    currentIndex --
                    currentImage = images[currentIndex]
                    
                    currentImage.scrollIntoView({
                        behavior: 'smooth',
                    });
                } else {
                    return
                }
            })

            for(const child of projectImageContainer.children){
                child.addEventListener('click', function(){
                    currentIndex = Array.from(projectImageContainer.children).indexOf(this);
                    currentImage = images[currentIndex];

                    currentImage.scrollIntoView({
                        behavior: 'smooth',
                    });
                })
            }

            if(images.length > 1){
                pageSectionTwo.el.append(leftArrow, rightArrow);
            } else {
                return;
            }
        })();

        //check if project object has a description to determine styling
        if(currentProject.description !== null){
            projectTextContainer.append(projectDescription);

            //creates dropdown arrow functionality
            function expandingSection(){
                let arrowIsClicked = undefined;
                dropDownArrow.addEventListener('click', function(){
                        if(arrowIsClicked == false || arrowIsClicked == undefined){
                            projectTextContainer.classList.add('expanded-dropdown');
                            gradientOverlay.style.display = 'none'
                            dropDownArrow.style.transform = 'rotate(180deg)'; 
                            arrowIsClicked = true;                                  //switches to true so that when arrow is clicked again, the following code runs:
                        } else if (arrowIsClicked == true){
                            projectTextContainer.classList.remove('expanded-dropdown');
                            gradientOverlay.style.display = 'block'
                            dropDownArrow.style.transform = 'rotate(0deg)';
                            arrowIsClicked = false;
                        };
                    });
                return dropDownArrow;
            }  
            projectInfoContainer.appendChild(expandingSection());

        }else if(currentProject.description === null) {  //if project doesn't contain a description
            projectTextContainer.style.marginBottom = '3rem';
            projectTextContainer.classList.add('expanded-dropdown');
            gradientOverlay.style.display = 'none'
        };

        //check width to determine correct styling
        function checkProjectWindowSize(){
            if(window.innerWidth >= 1080){
                pageContents.el.className = 'grid-container two-cols-25-75'
                pageSectionTwo.el.className = 'grid-container left-border'
                util.blueMenuBar(1, menuContainer);
            }else if(window.innerWidth < 1080){
                pageContents.el.className = 'grid-container'
                pageSectionTwo.el.className = ''
            };
        };

        checkProjectWindowSize();

        window.addEventListener('resize', function(){
            if(projectList[projectIndex].name === history.state){
                checkProjectWindowSize();
            };
        });
    },
    
    about: () => {

        contentIsLoaded()

        pageContents.reset()
        pageSectionOne.clear()
        pageSectionTwo.clear()

        //append THREE scene
        pageSectionTwo.el.appendChild(aboutRenderer.domElement);
        
        pageSectionOne.appendHeader('ABOUT', 'menu', 'header small-header');

        pageBody.classList.remove('grid-background');

        const aboutTextSection = util.createEl('div', 'content-container about-text-container', pageSectionOne.el)
        const aboutTextColour = util.createBackdrop(aboutTextSection,  1, 1, 1, 1);
        aboutTextSection.parentNode.insertBefore(aboutTextColour, aboutTextSection.nextSibling);

        
        const aboutText = util.createEl('p', 'body-text', aboutTextSection)
        aboutText.innerText = ('I’m Liam - a multidisciplinary graphic designer and web developer.\r\n \r\n To put it simply, I love to build things. I’ve always carried an attitude of “finding a way”, and I let my curiosity and passion for technology guide me as I discover new techniques and ways of creating things. I’m comfortable exploring the unfamiliar, and figuring things out as I go along, often finding that the best ideas emerge as a part of the process. \r\n \r\n Since graduating from my Graphic Design degree at Sheffield Hallam University, I’ve spent my time learning different tools and techniques, in an effort to find new ways to tell stories and create experiences. This has ranged from teaching myself how to build intricate 3D scenes in Blender, to learning how to develop websites like this one using Javascript. I love working on technical problems and delivering inventive solutions, and find that my most enjoyable projects are always those which push me to step just beyond what I already know. \r\n \r\n If you would like to work with someone who is prepared to take an idea, explore the unexpected and deliver engaging and considered solutions, I’d love to hear from you.');

        //FIX - Appends a bunch of times for some reason, requires investigation. 
        const linkSection = util.createEl('div', 'content-container link-section-container')

        pageSectionTwo.createGridFiller();

        function isMobileOrDesktop(){
            function appendLinks(){
                linkSection.append(socialLinks.instagram, socialLinks.linkedIn);
                pageSectionOne.el.append(linkSection)
                feather.replace(); //updates icons as SVG's
            };

            function determineLinkPlacement(){
                
                let time;
                clearTimeout(time);

                time = setTimeout(function () {
                    if(window.innerWidth < 1080){
                        appendLinks();
                    }
                }, 100);
            }

            determineLinkPlacement();

            function checkAboutWindowSize(){
                if(window.innerWidth >= 1080){
                    pageHeaderSection.style.display = 'none';
                    aboutTextSection.className = 'content-container about-text-container';
                    aboutTextColour.style.display = 'block'
                    pageContents.el.className = 'grid-container two-cols-50-50'
                    pageSectionOne.el.className = 'center-children'
                    pageSectionTwo.el.className = 'grid-container left-border'
                    util.blueMenuBar(2, menuContainer);
                }else if(window.innerWidth < 1080){
                    pageHeaderSection.style.display = 'flex';
                    aboutTextSection.className = 'content-container about-text-container';
                    aboutTextColour.style.display = 'none'
                    pageContents.el.className = 'grid-container content-split'
                    pageSectionOne.el.className = ''
                    pageSectionTwo.el.className = ''
                };
            };
    
            checkAboutWindowSize();


            window.addEventListener('resize', function(){
                if(history.state === 'about'){
                    checkAboutWindowSize();
                    determineLinkPlacement();
                }
            });
        };

        util.blueMenuBar(2, menuContainer);
        isMobileOrDesktop();
    }, 
    
    contact: () => {

        contentIsLoaded();

        pageContents.reset()
        pageSectionOne.clear()
        pageSectionTwo.clear()

        pageSectionTwo.el.appendChild(contactRenderer.domElement);
        
        pageSectionOne.appendHeader('CONTACT', 'menu');
        pageHeader.classList = 'header small-header';

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-background');

        let contactFormContainer = document.createElement('div');
        pageSectionOne.el.appendChild(contactFormContainer);

        const contactFormColour = util.createBackdrop(contactFormContainer,  1.2, 1, 1, 1);
        contactFormContainer.parentNode.insertBefore(contactFormColour, contactFormContainer.nextSibling);

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
        pageSectionTwo.createGridFiller();

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

        function checkContactWindowSize(){
            if(window.innerWidth >= 1080){
                pageHeaderSection.style.display = 'none';
                pageSectionOne.el.className = 'center-children'
                contactFormContainer.className = 'content-container contact-form-container';
                contactFormColour.style.display = 'block'
                pageContents.el.className = 'grid-container two-cols-75-25'
                pageSectionTwo.el.className = 'grid-container left-border'
                util.blueMenuBar(3, menuContainer);
            }else if(window.innerWidth < 1080){
                pageHeaderSection.style.display = 'flex';
                contactFormContainer.className = 'content-container contact-form-container';
                contactFormColour.style.display = 'none'
                pageContents.el.className = 'grid-container content-split'
                pageSectionTwo.el.className = ''
                pageSectionOne.el.className = ''
            };
        };

        checkContactWindowSize();

        window.addEventListener('resize', function(){
            if(history.state === 'contact'){
                checkContactWindowSize();
            }
        });
    }
};

//To ensure that the homepage loads when the page is first opened.
window.onload = displayPage.home();