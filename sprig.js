const player = "p"
const goal = "g"
const winnertext = "w"
const wall = "a"

setLegend(
  [ player, bitmap`
....77777777....
...7........7...
..7..........7..
..7..........7..
..7........0.7..
..7..........7..
.77..........77.
.7............7.
.7............7.
.7...........07.
.7..........007.
.7.0.......00.7.
77........00..77
7......0000....7
7..............7
7777777777777777` ],
  [ goal,  bitmap`
....66666666....
...6666666666...
..666444444666..
.66444444444466.
6664444444444666
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6664444444444666
.66444444444466.
..666444444666..
...6666666666...
....66666666....`], 
  [ winnertext, bitmap`
................
.0.....0........
.0.....0.0......
.0.....0...000..
.0..0..0.0.0.0..
..00.00..0.0.0..
................
................
................
................
................
................
................
................
................
................`],
  [ wall, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`]
)

setSolids([wall])

let level = 0
const levels = [
  map`
.....
.....
p...g
.....`,
  map`
....g.
......
p.....
......
......`,
  map`
.......
...a...
...a...
...a...
...a...
p..a.g.`,
]

const win = map`
.w.
.p.
...`


setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  const playerSprite = getFirst(player)
  
  const targetY = playerSprite.y - 1
  if (!getTile(playerSprite.x, targetY).some(sprite => sprite.type === wall)) {
    playerSprite.y = targetY
  }
})

onInput("s", () => {
  const playerSprite = getFirst(player)
  
  const targetY = playerSprite.y + 1
  if (!getTile(playerSprite.x, targetY).some(sprite => sprite.type === wall)) {
    playerSprite.y = targetY
  }
})

onInput("a", () => {
  const playerSprite = getFirst(player)
  
  const targetX = playerSprite.x - 1
  if (!getTile(targetX, playerSprite.y).some(sprite => sprite.type === wall)) {
    playerSprite.x = targetX
  }
})

onInput("d", () => {
  const playerSprite = getFirst(player)
  
  const targetX = playerSprite.x + 1
  if (!getTile(targetX, playerSprite.y).some(sprite => sprite.type === wall)) {
    playerSprite.x = targetX
  }
})
afterInput(() =>{
  if(!getFirst(player) || !getFirst(goal)) return;
  if(getFirst(player).x === getFirst(goal).x){
    level++
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      setMap(win)
    }
  }
})