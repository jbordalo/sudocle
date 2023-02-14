const ESLintPlugin = require("eslint-webpack-plugin")
const svgToMiniDataURI = require("mini-svg-data-uri")
const version = require("./package.json").version

const basePath =
  process.env.SUDOCLE_BASE_PATH === undefined
    ? process.env.NODE_ENV === "production"
      ? "/sudocle"
      : ""
    : process.env.SUDOCLE_BASE_PATH
const eslintDirs = ["components", "cypress/plugins", "cypress/support", "pages"]

const config = {
  basePath,

  // create a folder for each page
  trailingSlash: true,

  env: {
    basePath,
    matomoUrl: process.env.MATOMO_URL,
    matomoSiteId: process.env.MATOMO_SITE_ID,
    version
  },

  eslint: {
    dirs: eslintDirs
  },

  images: {
    // disable built-in image support
    disableStaticImages: true
  },

  webpack: (config, { dev, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      include: /@fontsource/,
      use: ["css-loader"]
    })

    config.module.rules.push({
      test: /\.s?css$/,
      exclude: /@fontsource/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: (fileName, options) => options.query.type || "scoped"
          }
        },
        "sass-loader"
      ]
    })

    config.module.rules.push({
      test: /\.(gif|png|jpe?g)$/i,
      type: "asset",
      use: "image-webpack-loader"
    })

    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      use: "image-webpack-loader",
      generator: {
        dataUrl: content => {
          content = content.toString()
          return svgToMiniDataURI(content)
        }
      }
    })

    if (dev) {
      config.plugins.push(
        new ESLintPlugin({
          extensions: ["js", "jsx"]
        })
      )
    }

    return config
  }
}

module.exports = config
