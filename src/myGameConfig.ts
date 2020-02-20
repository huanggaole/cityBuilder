/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameUI from "./script/GameUI"
import StartUI from "./script/StartUI";
import CheckingDialog from "./script/CheckingDialogUI";
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=640;
    static height:number=1136;
    static scaleMode:string="showall";
    static screenMode:string="none";
    static alignV:string="center";
    static alignH:string="center";
    static startScene:any="StartMenu.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/CheckingDialogUI.ts",CheckingDialog);
        reg("script/StartUI.ts",StartUI);
        reg("script/GameUI.ts",GameUI);
        
    }
}
GameConfig.init();