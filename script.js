const grid = document.getElementsByClassName("grid")[0];
const startButton = document.getElementById("start-search");
let interval;
let mouse = {x: 0, y: 0};
const gridHeight = 20;
const gridWidth = 20;

let gridArr = [];

for(let i = 0; i < gridHeight; i++) {
    gridArr.push([]);
    for(let j = 0; j < gridWidth; j++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');
        div.setAttribute('id', `${i}-${j}`);
        grid.appendChild(div);
        gridArr[i].push(0);
    }
}

gridArr[0][0] = 2;
const startNode = document.getElementsByClassName("grid-square")[0];
startNode.classList.add('start-node');

const endi = Math.floor(Math.random() * gridHeight);
const endj = Math.floor(Math.random() * gridWidth);
gridArr[endi][endj] = -1;
const endNode = document.getElementsByClassName("grid-square")[(endi*gridWidth) + endj];
endNode.classList.add('end-node');

console.log(gridArr);

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function handleGridClick(event) {
    await pause(1000);
    if (event.target.className === 'grid-square' || event.target.className === 'grid-square color') {
        const coord = event.target.id.split('-');
        const row = Number(coord[0]);
        const col = Number(coord[1]);
        console.log('row: ', row);
        console.log('col: ', col);
        event.target.classList.toggle('color');
    }
}

async function bfs() {
    for(let i = 0; i < gridArr.length; i++) {
        for(let j = 0; j < gridArr[i].length; j++) {
            if (gridArr[i][j] !== 2 && gridArr[i][j] !== -1) {
                const node = document.getElementById(`${i}-${j}`);
                node.classList.add("color");
                await pause(25);
            } else if (gridArr[i][j] === -1) {
                return;
            }
        }
    }
}

grid.addEventListener('click', handleGridClick);
startButton.addEventListener('click', bfs);
























// function elementFromMousePosition() {
//     let element = document.elementFromPoint(mouse.x, mouse.y);
//     if (element.className === 'grid-square' || element.className === 'grid-square color') {
//         console.log('Clicked Square');
//         element.classList.toggle('color');
//     }
// }

// grid.addEventListener('mousemove', event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
// });

// grid.addEventListener('mousedown', event => {
//     interval = setInterval(elementFromMousePosition, 100);
// });

// grid.addEventListener('mouseup', event => {
//     clearInterval(interval);
// });

// grid.addEventListener('mouseleave', event => {
//     clearInterval(interval);
// });
