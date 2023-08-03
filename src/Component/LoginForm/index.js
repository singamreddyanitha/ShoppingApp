import {Component} from 'react'


// import {withRouter} from "react-router"

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  renderSuccess = () => {
    
    console.log(this.props)
    const {history} = this.props
    history.push("/")
    history.replace('/')
  }

  renderFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
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
    console.log(data)
    console.log(response)

    if (response.ok === true) {
      this.renderSuccess()
    }
     else {
      this.renderFailure(data.error_msg)
    }
  }

  onChangeUserPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  renderUserPassword = () => {
    const {password} = this.state

    return (
      <div>
        <label htmlFor="password"> User Password </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={this.onChangeUserPassword}
        />
      </div>
    )
  }

  renderUserName = () => {
    const {username} = this.state
    //  console.log(userName)
    return (
      <div>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          placeholder="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="logo next"
        />
        <form onSubmit={this.submitForm}>
          <div>{this.renderUserName()}</div>
          <div>{this.renderUserPassword()}</div>
          <button type="submit">Login</button>
          {showSubmitError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

// export default withRouter(LoginForm)

export default LoginForm
