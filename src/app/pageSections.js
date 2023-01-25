class Section {
    constructor(el, parent, body, doc){
        this.el = el;
        this.parent = parent;
        this.body = body;
        this.doc = doc;
    }

    reset(){
        this.el.innerHTML = '';
        this.el.className = '';

        this.doc.style.overflow = 'visible'

        this.body.style.overflow = 'visible'
        this.body.classList.add('grid-background');

        this.parent.className = 'grid-container'
    }
}

class SectOne extends Section {
    constructor(el, headerSection, menu, header){
        super(el, parent);

        this.headerSection = headerSection;
        this.menu = menu;
        this.header = header;
    }

    appendHeader(headerText, menuStatus){
        this.headerSection.className = 'header-section'
        this.headerSection.style.display = 'flex';

        this.header.innerText = headerText;
        this.menu.innerText = menuStatus;

        this.headerSection.append(this.header, this.menu);
        this.el.appendChild(this.headerSection);
    }
}

class SectTwo extends Section {
    constructor(){
        super(el, parent);
    }

    createGridFiller(){
        let gridFiller = document.createElement('div');
        gridFiller.classList.add('blue', 'grid-background', 'grid-light', 'grid-grow');
        this.el.appendChild(gridFiller);
    }

}

