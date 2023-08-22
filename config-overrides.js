const { useBabelRc, override } = require('customize-cra')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// tsconfig-paths-webpack-plugin을 웹팩 설정에 추가하는 함수
function addTsconfigPathsPlugin() {
  return (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }
    return config
  }
}

module.exports = override(
  useBabelRc(), // `.babelrc` 파일 사용을 활성화
  addTsconfigPathsPlugin(), // tsconfig-paths-webpack-plugin 적용
)
