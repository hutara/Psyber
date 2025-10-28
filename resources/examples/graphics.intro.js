/* __--__--__--__--__--__--__--____

intro to graphics in Dilber
   
Graphics in Dilber are created using marching.js, a ray-marching library:

http://charlie-roberts.com/marching

Ray marching lets us do interesting  volumetric effects that are difficult with "regular" 3D graphics libraries.
    
** __--__--__--__--__--__--__--__*/

// Marching.js enables easy constructive solid geometry (CSG). At its simplest, 
// this means adding and subtracting shapes. For example, we can render a box:

Graphics.quality = 'low' // or 'med' or 'high
b = Box().render()

// we can render a sphere...

s = Sphere().render()

// and we can render the sphere removed from the box:
b = Box().material('normal')
s = Sphere(1.25).material('normal')
Difference( b,s ).render()

// Note that we can only have one function rendered at
// a time. However, since it is easy to combine shapes
// this isn't usually a problem:

Union2(
  Sphere(.5).material('normal').translate( -1.5 ),
  Sphere(.5).material('normal').translate( 1.5 ),
  Sphere(.5).material('normal'),
  Sphere(.5).material('normal').translate( 0,1.5 ),
  Sphere(.5).material('normal').translate( 0,-1.5 )  
).render()

// the Union function combines two geometries, while
// Union2 lets us combine as many as we like.

// like audio dilber objects, we can store
// graphics objects in variables and then manipulate
// them.

b = Box().render()
b.size.seq( [.25,.5,1], 1/8 )
b.rotate(45,1,1,1)

c = Twist( Box() ).render()
c.amount = gen( 2 + cycle(.5) * 2 )

// additionally, Dilber enables you to define an
// onframe function that is run once per video frame.
// you can modify vidoe or audio objects in this function.

s = Sphere().render()
onframe = function( time ) { 
  s.translate( Math.sin( time*4 ) )
}

// using ES6 arrow functions we can shorten this:
s = Sphere().render()
onframe = t => s.translate( Math.sin( t*4 ) )
