
/*--md
# Basic sequencing

This tutorial will provide an introduction to do sequencing in Dilber. Dilber lets you sequence 
calls to most methods of audiovisual objects as well as changes to any of their properties, 
just by adding .seq to the method or property name, and specifying *timings* for when the sequence should fire.
--*/

// send note message with value 0
syn = Synth( 'bleep' )
syn.note( 0 )

// now sequence it to send the value every quarter note
syn.note.seq( 0, 1/4 )


/*--md
You can stop all sequences in dilber with the Ctrl+. keyboard shortcut
(Ctrl + period) or by executing the command Dilber.clear(), but
this also deletes instruments. For this tutorial, we'll instead use the .stop()
command to stop sequences on a specific instrument:
--*/

syn.stop()


/*--md
Most sequences in dilber contain values (0 in the example above) 
and timings (1/4 above). To sequence multiple values we pass an array,
which is a comma-separated list surrounded by `[]` brackets:
--*/

syn.note.seq( [0,1,2], 1/4 )

// ... and we can do the same with multiple timings:
syn.note.seq( [0,1,2], [1/4,1/8] )


/*--md
We can also sequence the loudness of our synth 
and the decay of our synth's envelope. Note that
in the example below, we're sequencing a function (note)
as well as two properties (loudness and decay).
--*/

syn.stop()
syn.note.seq( 0, 1/2 )
syn.loudness.seq( [.1,.5,1], 1/2 )
syn.decay.seq( [1/16,1/4,1/2], 1/2 )

/*--md
All of the above ideas in this tutorial work identically 
for visual objects. In the example below, we'll sequence
the fold property of the Julia fractal, and the scale property
of the fractal's texture.
--*/

fractal = Julia().texture('dots', { scale:50 }).render('fractal.low')
camera.pos.z = 3
fractal.fold.seq( [1,2,3,5], 1/2 )
fractal.texture.scale.seq( [2,20,50,100], 1/4 )

// stop the fractal sequences and clear all graphics from screen
fractal.stop()
Graphics.clear()


/*--md
If you experimented with running multiple variations of the note 
sequences you might have noticed that only one runs at a time.
For example, if you run these lines:
--*/

syn.stop()
syn.note.seq( 7, 1/4 )
syn.note.seq( 0, 1/4 )


/*--md
...you'll notice only the second sequence actually triggers. By 
default, Dilber will replace an existing sequence with a new one. 
To stop this, you can pass an ID number as a third argument to 
calls to `.seq()`. In the examples of sequencing we've seen so far,
no ID has been given, which means dilber assumes a default ID of 0
for each sequence. When you launch a sequence on a method/property
that has the same ID as another running sequence the older sequence
is stopped. But if the sequences have different IDs they run 
concurrently. This makes it easy to create polyrhythms.
--*/

// create a PolySynth that can play multiple notes at a time

syn = Conga[4]()
syn.note.seq( 0, 1 ) // assumes ID of 0
syn.note.seq( 2, 1/2, 1 ) // id 1 
syn.note.seq( 3, 1/3, 2 ) // id 2 
syn.note.seq( 5, 1/7, 3 ) // id2


/*--md
We can also sequence calls to chord. You might remember from the 
first tutorial that we pass chord an array of values, where each 
value represents one note. This /means we need to pass an *array of 
arrays* in order to move between different chords.
--*/

syn.stop()
syn.chord.seq( [[0,2,4], [1,5,7]], 1/2 )

// IMPORTANT:Even if we're only sequencing a single chord, 
// we still need to pass a 2D array.
