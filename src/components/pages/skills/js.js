import React from 'react'

export default {
  nodes: [
    {title: "jQuery", date: "2014", description: "First contact with JS / jQuery.", completed: true},
    {title: <a href="http://plan.visperfect.com" target="_bank">Nisoko timetable</a>, date: "2015", description: "Unfinished project. Written in PHP, JS / jQuery & MySQL.", completed: true},
    {title: '"YouTube training"', date: "2018", description: <a href="https://www.youtube.com/watch?v=s6SH72uAn3Q&list=PL7pEw9n3GkoW5bYOhVAtmJlak3ZK7SaDf" target="_blank">Advanced JS by techsith</a>, completed: true},
    {title: 'First NPM package', date: "2018", description: <React.Fragment><a href="https://www.npmjs.com/package/kas-scrollable" target="_blank">kas-scrollable</a> - custom scrollbar.</React.Fragment>, completed: true},
    {title: 'This website', date: "2019", description: "", completed: true},
    {title: 'Learn interview questions', date: "2019", description: "", completed: false},
    {title: 'Learn old JS', date: "somewhere in the future", description: "", completed: false},
  ]
}