import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.png" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Generate angular skyscapes using Asteroids-like ship controls"
          />
          <meta property="og:title" content="Moire" />
          <meta
            property="og:description"
            content="Generate angular skyscapes using Asteroids-like ship controls"
          />
          <meta
            property="og:image"
            content="https://moire.constraint.systems/static/moire-share.png"
          />
          <meta property="og:url" content="https://moire.constraint.systems" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
