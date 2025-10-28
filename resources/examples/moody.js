// Select all and hit Control+Enter to run, or alt (option on mac) + enter
// Ctrl+. to stop

Clock.bpm = 140

verb = Reverb( 'space' ).bus() 
 
perc = Synth[4]( 'square.perc' ).connect( verb, .35 )
  .spread(1)
  .note.seq( sine(2,7), Hex(0x8036) )
  .note.seq( sine(2.25, 4, 7 ), Hex(0x4541), 1 )
  .loudnessV.seq( sine(1.5, .5, .65 ) )
 
bass = Monosynth( 'bassPad', { decay:4 })
  .connect( verb, .5 )
  .note.seq( [0,-1,-2,-4], 4 )
 
k = Kick().trigger.seq( 1, 1/4 )
 
h = Hat().connect( verb, .15 )
h.trigger.tidal( '<.5 .35*3 [.5 .25] [.75 .25 .5 .25]>' )
h.decay = gen( .05 + cycle(2) * .025 )
 
lead = Synth( 'cry', { gain:.1, octave:1 })
  .connect( verb, 1 )
  .note.seq( sine( .15, 7 ), [1/2,1,2] )
