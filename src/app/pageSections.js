class Page {
    constructor(el, parent){
        this.el = el;
        this.parent = parent;
    }

    clear(){
        this.el.innerHTML = '';
        this.el.className = '';
    }

    reset(){
        this.el.className = 'grid-container'

        document.querySelector('body').style.overflow = 'visible'
        document.querySelector('body').classList.add('grid-background');
        document.querySelector('html').style.overflow = 'visible'
    }
}

class Section extends Page {
    constructor(el, headerSection, header, menu){
        super(el);

        this.headerSection = headerSection;
        this.header = header;
        this.menu = menu;
    }

    appendHeader(headerText, menuStatus, headerClass){
        this.headerSection.className = 'header-section'
        this.headerSection.style.display = 'flex';

        this.header.className = headerClass;
        this.header.innerText = headerText;
        this.menu.innerText = menuStatus;

        this.headerSection.append(this.header, this.menu);
        this.el.appendChild(this.headerSection);
    }

    createGridFiller(){
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('grid-background', 'grid-grow');
        // gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grid-grow');
        this.el.appendChild(gridFiller);
    }
}

export { Page, Section}