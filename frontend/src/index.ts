import { RGBKeyboard } from './rgb-keyboard.js';
const keyboardLeftElement = document.getElementById('keyboard-left') as RGBKeyboard;
const keyboardRightElement = document.getElementById('keyboard-right') as RGBKeyboard;
const dumpButton = document.getElementById('dump-button')!;

dumpButton.addEventListener('click', () => {
    // Access the getKeyPositions method and log the output
    const tsLeft = keyboardLeftElement.getKeyPositions();
    const tsRight = keyboardRightElement.getKeyPositions();
    console.log('Left side key positions (TypeScript representation):');
    console.log(tsLeft);
    console.log('Right side key positions (TypeScript representation):');
    console.log(tsRight);
});

const xOffsetLeft = 0;
const yOffsetLeft = 0;

const xOffsetRight = 0;
const yOffsetRight = 0;

const leftHalfKeys = new Map<string, [number, number]>([
    ['«', [70, 142]],
    ['Esc', [165, 144]],
    ['F1', [218, 144]],
    ['F2', [272, 144]],
    ['F3', [325, 144]],
    ['F4', [377, 144]],
    ['F5', [429, 144]],
    ['F6', [483, 144]],
    ['①', [44, 215]],
    ['②', [97, 215]],
    ['`', [166, 216]],
    ['1', [219, 214]],
    ['2', [272, 215]],
    ['3', [325, 215]],
    ['4', [378, 215]],
    ['5', [431, 215]],
    ['6', [483, 215]],
    ['③', [45, 268]],
    ['④', [98, 268]],
    ['Tab', [178, 267]],
    ['Q', [245, 267]],
    ['W', [298, 268]],
    ['E', [351, 267]],
    ['R', [404, 267]],
    ['T', [457, 267]],
    ['⑤', [45, 321]],
    ['⑥', [98, 320]],
    ['CapsLock', [175, 320]],
    ['A', [259, 320]],
    ['S', [311, 321]],
    ['D', [364, 321]],
    ['F', [417, 320]],
    ['G', [470, 321]],
    ['⑦', [45, 373]],
    ['⑧', [98, 373]],
    ['Shift', [175, 373]],
    ['Z', [285, 373]],
    ['X', [337, 373]],
    ['C', [389, 373]],
    ['V', [443, 373]],
    ['B', [496, 373]],
    ['FN', [45, 426]],
    ['☼', [98, 426]],
    ['Ctrl', [178, 426]],
    ['⊞', [245, 424]],
    ['Alt', [303, 425]],
    ['Space', [452, 425]]
]);

const rightHalfKeys = new Map<string, [number, number]>([
    ['F7', [70, 145]],
    ['F8', [123, 145]],
    ['F9', [176, 145]],
    ['F10', [229, 145]],
    ['F11', [283, 145]],
    ['F12', [336, 145]],
    ['PRNT', [387, 144]],
    ['PAUSE', [441, 144]],
    ['DEL', [494, 267]],
    ['7', [71, 214]],
    ['8', [123, 215]],
    ['9', [177, 215]],
    ['0', [229, 215]],
    ['-', [283, 213]],
    ['=', [335, 213]],
    ['Backspace', [403, 213]],
    ['Home', [494, 214]],
    ['Y', [43, 267]],
    ['U', [97, 268]],
    ['I', [150, 267]],
    ['O', [203, 267]],
    ['P', [255, 267]],
    ['[', [307, 266]],
    [']', [362, 266]],
    ['\\', [427, 267]],
    ['End', [494, 144]],
    ['H', [57, 321]],
    ['J', [111, 321]],
    ['K', [162, 321]],
    ['L', [216, 320]],
    [';', [269, 318]],
    ["'", [321, 319]],
    ['Enter', [406, 320]],
    ['PgUp', [493, 319]],
    ['N', [83, 374]],
    ['M', [137, 373]],
    [',', [188, 373]],
    ['.', [242, 373]],
    ['/', [295, 374]],
    ['ShiftR', [366, 373]],
    ['↑', [441, 372]],
    ['PgDn', [493, 372]],
    ['AltR', [236, 424]],
    ['CtrlR', [316, 425]],
    ['←', [387, 425]],
    ['↓', [441, 425]],
    ['→', [493, 425]]
]);

for (const [key, [x, y]] of leftHalfKeys) {
    leftHalfKeys.set(key, [x + xOffsetLeft, y + yOffsetLeft]);
}

for (const [key, [x, y]] of rightHalfKeys) {
    rightHalfKeys.set(key, [x + xOffsetRight, y + yOffsetRight]);
}

keyboardLeftElement.keyPositions = leftHalfKeys;
keyboardRightElement.keyPositions = rightHalfKeys;
