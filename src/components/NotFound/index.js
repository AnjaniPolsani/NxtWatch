import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'

import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import Footer from '../Footer'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import {
  MainContainer,
  LinkEle,
  NavContainer,
  Image,
  Button,
  LinksContainer,
  ListItem,
  Heading,
  Para,
  Container1,
  Container,
} from './styledComponents'

class NotFound extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const logo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

          const notFindImageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

          return (
            <MainContainer>
              <Header />
              <Sidebar />
              <Container bgColor={bgColor}>
                <Container1>
                  <Image src={notFindImageUrl} alt="not found" />
                  <Heading>Page Not Found</Heading>
                  <Para>
                    We are sorry, the page you requested could not be found.
                  </Para>
                </Container1>
              </Container>
              <Footer />
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default NotFound
