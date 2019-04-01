/// <reference no-default-lib="true"/>

interface TapeInstance {

    /**
     * 初始化页面
     * @param options 初始化选项
     * @param statekey 用于隔离state的KEY
     */
    init(options: { app: object, state: ?object, config: ?object, width: ?number }, stateKey: ?string): void;

    /**
     * 获取URL中携带的参数
     * @param key 参数名称
     * @param def 默认值
     */
    query(key: string, def: ?any): string;

    /**
     * 获取配置项
     * @param key 配置项
     * @param def 默认值
     */
    config(key: string, def: ?any): any;

    /**
     * 设置storage数据
     * @param key 配置项
     * @param def 默认值
     */
    setStorage(key: string, value: ?any): void;

    /**
     * 获取storage数据
     * @param key 配置项
     * @param def 默认值
     */
    getStorage(key: string, def: ?any): any;

    /**
     * 字符串BASE64编码
     * @param str 原始字符串
     */
    encodeBase64(str: string): string;

    /**
     * 字符串BASE64解码
     * @param str BASE64字符串
     */
    decodeBase64(str: string): string;

    /**
     * 监听界面回到前台
     * @param callback 回调
     */
    onShow(callback: () => void): string;

    /**
     * 监听界面退至后台
     * @param callback 回调
     */
    onHide(callback: () => void): string;

    /**
     * 取消监听界面回到前台
     * @param callback 回调
     */
    offShow(callback: () => void): string;

    /**
     * 取消监听界面退至后台
     * @param callback 回调
     */
    offHide(callback: () => void): string;

    /**
     * 返回到上级页面
     */
    back(): void;

    /**
     * 返回劫持监听
     * @param listener 返回劫持监听器
     */
    backListener(listener: () => boolean | any): void;

    /**
     * 设置页面标题
     * @param title 标题
     */
    setTitle(title: string): void;

    /**
     * 获取页面标题
     */
    getTitle(): string;

    /**
     * 元素曝光监听
     * @param options 曝光参数
     */
    exposure(options: { selector: string, exposureKey: ?string, delayTime: ?number, displayAll: ?boolean, extraData: ?any, handleExposure: (box: any, extraData: ?any) => void }): void;

    /**
     * 发起网络请求
     * @param options 请求参数
     */
    request(options: { method: ?'GET' | 'POST' | 'PUT' | 'DELETE', url: string, json: ?boolean, data: ?object, header: ?object }): Promise<any>;

}

declare var Tape: TapeInstance;