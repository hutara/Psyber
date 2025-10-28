/* __--__--__--__--__--__--__--____

Audiovisual mapping
    
In this tutorial we look at how to use audio objects to control visual
parameters. Unlike most systems Dilber gives you the ability to assign
individual instruments to visual output for greater control.
    
** __--__--__--__--__--__--__--__*/

// Simplest: controlling the radius
// of a sphere based on the output
// of a kick drum.
Clock.bpm = 140
sphere = Sphere().render()
kick = Kick().trigger.seq( 1,1/4 )
sphere.radius = kick

// or by moving mouse up/down
onframe = t => sphere.radius = MouseY

// or by moving mouse left/right
onframe = t => sphere.radius = MouseX

// You'll note that the sphere is
// probably smaller than ideal. We
// can solve this in one of two ways:
// 1. Increase the effect of the kick
// 2. Increase the base size of the sphere

// to increase the base size, we can add
// a "offset" to the mapping. The effect
// of the kick will extend from this number

sphere.radius.offset = 1

// to increase the effect of the kick drum's
// amplitude envelope, we can change
// the multiplier of the mapping. For example,
// to make the effect 4x as strong:

sphere.radius.multiplier = 4

// we can assign an audio source, specify the
// multiplier, and specify an offset all at
// once using the .map() method, which can
// be found on each graphics property.

sphere = Sphere().render()
kick = Kick().trigger.seq( 1,1/4 )
sphere.radius.map( kick, 4, 1 )

// 1. texture properties

Fog( .5, Vec3(0) )

p = Plane().texture('dots').render()
gong = FM('gong', { decay:4 })
gong.note.seq( -14, 4 )
p.texture.radius.map( gong, 3, 0 )

// 2. fractal folding
Fog( 0, Vec3(0) )

julia = Julia().render()
camera.pos.z = 2
onframe = t => camera.rotation = t/10
verb = Reverb.space.bus()
synth = Synth('square.perc', { decay:1/2 }).connect( verb, .5 )
synth.note.seq( gen( cycle( beats(8) * beats(5) ) * 7 ), Euclid(5,8) )
julia.fold.map( verb, 20, 2 )
camera.pos.z = 5
bass = Monosynth('bassPad')
bass.note.seq( 0, 2 )
syn = PolySynth('rhodes')
syn.chord.seq( [[0,2,4,5]], 2 )
