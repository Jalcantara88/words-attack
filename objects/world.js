const world = {
    moveSpeed: 5,
    player: undefined,
    enemies: undefined,
    timerTxt: undefined,
    setTimer: 120,
    timer: 0,
    time: 0,
    lives: 2,
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