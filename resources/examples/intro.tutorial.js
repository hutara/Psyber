
/*--md
# Executing / stopping code
   
in this tutorial we won't really worry about what the code
is doing yet, instead we'll just look at how to run it 
and stop it. There's a bit more to this than you might assume...

To run a line of code, you can either of the following:
1. Place your cursor in the line you'd like to execute and 
hit `Control+Enter`.
2. Select the entire line of code with your mouse or keyboard 
shortcuts and hit `Control+Enter`.

Try one of these options with the code below:
--*/

Box().render()


/*--md
To stop any currently running audiovisuals press `Control+.` 
(control + period). Do this now. For some keyboard layouts, 
this combination won't work; if that happens to you try 
`Shift+Control+period`. 

You can also highlight multiple lines of code to run them all
at once. Try this with the code below:
--*/

d = Difference(
  j = Julia().scale(2),
  Sphere(2).material('global').texture( 'dots', {scale:50})
).render()
  
onframe = t => d.rotate(t*20,0,1,0)
j.fold = gen( 5 + cycle(.05) )


/*--md
Use `Ctrl+H` to hide/reveal the editor and focus the graphics.

You can also execute "blocks" of code by placing your cursor 
inside a block and pressing `Alt+Enter` (`Option+Enter` 
in macOS). A block is a chunk of code with a blank line on 
either side of it. The above example is a block because the
line above the `onframe` definition actually has a single 
space in it, to turn the whole chunk into a block. Clear the
scene (`Ctrl+Period`) and then try executing the block by 
placing your cursor in the block and pressing Alt+Enter. Many
tutorialsand demos use these types of blocks, so get used to 
pressing `Alt+Enter`, which is much quicker than selecting 
text and hitting `Ctrl+Enter` (although functionally the same).

By default Dilber waits until the start of the next musical 
measure to execute code. Try running the code below:
--*/

Clock.bpm = 140
drums = EDrums()
drums.tidal( 'kd <sd cp> kd*3 <oh [sd kd]>')

// Now run the lines below:
bass = Monosynth('bass')
bass.note.seq( [0,7], 1/4 )


/*--md
Notice how the drums and bass sequences line up on a rhythmic
grid. If you execute code by selecting it and hitting 
`Shift+Enter`, that code will run immediately, and probably be
out of time with other running sequences. Try using `Shift+Enter`
with the sequence below, and then re-run the code using 
`Ctrl+Enter` to hear the difference.
--*/

hat = Hat()
hat.trigger.seq( .5, 1/4 )
