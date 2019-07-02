const sLoopArr = [];

function requestAnimFrame(...params) {
    let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (loop) {
            return setTimeout(() => {
                loop && loop(performance.now())
            }, 1000 / 60);
        };
    return requestAnimationFrame(...params);
}

function runFrameLoop(...params) {
    sLoopArr.forEach(function (loop) {
        runLoop(loop, ...params);
    });
    if (sLoopArr.length > 0) {
        requestAnimFrame(runFrameLoop);
    }
}

function runLoop(obj, ...params) {
    if (!obj) {
        return;
    }
    obj.currentFrame++;
    if (obj.maxCount > 0 && obj.currentCount >= obj.maxCount) {
        obj.clearLoop();
        return;
    }
    if (obj.frameTime > 1 && obj.currentFrame % obj.frameTime != 0) {
        return;
    }
    let state = obj.loopMethod && obj.loopMethod(...params);
    if (state === 'stop') {
        obj.clearLoop();
        return;
    }
    obj.currentCount++;
}

export function frameLoop(loop, frame = 1, count = 1) {
    let loopTask = {
        currentCount: 0,
        currentFrame: 0,
        loopMethod: loop,
        frameTime: frame,
        maxCount: count,
        clearLoop: function () {
            let index = sLoopArr.indexOf(this);
            if (index >= 0) {
                sLoopArr.splice(index, 1);
            }
        }
    }
    sLoopArr.push(loopTask);
    requestAnimFrame(runFrameLoop);
    return loopTask;
}