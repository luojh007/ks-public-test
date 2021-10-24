/**
 * Tally the results of a small football competition.
 */
let input =
    `
Allegoric Alaskans;Blithering Badgers;win
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;Blithering Badgers;loss
Blithering Badgers;Devastating Donkeys;loss
Allegoric Alaskans;Courageous Californians;win
`
function vaild (str = '') {
    if (str.split(';').length !== 3) return false
    let arr = str.split(';')
    if (!arr[2].match('(win|loss|draw)')) return false
    return true
}
function toTable (arr = []) {
    let res = '\n'
    res += `Team  | MP | W | D | L | P \n`
    for (let value of arr) {
        res += `${value.name} | ${value.MP | 0} | ${value.W | 0} | ${value.D | 0} | ${value.L | 0} | ${value.P | 0} \n`
    }
    return res
}
function sortToArr (map = new Map) {
    let ans = new Array()
    for (let [key, value] of map) ans.push({ name: key, ...value })
    ans.sort((obj1, obj2) => {
        if ((obj1.P | 0) > (obj2.P | 0)) return -1
        else if ((obj1.P | 0) < (obj2.P | 0)) return 1
        else {
            return obj1.name < obj2.name
        }
    })
    return ans
}
function calcFootballCompetition (input = '') {
    const res = new Map()
    const inputArr = input.split('\n')
    for (let i = 0; i < inputArr.length; i++) {
        const current = inputArr[i]
        if (vaild(current)) {
            const [winName, lossName, point] = current.split(';')
            let preWinItem = {}
            let preLossItem = {}
            if (res.has(winName)) preWinItem = res.get(winName)
            else res.set(winName, preWinItem)
            if (res.has(lossName)) preLossItem = res.get(lossName)
            else res.set(lossName, preLossItem)
            // 场数加一
            preWinItem['MP'] = (preWinItem.MP | 0) + 1
            preLossItem['MP'] = (preLossItem.MP | 0) + 1
            // 根据结果更新
            if (point === 'win' || point === 'loss') {
                preWinItem['W'] = (preWinItem.W | 0) + 1
                preWinItem['P'] = (preWinItem.P | 0) + 3
                preLossItem['L'] = (preLossItem.L | 0) + 1
            } else if (point === 'draw') {
                preWinItem['D'] = (preWinItem.D | 0) + 1
                preWinItem['P'] = (preWinItem.P | 0) + 1
                preLossItem['D'] = (preLossItem.D | 0) + 1
                preLossItem['P'] = (preLossItem.P | 0) + 1
            }
        }
    }
    const arr = sortToArr(res)
    return toTable(arr)
}

console.log(calcFootballCompetition(input))