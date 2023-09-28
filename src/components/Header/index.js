import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import {FiLogOut} from 'react-icons/fi'

import 'reactjs-popup/dist/index.css'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import ThemeContext from '../../context/ThemeContext'

import {
  PopupContainer,
  Button,
  Para,
  LogoutIcon,
  Container,
  ListItem,
  UnorderedList,
  NavContainer,
  Image,
  LinkEle,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const logo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <NavContainer>
            <LinkEle to="/">
              <Image src={logo} alt="website logo" />
            </LinkEle>
            <UnorderedList>
              <ListItem>
                <Button data-testid="theme" onClick={toggleTheme}>
                  {isDarkTheme ? (
                    <BsBrightnessHigh color="#ffffff" size={25} />
                  ) : (
                    <BsMoon size={25} />
                  )}
                </Button>
              </ListItem>
              <ListItem>
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </ListItem>
              <ListItem>
                <Popup modal trigger={<Button>Logout</Button>}>
                  {close => (
                    <PopupContainer>
                      <Para>Are you sure, you want to logout</Para>
                      <Button
                        type="button"
                        data-testid="closeButton"
                        onClick={() => close()}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        data-testid="closeButton"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </Button>
                    </PopupContainer>
                  )}
                </Popup>
              </ListItem>
            </UnorderedList>
          </NavContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
