import React, { Component } from 'react'
import Chain from '../../chain'



export default class Timeline extends Component {
  render() {
		const nodes = [
			{leftLabel: '28.02.19', rightLabel: 'Lorem ipsum'},
			{leftLabel: '01.03.19', rightLabel: 'Start on the left'},
			{leftLabel: '02.03.19', rightLabel: 'Start on the right'},
			{leftLabel: '03.03.19', rightLabel: 'Lorem ipsum dolor'},
			{leftLabel: '04.03.19', rightLabel: 'End on the left'},
			{leftLabel: '04.03.19', rightLabel: 'End on the right'},
			{leftLabel: '04.03.19', rightLabel: 'Start on the left without end'},
			{type: 'dots'}
		]

		const processes = [
			{position: -1, start: nodes[2], end: nodes[5]},
			{position: 1, start: nodes[3], end: nodes[6]},
			{position: 1, start: nodes[7], end: null}
		]

    return (
			<Chain style={{margin: `2em auto`}}>
				{{nodes, processes}}
      </Chain>
    )
  }
}
