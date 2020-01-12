import Map from "../map/Map";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */

enum GameState{
    CameraOperation,
    Construction,
    Checking,
}

export default class GameUI extends Laya.Scene {
   /**设置单例的引用方式，方便其他类引用 */
   static instance: GameUI;
   tiledMap: Map;
   gamestate: GameState;

   private mLastMouseX: number = 0;
   private mLastMouseY: number = 0;
        
   //上次记录的两个触模点之间距离
   private lastDistance: number = 0;

   private mX: number = 0;
   private mY: number = 0;
        
   private cameraOper: Laya.Button;
   private infolbl: Laya.Label;

   constructor() {
       super();
       console.log("地图初始化");
       GameUI.instance = this;
       this.gamestate = GameState.CameraOperation;
       this.createMap();

   }

   onEnable(): void {
        this.cameraOper.on(Laya.Event.CLICK, this, this.onCameraOperClick);
    }

   //创建地图
    private createMap() {
        //创建地图对象
        this.tiledMap = new Map();
        this.mX = 0;//Laya.stage.width / 2;
        this.mY = 0;//Laya.stage.height / 2;
        this.addChild(this.tiledMap);

        // this.tiledMap.pivotX = Laya.stage.width / 2 / this.tiledMap.scaleX;
        // this.tiledMap.pivotY = Laya.stage.height / 2 / this.tiledMap.scaleY;
        
        this.tiledMap.x = 0;
        this.tiledMap.y = 0;

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);//注册鼠标事件
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        
    }

    //鼠标按下拖动地图
    private mouseDown(e:Laya.Event): void {
        if(this.gamestate == GameState.CameraOperation){
            var touches: Array<any> = e.touches;
            this.mX = this.tiledMap.x / this.tiledMap.scaleX;
            this.mY = this.tiledMap.y / this.tiledMap.scaleY;
            // console.log(e);
            if(touches && touches.length == 2){
                this.lastDistance = this.getDistance(touches);
                
            }else{
                this.mLastMouseX = Laya.stage.mouseX;
                this.mLastMouseY = Laya.stage.mouseY;
            }
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }
    }
    /**计算两个触摸点之间的距离*/
    private getDistance(points: Array<any>): number {
        var distance: number = 0;
        if (points && points.length == 2)
        {
            var dx: number = points[0].stageX - points[1].stageX;
            var dy: number = points[0].stageY - points[1].stageY;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }
    private mouseMove(e:Laya.Event): void {
        if(this.gamestate == GameState.CameraOperation){           
            var touches: Array<any> = e.touches;
            // console.log(touches.length);
            if(touches && touches.length == 2){
                var distance: number = this.getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                const factor: number = 0.01;

                this.tiledMap.scaleX += (distance - this.lastDistance) * factor;
                this.tiledMap.scaleY += (distance - this.lastDistance) * factor;     

                this.tiledMap.x = this.mX * this.tiledMap.scaleX
                this.tiledMap.y = this.mY * this.tiledMap.scaleY
                
                this.lastDistance = distance;
            }else{
                //移动地图视口
                this.tiledMap.x = this.mX * this.tiledMap.scaleX - (this.mLastMouseX - Laya.stage.mouseX);
                this.tiledMap.y = this.mY * this.tiledMap.scaleY - (this.mLastMouseY - Laya.stage.mouseY);
            }
            
        }
    }

    private mouseUp(e:Laya.Event): void {
        if(this.gamestate == GameState.CameraOperation){
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }
    }

    onCameraOperClick(e: Laya.Event): void {
        this.gamestate = GameState.CameraOperation;
        this.infolbl.text = "移动缩放模式：单指操作进行地图移动，双指操作进行地图缩放。";
        //this.tiledMap.
    }
}