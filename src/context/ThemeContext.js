import React from 'react';
import {themes} from '../App';

export const ThemeContext = React.createContext({
    theme: '',
    toggleTheme: () => {},
});