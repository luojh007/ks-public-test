/**
 * Ordered Link List
 */

// example
let input = [
    { id: 1 },
    { id: 2, before: 1, after: 6 },
    { id: 3, after: 1, before: 5 },
    { id: 5, first: true },
    { id: 6, last: true },
    // { id: 7, after: 8 },
    // { id: 8 },
    // { id: 9 },
]

function Node (value) {
    this.value = value || null
    this.next = null
}
/**
 * 
 * @param {Array} arr 
 * @returns 链表
 */
function orderLinkList (arr = []) {
    const keyToNode = new Map()
    const head = new Node()
    const tail = new Node()
    // 先保存所有节点
    for (let i = 0; i < arr.length; i++) {
        const id = arr[i].id
        keyToNode.set(id, new Node(id))
    }
    // 再做连接
    for (let i = 0; i < arr.length; i++) {
        let { id, before, after, last, first } = arr[i]
        const node = keyToNode.get(id)
        if (last) node.next = tail
        if (first) head.next = node
        if (after) {
            const afterNode = keyToNode.get(after)
            node.next = afterNode
        }
        if (before) {
            const beforeNode = keyToNode.get(before)
            beforeNode.next = node
        }
    }
    // 判断是否全部连接
    let nodeNum = 0
    let move = head
    while (move.next) {
        nodeNum++
        move = move.next
    }
    return nodeNum === arr.length + 1 ? head.next : -1
}

console.log(orderLinkList(input))