import './app.css'

import { RGBKeyboard } from './rgb-keyboard.js'
const keyboardLeftElement = document.getElementById('keyboard-left') as RGBKeyboard
const keyboardRightElement = document.getElementById('keyboard-right') as RGBKeyboard
const dumpButton = document.getElementById('dump-button')!

dumpButton.addEventListener('click', () => {
    // Access the getKeyPositions method and log the output
    const tsLeft = keyboardLeftElement.getKeyPositions()
    const tsRight = keyboardRightElement.getKeyPositions()
    console.log('Left side key positions (TypeScript representation):')
    console.log(tsLeft)
    console.log('Right side key positions (TypeScript representation):')
    console.log(tsRight)
})

const xOffsetLeft = 0
const yOffsetLeft = 0

const xOffsetRight = 0
const yOffsetRight = 0

const stdW = '35px'
const stdH = '40px'

const leftHalfKeys = new Map<string, { X: number; Y: number; W: string; H: string }>([
    ['«', { X: 70, Y: 142, W: stdW, H: stdH }],
    ['Esc', { X: 165, Y: 144, W: stdW, H: stdH }],
    ['F1', { X: 218, Y: 144, W: stdW, H: stdH }],
    ['F2', { X: 272, Y: 144, W: stdW, H: stdH }],
    ['F3', { X: 325, Y: 144, W: stdW, H: stdH }],
    ['F4', { X: 377, Y: 144, W: stdW, H: stdH }],
    ['F5', { X: 429, Y: 144, W: stdW, H: stdH }],
    ['F6', { X: 483, Y: 144, W: stdW, H: stdH }],
    ['①', { X: 44, Y: 215, W: stdW, H: stdH }],
    ['②', { X: 97, Y: 215, W: stdW, H: stdH }],
    ['`', { X: 166, Y: 216, W: stdW, H: stdH }],
    ['1', { X: 219, Y: 214, W: stdW, H: stdH }],
    ['2', { X: 272, Y: 215, W: stdW, H: stdH }],
    ['3', { X: 325, Y: 215, W: stdW, H: stdH }],
    ['4', { X: 378, Y: 215, W: stdW, H: stdH }],
    ['5', { X: 431, Y: 215, W: stdW, H: stdH }],
    ['6', { X: 483, Y: 215, W: stdW, H: stdH }],
    ['③', { X: 45, Y: 268, W: stdW, H: stdH }],
    ['④', { X: 98, Y: 268, W: stdW, H: stdH }],
    ['TAB', { X: 178, Y: 267, W: stdW, H: stdH }],
    ['Q', { X: 245, Y: 267, W: stdW, H: stdH }],
    ['W', { X: 298, Y: 268, W: stdW, H: stdH }],
    ['E', { X: 351, Y: 267, W: stdW, H: stdH }],
    ['R', { X: 404, Y: 267, W: stdW, H: stdH }],
    ['T', { X: 457, Y: 267, W: stdW, H: stdH }],
    ['⑤', { X: 45, Y: 321, W: stdW, H: stdH }],
    ['⑥', { X: 98, Y: 320, W: stdW, H: stdH }],
    ['CAPS', { X: 175, Y: 320, W: stdW, H: stdH }],
    ['A', { X: 259, Y: 320, W: stdW, H: stdH }],
    ['S', { X: 311, Y: 321, W: stdW, H: stdH }],
    ['D', { X: 364, Y: 321, W: stdW, H: stdH }],
    ['F', { X: 417, Y: 320, W: stdW, H: stdH }],
    ['G', { X: 470, Y: 321, W: stdW, H: stdH }],
    ['⑦', { X: 45, Y: 373, W: stdW, H: stdH }],
    ['⑧', { X: 98, Y: 373, W: stdW, H: stdH }],
    ['SHIFT', { X: 175, Y: 373, W: '80px', H: stdH }], // Left shift
    ['Z', { X: 285, Y: 373, W: stdW, H: stdH }],
    ['X', { X: 337, Y: 373, W: stdW, H: stdH }],
    ['C', { X: 389, Y: 373, W: stdW, H: stdH }],
    ['V', { X: 443, Y: 373, W: stdW, H: stdH }],
    ['B', { X: 496, Y: 373, W: stdW, H: stdH }],
    ['FN', { X: 45, Y: 426, W: stdW, H: stdH }],
    ['☼', { X: 98, Y: 426, W: stdW, H: stdH }],
    ['CTRL', { X: 178, Y: 426, W: stdW, H: stdH }], // Left ctrl
    ['⊞', { X: 245, Y: 424, W: stdW, H: stdH }],
    ['ALT', { X: 303, Y: 425, W: stdW, H: stdH }], // Left alt
    ['———', { X: 452, Y: 425, W: stdW, H: stdH }], // "Left" space
])

const rightHalfKeys = new Map<string, { X: number; Y: number; W: string; H: string }>([
    ['F7', { X: 70, Y: 145, W: stdW, H: stdH }],
    ['F8', { X: 123, Y: 145, W: stdW, H: stdH }],
    ['F9', { X: 176, Y: 145, W: stdW, H: stdH }],
    ['F10', { X: 229, Y: 145, W: stdW, H: stdH }],
    ['F11', { X: 283, Y: 145, W: stdW, H: stdH }],
    ['F12', { X: 336, Y: 145, W: stdW, H: stdH }],
    ['PRTSC', { X: 387, Y: 144, W: stdW, H: stdH }],
    ['PAUSE', { X: 441, Y: 144, W: stdW, H: stdH }],
    ['DEL', { X: 494, Y: 144, W: stdW, H: stdH }],
    ['7', { X: 71, Y: 214, W: stdW, H: stdH }],
    ['8', { X: 123, Y: 215, W: stdW, H: stdH }],
    ['9', { X: 177, Y: 215, W: stdW, H: stdH }],
    ['0', { X: 229, Y: 215, W: stdW, H: stdH }],
    ['-', { X: 283, Y: 213, W: stdW, H: stdH }],
    ['=', { X: 335, Y: 213, W: stdW, H: stdH }],
    ['⟵—', { X: 403, Y: 213, W: stdW, H: stdH }], // Backspace
    ['HOME', { X: 494, Y: 214, W: stdW, H: stdH }],
    ['Y', { X: 43, Y: 267, W: stdW, H: stdH }],
    ['U', { X: 97, Y: 268, W: stdW, H: stdH }],
    ['I', { X: 150, Y: 267, W: stdW, H: stdH }],
    ['O', { X: 203, Y: 267, W: stdW, H: stdH }],
    ['P', { X: 255, Y: 267, W: stdW, H: stdH }],
    ['[', { X: 307, Y: 266, W: stdW, H: stdH }],
    [']', { X: 362, Y: 266, W: stdW, H: stdH }],
    ['\\', { X: 427, Y: 267, W: stdW, H: stdH }],
    ['END', { X: 494, Y: 267, W: stdW, H: stdH }],
    ['H', { X: 57, Y: 321, W: stdW, H: stdH }],
    ['J', { X: 111, Y: 321, W: stdW, H: stdH }],
    ['K', { X: 162, Y: 321, W: stdW, H: stdH }],
    ['L', { X: 216, Y: 320, W: stdW, H: stdH }],
    [';', { X: 269, Y: 318, W: stdW, H: stdH }],
    ["'", { X: 321, Y: 319, W: stdW, H: stdH }],
    ['ENTER', { X: 406, Y: 320, W: stdW, H: stdH }],
    ['PGUP', { X: 493, Y: 319, W: stdW, H: stdH }],
    ['N', { X: 83, Y: 374, W: stdW, H: stdH }],
    ['M', { X: 137, Y: 373, W: stdW, H: stdH }],
    [',', { X: 188, Y: 373, W: stdW, H: stdH }],
    ['.', { X: 242, Y: 373, W: stdW, H: stdH }],
    ['/', { X: 295, Y: 374, W: stdW, H: stdH }],
    ['SHIFT', { X: 366, Y: 373, W: stdW, H: stdH }], // Right shift
    ['↑', { X: 441, Y: 372, W: stdW, H: stdH }],
    ['PGDN', { X: 493, Y: 372, W: stdW, H: stdH }],
    ['ALT', { X: 236, Y: 424, W: stdW, H: stdH }], // Right alt
    ['CTRL', { X: 316, Y: 425, W: stdW, H: stdH }], // Right ctrl
    ['←', { X: 387, Y: 425, W: stdW, H: stdH }],
    ['↓', { X: 441, Y: 425, W: stdW, H: stdH }],
    ['→', { X: 493, Y: 425, W: stdW, H: stdH }],
])

for (const [key, { X, Y, W, H }] of leftHalfKeys) {
    // Add offsets
    leftHalfKeys.set(key, { X: X + xOffsetLeft, Y: Y + yOffsetLeft, W: W, H: H })
}

for (const [key, { X, Y, W, H }] of rightHalfKeys) {
    // Add offsets
    rightHalfKeys.set(key, { X: X + xOffsetRight, Y: Y + yOffsetRight, W: W, H: H })
}

keyboardLeftElement.keys = leftHalfKeys
keyboardRightElement.keys = rightHalfKeys
