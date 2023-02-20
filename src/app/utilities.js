export let util = {
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

    createEl: (type, className, parent) => {
        const el = document.createElement(type);
        el.className = className;

        if(parent !== undefined){
            parent.appendChild(el);
        };

        return el; 
    },

    blueMenuBar: (pageIndex, cont) => {
        if(window.innerWidth > 1080){
            let container = cont.children;
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

    colouredBackdrop: (el) => {
        let elWidth = el.offsetWidth;
        let elHeight = el.offsetHeight;
        let elPos = el.getBoundingClientRect();
        let elMarginTop = getComputedStyle(el).marginTop
        let elMarginBottom = getComputedStyle(el).marginBottom
        let elMarginLeft = getComputedStyle(el).marginLeft
        let elMarginRight = getComputedStyle(el).marginRight
        // let elLeft = el.offsetLeft
        // let elTop = el.offsetTop;

        let backdrop = document.createElement('div');
        backdrop.style.height = elHeight + 'px';
        backdrop.style.width = elWidth + 'px';
        // backdrop.style.height = '100px';
        // backdrop.style.width = '100px';
        backdrop.style.backgroundColor = '#0092bd';
        backdrop.style.boxShadow = '0 0 50px 15px #0092bd;'
        backdrop.style.position = 'absolute'
        backdrop.style.left = elPos.left/16 + 'rem'
        backdrop.style.marginTop = elMarginTop
        
        // backdrop.style.top = elPos.top/16 + 'rem'

        // backdrop.style.marginBottom = elMarginBottom
        // backdrop.style.marginLeft = elMarginLeft
        // backdrop.style.marginRight = elMarginRight

        // el.appendChild(backdrop);
        el.parentNode.insertBefore(backdrop, el.nextElementSibling);
    }
};
