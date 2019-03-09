import React from 'react'
import ImageZoom from 'react-medium-image-zoom'


export default {
  nodes: [
    {title: 'Photography', date: "2016-06-29", description: <React.Fragment>
      <ImageZoom
        image={{
          src: "/img/photo-jamnica.jpg",
          className: 'img',
          style: { height: '89px' }
        }}
      />
    </React.Fragment>, completed: true},
    
    {title: 'Texture', date: "2016", description: <React.Fragment>
      <ImageZoom
        image={{
          src: "/img/leaf-texture-example.jpg",
          className: 'img',
          style: { height: '89px' }
        }}
      />
    </React.Fragment>, completed: true},

    {title: 'Image preparation to printing', date: "2019", description: <React.Fragment>
    <ImageZoom
      image={{
        src: "/img/preparation-to-printing.jpg",
        className: 'img',
        style: { height: '89px' }
      }}
    />
    </React.Fragment>, completed: true},
  ]
}
