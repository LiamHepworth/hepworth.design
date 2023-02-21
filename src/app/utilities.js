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

    createBackdrop: (el, offsetX, offsetY, pWidth, pHeight) => {
        let backdrop = document.createElement('div');
        backdrop.className = 'backdrop';

        let elWidth, elHeight, elPos, elTop;

        function updateConstants(){
            elWidth = el.offsetWidth/16 * pWidth;
            elHeight = el.offsetHeight/16 * pHeight;
            elPos = el.getBoundingClientRect();

            elTop = - Math.abs(elHeight) + offsetY
        };
        
        function setStyles(){
            backdrop.style.width = elWidth + 'rem';
            backdrop.style.height = elHeight + 'rem';
            backdrop.style.left = elPos.left/16 + offsetX + 'rem';
            backdrop.style.marginTop = elTop + 'rem';
        };

        function applyBackdrop(){
            updateConstants();
            setStyles();
        }
        
        //to ensure width/height/left are accurate for elements which use responsive units
        window.setTimeout(applyBackdrop, 2);
        
        window.onresize = () => {
            applyBackdrop();
        }
        
        return backdrop;
    }, 
};
