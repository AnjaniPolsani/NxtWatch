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

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        trendingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getTrendingVideos()
  }

  renderSuccessView = () => {
    const {trendingVideos} = this.state
    return (
      <Container>
        {trendingVideos.length > 0 ? (
          <Container>
            <Container>
              <Container>
                <HiFire size={35} color="#ff0000" />
              </Container>
              <Heading>Trending</Heading>
            </Container>
            <UnorderedList>
              {trendingVideos.map(each => {
                const date1 = each.publishedAt
                const {id} = each
                const updatedDate = formatDistanceToNow(new Date(date1)).split(
                  ' ',
                )
                const displayDate = updatedDate[1]

                return (
                  <LinkEle to={`/videos/${id}`} key={each.id}>
                    <ListItem>
                      <Image src={each.thumbnailUrl} alt="video thumbnail" />
                      <Para>{each.title}</Para>
                      <Para>{each.name}</Para>
                      <Para>{each.viewCount} views</Para>
                      <Dot>.</Dot>
                      <Para>{displayDate} years ago</Para>
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
            <MainContainer isDarkTheme={isDarkTheme} data-testid="trending">
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
export default Trending
