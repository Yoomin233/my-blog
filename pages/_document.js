import Document, { Head, Main, NextScript } from "next/document";

import stylesheet from "../styles/style.scss";
export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const props = Document.getInitialProps(ctx);
    return props;
  }

  render() {
    const { nextStyle } = this.props;
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
