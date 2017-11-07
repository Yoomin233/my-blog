import React, { Component } from 'react'

import marked from 'marked'
// import config from '../../config'
// import fetch from 'isomorphic-fetch'
import hightligt from 'highlight.js'

import {debounce} from '../../tools'

import Layout from './Layout'

const renderer = new marked.Renderer()
renderer.code = (code, language) => `<pre class='hljs'>
  <code class='lang-${language}'>${hightligt.highlightAuto(code).value}</code>
</pre>`

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
})

export default class ManagementIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      html: ''
    }
    this.changeHtml = debounce(this.changeHtml, 500)
  }
  changeText = (text) => {
    this.setState({
      text
    })
    this.changeHtml()
  }
  changeHtml = () => {
    this.setState({
      html: marked(this.state.text)
    })
  }
  keyDown = (e) => {
    // prevent 'tab' key down
    if (e.keyCode === 9) {
      e.preventDefault()
      this.changeText(this.state.text + '\t')
    }
  }
  render() {
    const {url} = this.props
    return (
      <Layout url={url}>
        <header>
          撰写新文章
        </header>
        <section>
          <textarea value={this.state.text} onChange={e => this.changeText(e.target.value)} onKeyDown={this.keyDown}></textarea>
          <div className="html" dangerouslySetInnerHTML={{ __html: this.state.html}}>
          </div>
        </section>
        <p><button>提交</button><button>存草稿</button></p>
        <style jsx>{`
          header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 2em;
            border-bottom: 1px solid #ccc;
          }
          section {
            flex-grow: 1;
            display: flex;
            > * {
              width: 50%;
              overflow-y: auto;
              padding: 10px;
            }
            > textarea {
              border: none;
              border-right: 1px solid #ccc;
              tab-size: 2;
              resize: none;
              &:focus {
                outline: none;
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}
