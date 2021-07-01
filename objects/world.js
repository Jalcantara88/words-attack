const world = {
    moveSpeed: 5,
    player: undefined,
    otherDude: undefined,
    enemies: undefined,
    time: 0,
    lives: 2,
    level: 0,
    health: 0,
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