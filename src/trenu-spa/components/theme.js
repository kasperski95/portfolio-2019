import blueGrey from '@material-ui/core/colors/blueGrey';
import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500]
    },
  },
});


export const ThemeContext = React.createContext();

export default class ThemeProvider extends Component {
  render() {
    return (
      <ThemeContext.Provider theme={theme}>
        <MuiThemeProvider theme={theme}>
          {this.props.children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    )
  }
}