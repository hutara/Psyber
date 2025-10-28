/* 
Windows // Mac commands:

Execute line of code:       CTRL+ENTER // CONTROL+RETURN
Execute block of code:      ALT+ENTER // COMMAND+RETURN
Execute page code:          CTRL+A (then CTRL+ENTER) // COMMAND+A (then COMMAND+RETURN)
Stop all:                   CTRL+. or SHIFT+CTRL+. // CONTROL+. or SHIFT+CTRL+.
   
Save code:                  SHIFT+CTRL+S // SHIFT+CONTROL+S
Load code:                  SHIFT+CTRL+L // SHIFT+CONTROL+L
   
Zoom in:                    SHIFT+CTRL++ // SHIFT+CONTROL++ 
Zoom out:                   SHIFT+CTRL+- // SHIFT+CONTROL++
   
Edit pattern:               ALT or OPTION + click on the pattern (crosshair cursor will show)
   
Toggle code background:     SHIFT+ALT+B // CONTROL+OPTION+B
Toggle code visibility:     CTRL+H // CONTROL+H
Toggle free camera (3D):    SHIFT+CTRL+C // SHIFT+CONTROL+C (📹 icon when camera mode is active)

*/

// Select all and hit Control+Enter to run, or alt (option on mac) + enter
// Ctrl+. to stop

// execute single line with CTRL+ENTER or CONTROL+RETURN on Mac
Clock.bpm = 120
Theory.root = 'c5'
Theory.mode = 'aeolian'

// execute block by using ALT+ENTER or COMMAND+RETURN on Mac
s = Synth("bleep").fx.add(Reverb() )
    .note.seq( sine( btof(7.6),7,0 ), Euclid(5, 16) )

// just another block
k = Kick()
    .notef.seq( 70, 1/4 )

h = Hat()
    .trigger.seq( sine(3, 0.6, 0.05), [1/16, 1/8].rnd() )
    .tune.seq( Rndf(0.5, 0.6), 1/16)

cl = Clap()
    .trigger.seq(0.6, 1/2, 0, 1/4)

b = FM('bass')
    .note.seq(-7, 1/16)
    .index.seq( [2,3,4,5,6], 1/16)

c = Clave().fx.add( Reverb() )
    .trigger.seq( sine(0.2, 0.1, 0.4), Euclid(6, 16) )
    .note.seq( sine(5.01, 4,5), Euclid(6, 16) )

// Let's use code from backgrounds tutorial
g1 = 'https://i.imgur.com/A5c8icE.gif'
g2 = 'https://i.imgur.com/jUOoIDY.gif'
g3 = 'https://i.imgur.com/q59SX2L.gif'
g4 = 'https://i.imgur.com/G5NudoP.gif'

// Now lets sequence fome gifs :)
images = [g1, g2, g3, g4]
durations = [5, 3, 4, 3] // Durations in seconds

bg.seq(images, durations, true)  // Sequential background change

// uncomment and execute line bellow to clear background animation
// bg()

// or press SHIFT+CTRL-. to stop all
