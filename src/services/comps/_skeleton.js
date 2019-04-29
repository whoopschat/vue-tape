import { createHtmlComponent } from "./_page";
import { stopScroll, startScroll } from "../utils/_scroll";

let _show_skeleton_fun = null;
let _hide_skeleton_fun = null;
let _timer = null;

export function showSkeleton(html, duration) {
  _show_skeleton_fun && _show_skeleton_fun(html, duration);
}

export function hideSkeleton() {
  _hide_skeleton_fun && _hide_skeleton_fun();
}

export function _initSkeleton() {
  const Component = createHtmlComponent('', { num: 0 });
  const instance = new Component();
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el);
  _hide_skeleton_fun = () => {
    instance.html = '';
    startScroll();
    if (_timer) {
      clearTimeout(_timer);
    }
  }
  _show_skeleton_fun = (html, duration) => {
    if (_timer) {
      clearTimeout(_timer);
    }
    if (duration > 0) {
      _timer = setTimeout(() => {
        hideSkeleton()
      }, duration)
    }
    stopScroll();
    if (html) {
      instance.html = `<div class="vue-tape-skeleton">${html}</div>`
    } else {
      instance.html = `<div class="vue-tape-skeleton">
      <div class="skeleton">
        <div class="skeleton-nav"></div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="skeleton-wrapper">
          <div class="skeleton-head"></div>
          <div class="skeleton-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
            <div class="skeleton-content"></div>
          </div>
        </div>
      </div>
    </div>`
    }
  }
}