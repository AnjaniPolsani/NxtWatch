import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getGamingVideos()
  }

  renderSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <Container>
        {gamingVideos.length > 0 ? (
          <Container>
            <Container>
              <Container>
                <SiYoutubegaming size={35} color="#ff0000" />
              </Container>
              <Heading>Gaming</Heading>
            </Container>
            <UnorderedList>
              {gamingVideos.map(each => {
                const {id} = each

                return (
                  <LinkEle to={`/videos/${id}`} key={id}>
                    <ListItem>
                      <Image src={each.thumbnailUrl} alt="video thumbnail" />
                      <Para>{each.title}</Para>

                      <Para>{each.viewCount} Watching Worldwide</Para>
                    </ListItem>
                  </LinkEle>
                )
              })}
            </UnorderedList>
          </Container>
        ) : (
          <Container>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Para>Try different key words or remove search filter</Para>
            <Button onClick={this.onRetry}>Retry</Button>
          </Container>
        )}
      </Container>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const failureImageUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <FailContainer>
            <Image src={failureImageUrl} alt="failure view" />
            <Heading>Oops! Something Went Wrong</Heading>
            <Para>
              We are having some trouble to complete your request. <br /> Please
              try again later.
            </Para>
            <Button type="button" onClick={this.onRetry}>
              Retry
            </Button>
          </FailContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  getTrendingBasedOnApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const logo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <MainContainer isDarkTheme={isDarkTheme} data-testid="gaming">
              <Header />
              <Sidebar />
              {this.getTrendingBasedOnApi()}
              <Footer />
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Gaming
