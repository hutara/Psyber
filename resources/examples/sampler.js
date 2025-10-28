/* Sampler Tutorial
**
** First, we'll note that both the Freesound and the Drums objects use Samplers behind
** the scenes, so if you've played with Dilber a bit you've probably been using Samplers
** without realizing it. Samplers enable you to load a audiofile from a webserver and then
** play it back at different speeds. The Multisampler object enables you to load a 
** bunch of different samples, and then select the sample that you'd like to trigger on a per-note basis.
**
** While there are some samples sitting on local Dilber's folder for you to use, you'll
** probably eventually want to experiment with your own sample server,
** or you can run Dilber localy and copy your samples in ./samples dir
** Note:
** For online samples, you need to turn on the CORS feature to load samples from a different server than
** where you're loading Dilber from. You could run it like so after installation:
**
** http-server pathToYourSampleDirectory -p 8080 --cors true
**
** This starts the server on port 8080. Now to load a file (assuming its in the directory you specified above):
** s = Sampler('http://127.0.0.1:8080/yourSammpleName.wav')
*/

// Possible sampler sources: 
// 1. local samples and './samples' folder and sub-folders 
// 2. online url
// 3. microphone recording
// 4. musicgen AI model
// 5. soundfounts

// let's try a sample that works well in reverse
s = Sampler('openhat.wav')

// playback at normal rate
s.note(1)

// playback at 3x speed
s.note(3)

// playback in reverse
s.note(-1)

// sequence
s.note.seq( [3,3,-1],[1/4,1/4,1/2] )

// we can also call .trigger and then
// control the rate property separately

Dilber.clear()
s = Sampler('openhat.wav')
s.trigger.seq( 1, 1/4 )
s.rate = gen( 1 + cycle(1) * .75 )

// or sequence
s.rate.seq( [-1,1,2,-2,4,-4], Euclid(3,8) )

// samplers also have start and end properties,
// which let you control how much of the
// sample is played (range 0–1).

Dilber.clear()
s = Sampler( 'openhat.wav' )
s.trigger.seq( 1,1/4 )
s.end.seq( [.05,.1,.2,.5], 1 )

// We can also load multiple files on
// initialization
Dilber.clear()
s = Sampler({
  files:[
    'samples/kick.wav',
    'samples/hat.wav',
    'samples/snare.wav',
    'samples/openhat.wav'
  ]
})

s.trigger.seq( 1,1/16 )
// pick lets you choose which file is triggered
// make sure you don't pick a number higher than
// then number of samples you've loaded!
s.pick.seq( Rndi(0,3) )

// You can also easily load a directory of sounds.
// Each sampler has a length property that will tell you how
// many samples it contains. So, for example, if
// we want to loop through all the kicks:

Dilber.clear()
s = Sampler('kicks')
s.trigger.seq( 1, 1/16 )
s.pick.seq( gen( beats(16) * s.length ) )

// Note that in the 'kicks' directory there are
// 90 files... this is why it makes sense
// to run your own local webserver, so that
// large directories of files can be loaded 
// quickly.

// as a shorthand, you can create a multisampler
// with multiple voices (it can play different samples
// at the same time) using the same shorthand 
// as defining polyphony on synths. For example,
// the following creates a five voice multisampler:

s = Sampler[5]( 'kicks' )
s.trigger.seq( 1, 1/16 )
s.pick.seq( gen( beats(16) * s.length ) )
s.spread(.95)

