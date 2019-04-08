/// <reference no-default-lib="true"/>

declare var Tape: {

    /**
     * 初始化APP
     * @param options 初始化选项
     */
    initApp(options: {
        name: string,
        page: object,
        width: ?number,
        state: ?object,
        config: ?object,
        stateKey: ?string,
        el: ?string,
    }): void;

    /**
     * 获取APP实例
     */
    getApp(): any;

    /**
     * 获取APP名称
     */
    getAppName(): string;

    /**
     * 获取URL中携带的参数
     * @param key 参数名称
     * @param def 默认值
     */
    getQueryString(key: string, def: ?any): string;

    /**
     * 获取配置项
     * @param key 配置项
     * @param def 默认值
     */
    getConfig(key: string, def: ?any): any;

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
     * 设置缓存数据
     * @param key 配置项
     * @param value 数据内容
     */
    setCache(key: string, value: ?any): any;

    /**
     * 获取缓存数据
     * @param key 配置项
     * @param expires 有效时长，单位：ms
     */
    getCache(key: string, expires: ?number): Promise<any>;

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
     * 设置DEBUG模式
     * @param debug 开关
     */
    setDebug(debug: boolean): void;

    /**
     * 是否为DEBUG模式
     */
    isDebug(): boolean;

    /**
     * 监听错误信息
     * @param callback 回调
     */
    onError(callback: (e: any) => void): string;

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
     * 显示骨架屏
     * @param html 模板
     * @param duration 时间
     */
    showSkeleton(html: ?string, duration: ?number): void;

    /**
     * 隐藏骨架屏
     */
    hideSkeleton(): void;

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
     * 设置页面标题
     * @param title 标题
     */
    setTitle(title: string): void;

    /**
     * 获取页面标题
     */
    getTitle(): string;

    /**
     * 发起网络请求
     * @param options 请求参数
     */
    request(options: {
        method: ?'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        json: ?boolean,
        data: ?object,
        header: ?object
    }): Promise<any>;

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

    /**
     * 获取VUE-TAPE版本号
     */
    getVersion(): string;

    /**
     * 获取Vue对象
     */
    getVue(): any;

}

declare var TapeInstaller: {

    /**
     * 安装Tape到全局
     * @param vue Vue对象
     * @param alias 别名
     */
    install(vue: ?any, alias: ?string): void;

}