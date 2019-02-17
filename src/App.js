import React, { Component } from 'react';
import './App.css';
import MovieList from "./movieList/MovieList";
import {ThemeContext} from "./context/ThemeContext";
import ThemeTogglerButton from "./themeChange/ThemeChange";

export const themes = {
    light: {
        background: 'rgb(133, 131, 128)',
    },
    dark: {
        background: '#000000',
    },
};

class App extends Component {

      toggleTheme = () => {
          this.setState(state => ({
              theme:
                  state.theme === themes.dark
                      ? themes.light
                      : themes.dark,
          }));
      };

    state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
    };

   render() {
    const mainContent = {
        backgroundColor: this.state.theme.background,
        height:'100%',
        width:'100%'
    }

    return (
        <ThemeContext.Provider value={this.state}>
            <div style={mainContent}>
              <ThemeTogglerButton />
              <MovieList tableColor={this.state.theme.background} />
            </div>
        </ThemeContext.Provider>
    );
  }
}

export default App;
