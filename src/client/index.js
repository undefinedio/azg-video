import $ from 'jquery';
import intermezzo from './video/start.mp4';
import video_1 from './video/scene_1.mp4';
import './app.css';

class App {
    constructor() {

        this.videoIntermezzo = document.getElementById('video_intermezzo');
        this.videoScene = document.getElementById('video_scene');

        this.scenes = {
            1: video_1
        };

        this.listiners();
        this.initStart();
        this.webSockets();

    }

    listiners() {
        $('.js-btn-scene-1').on('click', () => {
            this.startScene(1);
        });
    }

    startScene(scene) {
        this.videoScene.addEventListener('loadedmetadata', () => {
            console.log('test');
            const duration = this.videoScene.duration;
            console.log(duration);

            $('.js-duration').html(duration);

            this.videoScene.play();
            $('.js-scene').addClass('show');

            const timer = setInterval(() => {
                $('.js-timer').html(this.videoScene.currentTime);

                if ((this.videoScene.currentTime + 4) >= duration) {

                    $('.js-scene').removeClass('show');
                    clearTimeout(timer);
                }
            }, 1000);
        });

        this.videoScene.src = this.scenes[scene];

    }

    initStart() {
        this.videoIntermezzo.src = intermezzo;
        this.videoIntermezzo.play();
    }

    webSockets() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;

        this.connection = new WebSocket('ws://127.0.0.1:1337');

        this.connection.onopen = function () {
            console.log(open);
            // connection is opened and ready to use
        };

        this.connection.onerror = function (error) {
            console.log(error)
            // an error occurred when sending/receiving data
        };

        this.connection.onmessage = function (message) {
            // try to decode json (I assume that each message
            // from server is json)
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                    message.data);
                return;
            }
            console.log(json);
            // handle incoming message
        };
    }
}

$(document).ready(() => {
    new App();
});
