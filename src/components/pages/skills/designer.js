import React from 'react'
import ImageZoom from 'react-medium-image-zoom'


export default {
  nodes: [
    {title: "ACC - UI proposal", date: "2018", description: <React.Fragment>
    <ImageZoom
      image={{
        src: "/img/acc-ui-proposal-small.jpg",
        className: 'img',
        style: { height: '89px' }
      }}
      zoomImage={{
        src: "/img/acc-ui-proposal.jpg",
      }}
    />
  </React.Fragment>, completed: true},
    {title: "CV", date: "2019", description: <React.Fragment>
      <ImageZoom
        image={{
          src: "/img/cv-2019-03-small.png",
          className: 'img',
          style: { height: '89px' }
        }}
        zoomImage={{
          src: "/img/cv-2019-03.png",
        }}
      />
    </React.Fragment>, completed: true},
  ]
}