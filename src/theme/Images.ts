import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    lottie: {
      loadingMap: require('./assets/lottie/delivery-map.json'),
      banner: require('./assets/lottie/banner.json'),
      store: require('./assets/lottie/store.json'),
      success: require('./assets/lottie/success.json'),
      error: require('./assets/lottie/error.json'),
      bell: require('./assets/lottie/bell.json'),
    },
    icons: {
      check: require('./assets/images/check.png'),
      uncheck: require('./assets/images/uncheck.png'),
    },
  };
}
