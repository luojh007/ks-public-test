/**
 * Make a chain of dominoes.
 */

const input = [[1, 2], [5, 3], [3, 1], [1, 2], [2, 4], [1, 6], [2, 3], [3, 4], [5, 6]]
const input2 = [[2, 1], [2, 3], [1, 3]]

// dfs
function makeChain (input = []) {
    const ans = new Array(0)
    const len = input.length
    recursion(input, [])
    return ans.length ? ans : -1

    function recursion (arr = [], path = []) {
        if (path.length === len && path[0][0] === path[path.length - 1][1]) {
            return ans.push(path.join('#').replace(/\,/g, '').replace(/#/g, ','))
        }
        for (let i = 0; i < arr.length; i++) {
            if (!match(path, arr[i])) continue
            const item = arr.splice(i, 1)[0]
            path.push(item)
            recursion(arr, path)
            path.pop()
            arr.splice(i, 0, item)
        }
    }

    // 找到匹配的
    function match (path, item) {
        const last = path[path.length - 1]
        if (!last) return true
        if (last[1] === item[0]) return true
        else if (last[1] === item[1]) {
            let tmp = item[0]
            item[0] = item[1]
            item[1] = tmp
            return true
        }
        return false
    }
}

console.log(makeChain(input2))