import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {formatDistanceToNow} from 'date-fns'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import Header from '../Header'
import Sidebar from '../Sidebar'

import ThemeContext from '../../context/ThemeContext'

import Footer from '../Footer'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {
  MainContainer,
  LinkEle,
  NavContainer,
  Image,
  Button,
  LinksContainer,
  ListItem,
  FailContainer,
  Heading,
  Para,
  UnorderedList,
  Container,
  Dot,
} from './styledComponents'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme, savedVideos} = value
      const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
      const logo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      return (
        <MainContainer isDarkTheme={isDarkTheme} data-testid="savedVideos">
          <Header />
          <Sidebar />

          <Container>
            {savedVideos.length > 0 ? (
              <UnorderedList>
                {savedVideos.map(each => {
                  const date1 = each.publishedAt
                  const updatedDate = formatDistanceToNow(
                    new Date(date1),
                  ).split(' ')
                  const displayDate = updatedDate[1]
                  const key = each.id
                  return (
                    <ListItem key={each.id}>
                      <Image src={each.thumbnailUrl} alt="video thumbnail" />
                      <Para>{each.title}</Para>
                      <Para>{each.name}</Para>
                      <Para>{each.viewCount} views</Para>
                      <Dot>.</Dot>
                      <Para>{displayDate} years ago</Para>
                    </ListItem>
                  )
                })}
              </UnorderedList>
            ) : (
              <Container>
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <Heading>No saved videos found</Heading>
                <Para>You can save your videos while watching them</Para>
              </Container>
            )}
          </Container>

          <Footer />
        </MainContainer>
      )
    }}
  </ThemeContext.Consumer>
)
export default SavedVideos
