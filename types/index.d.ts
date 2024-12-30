/** Module */
declare module "vue-tape" {

  function install(vue: any): void;

  /** 时钟管理实例 */
  var timer: Timer;

  /** 状态管理实例 */
  var state: State;

  /**
   * 初始化APP
   * @param options 初始化选项
   */
  function initApp(options: {
    el: string,
    app: any,
    options?: object,
    // 状态配置
    stateOptions?: {
      // 数据前缀
      keyPrefix?: String,
      // 默认数据
      defaultValues?: Object
    }
  }, handler?: (vue?: object) => void): void;

  /**
   * 获取VUE-TAPE版本号
   */
  function getVersion(): string;

  /**
   * 创建数据管理
   * @param dataOptions 数据配置
   */
  function createData(dataOptions?: {
    // 本地模式
    local: boolean;
    // 数据前缀
    keyPrefix?: String;
    // 默认数据
    defaultValues?: Object;
    // 保存数据
    saveData?: (key: string, value) => Promise<any>;
    // 移除数据
    removeData?: (keys: string[]) => Promise<any>;
    // 加载数据
    loadData?: () => Promise<{ key: string, value: any }[]>;
  }): Data;

  /**
   * 获取URL中携带的参数
   * @param key 参数名称
   * @param def 默认值
   */
  function getQueryString(key: string, def?: any): string;

  /**
   * 复制内容到剪切板
   * @param content 
   */
  function setClipboard(content: string): boolean;

  /**
   * 创建URL地址
   * @param path 地址路径
   * @param querys URL参数
   * @param append 是否拼接当前参数
   * @param appendProtocol 是否拼接当前协议头
   */
  function genUrl(path: string, querys?: Object, append?: boolean, appendProtocol?: boolean): string;

  /**
   * 获取URL中携带的参数
   * @param path 地址路径
   */
  function parseQueryParams(path: string): { url: string, params: object };

  /**
   * 获取URL中携带的参数
   * @param path 地址路径
   * @param query 追加参数
   */
  function appendQueryParams(path: string, query: object): string;

  /**
   * 获取元素在页面中的位置
   * @param el 元素
   */
  function getElementPosition(el?: any): { left: number, top: number, height: number, width: number };

  /**
   * 设置localStorage数据
   * @param key 配置项
   * @param value 数据值
   */
  function setLocalStorage(key: string, value?: any): void;

  /**
   * 获取localStorage数据
   * @param key 配置项
   * @param def 默认值
   */
  function getLocalStorage(key: string, def?: any): any;

  /**
   * 移除localStorage数据
   * @param key 配置项
   */
  function removeLocalStorage(key: string, def?: any): any;

  /**
   * 取消监听Window消息
   * @param callback 回调函数
   */
  function offWindowMessage(callback: Function): void;

  /**
   * 监听Window消息
   * @param callback 回调函数
   */
  function onWindowMessage(callback: Function): void;

  /**
   * 发送消息给父级窗口
   * @param data 
   */
  function postMessageToParent(data: any): void

  /**
   * 字符串BASE64编码
   * @param str 原始字符串
   */
  function encodeBase64(str: string): string;

  /**
   * 字符串BASE64解码
   * @param str BASE64字符串
   */
  function decodeBase64(str: string): string;

  /**
   * 页面加载完成
   * @param callback 回调
   */
  function onLoad(callback: (info: any) => void): void;

  /**
   * 监听界面回到前台
   * @param callback 回调
   */
  function onShow(callback: () => void): void;

  /**
   * 取消监听界面回到前台
   * @param callback 回调
   */
  function offShow(callback: () => void): void;

  /**
   * 监听界面退至后台
   * @param callback 回调
   */
  function onHide(callback: () => void): void;

  /**
   * 取消监听界面退至后台
   * @param callback 回调
   */
  function offHide(callback: () => void): void;

  /**
   * 监听页面尺寸发生变化
   * @param callbac 回调  
   */
  function onResize(callback: () => void): void;

  /**
   * 取消监听页面尺寸发生变化
   * @param callback 回调
   */
  function offResize(callback: () => void): void;

  /**
   * 格式化日期
   * @param date 日期
   * @param format 格式,默认yyyy-MM-dd
   */
  function formatDate(date: Date, format?: string): void;

  /**
   * 将原数据转换为默认值相同的数据类型
   * @param val 数据值
   * @param def 默认值
   */
  function toAny(val: any, def?: any)

  /**
   * 安全的从对象中获取数据
   * @param object 对象
   * @param path 取值路径
   * @param def 默认值
   */
  function get(object: object, path?: string | any[], def?: any)


  /**  数据模块 */
  interface Data {

    /**
     * 是否加载成功
     */
    isReady(): boolean;

    /**
     * 加载数据
     */
    checkReady(): Promise<void>;

    /**
     * 设置数据
     * @param key 
     * @param value
     */
    set(key: string, value: any): void;

    /**
     * 获取数据
     * @param key 
     * @param defValue
     */
    get(key: string, defValue?: any): any;

    /**
     * 移除数据
     * @param key 
     */
    remove(key: string): void;

    /**
     * 获取key列表
     */
    keys(): string[];

    /**
     * 是否存在数据
     * @param key
     */
    has(key: string): boolean;

    /**
     * 清空数据
     */
    clear(): void;

  }


  /**  状态模块 */
  interface State {

    /**
     * 设置数据
     * @param key 
     * @param value
     */
    set(key: string, value: any): void;

    /**
     * 获取数据
     * @param key 
     * @param defValue
     */
    get(key: string, defValue?: any): any;

    /**
     * 重置数据
     */
    reset(): void;

    /**
     * 重新加载数据
     */
    reload(): void;

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