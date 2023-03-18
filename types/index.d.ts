/** Module */
declare module "vue-tape" {

  function install(vue: any): void;

  function getInstance(): Tape;


  interface Tape {

    /** 时钟管理类 */
    timer: Timer;

    /**
     * 初始化APP
     * @param options 初始化选项
     */
    initApp(options: {
      el: string,
      app: any,
      options?: object,
      dataOptions?: {
        // 数据前缀
        keyPrefix?: String,
        // 默认数据
        defaultValues?: Object
        // 保存数据
        saveData?: (key: string, value) => Promise<any>;
        // 移除数据
        removeData?: (keys: string[]) => Promise<any>;
        // 加载数据
        loadData?: () => Promise<{ key: string, value: any }[]>;
      }
    }, handler?: (vue?: object) => void): void;

    /**
     * 获取VUE-TAPE版本号
     */
    getVersion(): string;

    /**
     * 从目标对象中获取数据
     * @param object 
     * @param path 
     * @param def 
     */
    get(object: object, path?: string | any[], def?: any)

    /**
     * 将原数据转换为任意格式
     * @param val
     * @param def 
     */
    toAny(val: any, def?: any)

    /**
     * 格式化日期
     * @param date 日期
     * @param format 格式,默认yyyy-MM-dd
     */
    formatDate(date: Date, format: string): void;

    /**
     * 获取URL中携带的参数
     * @param key 参数名称
     * @param def 默认值
     */
    getQueryString(key: string, def?: any): string;

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
     * 获取页面中元素的位置
     * @param el 元素
     */
    getElementPosition(el?: any): { left: number, top: number, height: number, width: number };

    /**
     * 设置localStorage数据
     * @param key 配置项
     * @param value 数据值
     */
    setLocalStorage(key: string, value?: any): void;

    /**
     * 获取localStorage数据
     * @param key 配置项
     * @param def 默认值
     */
    getLocalStorage(key: string, def?: any): any;

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

  /** 时钟管理类 */
  interface Timer {
    /**
     * 定时执行一次。
     * @param	delay	延迟时间(单位为毫秒)。
     * @param	caller	执行域(this)。
     * @param	method	定时器回调函数。
     * @param	args	回调参数。
     * @param	coverBefore	是否覆盖之前的延迟执行，默认为 true 。
     */
    once(delay: number, caller: any, method: Function, args?: Array<any>, coverBefore?: boolean): void;
    /**
     * 定时重复执行。
     * @param	delay	间隔时间(单位毫秒)。
     * @param	caller	执行域(this)。
     * @param	method	定时器回调函数。
     * @param	args	回调参数。
     * @param	coverBefore	是否覆盖之前的延迟执行，默认为 true 。
     * @param	jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
     */
    loop(delay: number, caller: any, method: Function, args?: Array<any>, coverBefore?: boolean, jumpFrame?: boolean): void;
    /**
     * 定时执行一次(基于帧率)。
     * @param	delay	延迟几帧(单位为帧)。
     * @param	caller	执行域(this)。
     * @param	method	定时器回调函数。
     * @param	args	回调参数。
     * @param	coverBefore	是否覆盖之前的延迟执行，默认为 true 。
     */
    frameOnce(delay: number, caller: any, method: Function, args?: Array<any>, coverBefore?: boolean): void;
    /**
     * 定时重复执行(基于帧率)。
     * @param	delay	间隔几帧(单位为帧)。
     * @param	caller	执行域(this)。
     * @param	method	定时器回调函数。
     * @param	args	回调参数。
     * @param	coverBefore	是否覆盖之前的延迟执行，默认为 true 。
     */
    frameLoop(delay: number, caller: any, method: Function, args?: Array<any>, coverBefore?: boolean): void;
    /**
     * 清理定时器。
     * @param	caller 执行域(this)。
     * @param	method 定时器回调函数。
     */
    clear(caller: any, method: Function): void;
    /**
     * 清理对象身上的所有定时器。
     * @param	caller 执行域(this)。
     */
    clearAll(caller: any): void;
    /**
     * 延迟执行。
     * @param	caller 执行域(this)。
     * @param	method 定时器回调函数。
     * @param	args 回调参数。
     */
    callLater(caller: any, method: Function, args?: Array<any>): void;
    /**
     * 立即执行 callLater 。
     * @param	caller 执行域(this)。
     * @param	method 定时器回调函数。
     */
    runCallLater(caller: any, method: Function): void;
    /**
     * 立即提前执行定时器，执行之后从队列中删除
     * @param	caller 执行域(this)。
     * @param	method 定时器回调函数。
     */
    runTimer(caller: any, method: Function): void;
  }

}