import Document, { Head, Main, NextScript } from 'next/document'

import stylesheet from '../styles/style.css'
export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const props = Document.getInitialProps(ctx)
    return props;
  }

  render() {
    const {nextStyle} = this.props
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
