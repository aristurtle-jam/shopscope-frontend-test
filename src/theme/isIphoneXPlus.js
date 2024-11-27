import { Dimensions, Platform, StatusBar } from 'react-native';

const isIphoneXPlus = () => {
  const dim = Dimensions.get('window');
  return (
    // iPhone X, XS, 11 Pro
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dim.height === 812 && dim.width === 375) || (dim.height === 375 && dim.width === 812)) ||

    // iPhone XR, 11
    ((dim.height === 896 && dim.width === 414) || (dim.height === 414 && dim.width === 896)) ||

    // iPhone XS Max, XR Max, 11 Pro Max, 12 Pro Max
    ((dim.height === 896 && dim.width === 414) || (dim.height === 414 && dim.width === 896)) ||
    ((dim.height === 926 && dim.width === 428) || (dim.height === 428 && dim.width === 926))
  );
};

export default isIphoneXPlus;

export const getHeaderMargin = () => {
    if (isIphoneXPlus()) {
      const statusBarHeight = StatusBar.currentHeight;
      const notchHeight = 30;
      return statusBarHeight + notchHeight;
    } else {
      return StatusBar.currentHeight;
    }
  };