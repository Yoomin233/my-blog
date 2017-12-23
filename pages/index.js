import React, { Component } from "react";

import fetch from "isomorphic-fetch";

import config from "../config";

import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import Author from "../components/Author";
import Pagination from "../components/general/Pagination";
// import headerImg from './i-should-buy-a-boat.jpg'

class Index extends Component {
  static async getInitialProps(props) {
    const { req } = props;
    const res = await fetch(`${config.baseURL}/api/post/list`);
    const data = await res.json();
    return {
      articleList: data,
      isServer: !!req
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      paginationSize: 10,
      paginationCurrentPage: 0,
      articleList: props.articleList
    };
  }
  render() {
    const { url, isServer } = this.props;
    const { paginationSize, articleList, paginationCurrentPage } = this.state;
    return (
      <Layout url={url} title={"首页 | Yoomin's Blog"}>
        <div className="header">
          <div
            className="headerImg"
            style={{
              backgroundImage: `url(http://ww1.sinaimg.cn/mw690/6d9c4e0fgy1fl0ch0ofxxj21z4140hdw.jpg)`
            }}
          />
        </div>
        <div className="mainContentWrapper">
          <div className="mainContent">
            <ul className="postList">
              {articleList.list.map((article, index) => (
                <PostLink article={article} key={index} isServer={isServer} />
              ))}
            </ul>
            <Pagination
              total={articleList.total}
              currentPage={paginationCurrentPage}
              onClickPage={async index => {
                let res = await fetch(
                  `${config.baseURL}/api/post/list?offset=${index *
                    paginationSize}&size=${paginationSize}`
                );
                res = await res.json();
                this.setState({
                  articleList: res,
                  paginationCurrentPage: index
                });
                // console.log(index)
              }}
            />
          </div>
          <div className="sideContent">
            <Author />
          </div>
        </div>
        <style jsx>{`
          div.header {
            height: 40vh;
            overflow: hidden;
            > div.headerImg {
              height: 100%;
              background-position: center;
              background-size: cover;
            }
          }
          @media screen and (max-width: 480px) {
            div.header {
              height: 30vh;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
