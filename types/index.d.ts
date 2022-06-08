/** Module */
declare module "vue-tape" {

    function install(vue: any): void;

    interface Tape {

        /**
         * 初始化APP
         * @param options 初始化选项
         */
        initApp(options: {
            name: string,
            page: object,
            config?: object,
            lazy?: object,
            el?: string,
            options?: object,
        }, handler?: (vue?: object) => void): void;

        /**
         * 获取vue实例
         */
        getVue(): any;

        /**
         * 获取app实例
         */
        getApp(): any;

        /**
         * 获取app name
         */
        getAppName(): any;

        /**
         * 设置debug模式
         * @param debug 开关
         */
        setDebug(debug: boolean): void;

        /**
         * 是否为debug模式
         */
        isDebug(): boolean;

        /**
         * 获取URL中携带的参数
         * @param key 参数名称
         * @param def 默认值
         */
        getQuery(key: string, def?: any): string;

        /**
         * 获取URL中携带的参数
         * @param path 地址路径
         */
        parseQueryParams(path: string): { url: string, params: object };

        /**
         * 获取URL中携带的参数
         * @param path 地址路径
         * @param query 追加参数
         */
        appendQueryParams(path: string, query: object): string;

        /**
         * 获取配置项
         * @param key 配置项
         * @param def 默认值
         */
        getConfig(key: string, def?: any): any;

        /**
         * 获取VUE-TAPE版本号
         */
        getVersion(): string;

        /**
         * 获取页面中元素的位置
         * @param el 元素
         */
        getPosition(el?: any): { left: number, top: number, height: number, width: number };

        /**
         * 设置storage数据
         * @param key 配置项
         * @param value 数据值
         */
        setStorage(key: string, value?: any): void;

        /**
         * 获取storage数据
         * @param key 配置项
         * @param def 默认值
         */
        getStorage(key: string, def?: any): any;

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
         * 添加返回劫持
         * @param key 劫持类型
         * @param listener 处理劫持回调
         */
        backListener(key: string, listener: () => any): void;

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
        frameLoop(callback: (time: number) => void, delay?: number, count?: number): { clearLoop: () => void };

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
         * 取消监听界面回到前台
         * @param callback 回调
         */
        offShow(callback: () => void): void;

        /**
         * 监听界面退至后台
         * @param callback 回调
         */
        onHide(callback: () => void): void;

        /**
         * 取消监听界面退至后台
         * @param callback 回调
         */
        offHide(callback: () => void): void;

        /**
         * 监听页面尺寸发生变化
         * @param callbac 回调  
         */
        onResize(callback: () => void): void;

        /**
         * 取消监听页面尺寸发生变化
         * @param callback 回调
         */
        offResize(callback: () => void): void;

    }

}

interface Window {
    Tape: import("vue-tape").Tape;
}