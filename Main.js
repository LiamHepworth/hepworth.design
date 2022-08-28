let pageMainSection = document.querySelector('#page-main-section');
let headerSection = document.querySelector('#header-section');
const burgerMenuMobile = document.querySelector('.burger-menu');


function showMenu(){
        clearPage(pageMainSection);
    
        let menuList = document.createElement('ul');
        let menuListNames = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];
        let menuListItems = [];
    
        for(let i = 0; i < 4; i++){
            menuListItems[i] = document.createElement('li');
            menuListItems[i].innerText = menuListNames[i];
            menuListItems[i].classList.add('basic-text', 'sub-header', 'menu-list-items');
            menuList.appendChild(menuListItems[i])
        }
        pageMainSection.appendChild(menuList);
        menuList.classList.add('menu-list', 'vertical-center') 
    
        burgerMenuMobile.innerText = 'close';
}

function hideMenu(){
        clearPage(pageMainSection);
        burgerMenuMobile.innerText = 'menu';
}

burgerMenuMobile.addEventListener('click', function(){
    if(burgerMenuMobile.innerText == 'close'){
        hideMenu();
        console.log('hiding Menu');
    } else if(burgerMenuMobile.innerText == 'menu'){
        showMenu();
        console.log('showing Menu');
    }
})

function clearPage(containerName){
    containerName.innerHTML = '';
}