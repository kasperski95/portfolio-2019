import React from 'react'
import ImageZoom from 'react-medium-image-zoom'


export default {
  nodes: [
    {title: 'V-Ray', date: "2015", description: <a target="_blank" rel="noopener noreferrer" href="http://visperfect.com">visperfect.com</a>, completed: true},
    {title: 'Unity', date: "2016", description: <React.Fragment><ImageZoom
    image={{
        src: "/img/unity-example.jpg",
        className: 'img',
        style: { height: '89px' }
      }}/><br/>
      <a href="http://visperfect.com/download/Unity-Interior.zip">download (Windows)</a>
    </React.Fragment>, completed: true},
    {title: 'Substance Designer', date: "2016", description: <React.Fragment><ImageZoom
      image={{
        src: "/img/Wood_Fine_01-1.jpg",
        className: 'img',
        style: { height: '89px' }
      }}/>
    </React.Fragment>, completed: true},
    {title: 'Creating seamless textures', date: "2017", description: <React.Fragment><ImageZoom
      image={{
            src: "/img/seamless-texture-example.jpg",
            className: 'img',
            style: { height: '89px' }
          }}
        />
    </React.Fragment>, completed: true},
  ]
}
