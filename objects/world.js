const world = {
    moveSpeed: 5,
    player: undefined,
    hpLoaded: false,
    enemies: undefined,
    timerTxt: undefined,
    isPlaying: true,
    loaded: false,
    hasWon: false,
    setTimer: 120,
    countdown: 120,
    timer: 0,
    time: 0,
    lives: 1,
    level: 1,
    health: 1,
    shield: 0,
    shieldRegen: 2,
    word: {
        lettHit: 0,
        goal: ''
    },
    ui: {
        barheight: 400
    }
}

module.exports = world;