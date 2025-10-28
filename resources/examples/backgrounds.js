// demo gifts are courtesy of https://imgur.com/gallery/art-dump-EvSlqVE

// set custom image as a background, try this one from my favorite movie
bg('https://i.imgur.com/M5rDIXZ.jpeg')

// to see code better with background use 
// CTRL+ALT+B to turn on code background

bg('https://i.imgur.com/jyRfXvN.jpeg')

// matrix
bg('https://i.imgur.com/L2DMcei.png')

// moving stairs
bg('https://i.imgur.com/ju1QZKZ.gif')

//blue day
bg('https://i.imgur.com/niSq6Mv.gif')

// or a calm meadow
bg('https://i.imgur.com/VTRib9Q.gif')

// far away
bg('https://i.imgur.com/km7z2io.gif')

// home sweet home
bg('https://i.imgur.com/icjnWSo.gif')

// here are some more to try
g1 = 'https://i.imgur.com/niSq6Mv.gif'
g2 = 'https://i.imgur.com/dFvazks.gif'
g3 = 'https://i.imgur.com/q59SX2L.gif'
g4 = 'https://i.imgur.com/vxNk2qq.gif'

// Now lets sequence fome gifs :)
images = [g1, g2, g3, g4]
durations = [5, 3, 4, 3] // Durations in seconds

bg.seq(images, durations)  // Sequential background change

bg.seq(images, durations, true) // Random sequential background change

// to go back to normal mode and reset simply call
bg()

/* Dilber remembers your last background between sessions so it wont get lost after a reload */

// Now lets show some text
bg('Hello Dilbers!')

//change color
bg.color('orange')

// add fill color behind text
bg.fill('blue') // you can use #222 hex code like css

bg.fill() // remove fill

//font size
bg.size(50)

bg.rotate(70)

//back to normal
bg.rotate(0)

// set y position
bg.y(50)

// set x position
bg.x(300)

//clear again
bg()

// or press SHIFT+CTRL+. to stop all