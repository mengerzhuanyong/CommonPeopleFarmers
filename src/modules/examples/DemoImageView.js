'use strict';
import React, { useRef, useCallback } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { NavigationBar, PageContainer } from '../../components';
import { ImageView } from '../../components';
import { Images } from '../../assets';

const imgSource = 'https://mtimg.ruanmei.com/images/todayinhistory/2019/06/12/150426_354.jpg';

function DemoImageView() {

  const onPressToSaveImage = useCallback(async () => {
    // console.log('onPressToSaveImage---->', imgSource);
    if (__ANDROID__) {
      let perRes = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE', null);
    }
    let result = await Services.download(imgSource);
    if (result) {
      const rollUri = __IOS__ ? result : `file://${result}`
      const saveRes = await CameraRoll.saveToCameraRoll(rollUri, 'photo');
      if (saveRes) {
        ToastManager.message('图片已保存至相册');
      } else {
        ToastManager.message('保存失败');
      }
    } else {
      ToastManager.message('下载失败')
    }
  });

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoImageView'} />
      <ImageView
        style={{ width: 200, height: 200 }}
        source={{
          uri: imgSource,
        }}
        resizeMode={'contain'}
        placeholderImage={Images.img_no_record}
        placeholderImageStyle={{}}
        errorImage={Images.img_no_nerwork}
      />
      <Button
        title={'保存图片'}
        style={styles.btnItemStyle}
        titleStyle={styles.btnTitleStyle}
        onPress={onPressToSaveImage}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  btnItemStyle: {
    marginVertical: 50,
    marginHorizontal: 30,
    backgroundColor: Predefine.themeColor,
  },
  btnTitleStyle: {},
});

export default React.memo(DemoImageView);
