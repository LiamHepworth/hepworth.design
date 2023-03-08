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
        '3D POSTER SERIES',
        '3D Model / Graphic Posters',
        ['/src/assets/project-images/3-Misc-Posters/image-01.png', '/src/assets/project-images/3-Misc-Posters/image-02.png', '/src/assets/project-images/3-Misc-Posters/image-03.png', '/src/assets/project-images/3-Misc-Posters/image-04.png', '/src/assets/project-images/3-Misc-Posters/image-07.png', '/src/assets/project-images/3-Misc-Posters/image-05.png', '/src/assets/project-images/3-Misc-Posters/image-06.png',],
        null,
        null,
        "A series of mixed-media, graphic posters created throughout 2021 and 2022. Whilst building this series, I primarily focussed on expanding my technical abilities with 3D tools and experimenting with creating custom typography, textures, and unique compositions. \n \n 1. Vengeance - Inspired by modern true crime documentary visuals, this poster features an original model of a Colt M1911 pistol. After seeing this gun used by Jules in Pulp Fiction, I chose it specifically because of its classic film noir style. This is one of the most complex models I have worked on, requiring precision to ensure its proportions correctly matched the real-world counterpart. \n \n 2. Post-human - An ethereal scene of a sole island in a sea of fog, that examines the blurred lines between physical and digital space. Working on this piece developed my understanding of instancing objects, such as the leaves and the grass, to efficiently build realistic scenes. \n \n 3. Core 3 - A sci-fi inspired scene of a remote power station, blending brutalist architectural concepts with futuristic ambiance and featuring custom hand drawn lettering. \n \n 4. Extinction - A speculative museum display of the fossilised teeth of a humanoid creature. The procedural texture for this model was based on amber, a gemstone which forms from fossilised tree resin. \n \n 5. Unreal - This was imagined as a terraforming device produced for space travellers in the distant future, enabling them to set up new civilisations on other worlds. The concept is inspired by the G.E.C.K from the Fallout video game series. \n \n 6. Bones - Depicting a giant ribcage emerging from a watery grave, this poster was an opportunity to explore lighting and vector displacement, as well as heavy texturing and custom typography. \n \n 7. Home Defence - Envisioned as the front page of a satirical survival manual, I experimented with ways to create procedural barbed wire which followed a 3D vector curve. \n \n", 
        '/src/assets/project-images/3-Misc-Posters/thumbnail.png',
    ),

    new Project(
        'HOLO-DISK READER',
        '3D Model / Animation',
        ['/src/assets/project-images/1-HoloDisk-Reader/image-01.png', '/src/assets/project-images/1-HoloDisk-Reader/image-02.png'],
        ['/src/assets/project-images/1-HoloDisk-Reader/vid-02.mp4', '/src/assets/project-images/1-HoloDisk-Reader/vid-01.mp4'],
        null,
        'I have always been fascinated by analogue technology, whether it be the oscilloscope in my high school science lab or old CRT monitors that produce the most interesting effects when you hit the degauss button. Something about these types of devices has always been so interesting to me. \n \n This is a speculative model of a “Holo-Disk Reader” - a piece of multifunctional personal computing equipment designed to read and display information, communicate via radio and store data. Alongside it is a “Holo-Disk” which contains schematics for a unique type of laser rifle found in the Fallout game series. I was looking to explore the concept of creating a model of a retro-futuristic device, similar to Fallout’s “Pip – Boy,” which combines unique analogue features with futuristic technological capabilities. \n \n This project incorporated several technical 3D skills, as well as some 2D animation. I focussed heavily on texture mapping the videos on to the device’s screens and the decals on the device’s housing, as well as developing procedural materials throughout the model. I also worked to keep the poly count low, in order to improve rendering efficiency when dealing with such a complex model \n \n ', 
        '/src/assets/project-images/1-HoloDisk-Reader/image-01.png',
    ),

    new Project(
        'PROCEDURAL ANIMATIONS',
        'Mixed Media / Animation',
        null,
        ['/src/assets/project-images/5-Looping-Geometry/vid-01.mp4', '/src/assets/project-images/5-Looping-Geometry/vid-02.mp4', '/src/assets/project-images/5-Looping-Geometry/vid-03.mp4'],
        null,
        'This series of animations focussed on creating complex procedural effects; a method of animating  in real-time by defining sets of mathematical parameters. This is counter to the common animation method of keyframing, where you define transformations which execute at a specific point in time. I was able to build up effects primarily using vector math and feedback loops which would otherwise be difficult to produce using keyframes and manual transformation. Working in this way also allowed for a level of unpredictability, especially when adding randomly created values into the animation controls, creating unexpected and unique results.  \n \n ', 
        '/src/assets/project-images/5-Looping-Geometry/image-03.png',
    ),

    new Project(
        'ANIMATED SKETCHES',
        'Mixed Media / Animation',
        null,
        ['/src/assets/project-images/4-Animation-Sketches/vid-03.mp4', '/src/assets/project-images/4-Animation-Sketches/vid-02.mp4', '/src/assets/project-images/4-Animation-Sketches/vid-01.mp4'],
        null,
        'I produced this short series of animations amid the COVID-19 pandemic. They take a tongue-in-cheek approach to some of my feelings at the time, such as my inability to host a birthday party due to lockdown restrictions, having uncertainty about the future, and the lack of opportunity for physical exercise during this period. Each frame was hand drawn before being digitally processed, to give a tangible, weathered appearance.  \n \n ', 
        '/src/assets/project-images/4-Animation-Sketches/image-01.png',
    ),

    new Project(
        'NUCLEUS',
        '3D Model / Animation',
        ['/src/assets/project-images/2-Nucleus/image-02.png', '/src/assets/project-images/2-Nucleus/image-01.png'],
        ['/src/assets/project-images/2-Nucleus/vid-01.mp4'],
        null,
        'A speculative concept for an atomic microscope to be used during field expeditions. This device would allow users to collect biological material and interact with it at the cellular level. Taking aesthetic cues from sterile lab environments, the device features a pristine ceramic housing, accompanied by various displays and controls to interact with the subject. \n \n The custom animated typeface was developed by using a series of circles across a grid, connected by lines that scale in width relative to the distance of any point from one of the circles. This effect mimics the animation of the 3D cells in the centre of the device, which form a mesh around themselves as the animation plays. \n \n ', 
        '/src/assets/project-images/2-Nucleus/image-02.png',
    ),
    ]; 