import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  removeVideo: () => {},
  toggleTheme: () => {},

  addVideo: () => {},
})

export default ThemeContext
