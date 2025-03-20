export class SoundManager {
    constructor() {
        this.sounds = {
            coin: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/coin-collect.wav'),
            hit: new Audio('https://assets.mixkit.co/active_storage/sfx/2020/hit-impact.wav'),
            gameover: new Audio('https://assets.mixkit.co/active_storage/sfx/2021/game-over.wav')
        };
    }

    load() {
        // Preload all sounds
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            // Create a new audio instance to allow overlapping sounds
            const sound = this.sounds[soundName].cloneNode();
            sound.volume = 0.5;
            sound.play().catch(() => {
                // Ignore errors from browsers blocking autoplay
            });
        }
    }
}