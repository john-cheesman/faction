const dimensions = {
    tileSize: 32,
    gameWidth: 320,
    gameHeight: 288
};

const animations = {
    person: {
        walk: {
            up: [0, 1, 2, 1],
            right: [10, 11, 12, 11],
            down: [20, 21, 22, 21],
            left: [30, 31, 32, 31]
        },
        attack: {
            up: [3, 4, 5, 5, 1, 6],
            right: [13, 14, 15, 15, 11, 16],
            down: [23, 24, 25, 25, 21, 26],
            left: [33, 34, 35, 35, 31, 36]
        },
        cast: {
            up: [7, 8, 9],
            right: [17, 18, 19],
            down: [27, 28, 29],
            left: [37, 38, 39]
        }
    },
    fire: {
        flame: [96, 97, 98, 97]
    },
    chest: {
        open: [36, 37, 38, 39],
        close: [39, 38, 37, 36]
    },
    torch: {
        flame: [205, 206, 207, 206]
    },
    spikes: {
        active: [157, 158, 159, 159, 159, 159, 159, 158, 157, 157, 157, 157]
    },
    switch: {
        throw: [48, 49, 66],
        reset: [66, 65, 48]
    },
    spinner: {
        spin: [0, 1, 2, 3, 4, 5, 6, 7]
    }
}

const frames = {
    person: {
        up: 1,
        right: 11,
        down: 21,
        left: 31
    }
}

const playerSpeed = 120;

const colours = {
    white: 0xdeeed6,
    black: 0x140c1c,
    blue: 0x597dce
};

const jobStats = {
    shadow: {
        strength: 7,
        vitality: 6,
        agility: 9,
        intelligence: 8
    },
    soldier: {
        strength: 9,
        vitality: 8,
        agility: 5,
        intelligence: 4
    }
}

export { dimensions, animations, frames, playerSpeed, colours, jobStats }
