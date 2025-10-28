// This demo uses multisamplers and the delays that can be attached to sequencing (the fourth argument to any .seq call) 
// to gradually build up over time. It begins by fading in the bass / clave, and then gradually introduces other
// instruments and transforms various patterns in use.

// Select all and hit Control+Enter to run, or alt (option on mac) + enter
// Ctrl+. to stop
 
Clock.bpm = 140

verb = Reverb( 'space' ).bus() 
 
bass = Monosynth('bass.stab')
  .connect( verb, .1 )
  .note.seq( 
    gen( beats(8) * 4 ), 
    Euclid(5,16) 
  )
 
bass.gain.fade( 0, null, 8 )
 
clave = Clave().connect( verb, .15 )
  .trigger.seq( [.25,.4], Euclid(3,8) )
 
clave.gain.fade( 0, null, 8 )
  
kick = Kick('tight')
  .trigger.seq( 1,1/4,0,4 )
 
drums = Sampler[4]('cr7030')
	.trigger.seq( 1, h = Hex(0x3695), 0, 4 )
 
drums.pick.seq( 
  gen( beats(4) * drums.length ),
  null, 0, 4 
)
 
h.rotate.seq( -1,1,0,8 )
 
bleeps = Sampler[6]('bleeps', { loudness:.25 })
  .spread( .9 )
  .connect( verb, .15 )
 
bleeps.trigger.seq( 
  1, 
  h1 = Hex(0x8a7a),
  0, 12 
)
 
bleeps.pick.seq( 
  gen( beats(8) * bleeps.length ), 
  null, 0, 16  
)
 
h1.rotate.seq( 1,1,0,20 )
 
clap = Clap().connect( verb, .35 )
  .trigger.seq( 1,2,0,16.25 )
 
snare = Snare('snappy')
  .trigger.seq( 1.25, 1/2,0,20.25 )
