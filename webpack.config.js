module.exports = {
  entry: './src/index.js'
  ,
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
                presets: ['es2015','react']
            },
      
    },{ test: /\.css$/, loader: 'style-loader!css-loader' }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.css'],
    modulesDirectories: [
          'node_modules'
        ] 
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port:8080
  }
};