var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});//对象
document.body.appendChild(app.view);//dom文档对象模型 接口 追加一个子元素 界面
var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
var maxCount = 16;
var currentCount = 0;

var score = 0;

var basicText = new PIXI.Text('2048 game',style);
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 6;
app.stage.addChild(basicText);

var scoreText = new PIXI.Text('Score:' + score,style);
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 6;
app.stage.addChild(scoreText);

var grid = [];
for (var i = 0; i < 4; i++){
    grid[i] = [0,0,0,0];
}

var flushUI = function () {
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            drawCell(i,j);
        }
    }
    scoreText.text = 'Score: ' + score;//
};
flushUI();

function generateRandomNumber(){
    return Math.floor(Math.random() * 4);
}

function drawCell(rowIndex, columnIndex) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][columnIndex]), 1);
    graphics.drawRect(app.renderer.width / 8 + columnIndex * 77, app.renderer.height / 3  + rowIndex * 77, 75, 75);//x, y,width, height
    app.stage.addChild(graphics);

    if (grid[rowIndex][columnIndex] !== 0){
        var number = new PIXI.Text(grid[rowIndex][columnIndex],{
            fontSize:30
        });
        number.anchor.set(0.5);
        number.x = 75 / 2 + app.renderer.width / 8 + columnIndex * 77;
        number.y = 75 / 2 + app.renderer.height / 3 + rowIndex * 77;
        app.stage.addChild(number);
    }
}

function getColorByNumber(number) {
    var colorValue = {
        0:0x00FF00,
        2:0xFF0000,
        4:0x0000FF,
        8:0xFFF000,
    };

    var color = colorValue[number];
    if (color === undefined){
        color = 0xFF0FFF;
    }
    return color;
}

var addRandomCell = function () {
    if (currentCount === maxCount) return;

    var rowIndex = generateRandomNumber();
    var columnIndex = generateRandomNumber();

    while (grid[rowIndex][columnIndex] !== 0){
        rowIndex = generateRandomNumber();
        columnIndex = generateRandomNumber();
    }
    grid[rowIndex][columnIndex] = 2;
    currentCount++;
};

addRandomCell();
addRandomCell();

flushUI();

var onToRightEventHandler = function () {
    var isChanged = moveCellToRight();
    if(isChanged){
        addRandomCell();
    }
    flushUI();
    if(checkGameOver()){
        alert('Game Over.');
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if(isChanged){
        addRandomCell();
    }
    flushUI();
    if(checkGameOver()){
        alert('Game Over.');
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if(isChanged){
        addRandomCell();
    }
    flushUI();
    if(checkGameOver()){
        alert('Game Over.');
    }
};
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if(isChanged){
        addRandomCell();
    }
    flushUI();
    if(checkGameOver()){
        alert('Game Over.');
    }
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight'){
        onToRightEventHandler();
    }
    if (event.key === 'ArrowLeft'){
        onToLeftEventHandler();
    }
    if (event.key === 'ArrowUp'){
        onToUpEventHandler();
    }
    if (event.key === 'ArrowDown'){
        onToDownEventHandler();
    }
});

var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});

function moveCellToRight() {
    var isChanged = false;

    for (var rowIndex = 0; rowIndex < 4; rowIndex++){
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--){
            if (grid[rowIndex][columnIndex] === 0)
                continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex,columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];//2  0->0  2
                grid[rowIndex][columnIndex] = 0;
                isChanged = true;
            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;//-1：右边没有0；

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]){
                    grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex ];
                    grid[rowIndex][currentIndex] = 0;

                    score += grid[rowIndex][currentIndex + 1];

                    isChanged = true;

                    currentCount--;
                }
            }
        }
        return isChanged;
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }
    return -1;
}

function rotateArray(rotateCount = 1) {
    for (var i = 0 ; i < rotateCount; i ++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
                return row.map((item, columnIndex) => {
                    return array[3 - columnIndex][rowIndex];
    })
    })
    }
}

function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}