const grid = document.getElementsByClassName("grid")[0];
// const linearButton = document.getElementById("linear-search");
const bfsButton = document.getElementById("bfs-search");
const dfsButton = document.getElementById("dfs-search");
const resetButton = document.getElementById("reset-search");
let interval;
let isHeld = false;
let mouse = {x: 0, y: 0};
const gridHeight = 20;
const gridWidth = 20;

let gridArr = [];
let wall = new Set([]);

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

// for(let i = 0; i < 225; i++) {
//     const row = Math.floor(Math.random() * gridHeight);
//     const col = Math.floor(Math.random() * gridWidth);
//     if (row !== 0 && col !== 0) {
//         const wallNode = document.getElementById(`${row}-${col}`);
//         wallNode.classList.add('wall');
//         gridArr[row][col] = 1;
//     }
// }

gridArr[0][0] = 2;
const startNode = document.getElementsByClassName("grid-square")[0];
startNode.classList.add('start-node');

const endi = Math.floor(Math.random() * gridHeight);
const endj = Math.floor(Math.random() * gridWidth);
gridArr[endi][endj] = -1;
const endNode = document.getElementsByClassName("grid-square")[(endi*gridWidth) + endj];
endNode.classList.add('end-node');


const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function handleGridClick(event) {
    if (event.target.className === 'grid-square' || event.target.className === 'grid-square wall') {
        const coord = event.target.id.split('-');
        const row = Number(coord[0]);
        const col = Number(coord[1]);
        gridArr[row][col] = gridArr[row][col] === 0 ? 1 : 0;
        console.log(gridArr[row][col]);
        event.target.classList.toggle('wall');
    }
}

async function linear() {
    for(let i = 0; i < gridArr.length; i++) {
        for(let j = 0; j < gridArr[i].length; j++) {
            if (gridArr[i][j] !== 2 && gridArr[i][j] !== -1) {
                const node = document.getElementById(`${i}-${j}`);
                node.classList.add("color");
                await pause(10);
            } else if (gridArr[i][j] === -1) {
                return;
            }
        }
    }
}

async function bfs() {
    let queue = ['0-0'];
    let visited = new Set(['0-0']);

    while(queue.length > 0) {
        let coord = queue.pop().split('-');
        const currRow = Number(coord[0]);
        const currCol = Number(coord[1]);
        currNode = gridArr[currRow][currCol];
        console.log(currNode);

        if (currNode === -1) {
            console.log('end node');
            return;
        } else {
            if (currNode !== 2) {
                const htmlNode = document.getElementById(`${currRow}-${currCol}`);
                htmlNode.classList.add('color');
            }

            const right = [currRow, currCol+1];
            const bottom = [currRow+1, currCol];
            const left = [currRow, currCol-1];
            const top = [currRow-1, currCol];

            if (right[1] < gridWidth && !visited.has(`${right[0]}-${right[1]}`) && gridArr[right[0]][right[1]] !== 1) {
                queue.unshift(`${right[0]}-${right[1]}`);
                visited.add(`${right[0]}-${right[1]}`);
            }
            if (bottom[0] < gridHeight && !visited.has(`${bottom[0]}-${bottom[1]}`) && gridArr[bottom[0]][bottom[1]] !== 1) {
                queue.unshift(`${bottom[0]}-${bottom[1]}`);
                visited.add(`${bottom[0]}-${bottom[1]}`);
            }
            if (left[1] >= 0 && !visited.has(`${left[0]}-${left[1]}`) && gridArr[left[0]][left[1]] !== 1) {
                queue.unshift(`${left[0]}-${left[1]}`);
                visited.add(`${left[0]}-${left[1]}`);
            }
            if (top[0] >= 0 && !visited.has(`${top[0]}-${top[1]}`) && gridArr[top[0]][top[1]] !== 1) {
                queue.unshift(`${top[0]}-${top[1]}`);
                visited.add(`${top[0]}-${top[1]}`);
            }
        }
        await pause(25);
    }
}

async function dfs() {
    let stack = ['0-0'];
    let visited = new Set(['0-0']);

    while(stack.length > 0) {
        let coord = stack.pop().split('-');
        const currRow = Number(coord[0]);
        const currCol = Number(coord[1]);
        currNode = gridArr[currRow][currCol];
        console.log(currNode);

        if (currNode === -1) {
            console.log('end node');
            return;
        } else {
            if (currNode !== 2) {
                const htmlNode = document.getElementById(`${currRow}-${currCol}`);
                htmlNode.classList.add('color');
            }

            const right = [currRow, currCol+1];
            const bottom = [currRow+1, currCol];
            const left = [currRow, currCol-1];
            const top = [currRow-1, currCol];

            if (bottom[0] < gridHeight && !visited.has(`${bottom[0]}-${bottom[1]}`) && gridArr[bottom[0]][bottom[1]] !== 1) {
                stack.push(`${bottom[0]}-${bottom[1]}`);
                visited.add(`${bottom[0]}-${bottom[1]}`);
            }
            if (left[1] >= 0 && !visited.has(`${left[0]}-${left[1]}`) && gridArr[left[0]][left[1]] !== 1) {
                stack.push(`${left[0]}-${left[1]}`);
                visited.add(`${left[0]}-${left[1]}`);
            }
            if (top[0] >= 0 && !visited.has(`${top[0]}-${top[1]}`) && gridArr[top[0]][top[1]] !== 1) {
                stack.push(`${top[0]}-${top[1]}`);
                visited.add(`${top[0]}-${top[1]}`);
            }
            if (right[1] < gridWidth && !visited.has(`${right[0]}-${right[1]}`) && gridArr[right[0]][right[1]] !== 1) {
                stack.push(`${right[0]}-${right[1]}`);
                visited.add(`${right[0]}-${right[1]}`);
            }
        }
        await pause(25);
    }
}

function reset() {
    for(let i = 0; i < gridArr.length; i++) {
        for(let j = 0; j < gridArr[i].length; j++) {
            document.getElementById(`${i}-${j}`).classList.remove('color');
        }
    }
}

grid.addEventListener('click', handleGridClick);
// linearButton.addEventListener('click', linear);
bfsButton.addEventListener('click', bfs);
dfsButton.addEventListener('click', dfs);
resetButton.addEventListener('click', reset);

function elementFromMousePosition() {
    let element = document.elementFromPoint(mouse.x, mouse.y);
    console.log(element.className);
    if (element.className === 'grid-square' || element.className === 'grid-square wall') {
        // console.log('Clicked Square');
        element.classList.add('wall');
        const coord = element.id.split('-');
        const row = Number(coord[0]);
        const col = Number(coord[1]);
        gridArr[row][col] = 1;
    }
}

grid.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

grid.addEventListener('mousedown', event => {
    isHeld = true;
    interval = setInterval(() => {
        if (isHeld) {
            elementFromMousePosition();
        }
    }, 100);
});

grid.addEventListener('mouseup', event => {
    isHeld = false;
    clearInterval(interval);
});

grid.addEventListener('mouseleave', event => {
    isHeld = false;
    clearInterval(interval);
});
