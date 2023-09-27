import {Component} from 'react'
import Cookies from 'js-cookie'

import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import {AiOutlineLike, AiOutlineDislike, AiFillHome} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'

import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import Sidebar from '../Sidebar'

import {
  Container,
  IconButton,
  Para,
  Heading,
  Button,
  ListItem,
  LinkEle,
  Image,
  NavContainer,
  HrLine,
  Dot,
  LinksContainer,
  FailContainer,
  MainContainer,
} from './styledComponents'

import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: [],
    isLiked: false,
    isDisLiked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  })

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = this.formattedData(data)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickLiked = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  clickDisLiked = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  clickSave = () => {
    this.setState(prevState => ({isSaved: !prevState.isSaved}))
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPlayVideoView = () => {
    const {videoDetails, isLiked, isDisLiked, isSaved} = this.state
    const {publishedAt} = videoDetails
    const likeIconColor = isLiked ? '#2563eb' : '#64748b'
    const dislikeIconColor = isDisLiked ? '#2563eb' : '#64748b'
    const date1 = publishedAt

    const updatedDate = formatDistanceToNow(new Date(date1)).split(' ')
    const displayDate = updatedDate[1]

    return (
      <ThemeContext.Consumer>
        {value => {
          const {addVideo, savedVideos, removeVideo} = value
          let isSave
          const saveIconColor = isSave ? '#2563eb' : '#64748b'
          const item = savedVideos.filter(each => each.id === videoDetails.id)
          if (item[0] === undefined) {
            isSave = false
          } else {
            isSave = true
          }

          const onClickSave = () => {
            if (isSave === false) {
              addVideo(videoDetails)
            } else {
              removeVideo(videoDetails.id)
            }
          }

          return (
            <Container>
              <ReactPlayer url={videoDetails.videoUrl} controls width="100%" />
              <Heading>{videoDetails.title}</Heading>
              <Container>
                <p>
                  {videoDetails.viewCount} views
                  <Dot> &#8226; </Dot>
                  {displayDate} years ago
                </p>
                <Container>
                  <Container>
                    <IconButton
                      type="button"
                      color={likeIconColor}
                      onClick={this.clickLiked}
                    >
                      <AiOutlineLike size={25} />
                      <Para>Like</Para>
                    </IconButton>
                  </Container>
                  <Container>
                    <IconButton
                      type="button"
                      color={dislikeIconColor}
                      onClick={this.clickDisLiked}
                    >
                      <AiOutlineDislike size={25} />
                      <Para>Dislike</Para>
                    </IconButton>
                  </Container>
                  <Container>
                    <IconButton
                      color={saveIconColor}
                      type="button"
                      onClick={onClickSave}
                    >
                      <BiListPlus size={25} />
                      <Para>{isSave ? 'Saved' : 'Save'}</Para>
                    </IconButton>
                  </Container>
                </Container>
              </Container>
              <HrLine />
              <Container>
                <Image src={videoDetails.profileImageUrl} alt="channel logo" />
                <Container>
                  <Para>{videoDetails.name}</Para>
                  <Para>{videoDetails.subscriberCount} Subscribers</Para>
                  <Para>{videoDetails.description}</Para>
                </Container>
              </Container>
            </Container>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  onRetry = () => {
    this.getVideoDetails()
  }

  renderFailureView = () => {
    const {isDarkTheme} = this.state
    const failureImageUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <FailContainer>
        <Image src={failureImageUrl} alt="failure view" />
        <Heading>Oops! Something Went Wrong</Heading>
        <Para>
          We are having some trouble to complete your request. <br /> Please try
          again later.
        </Para>
        <Button type="button" onClick={this.onRetry}>
          Retry
        </Button>
      </FailContainer>
    )
  }

  renderVideoDetailView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlayVideoView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const logo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <MainContainer
              data-testid="videoItemDetails"
              isDarkTheme={isDarkTheme}
            >
              <Header />
              <Sidebar />
              <Container data-testid="videoItemDetails" bgColor={bgColor}>
                {this.renderVideoDetailView()}
              </Container>
              <Footer />
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
