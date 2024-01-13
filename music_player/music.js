class Music{
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Imperius", "Caleb Bryant", "1.jpg", "1.mp3"),
    new Music("Motion (Sped Up Version)", "Ty Dolla $ign", "2.jpeg", "2.mp3"),
    new Music("Streets (Ape Drums Remix)", "Doja Cat", "3.jpg", "3.mp3"),
    new Music("Night Drive", "Wilee", "4.jpeg", "4.mp3")
];