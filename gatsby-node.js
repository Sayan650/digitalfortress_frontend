/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// exports.onCreateWebpackConfig = ({ actions, stage }) => {
//     if (stage === "build-html") {
//       actions.setWebpackConfig({
//         module: {
//           rules: [
//             {
//               test: /mapbox-gl/,
//               use: ['null-loader']
//             },
//           ],
//         }
//       })
//     }
//   };

  exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
    const config = getConfig();
  
    config.module.rules = [
      ...config.module.rules.filter(rule => String(rule.test) !== String(/\.jsx?$/)),
      {
        test: /maplibre-gl/,
        use: loaders.null(),
      },
      {
        test: /\.jsx?$/,
        use: { ...loaders.js() },
        exclude: modulePath => /node_modules/.test(modulePath),
      },
    ];
  
  };
