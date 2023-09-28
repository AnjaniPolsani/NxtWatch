import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiOutlineClose, AiOutlineSearch, AiFillHome} from 'react-icons/ai'

import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import Cookies from 'js-cookie'

import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import Sidebar from '../Sidebar'

import Footer from '../Footer'
import ThemeContext from '../../context/ThemeContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {
  MainContainer,
  NavContainer,
  Image,
  Button,
  LinksContainer,
  ListItem,
  InputEle,
  SearchIconContainer,
  SearchContainer,
  ItemsContainer,
  Para,
  Heading,
  FailContainer,
  BannerContainer,
  BannerContainer1,
  UnorderedList,
  Container,
  LinkEle,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    isDarkTheme: false,
    itemsList: [],
    isDisplay: 'flex',
  }

  componentDidMount() {
    this.getItems()
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  onCloseBanner = () => {
    this.setState({isDisplay: 'none'})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getItems = async () => {
    const {searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        itemsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getItems)
  }

  onSearchResults = () => {
    this.getItems()
  }

  renderBanner = () => {
    const {isDisplay, isDarkTheme} = this.state
    const logo = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    return (
      <BannerContainer isDisplay={isDisplay} data-testid="banner">
        <Image src={logo} alt="nxt watch logo" />
        <Para>Buy Nxt Watch Premium</Para>
        <Button>GET IT NOW</Button>
        <Button type="button" data-testid="close" onClick={this.onCloseBanner}>
          <AiOutlineClose size={25} />
        </Button>
      </BannerContainer>
    )
  }

  renderSuccessView = () => {
    const {itemsList} = this.state
    return (
      <Container>
        {itemsList.length > 0 ? (
          <UnorderedList>
            {itemsList.map(each => {
              const date1 = each.publishedAt
              const {id} = each
              const updatedDate = formatDistanceToNow(new Date(date1)).split(
                ' ',
              )
              const displayDate = updatedDate[1]

              return (
                <LinkEle to={`/videos/${id}`} key={each.id}>
                  <ListItem>
                    <img src={each.thumbnailUrl} alt="video thumbnail" />
                    <img src={each.profileImageUrl} alt="channel logo" />
                    <p>{each.title}</p>
                    <p>{each.name}</p>
                    <p>{each.viewCount} views</p>.<p>{displayDate} years ago</p>
                  </ListItem>
                </LinkEle>
              )
            })}
          </UnorderedList>
        ) : (
          <Container>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Heading>No Search results found</Heading>
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

  renderBasedOnApi = () => {
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
    const {searchInput} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const logo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <MainContainer data-testid="home" isDarkTheme={isDarkTheme}>
              <Header />
              <Sidebar />
              {this.renderBanner()}
              <SearchContainer>
                <InputEle
                  type="search"
                  onChange={this.onChangeSearch}
                  value={searchInput}
                  placeholder="Search"
                />
                <Button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onSearchResults}
                >
                  <AiOutlineSearch size={20} />
                </Button>
              </SearchContainer>
              <ItemsContainer>{this.renderBasedOnApi()}</ItemsContainer>
              <Footer />
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
