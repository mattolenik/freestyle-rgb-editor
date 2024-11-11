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

const leftHalfKeys = new Map<string, { X: number; Y: number; W: string; H: string }>([
    ['«', { X: 70, Y: 142, W: '40px', H: '40px' }],
    ['Esc', { X: 165, Y: 144, W: '40px', H: '40px' }],
    ['F1', { X: 218, Y: 144, W: '40px', H: '40px' }],
    ['F2', { X: 272, Y: 144, W: '40px', H: '40px' }],
    ['F3', { X: 325, Y: 144, W: '40px', H: '40px' }],
    ['F4', { X: 377, Y: 144, W: '40px', H: '40px' }],
    ['F5', { X: 429, Y: 144, W: '40px', H: '40px' }],
    ['F6', { X: 483, Y: 144, W: '40px', H: '40px' }],
    ['①', { X: 44, Y: 215, W: '40px', H: '40px' }],
    ['②', { X: 97, Y: 215, W: '40px', H: '40px' }],
    ['`', { X: 166, Y: 216, W: '40px', H: '40px' }],
    ['1', { X: 219, Y: 214, W: '40px', H: '40px' }],
    ['2', { X: 272, Y: 215, W: '40px', H: '40px' }],
    ['3', { X: 325, Y: 215, W: '40px', H: '40px' }],
    ['4', { X: 378, Y: 215, W: '40px', H: '40px' }],
    ['5', { X: 431, Y: 215, W: '40px', H: '40px' }],
    ['6', { X: 483, Y: 215, W: '40px', H: '40px' }],
    ['③', { X: 45, Y: 268, W: '40px', H: '40px' }],
    ['④', { X: 98, Y: 268, W: '40px', H: '40px' }],
    ['Tab', { X: 178, Y: 267, W: '40px', H: '40px' }],
    ['Q', { X: 245, Y: 267, W: '40px', H: '40px' }],
    ['W', { X: 298, Y: 268, W: '40px', H: '40px' }],
    ['E', { X: 351, Y: 267, W: '40px', H: '40px' }],
    ['R', { X: 404, Y: 267, W: '40px', H: '40px' }],
    ['T', { X: 457, Y: 267, W: '40px', H: '40px' }],
    ['⑤', { X: 45, Y: 321, W: '40px', H: '40px' }],
    ['⑥', { X: 98, Y: 320, W: '40px', H: '40px' }],
    ['CapsLock', { X: 175, Y: 320, W: '40px', H: '40px' }],
    ['A', { X: 259, Y: 320, W: '40px', H: '40px' }],
    ['S', { X: 311, Y: 321, W: '40px', H: '40px' }],
    ['D', { X: 364, Y: 321, W: '40px', H: '40px' }],
    ['F', { X: 417, Y: 320, W: '40px', H: '40px' }],
    ['G', { X: 470, Y: 321, W: '40px', H: '40px' }],
    ['⑦', { X: 45, Y: 373, W: '40px', H: '40px' }],
    ['⑧', { X: 98, Y: 373, W: '40px', H: '40px' }],
    ['Shift', { X: 175, Y: 373, W: '80px', H: '40px' }],
    ['Z', { X: 285, Y: 373, W: '40px', H: '40px' }],
    ['X', { X: 337, Y: 373, W: '40px', H: '40px' }],
    ['C', { X: 389, Y: 373, W: '40px', H: '40px' }],
    ['V', { X: 443, Y: 373, W: '40px', H: '40px' }],
    ['B', { X: 496, Y: 373, W: '40px', H: '40px' }],
    ['FN', { X: 45, Y: 426, W: '40px', H: '40px' }],
    ['☼', { X: 98, Y: 426, W: '40px', H: '40px' }],
    ['Ctrl', { X: 178, Y: 426, W: '40px', H: '40px' }],
    ['⊞', { X: 245, Y: 424, W: '40px', H: '40px' }],
    ['Alt', { X: 303, Y: 425, W: '40px', H: '40px' }],
    ['Space', { X: 452, Y: 425, W: '40px', H: '40px' }],
])

const rightHalfKeys = new Map<string, { X: number; Y: number; W: string; H: string }>([
    ['F7', { X: 70, Y: 145, W: '40px', H: '40px' }],
    ['F8', { X: 123, Y: 145, W: '40px', H: '40px' }],
    ['F9', { X: 176, Y: 145, W: '40px', H: '40px' }],
    ['F10', { X: 229, Y: 145, W: '40px', H: '40px' }],
    ['F11', { X: 283, Y: 145, W: '40px', H: '40px' }],
    ['F12', { X: 336, Y: 145, W: '40px', H: '40px' }],
    ['PRNT', { X: 387, Y: 144, W: '40px', H: '40px' }],
    ['PAUSE', { X: 441, Y: 144, W: '40px', H: '40px' }],
    ['DEL', { X: 494, Y: 267, W: '40px', H: '40px' }],
    ['7', { X: 71, Y: 214, W: '40px', H: '40px' }],
    ['8', { X: 123, Y: 215, W: '40px', H: '40px' }],
    ['9', { X: 177, Y: 215, W: '40px', H: '40px' }],
    ['0', { X: 229, Y: 215, W: '40px', H: '40px' }],
    ['-', { X: 283, Y: 213, W: '40px', H: '40px' }],
    ['=', { X: 335, Y: 213, W: '40px', H: '40px' }],
    ['Backspace', { X: 403, Y: 213, W: '40px', H: '40px' }],
    ['Home', { X: 494, Y: 214, W: '40px', H: '40px' }],
    ['Y', { X: 43, Y: 267, W: '40px', H: '40px' }],
    ['U', { X: 97, Y: 268, W: '40px', H: '40px' }],
    ['I', { X: 150, Y: 267, W: '40px', H: '40px' }],
    ['O', { X: 203, Y: 267, W: '40px', H: '40px' }],
    ['P', { X: 255, Y: 267, W: '40px', H: '40px' }],
    ['[', { X: 307, Y: 266, W: '40px', H: '40px' }],
    [']', { X: 362, Y: 266, W: '40px', H: '40px' }],
    ['\\', { X: 427, Y: 267, W: '40px', H: '40px' }],
    ['End', { X: 494, Y: 144, W: '40px', H: '40px' }],
    ['H', { X: 57, Y: 321, W: '40px', H: '40px' }],
    ['J', { X: 111, Y: 321, W: '40px', H: '40px' }],
    ['K', { X: 162, Y: 321, W: '40px', H: '40px' }],
    ['L', { X: 216, Y: 320, W: '40px', H: '40px' }],
    [';', { X: 269, Y: 318, W: '40px', H: '40px' }],
    ["'", { X: 321, Y: 319, W: '40px', H: '40px' }],
    ['Enter', { X: 406, Y: 320, W: '40px', H: '40px' }],
    ['PgUp', { X: 493, Y: 319, W: '40px', H: '40px' }],
    ['N', { X: 83, Y: 374, W: '40px', H: '40px' }],
    ['M', { X: 137, Y: 373, W: '40px', H: '40px' }],
    [',', { X: 188, Y: 373, W: '40px', H: '40px' }],
    ['.', { X: 242, Y: 373, W: '40px', H: '40px' }],
    ['/', { X: 295, Y: 374, W: '40px', H: '40px' }],
    ['ShiftR', { X: 366, Y: 373, W: '40px', H: '40px' }],
    ['↑', { X: 441, Y: 372, W: '40px', H: '40px' }],
    ['PgDn', { X: 493, Y: 372, W: '40px', H: '40px' }],
    ['AltR', { X: 236, Y: 424, W: '40px', H: '40px' }],
    ['CtrlR', { X: 316, Y: 425, W: '40px', H: '40px' }],
    ['←', { X: 387, Y: 425, W: '40px', H: '40px' }],
    ['↓', { X: 441, Y: 425, W: '40px', H: '40px' }],
    ['→', { X: 493, Y: 425, W: '40px', H: '40px' }],
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
