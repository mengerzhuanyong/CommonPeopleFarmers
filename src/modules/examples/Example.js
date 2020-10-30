import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { PageContainer, ListRow, NavigationBar } from '../../components';
import RouterHelper from '../../routers/RouterHelper';
import { RefreshLayout } from 'react-native-refresh';

function Example() {
  return (
    <PageContainer style={styles.container} fitNotchedScreen={Predefine.isNotchedScreen}>
      <NavigationBar title={'Example'}/>
      <RefreshLayout enable={false}>
        <ScrollView>
          <ListRow
            title={'Theme'}
            onPress={() =>
              RouterHelper.navigate('DemoTheme', 'DemoTheme', { isModal: true })
            }
          />
          <ListRow
            title={'Alert'}
            onPress={() => RouterHelper.navigate('DemoAlert', 'DemoAlert')}
          />
          <ListRow
            title={'Button'}
            onPress={() => RouterHelper.navigate('DemoButton', 'DemoButton')}
          />
          <ListRow
            title={'Toast'}
            onPress={() => RouterHelper.navigate('DemoToast', 'DemoToast')}
          />
          <ListRow
            title={'Overlay'}
            onPress={() => RouterHelper.navigate('DemoOverlay', 'DemoOverlay')}
          />
          <ListRow
            title={'List'}
            onPress={() => RouterHelper.navigate('DemoList', 'DemoList')}
          />
          <ListRow
            title={'ImageView'}
            onPress={() => RouterHelper.navigate('DemoImageView', 'DemoImageView')}
          />
          <ListRow
            title={'Card'}
            onPress={() => RouterHelper.navigate('DemoCard', 'DemoCard')}
          />
          <ListRow
            title={'ListRow'}
            onPress={() => RouterHelper.navigate('DemoRow', 'DemoRow')}
          />
          <ListRow
            title={'Segmented'}
            onPress={() => RouterHelper.navigate('DemoSegmented', 'DemoSegmented')}
          />
          <ListRow
            title={'Popover'}
            onPress={() => RouterHelper.navigate('DemoPopover', 'DemoPopover')}
          />
          <ListRow
            title={'Form'}
            onPress={() => RouterHelper.navigate('DemoForm', 'DemoForm')}
          />
          <ListRow
            title={'Upload'}
            onPress={() => RouterHelper.navigate('DemoUpload', 'DemoUpload')}
          />
          <ListRow
            title={'CityPicker'}
            onPress={() => RouterHelper.navigate('DemoCityPicker', 'DemoCityPicker')}
          />
          <ListRow
            title={'Picker'}
            onPress={() => RouterHelper.navigate('DemoPicker', 'DemoPicker')}
          />
          <ListRow
            title={'TimePicker'}
            onPress={() => RouterHelper.navigate('DemoTimePicker', 'DemoTimePicker')}
          />
          <ListRow
            title={'BaiduFace'}
            onPress={() => RouterHelper.navigate('DemoBaiduFace', 'DemoBaiduFace')}
          />
        </ScrollView>
      </RefreshLayout>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Example);
