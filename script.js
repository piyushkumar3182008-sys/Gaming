const noMessages = [
    "No",
    "Are you sure, player? 🤔",
    "NO?",
    "You're losing HP...",
    "Critical damage to my heart... 💔",
    "Please??? Game over for me...",
    "Don't rage-quit on me...",
    "Last life remaining! 😭",
    "You can't catch me anyway 😜"
]

const yesTeasePokes = [
    "Try saying no first... I dare you 😏",
    "Go on, hit no... just once 👀",
    "You're missing out on a boss fight 😈",
    "Click no, I dare you 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false

const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    // Fade out music smoothly, then navigate
    if (typeof fadeOutMusic === 'function') {
        fadeOutMusic(() => { window.location.href = 'yes.html' })
    } else {
        window.location.href = 'yes.html'
    }
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(16 + noClickCount * 5, 55)
    const padX = Math.min(42 + noClickCount * 10, 110)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const container = document.querySelector('.container')
    const rect = container.getBoundingClientRect()
    const pad = 60 // extra space beyond the card edges

    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight

    // Boundary: card area + pad, but clamped to viewport
    const minX = Math.max(0, rect.left - pad)
    const minY = Math.max(0, rect.top - pad)
    const maxX = Math.min(window.innerWidth - btnW, rect.right + pad - btnW)
    const maxY = Math.min(window.innerHeight - btnH, rect.bottom + pad - btnH)

    const randomX = minX + Math.random() * (maxX - minX)
    const randomY = minY + Math.random() * (maxY - minY)

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
