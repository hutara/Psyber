//texture catalog

zigzag = Box(.5)
  .translate( -2,1.25 )
  .texture(
    'zigzag', 
    { scale:5 }
  )
 
dots = Box(.5)
  .translate( -0,1.25 )
  .texture(
    'dots', 
    { 
      scale:10, 
      color:[1,0,0]
    }
  )
 
noise = Box(.5)
  .translate( 2,1.25 )
  .texture(
    'noise', 
    { 
      wrap:true, 
      scale:20, 
      color:[1,0,0]
    }
)
 
truchet = Box(.5)
  .translate( -2,-.15 )
  .texture(
    'truchet', 
    { 
      scale:20, 
      color:[0,1,1] 
    }
)
 
stripes = Box(.5)
  .translate( -0,-.15)
  .texture(
    'stripes', 
    { 
      scale:10, 
      color:[1,0,0]
    }
)
 
checkers = Box(.5)
  .translate( 2, -.15 )
  .texture(
    'checkers', 
    { 
      scale:20, 
      color1:[0,1,1], 
      color2:[1,0,0] 
    }
  )
 
cellular = Box(.5)
  .translate( -2, -1.55 )
  .texture(
    'cellular', 
    { 
      scale:10, 
      strength:1 
    }
)

rainbows = Box(.5)
  .translate( -0,-1.55)
  .texture(
    'rainbow', 
    { scale:4}
)
 
voronoi = Box(.5)
  .translate( 2,-1.55 )
  .texture(
    'voronoi', 
    { 
      wrap:true, 
      scale:10, 
      mode:2 
    }
)
 
bg = Plane( Vec3(0,0,1), .5 ).material('white glow')
 
Fog(0.1)


Union2( 
    zigzag, dots, noise, 
    truchet, stripes, cellular, 
    checkers, rainbows, voronoi, bg
    )
    .render()
