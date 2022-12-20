const fullPage = document.querySelector('html')
const pageBody = document.querySelector('body');
const pageContents = document.querySelector('#page-contents');
const pageSectionOne = document.querySelector('#page-section-one');
const pageSectionTwo = document.querySelector('#page-section-two');
const pageHeaderSection = document.querySelector('#header-section');
const pageHeader = document.querySelector('.header');
const burgerMenuMobile = document.querySelector('#burger-menu');
const menuContainer = document.createElement('nav');
const bottomNavBar = document.querySelector('.bar.bottom-bar');
const curs = document.querySelector('.cursor');


//FIX - only apply if page is viewed in desktop mode, otherwise cursor appears every time user taps on screen
document.addEventListener('mousemove', (e) => {
    let x = e.pageX - 15;
    let y = e.pageY - 15;
    
    curs.style.left = x + "px";
    curs.style.top = y + "px";
});

let util = {
    resetPage: (containers) => {

        for(cont of containers){
            cont.innerHTML = '';
            cont.className = '';
        };

        pageContents.className = 'grid-container';
        pageHeaderSection.className = 'header-section'
        pageHeaderSection.style.display = 'flex';
        pageHeader.innerText = 'HEPWORTH.DESIGN'
        fullPage.style.overflow = 'visible'                 
        pageBody.style.overflow = 'visible'
        pageBody.classList.add('grid-background');
    },

    appendHeader: (headerText, menuStatus, container) => {
        pageHeader.innerText = headerText;
        burgerMenuMobile.innerText = menuStatus;

        pageHeaderSection.append(pageHeader, burgerMenuMobile)
        container.appendChild(pageHeaderSection)
    },

    createBlueGridFiller: () => {
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grid-grow');
        return gridFiller;    
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
    },
};

const socialLinks = {
    instagram: util.createLinkedIcon('instagram', 'https://www.instagram.com/hepworth.design/?hl=en'),
    linkedIn: util.createLinkedIcon('linkedin', 'https://www.linkedin.com/in/liam-moses-b64754182/')
}

function navCreation(){

    //name+text for each menu item
    const menuListNames = ['home', 'work', 'about', 'contact']

    //mobile nav header elements
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
                pageContents.removeChild(menuContainer);
                pageBody.classList.remove('noScroll');
                fullPage.style.overflow = 'visible'                 
                pageBody.style.overflow = 'visible'
            };
            setTimeout(menuContainer.classList.remove('menu-appear'), 300);
            setTimeout(hideMenu, 300);

        } else if(input === 'play'){
            //hiding overflow to ensure scroll bars don't appear, removed on resetPage() and hideMenu()
            pageContents.appendChild(menuContainer);
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
            // console.log('mobile')
            mobileNav();
        } else if(window.innerWidth >= 1080){
            // console.log('desktop')
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
            container.appendChild(video);
        };

        if(this.videos !== null){
            for(let i = 0; i <this.videos.length; i++){
                createVideos(i, this);
            } 
        } 
        
        if(this.images !== null){
            let imageStore = [];
            for(let i = 0; i < this.images.length; i++){
                imageStore[i] = new Image();
                imageStore[i].src = this.images[i];
                container.appendChild(imageStore[i]);
            }; 
        };
    };

    pushProjectPageHistory(){
        history.pushState(this.name, null, null);
        util.resetScrollPosition();
    };
};

let projectList = [
    new Project('UNREAL TEST', 'poster', ['/projects/unreal/image01.png', '/projects/unreal/image02.png'], null, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg', '/projects/severe/image01.jpg', '/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', ['/projects/severe/image01.jpg'], ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4', '/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
    new Project('Exile Corp HoloDisk Reader', 'Animated Poster (2022)', null, ['/projects/video-test/Comp 2.mp4'], null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', '/projects/unreal/image01.png'),
    new Project('severe', 'poster', ['/projects/severe/image01.jpg'], null, null, null,'/projects/severe/image01.jpg'),
]; 

let displayPage = {
    home: () => {
        util.resetPage([pageSectionOne, pageSectionTwo]);

        util.appendHeader('HEPWORTH.DESIGN', 'menu', pageSectionOne);
        pageHeader.classList = 'header'
        
        function checkHomeWindowSize(){
            if(window.innerWidth > 1080){
                pageSectionOne.classList.add('work-header-container');
                pageHeaderSection.className = 'large-header-section'
                util.blueMenuBar(0);
            }else{
                pageHeaderSection.className = 'header-section'
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
        util.resetPage([pageSectionOne, pageSectionTwo]);
        
        util.appendHeader('HEPWORTH.DESIGN', 'menu', pageSectionOne);
        pageHeader.classList = 'header'
        
        pageSectionOne.classList.add('work-header-container');
        pageSectionTwo.classList.add('grid-container', 'gallery', 'work-page-container');

        for (let i = 0; i < projectList.length; i++) {
            projectList[i].thumbnailCreation(pageSectionTwo); //create project thumbnails
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
            if(window.innerWidth > 1080){
                pageHeaderSection.className = 'large-header-section'
                util.blueMenuBar(1);
            }else{
                pageHeaderSection.className = 'header-section'
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
        util.resetPage([pageSectionOne, pageSectionTwo]);
        
        util.appendHeader(projectList[projectIndex].name.toUpperCase(), 'menu', pageSectionOne);
        pageHeader.classList = 'header small-header';

        let currentProject = projectList[projectIndex];

        //hide the grid background
        pageBody.classList.remove('grid-background');

        //create outer container for expandable section, which includes text + dropdown button
        let projectTextOuterContainer = document.createElement('section');
        projectTextOuterContainer.classList.add('outer-content-container');

        //create container for just the text
        let projectTextContainer = document.createElement('div');
        projectTextContainer.classList.add('expanding-text-container');

        //project type text, '\u00A0' adds a space when adding innerText
        let projectType = document.createElement('p');
        projectType.innerText = `Project Type: \u00A0 ${projectList[projectIndex].type}`;
        projectType.classList.add('body-text', 'project-text');

        projectTextContainer.append(projectType);
        projectTextOuterContainer.appendChild(projectTextContainer);

        //project description text
        let projectDescription = document.createElement('p');
        projectDescription.innerText = `Description: 
        
        ${projectList[projectIndex].description}`;
        projectDescription.classList.add('body-text');

        //gradient overlay
        let gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';

        //drop-down button
        let dropDownArrow = document.createElement('span');
        dropDownArrow.innerText = 'expand_more';
        dropDownArrow.classList.add('material-symbols-outlined', 'arrows', 'dropdown-arrow');

        pageSectionOne.appendChild(projectTextOuterContainer);
        pageSectionOne.appendChild(gradientOverlay);
        pageSectionOne.className = 'proj-text-container'

        pageHeaderSection.className = 'header-section'

        //create container for carousel of images, create carousel, append
        let projectImageContainer = document.createElement('section');
        projectImageContainer.classList.add('grid-background', 'project-image-container');

        projectList[projectIndex].carouselCreation(projectImageContainer);
        pageSectionTwo.appendChild(projectImageContainer);

        //create side arrows to scroll carousel for desktop layout
        const leftArrow = document.createElement('span');
        leftArrow.innerText = 'expand_more';
        leftArrow.classList.add('material-symbols-outlined', 'arrows', 'carousel-arrows');
        leftArrow.style.transform = 'rotate(90deg)'; 
        
        const rightArrow = document.createElement('span');
        rightArrow.innerText = 'expand_more';
        rightArrow.classList.add('material-symbols-outlined', 'arrows', 'carousel-arrows');
        rightArrow.style.transform = 'rotate(-90deg)'; 

        pageSectionTwo.append(leftArrow, rightArrow);

        (function carouselImageFocus(){
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
            projectTextOuterContainer.appendChild(expandingSection());

        }else if(currentProject.description === null) {  //if project doesn't contain a description
            projectTextContainer.style.marginBottom = '3rem';
            projectTextContainer.classList.add('expanded-dropdown');
            gradientOverlay.style.display = 'none'
        };

        //check width to determine correct styling
        function checkProjectWindowSize(){
            if(window.innerWidth > 1080){
                pageContents.className = 'grid-container two-cols-25-75'
                pageSectionTwo.className = 'grid-container left-border'
                leftArrow.style.display = 'block'
                rightArrow.style.display = 'block'
                util.blueMenuBar(1);
            }else{
                pageContents.className = 'grid-container'
                pageSectionTwo.className = ''
                leftArrow.style.display = 'none'
                rightArrow.style.display = 'none'
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
        util.resetPage([pageSectionOne, pageSectionTwo]);
        
        util.appendHeader('ABOUT', 'menu', pageSectionOne);
        pageHeader.classList = 'hidden'

        pageBody.classList.remove('grid-background');

        pageSectionTwo.className = 'column-flex-container';

        let aboutTextSection = document.createElement('div');
        aboutTextSection.className = 'content-container about-text-container';
        pageSectionOne.appendChild(aboutTextSection);

        let aboutText = document.createElement('p');
        aboutText.innerText = ('Liam Hepworth is a graphic designer, 3D Artist and JavaScript  developer working in the North-West of England.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor libero sed diam tempus, sit amet tempus justo pellentesque. Fusce porta dapibus vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non ante id est porttitor feugiat. Morbi eu augue nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla non sem at augue fermentum malesuada. Phasellus vitae porttitor nunc. Fusce commodo lacinia metus, quis congue ligula finibus nec. ');
        aboutText.classList.add('body-text');
        aboutTextSection.appendChild(aboutText);

        let linkSection = document.createElement('div');
        linkSection.classList.add('content-container');

        let gridFiller = util.createBlueGridFiller();
        pageSectionTwo.appendChild(gridFiller);

        function isMobileOrDesktop(){
            function appendLinks(){
                linkSection.append(socialLinks.instagram, socialLinks.linkedIn);
                pageSectionOne.append(linkSection)
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
                if(window.innerWidth > 1080){
                    pageHeaderSection.style.display = 'none';
                    aboutTextSection.className = 'content-container vertical-center about-text-container';
                    pageContents.className = 'grid-container two-cols-50-50'
                    pageSectionTwo.className = 'grid-container left-border'
                    util.blueMenuBar(2);
                }else{
                    pageHeaderSection.style.display = 'flex';
                    aboutTextSection.className = 'content-container about-text-container';
                    pageContents.className = 'grid-container content-split'
                    pageSectionTwo.className = ''
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

        util.blueMenuBar(2);
        isMobileOrDesktop();
    }, 
    
    contact: () => {
        util.resetPage([pageSectionOne, pageSectionTwo]);

        util.appendHeader('CONTACT', 'menu', pageSectionOne);
        pageHeader.classList = 'hidden'

        pageHeader.innerText = 'CONTACT';
        pageBody.classList.remove('grid-background');
        // pageSectionOne.className = 'column-flex-container grow';

        let contactFormContainer = document.createElement('div');
        pageSectionOne.appendChild(contactFormContainer);

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
        pageSectionTwo.appendChild(util.createBlueGridFiller());

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
            if(window.innerWidth > 1080){
                pageHeaderSection.style.display = 'none';
                contactFormContainer.className = 'content-container contact-form-container vertical-center';
                pageContents.className = 'grid-container two-cols-75-25'
                pageSectionTwo.className = 'grid-container left-border'
                util.blueMenuBar(3);
            }else{
                pageHeaderSection.style.display = 'flex';
                contactFormContainer.className = 'content-container contact-form-container';
                pageContents.className = 'grid-container content-split'
                pageSectionTwo.className = ''
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