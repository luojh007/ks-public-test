/**
 * 设计消息总线
 */

function Bus () {
    this.listens = new Map()
    this.context = new Array(0)
    // 保存调用过的节点
    this.visited = new Set()
}

// 根据调用栈的深度，计算 -- 长度
function _ (n) {
    var str = ''
    for (let i = 0; i < n; i++) str += '----'
    return str
}

// 输出callback函数名字
function getFnName (fn) {
    if (typeof fn !== 'function') return ''
    return fn.toString().split('(')[0].split(' ')[1]
}

Bus.prototype.listen = function (topic, callback) {
    var fns = this.listens.get(topic) || []
    if (!fns.length) this.listens.set(topic, fns)
    fns.push(callback)

    // 卸载监听
    return function () {
        var index = fns.indexOf(callback)
        fns.splice(index, 1)
    }
}

// dfs，入栈出栈
Bus.prototype.trigger = async function () {
    var arg = Array.from(arguments)
    var topic = arg.shift()
    // 防止循环引用
    if (this.visited.has(topic)) return
    this.visited.add(topic)

    const fns = this.listens.get(topic)
    console.log(`${_(this.context.length)}event: ${topic}`)
    for (let fn of fns) {
        console.log(`--${_(this.context.length)}callback: ${getFnName(fn)}`)
        this.context.push(fn)
        await fn.apply(this, arg)
        this.context.pop()
    }
}

// test case
var bus = new Bus()

// 1. 异步
bus.listen('testEvent', function callback1 () {    
    Promise.resolve().then(() => {
        this.trigger('testEvent2')
    })
})
bus.listen('testEvent', function callback3 () {
    // do something    
})
// 2. 撤销监听
function callback () { }
//
var unlisten = bus.listen('testEvent3', callback)
unlisten('testEvent3', callback)

bus.listen('testEvent2', function callback2 () {
    // 3. 循环引用
    this.trigger('testEvent')
    this.trigger('testEvent3')
})

bus.trigger('testEvent')
