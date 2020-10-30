'use strict';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ViewPropTypes, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { useNetInfo } from '@react-native-community/netinfo';
import LoadingHint from '../Loading/LoadingHint';
import NetworkError from '../Error/NetworkError';
import { useTheme } from '../Theme';
import { Predefine } from '../../../config/predefine';

const MemoRenderNetworkError = React.memo(RenderNetworkError);
const MemoRenderLoadingHint = React.memo(RenderLoadingHint);

function RenderNetworkError(props) {
  const { style, onNetworkReload, source } = props;
  const netInfo = useNetInfo();
  if (netInfo.type === 'none') {
    return (
      <NetworkError
        style={style}
        source={source}
        onNetworkReload={onNetworkReload}
      />
    );
  }
  return null;
}

function RenderLoadingHint(props) {
  const { style, loading } = props;
  return <LoadingHint style={style} loading={loading} />;
}

function PageContainer(props) {
  const {
    children,
    style,
    emptyStyle,
    loadingStyle,
    showNetworkError,
    networkErrorSource,
    onNetworkReload,
    loading,
    fitNotchedScreen,
    fitNotchedScreenType,
  } = props;

  const initialHeight = Predefine.screenHeight - StyleSheet.hairlineWidth;
  const [height, setHeight] = useState(initialHeight);

  const themeValue = useTheme('page');

  const buildStyles = useMemo(() => {
    let notchedScreenStyle;
    let containerStyle;
    if (fitNotchedScreen) {
      if (fitNotchedScreenType === 'padding') {
        notchedScreenStyle = {
          paddingBottom: Predefine.isNotchedScreen
            ? Predefine.screenInset.bottom
            : 0,
        };
      } else {
        notchedScreenStyle = {
          marginBottom: Predefine.isNotchedScreen
            ? Predefine.screenInset.bottom
            : 0,
        };
      }
    } else {
      notchedScreenStyle = null;
    }
    if (Predefine.isAndroidTen) {
      containerStyle = {
        height: height,
      }
    } else {
      containerStyle = {
        flex: 1,
      }
    }
    return {
      style: [themeValue.style, styles.container, notchedScreenStyle, containerStyle, style],
    };
  }, [fitNotchedScreen, fitNotchedScreenType, height, style, themeValue]);

  const _onLayout = useEffect((event) => {
    if (Predefine.isAndroidTen) {
      Keyboard.addListener('keyboardDidShow', (data) => {
        let keyboardHeight = data.endCoordinates.height;
        // console.log('keyboardDidShow----> keyboardHeight---->', keyboardHeight);
        setHeight(Predefine.screenHeight - keyboardHeight - 10);
      });
      Keyboard.addListener('keyboardDidHide', (data) => {
        let keyboardHeight = data.endCoordinates.height;
        // console.log('keyboardDidHide----> keyboardHeight---->', keyboardHeight);
        setHeight(initialHeight);
      });
    }
  }, []);

  return (
    <View style={buildStyles.style} onLayout={_onLayout}>
      {children}
      <MemoRenderLoadingHint style={loadingStyle} loading={loading} />
      {showNetworkError ? (
        <MemoRenderNetworkError
          style={emptyStyle}
          source={networkErrorSource}
          onNetworkReload={onNetworkReload}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8f9',
  },
});

PageContainer.propTypes = {
  style: ViewPropTypes.style,
  emptyStyle: ViewPropTypes.style,
  loadingStyle: ViewPropTypes.style,
  fitNotchedScreen: PropTypes.bool,
  fitNotchedScreenType: PropTypes.oneOf(['padding', 'margin']),
  loading: PropTypes.bool,
  showNetworkError: PropTypes.bool,
  onNetworkReload: PropTypes.func,
  networkErrorSource: NetworkError.type.propTypes.source,
};

PageContainer.defaultProps = {
  fitNotchedScreen: false,
  fitNotchedScreenType: 'padding',
  loading: false,
  showNetworkError: true,
};

export default React.memo(PageContainer);
