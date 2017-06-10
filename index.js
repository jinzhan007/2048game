var app = new PIXI.Application(1500, 700, {backgroundColor: 0x1099bb});//对象
document.body.appendChild(app.view);//dom文档对象模型 接口 追加一个子元素 界面

var basicText = new PIXI.Text('2048Game');
basicText.x = 30;
basicText.y = 90;

app.stage.addChild(basicText);/**
 * Created by Administrator on 2017/6/10.
 */
//舞台 add
