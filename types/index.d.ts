/// <reference no-default-lib="true"/>

declare interface Tape {

    /**
     * 初始化APP
     * @param options 初始化选项
     */
    initApp(options: {
        name: string,
        page: object,
        loadjs: ?string,
        config: ?object,
        width: ?number,
        unit: ?number,
        lazy: ?object,
        el: ?string,
    }): void;

    /**
     * 获取Vue对象
     */
    getVue(): any;

    /**
     * 获取APP对象
     */
    getApp(): any;

    /**
     * 设置DEBUG模式
     * @param debug 开关
     */
    setDebug(debug: boolean): void;

    /**
     * 获取URL中携带的参数
     * @param key 参数名称
     * @param def 默认值
     */
    getQuery(key: string, def: ?any): string;

    /**
     * 获取配置项
     * @param key 配置项
     * @param def 默认值
     */
    getConfig(key: string, def: ?any): any;

    /**
     * 获取VUE-TAPE版本号
     */
    getVersion(): string;

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
     * 格式化日期
     * @param date 日期
     * @param format 格式,默认yyyy-MM-dd
     */
    formatDate(date: Date, format: string): void;

    /**
     * 创建帧循环
     * @param callback　循环函数 
     * @param delay 延时帧数
     * @param count 执行次数
     */
    frameLoop(callback: (time: number) => void, delay: ?number, count: ?number): { clearLoop: () => void };

    /**
     * 页面加载完成
     * @param callback 回调
     */
    onLoad(callback: (info: any) => void): void;

    /**
     * 监听界面回到前台
     * @param callback 回调
     */
    onShow(callback: () => void): void;

    /**
     * 监听界面退至后台
     * @param callback 回调
     */
    onHide(callback: () => void): void;

    /**
     * 取消监听界面回到前台
     * @param callback 回调
     */
    offShow(callback: () => void): void;

    /**
     * 取消监听界面退至后台
     * @param callback 回调
     */
    offHide(callback: () => void): void;

    /**
     * 监听错误信息
     * @param callback 回调
     */
    onError(callback: (error: any) => void): void;

    /**
     * 显示Loading弹窗
     * @param msg 内容
     * @param duration 时间
     */
    showLoading(msg: ?string, duration: ?number): void;

    /**
     * 隐藏Loading弹窗
     */
    hideLoading(): void;

    /**
     * Toast消息弹窗
     * @param msg 内容
     * @param duration 时间
     */
    showToast(msg: string, duration: ?number): void;

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
     * 事件上报
     * @param event 事件
     * @param data 数据
     */
    reportEvent(event: ?string, data: ?any): any;

    /**
     * 设置处理上报
     * @param handler 上报事件处理回调
     */
    setReportHandler(handler: (eventData: object) => void): any;

}

/**
 * Tape
 */
declare var Tape: Tape;

/**
 * TapeInstaller
 */
declare var TapeInstaller: {

    /**
     * 安装Tape到全局
     * @param vue vue对象
     * @param alias 别名
     */
    install(vue: any, alias: ?string): void;

}