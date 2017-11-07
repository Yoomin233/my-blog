import React, { Component } from 'react'

import Router from 'next/router'

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
    const { username, password } = this.state
    const result = await fetch(`${config.baseURL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const resultJson = await result.json()
    if (resultJson.status === 'success') {
      // programmatically change
      Router.push({
        pathname: '/management'
      })
    } else { 
      console.log(resultJson)
    }
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
              margin-left: 50vw;
              margin-top: 50vh;
              border: 1px solid #888;
              transform: translate(-50%, -50%);
              background-color: rgba(255, 255, 255, 0.8);
              padding: 10px 50px;
              > p {
                color: #666;
                display: flex;
                justify-content: space-between;
                &:last-child {
                  justify-content: center;
                  button {
                    padding: 10px 20px;
                    width: 50%;
                    border-radius: 5px;
                    background-color: #91c3ff;
                    border: none;
                    color: #eee;
                  }
                }
              }
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