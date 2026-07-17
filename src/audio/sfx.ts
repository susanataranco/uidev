const hoverSound = new Audio('/sounds/tick_002.ogg')
const clickSound = new Audio('/sounds/tick_004.ogg')

hoverSound.volume = 0.3
clickSound.volume = 0.4

export function playHoverSound() {
    hoverSound.currentTime = 0
    hoverSound.play().catch(() => {
        // Navigator can block autoplay until first interaction
    })
}

export function playClickSound() {
    clickSound.currentTime = 0
    clickSound.play().catch(() => {
    })
}