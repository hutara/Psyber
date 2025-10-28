// Select all and hit Control+Enter to run, or alt (option on mac) + enter
// Ctrl+. to stop
Clock.bpm = 135
verb = Reverb.space.bus() 
syn = Monosynth( 'shinybass' ).connect( verb, .25 )

// Let's make a really slow moving ramp. We
// can do this in gen using the accum() function.
// The accum function increments a number every sample
// by an amount that you pass as its first parameter,
// and wraps back to 0 when gets higher than 1. Remember,
// this operation is occurring at the sample rate (typically
// 44100 times per second) so the number can exceed 1 fairly quickly.

arp = gen( accum(.00001) )
syn.note.seq( arp, 1/4 )

// In the above example, there's some extra code in dilber
// that automatically rounds signals when you use them to
// sequence note events; this is why the sequence alternates
// between two notes... a 0 when it rounds down and a 1 
// when it rounds up. We can easily change the numbers:

verb = Reverb.space.bus()
syn = Monosynth( 'shinybass' ).connect( verb, .25 )
arp = gen( accum(.00001) * 4 )
syn.note.seq( arp , 1/4 )

// ...or
verb = Reverb.space.bus() 
syn = Monosynth( 'shinybass' ).connect( verb, .25 )
arp = gen( 7 + accum(.00001) * 7 )
syn.note.seq( arp, 1/8 )

// Each of these numbers is stored as a property on our
// arp object that can be changed over time. In the above
// example, arp.p0 initially equals 7, arp.p1 = .00001,
// arp.p2 = 0 (more on that in a second) and arp.p3 = 7. We
// can change these while the arp is running:

arp.p0 = 0
arp.p1 = .00005
arp.p3 = 14

// The p2 value resets the accum waveform whenever it 
// exceeds one. You probably won't use this very often
// in dilber, but it's important to remember to skip it
// when using these numbers. This is true for other genish
// functions that build on top of accum, like beats and phasor.

// Let's use phasor() next. Phasor is basically the same as accum,
// but it accepts a frequency value instead of an amount ot increment.
// Dilber has a btof() function that converts beats to a frequency;
// let's use this to create a beat-synced arpeggiator:

verb = Reverb.space.bus()
syn = Monosynth( 'shinybass' ).connect( verb, .25 )
arp = gen( (1 - phasor( btof(4) )) * 8 )
syn.note.seq( arp , 1/16 )

// we can make this even shorter using beats(), which is
// just a shorter version of saying phasor( btof() ).

verb = Reverb.space.bus()
syn = Monosynth( 'shinybass' ).connect( verb, .25 )
arp = gen( (1 - beats(4)) * 16 )
syn.note.seq( arp, 1/16 )

// the last steps in recreating the arpeggiator shown in the
// video is to sequence changes to our frequency (the value
// passed to beats) and our amplitude.

verb = Reverb.space.bus() 
syn = Monosynth( 'shinybass' ).connect( verb, .25 )
arp = gen( (1 - beats(4)) * 16 )
syn.note.seq( arp  , 1/16 )
arp.p1.seq( [1,2,4], [1/2,1] )
arp.p3.seq( [16,24,32], [1,2] )

// and just to get things funkier
Theory.degree.seq( ['I','-VII'], 8 )
syn.glide = 250
