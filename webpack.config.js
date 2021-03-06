const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


//node js The path module provides utilities for working with file and directory paths. It can be accessed using:
const path = require("path");

const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};

const glob = require("glob");

const parts = require("./webpack.parts");

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var webpackConfig = {
    // ... 
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
    ],
}


const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.template.ejs',
                inject: 'body',
            }),
        ],
    },

    {
        output: {
            // Needed for code splitting to work in nested paths
            publicPath: "/", // / means the root of the current drive; ./ means the current directory;  ../ means the parent of the current directory.

        },
    },

    parts.loadJavaScript({ include: PATHS.app }),
    parts.setFreeVariable("HELLO", "hello from config"),

]);

//::::PRODUCTION::::

const productionConfig = merge([
    /*
        {
            performance: {
              hints: "warning", // "error" or false are valid too
              maxEntrypointSize: 50000, // in bytes, default 250k
              maxAssetSize: 450000, // in bytes
            },
          },
    */
    {
        output: {
            chunkFilename: "[name].[chunkhash:8].js",
            filename: "[name].[chunkhash:8].js",
            publicPath:"/reactjs/testing"
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new CopyWebpackPlugin([
                {from:'src/images',to:'images'} 
            ]), 

        ],
    },


    parts.extractCSS({
        use: [

            {
                loader: 'css-loader', options: { minimize: true },

            },
            parts.autoprefix()
        ],
    }),


    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),

    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[hash:8].[ext]",
        },
    }),
    parts.generateSourceMaps({ type: "source-map" }),

    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all",
                    },
                },
            },
            runtimeChunk: {
                name: "manifest",
            },
        },
        recordsPath: path.join(__dirname, "records.json"),
    },
    parts.clean(PATHS.build),
    parts.attachRevision(),


]);

//::::DEVELPMENT::::
const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
    parts.clean(PATHS.build),
    parts.minifyJavaScript(),

    parts.minifyCSS({
        options: {
            discardComments: { removeAll: true, },

            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
            minimize: true || {/* CSSNano Options */ }
        },
    }),
]);




module.exports = mode => {
    process.env.BABEL_ENV = mode;

    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};

