//import { ui } from "../ui/layaMaxUI";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class StartUI extends Laya.Scene {
    /**设置单例的引用方式，方便其他类引用 */
    static instance: StartUI;
    /**当前游戏积分字段 */
    private startBtn: Laya.Button;

    constructor() {
        super();
        StartUI.instance = this;
    }

    onEnable(): void {
        //点击提示文字，开始游戏
        this.startBtn.on(Laya.Event.CLICK, this, this.onClick);
        
    }

    onClick(e: Laya.Event): void {
        Laya.Scene.close("StartMenu.scene");
        Laya.Scene.open("mapScene.scene");
    }
}