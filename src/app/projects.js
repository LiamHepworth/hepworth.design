import { util } from "./utilities";

export class Project {
    constructor(name, type, images, videos, embeddedContent, description, thumbnail){
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

export const projectList = [

    new Project(
        'UNREAL TEST', 
        'poster', 
        ['/src/assets/project-images/unreal/image01.png', '/src/assets/project-images/unreal/image02.png'], 
        null, 
        null, 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor sem, ac elementum quam. Fusce vitae ante dapibus, tempus erat in, hendrerit nibh. Suspendisse fringilla pellentesque elit, a tempus augue fringilla non. Aliquam sodales, nisl sed malesuada laoreet, libero ligula scelerisque nibh, in efficitur orci ex sed lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum aliquet vestibulum metus eget blandit. Curabitur sodales sit amet nisl ut fermentum. Cras tristique justo diam, nec eleifend ex cursus feugiat. Nam egestas velit lectus, ac ullamcorper tortor lobortis non.', 
        '/src/assets/project-images/unreal/image01.png'),

    new Project(
        'SEVERE', 
        'poster', 
        ['/src/assets/project-images/severe/image01.jpg', '/src/assets/project-images/severe/image01.jpg'], 
        null, 
        null, 
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/severe/image01.jpg'),
    
    new Project(
        'Exile Corp HoloDisk Reader', 
        'Animated Poster (2022)', 
        null, 
        ['/src/assets/project-images/video-test/Comp 2.mp4'], 
        null, 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis elit ex vitae', 
        '/src/assets/project-images/unreal/image01.png'),

]; 