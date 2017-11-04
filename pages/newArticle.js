import React, { Component } from 'react'

import fetch from 'isomorphic-unfetch'

import config from '../config'

class newArticle extends Component {
  static getInitialProps({ query }) {
    return {
      loggedIn: query.loggedIn
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  login = async (e) => {
    const { username, password } = this.props
    const result = await fetch(`${config.baseURL}/api/login/`, {
      method: 'POST',
      body: {
        username,
        password
      }
    })
  }
  render() {
    const { loggedIn } = this.props
    const { username, password } = this.state
    if (!loggedIn) {
      return (
        <div className='loginWrapper'>
          <div className="loginFormWrapper">
            <p>
              <span>用户名:</span><input value={username} onChange={e => this.setState({
                username: e.target.value
              })} type="text" />
            </p>
            <p>
              <span>密码:</span><input value={password} onChange={e => this.setState({
                password: e.target.value
              })} type="text" />
            </p>
            <p>
              <button onClick={this.login}>登录</button>
            </p>
          </div>
          <style jsx>{`
            .loginWrapper {
              width: 100vw;
              height: 100vh;
              overflow: auto;
              background: blue center / cover no-repeat;
              background-image: url("https://ws1.sinaimg.cn/mw690/6d9c4e0fgy1fl52fgzfmwj23rz2n7h7f.jpg")
            }
            .loginFormWrapper {
              margin-left: 50%;
              margin-top: 50%;
              border: 1px solid #888;
            }
          `}</style>
        </div>
      )
    } else {
      return (
        <div>
          you have loggin in!
        </div>
      )
    }
  }
}

export default newArticle