function processFocus() {
  var e = document.getSelection();
  if (!e.rangeCount) {
    return function () {
    };
  }
  for (var t = document.activeElement, n = [], r = 0; r < e.rangeCount; r++) {
    n.push(e.getRangeAt(r));
  }
  switch (t.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      t.blur();
      break;
    default:
      t = null;
  }
  e.removeAllRanges();
  return function () {
    e.type === "Caret" && e.removeAllRanges();
    e.rangeCount || n.forEach(function (t) {
      e.addRange(t);
    });
    t && t.focus();
  };
}

export function setClipboard(content) {
  var clearFocusHandle, range, selection, span, isOk = false;
  try {
    clearFocusHandle = processFocus();
    range = document.createRange();
    selection = document.getSelection();
    span = document.createElement("span");
    span.textContent = content;
    span.setAttribute("ahw", 2);
    span.style.all = "unset";
    span.style.position = "fixed";
    span.style.top = 0;
    span.style.clip = "rect(0, 0, 0, 0)";
    span.style.whiteSpace = "pre";
    span.style.webkitUserSelect = "text";
    span.style.MozUserSelect = "text";
    span.style.msUserSelect = "text";
    span.style.userSelect = "text";
    document.body.appendChild(span);
    range.selectNode(span);
    selection.addRange(range);
    if (!document.execCommand("copy")) {
      throw new Error("copy command was unsuccessful");
    }
    isOk = true;
  } catch (i) {
    console.log(i);
    try {
      window.clipboardData.setData("text", content);
      isOk = true;
    } catch (error) {
      console.log('error', error);
    }
  } finally {
    if (selection) {
      typeof selection.removeRange === "function"
        ? selection.removeRange(range)
        : selection.removeAllRanges();
    }
    span && document.body.removeChild(span);
    clearFocusHandle();
  }
  return isOk;
}
