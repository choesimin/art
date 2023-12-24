import {
    WaveGroup
} from './wavegroup.js';

class App {
    constructor() {
        const initialSpeed = 0.005;

        this.speed = initialSpeed;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup(this.speed);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));


        let interval = null;
        document.body.addEventListener('mousedown', () => {
            console.log('mousedown');
            interval = setInterval(() => {
                this.speed = this.speed + 0.01;
                this.setSpeed(this.speed);
            }, 100);
        });
        document.body.addEventListener('mouseup', () => {
            console.log('mouseup');
            this.speed = initialSpeed;
            this.setSpeed(this.speed);
            clearInterval(interval);
        });
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

    setSpeed(speed) {
        this.waveGroup.setSpeed(speed);
    }
}

window.onload = () => {
    new App();
};