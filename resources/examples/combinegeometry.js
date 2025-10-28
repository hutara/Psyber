/// combinig shapes
 
const grey = Material( 'phong', Vec3(0), Vec3(3), Vec3(2), 32, Vec3(0,0,2) ),
      white = Material( 'phong', Vec3(0), Vec3(50), Vec3(1), 8, Vec3(0,50,2) ),
      a = .45, b = .25 // for side bands on drum
 
stick = ()=> {
  return Union(
    Groove(
      Cylinder( Vec2(.2,2.5), Vec3(.5,4.5,-.5) )
        .translate( .5,4.5,-.5 )
        .material( grey ),
      Capsule( Vec3(.5, 2,-.5), Vec3(.5,2.25,-.5), 1 ).material( grey ),
      .08
    ),
    Capsule( Vec3(.5, 2,-.5), Vec3(.5,2.25,-.5), .175 ).material( grey )
  )
}
 
stickL = stick()
  .rotate( 300, 0,0,1 )
  .translate( -1.5,.25, 0 )
 
stickR = stick()
  .rotate( 300, 0,.75,.5 )
  .translate( -2.05,.0, -.5 )
 
drum = RoundUnion(
  Union2(
    ChamferDifference(
      Cylinder( Vec2(2.25, .45) ).material( grey ),
      Cylinder( Vec2(2,.4) ).material( grey ),
      .1
    ),
    Cylinder( Vec2(2,.3) ).material( white )
  ),
  PolarRepeat(
    Quad( Vec3(0,-a,-b), Vec3(0,-a,0), Vec3(0,a,b), Vec3(0,a,0) ).material( grey ),
    15,
    2.25
  ),
  .05
)
 
Background(Vec3(0))
Light( Vec3(2,5,8), Vec3(1), .125 )


Union2(
  drum.rotate( 60, 1,1,0 ),
  stickL,
  stickR
).render()


// let's combine and animate
crossRadius = .5
crossHeight = 1
dimensions = Vec2(crossRadius, crossHeight )
  
cross = Union2(
    Cylinder( dimensions ).material( 'green' ),
    Cylinder( dimensions )
        .material( 'green' )
        .rotate( 270, 0,0,1 ),
    Cylinder( dimensions )
        .material( 'green' )
        .rotate( 270, 1,0,0 )
    )

roundedSphere = Intersection(
        Box( .775 ).material( 'red' ),
        Sphere( 1 ).material( 'blue' )
    )

obj = Difference(
    roundedSphere,
    cross
    ).rotate( 45, 1,.5,0 )
    .render()

onframe = t => obj.rotate( t * 25 ) 


// or using difference
sphere2 = Sphere( 1.35 ).material('phong')
box1 = Box()
 
Difference( box1, sphere2 ).render( 3, true )
 
onframe = time => sphere2.radius = 1.25 + Math.sin( time ) * .1


//using repeat
sphere3 = Sphere( .35 ).material('phong')
box3 = Box( Vec3( .35 ) ) 
sphereBox = RoundUnion( sphere3, box3, .9 )
 
Repeat( sphereBox, 2 ).render( 3, true )
 
onframe = time => sphere3.radius = Math.sin( time ) * .75


//going crazy with it
Fog(0.3,Vec3(0))
mat1 = Material( 'global', Vec3(.05), Vec3(.5), Vec3(1), 8, Vec3(1,4,1) )

rpt = Repeat(
  union = Union2(
    cyl = Cylinder(Vec2(1,1.5)).material(mat1).texture('dots', {scale:2}),
    cyl2 = Cylinder(Vec2(.95,1.5)).material(mat1).texture('stripes', {scale:1}).rotate(90,0,0,1),
    cyl3 = Cylinder(Vec2(.95,1.5)).material(mat1).texture('checkers', {scale:5}).rotate(90,0,0,1)
  ).scale(.15),
  .80
).render('repeat.high')

onframe = time => { 
  union.rotate( time*5,1,.5,.5 )
  rpt.translate( 0,0,time/5 )
}

// A short demo of classic raymarching melding effects. Three rings and a
// plane, melting into each other. The rings use a stairs transition to 
// generate steps where they merge.
 
s1 = Torus82().material('red')
s2 = Torus82().material('red')
s3 = Torus82().material('red')
  
f = Fog(.25,Vec3(0))
 
RoundUnion(
  ru = StairsUnion2( s1,s2,s3, .5,15 ),
  Plane().texture('checkers')
).render(3)
 
onframe = t => {
  s1.translate( Math.sin(t), 0,  0 ).rotate(t*5,1,0,0)
  s2.translate( Math.sin(t/3), 0, Math.cos(t/4)  ).rotate(t*6,1,0,0)
  s3.translate( 0, Math.sin(t), Math.sin(t/5)  ).rotate(t*7,1,0,0)
  camera.rotation = t/10
}
 
camera.pos.z = 4
