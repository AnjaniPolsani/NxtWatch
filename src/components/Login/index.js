import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {
  FormContainer,
  MainContainer,
  LabelEle,
  InputEle,
  LogoContainer,
  Button,
  ButtonContainer,
  FormEle,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isCheck: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeCheck = () => {
    this.setState(prevState => ({isCheck: !prevState.isCheck}))
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg, isCheck} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <MainContainer>
        <LogoContainer>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png "
            alt="website logo"
          />
        </LogoContainer>
        <FormEle onSubmit={this.onSubmitForm}>
          <FormContainer>
            <LabelEle htmlFor="username">USERNAME</LabelEle>
            <InputEle
              type="text"
              value={username}
              id="username"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
          </FormContainer>
          <FormContainer>
            <label htmlFor="password">PASSWORD</label>
            {isCheck ? (
              <input
                type="text"
                value={password}
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            ) : (
              <input
                type="password"
                value={password}
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            )}

            <LabelEle htmlFor="check">Show Password</LabelEle>
            <InputEle onChange={this.onChangeCheck} type="checkbox" />
          </FormContainer>

          <ButtonContainer>
            <Button type="submit">Login</Button>
          </ButtonContainer>
          {showSubmitError && <p>*{errorMsg}</p>}
        </FormEle>
      </MainContainer>
    )
  }
}

export default Login
