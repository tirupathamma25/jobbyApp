import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPasswordError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="user-input-card">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-element"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="user-input-card">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-element"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showPasswordError: true, errorMsg})
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
    const {showPasswordError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div>
            <div>{this.renderUserName()}</div>
            <div>{this.renderPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showPasswordError ? <p className="error-msg">*{errorMsg}</p> : ''}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
