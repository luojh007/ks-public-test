/**
 * Create Tree from flat data
 */

const input = [
    { id: 1, name: 'i1' },
    { id: 2, name: 'i2', parentId: 1 },
    { id: 4, name: 'i4', parentId: 3 },
    { id: 3, name: 'i3', parentId: 2 },
    { id: 8, name: 'i8', parentId: 7 }
]

function createTreeByFlatData (arr = []) {
    const map = new Map()
    let root = null
    // 将以pid为key，分组保存；并取出根节点
    for (let i = 0; i < arr.length; i++) {
        const it = arr[i]
        if (it.parentId === undefined) root = it
        else {
            const pidArr = map.get(it.parentId) || []
            pidArr.push(it)
            map.set(it.parentId, pidArr)
        }
    }

    // 层序遍历，构造树
    const loop = [root]
    while (loop.length) {
        const node = loop.shift()
        const childNodes = map.get(node.id) || []
        node.child = childNodes 
        for (let i = 0; i < childNodes.length; i++) {
            loop.push(childNodes[i])
        }
    }
    return root
}

console.log(createTreeByFlatData(input))