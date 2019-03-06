import React, { Component } from 'react'
import Chain from '../../chain'

export default class Skill extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div style={{textAlign: 'center', marginTop: '5%', padding: `0em 1em`, boxSizing: `border-box`}}>
        <div
          onClick={this.props.onNodeClick}
          style={{
            width: `72px`,
            height: `72px`,
            backgroundColor: theme.palette.primary.main,
            borderRadius: `50%`,
            margin: `0em auto`,
            backgroundImage: `url(${this.props.node.userData.icon})`,
            backgroundSize: `50%`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
            border: `3px solid ${theme.palette.primary.light}`,
            boxSizing: `border-box`,
            cursor: `pointer`,
            boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)`
          }}
        />
        <Chain style={{maxWidth: '50em', width: '100%'}} configure={config => ({...config, theme: this.props.theme})}>
          {this.props.children.nodes}
        </Chain>
      </div>
    )
  }
}
