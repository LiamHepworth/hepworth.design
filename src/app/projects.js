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
            video.appendChild(source);
            
            video.oncanplay = () => {  //ensures video autoplays when page is fully loaded
                video.muted = true;
                video.play();
            }
            
            return video;
        };

        if(this.videos !== null){
            for(let i = 0; i <this.videos.length; i++){
                container.appendChild(createVideos(i, this));
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
        'Exile Corp: Holo-Disk Reader',
        'Animation/3D Model',
        ['/src/assets/project-images/1-HoloDisk-Reader/image-01.png', '/src/assets/project-images/1-HoloDisk-Reader/image-02.png'],
        ['/src/assets/project-images/1-HoloDisk-Reader/vid-02.mp4', '/src/assets/project-images/1-HoloDisk-Reader/vid-01.mp4'],
        null,
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/1-HoloDisk-Reader/image-01.png',
    ),

    new Project(
        '3D Poster Series',
        '3D Model/Graphic Poster',
        ['/src/assets/project-images/3-Misc-Posters/image-01.png', '/src/assets/project-images/3-Misc-Posters/image-02.png', '/src/assets/project-images/3-Misc-Posters/image-03.png', '/src/assets/project-images/3-Misc-Posters/image-04.png', '/src/assets/project-images/3-Misc-Posters/image-05.png', '/src/assets/project-images/3-Misc-Posters/image-06.png'],
        null,
        null,
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/3-Misc-Posters/image-01.png',
    ),

    new Project(
        'Procedural Animation',
        'Animation',
        ['/src/assets/project-images/5-Looping-Geometry/image-01.png', '/src/assets/project-images/5-Looping-Geometry/image-02.png'],
        ['/src/assets/project-images/5-Looping-Geometry/vid-01.mp4', '/src/assets/project-images/5-Looping-Geometry/vid-02.mp4'],
        null,
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/5-Looping-Geometry/image-01.png',
    ),

    new Project(
        'Animated Sketches',
        'Animation',
        null,
        ['/src/assets/project-images/4-Animation-Sketches/vid-03.mp4', '/src/assets/project-images/4-Animation-Sketches/vid-02.mp4', '/src/assets/project-images/4-Animation-Sketches/vid-01.mp4'],
        null,
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/4-Animation-Sketches/image-01.png',
    ),

    new Project(
        'Nucleus',
        'Animation/3D Model',
        ['/src/assets/project-images/2-Nucleus/image-02.png', '/src/assets/project-images/2-Nucleus/image-01.png'],
        ['/src/assets/project-images/2-Nucleus/vid-01.mp4'],
        null,
        'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, ex in scelerisque placerat, velit dui ultricies ipsum, viverra facilisis ', 
        '/src/assets/project-images/2-Nucleus/image-01.png',
    ),
    ]; 