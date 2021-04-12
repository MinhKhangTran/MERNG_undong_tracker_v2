import Document, { Head, Html, NextScript, Main } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link href="css/styles.css" rel="stylesheet" />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
