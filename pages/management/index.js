import React, { Component } from "react";
import cookie from "cookie";
// import config from '../../config'
// import fetch from 'isomorphic-fetch'

import Layout from "./Layout";

export default class ManagementIndex extends Component {
  static async getInitialProps({ req }) {
    let clientInfo;
    if (req) {
      clientInfo = req.cookie;
    } else {
      const response = await fetch("/api/user", {
        credentials: "same-origin"
      });
      // user.username = 'yoomin'
      // user.auth = 'super'
      clientInfo = await response.json();
    }
    return {
      message: "this Management father Component!",
      // user,
      clientInfo
    };
  }
  render() {
    const { url, clientInfo } = this.props;
    return (
      <Layout url={url} clientInfo={clientInfo}>
        <div>
          <p>
            hello {clientInfo.auth}, this is your {clientInfo.visit}th visit
          </p>
        </div>
      </Layout>
    );
  }
}
