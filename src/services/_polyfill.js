function polyfill() {
    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) {
            return false
        }
        this.splice(dx, 1)
    }
    Array.prototype.removeWhere = function (where) {
        if (typeof where === 'function') {
            let removeIndexArray = []
            this.forEach((value, index) => {
                if (where(value)) {
                    removeIndexArray.push(index)
                }
            })
            removeIndexArray.reverse()
            removeIndexArray.forEach(value => {
                this.remove(value)
            })
        }
    }
    Date.prototype.format = function (format) {
        var date = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S+': this.getMilliseconds()
        }
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1
                    ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
            }
        }
        return format
    }
}

polyfill();