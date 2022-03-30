module.exports = {
    babel: {
      loaderOptions: {
        ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
        ignore: ['./node_modules/react-map-gl/dist/es5/mapbox/mapbox.js'],
      },
    },
  };