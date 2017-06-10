var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});//对象
document.body.appendChild(app.view);//dom文档对象模型 接口 追加一个子元素 界面

var basicText = new PIXI.Text('2048Game',{
    fontSize:50
})
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
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(200 + j * 60, 200  + i * 60, 50, 50);//x, y,width, height
        app.stage.addChild(graphics);
    }
}


