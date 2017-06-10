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
var basicText = new PIXI.Text('2048 game',style)
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 6;
app.stage.addChild(basicText);

var grid = [];
for (var i = 0; i < 4; i++){
    grid[i] = [0,0,0,0];
}

for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
        drawCell(i,j);
    }
}

function generateRandomNumber(){
    return Math.floor(Math.random() * 4);
}

function drawCell(rowIndex, columnIndex) {
    var color = 0xFF0000;
    if (grid[rowIndex][columnIndex] === 2){
        color = 0xFF700B;
    }

    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
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

var rowIndex = generateRandomNumber();
var columnIndex = generateRandomNumber();

grid[rowIndex][columnIndex] = 2;

drawCell(rowIndex, columnIndex);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight'){
        console.log(event);
    }
})
