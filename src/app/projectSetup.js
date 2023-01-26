import { util } from "./utilities";

export class Project {
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