module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  target: 'electron-renderer',
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.html'],
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "fs": require.resolve("fs"),
      "tls": false,
      "net": false,
      "path": false,
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": false,
      "querystring": require.resolve("querystring-es3"),
      "constants": require.resolve("constants-browserify"),
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/")
    } 
  },
};
