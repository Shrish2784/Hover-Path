let w = 40;
let canvasWidth = 806;
let canvasHeight = 806;
let rows, cols;
let startCell;
let maze = [];
let stack = [];
let current;


function setup() {
	createCanvas(canvasWidth, canvasHeight);
	background(255);
	rows = floor(canvasHeight / w);
	cols = floor(canvasWidth / w);
	for (let i = 0; i < cols;i++) {
		maze[i] = new Array(rows);
	}
	for (let i = 0;i < cols;i++) {
		for (let j = 0;j < rows;j++) {
			maze[i][j] = new Cell(i, j, w);
		}
	}
	console.log(maze);
	startCell = maze[0][0];
	endCell = maze[rows - 1][cols - 1];
	startCell.removeStartWalls();
	endCell.removeEndWalls();
	current = startCell;
}

function draw() {
	background(0, 150, 150);
	for (let i = 0;i < cols;i++) {
		for (let j = 0;j < rows;j++) {
			maze[i][j].display();
		}
	}
	current.traversed = true;
	if (current != startCell) current.show();
	let next = findRandomNext(current.i, current.j);
	if (next) {
		current.removeWalls(current, next);
		next.traversed = true;
		stack.push(current);
		current = next;
	} else if (stack.length > 0){
		current = stack.pop();
	}
}

function findRandomNext(i, j) {
	let neighbors = [];
	neighbors.push('right');
	neighbors.push('top');
	neighbors.push('bottom');
	neighbors.push('left');
	if (i == 0) {
		let index = neighbors.indexOf('top');
		neighbors.splice(index, 1);
	} if (i == rows - 1) {
		let index = neighbors.indexOf('bottom');
		neighbors.splice(index, 1);
	} if (j == 0) {
		let index = neighbors.indexOf('left');
		neighbors.splice(index, 1);
	} if (j == cols - 1) {
		let index = neighbors.indexOf('right');
		neighbors.splice(index, 1);
	}

	for (let k = 0;k < neighbors.length;k++) {
		if (neighbors[k] == 'top') {
			neighbors.splice(k, 1);
			k = k - 1;
			let cell = maze[i - 1][j];
			if (!cell.traversed) neighbors.push(cell);
		} else if (neighbors[k] == 'left') {
			neighbors.splice(k, 1);
			k = k - 1;
			let cell = maze[i][j - 1];
			if (!cell.traversed) neighbors.push(cell);
		} else if (neighbors[k] == 'bottom') {
			neighbors.splice(k, 1);
			k = k - 1;
			let cell = maze[i + 1][j];
			if (!cell.traversed) neighbors.push(cell);
		} else if (neighbors[k] == 'right') {
			neighbors.splice(k, 1);
			k = k - 1;
			let cell = maze[i][j + 1];
			if (!cell.traversed) neighbors.push(cell);
		}
	}
	return neighbors[floor(random(0, neighbors.length))];
}
