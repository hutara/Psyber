// you can import your own samples by clicking 'import samples' button
// Once you see that your sample is ready you can use it immediately in a Sampler instrument
// If your sample name has spaces ' ' they are converted to underscore '_' 
// You can use wav, mp3, aif and aiff formats
// Your sample extension will be .rec, for example "mydrums.wav" becomes "mydrums.rec"
// Try clicking import samples and import one of your samples and play with it
s = Sampler('<your_sample_name>.rec')

// trigger the sample
s.trigger()
// playback at normal rate
s.note(1)

// playback at 3x speed
s.note(3)

// playback in reverse
s.note(-1)

// sequence
s.note.seq( [3,3,-1],[1/4,1/4,1/2] )

// sequence rate
s.rate.seq( [-1,1,2,-2,4,-4], Euclid(3,8) )

//trigger sequence
s.trigger.seq( 1,1/16 )

//pick random
s.pick.seq( Rndi(0,3) )

// List of all sample files so far in the console
musicgen.list()
