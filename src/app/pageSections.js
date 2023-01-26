class Page {
    constructor(el, parent, body, doc){
        this.el = el;
        this.parent = parent;
        this.body = body;
        this.doc = doc;
    }

    clear(){
        this.el.innerHTML = '';
        this.el.className = '';
    }

    reset(){
        this.el.className = 'grid-container'

        this.body.style.overflow = 'visible'
        this.body.classList.add('grid-background');
        
        this.doc.style.overflow = 'visible'
    }
}

class Section extends Page {
    constructor(el, headerSection, menu, header){
        super(el);

        this.headerSection = headerSection;
        this.menu = menu;
        this.header = header;
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
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grid-grow');
        this.el.appendChild(gridFiller);
    }
}

export { Page, Section}