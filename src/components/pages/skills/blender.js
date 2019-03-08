import React from 'react'
import ImageZoom from 'react-medium-image-zoom'


export default {
  nodes: [
    {title: '"YouTube training"', date: "2014", description: "Creating projects based on YouTube tutorials.", completed: true},
    {title: "Portfolio projects", date: "2015", description: <React.Fragment>
      <ImageZoom
        image={{
          src: "/img/visualization-of-block-of-flats-820.jpg",
          className: 'img',
          style: { width: '50%' }
        }}
        zoomImage={{
          src: "/img/visualization-of-block-of-flats-1920.jpg",
        }}
      />
      <ImageZoom
        image={{
          src: "/img/visualization-of-kitchen-820.jpg",
          className: 'img',
          style: { width: '50%' }
        }}
        zoomImage={{
          src: "/img/visualization-of-kitchen-1920.jpg",
        }}
      />
    </React.Fragment>, completed: true},
    {title: "Started creating architectural visualizations", date: "2015", description: <a rel="noopener noreferrer" target="_blank" href="http://visperfect.com">visperfect.com</a>, completed: true},
    {title: "Creating tutorials", date: "2016", description: <React.Fragment>about integration V-Ray in Blender and <a rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Z5_q_O-MYbc&list=PLhUwIYNqTGm5gaWRne4FneFMfmqQK8lfX" target='_blank'>quick tips</a></React.Fragment>, completed: true},
    {title: "Creating and selling 3D model packs", date: "2016", description: <React.Fragment>
      <ImageZoom
        image={{
          src: "/img/Front_Door_02.gif",
          className: 'img',
          style: { width: '50%' }
        }}
      />
      <ImageZoom
        image={{
          src: "/img/Dish_Drainer_01-1.jpg",
          className: 'img',
          style: { width: '50%' }
        }}
      />
    </React.Fragment>, completed: true},
    {title: "Contributing to integration of Corona Renderer in Blender", date: "2017", description: <a target="_blank" rel="noopener noreferrer" href="https://bitbucket.org/coronablender/render_corona/">bitbucket.org</a>, completed: true},
    {title: "+100 archviz projects", date: "2017", description: "", completed: true},
    {title: "Mastering Blender 2.80", date: "somewhere in the future", description: "", completed: false},
    {title: "Modelling, texturing and animating characters", date: "somewhere in the future", description: "", completed: false},
  ]
}