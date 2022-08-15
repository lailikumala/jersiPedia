import React, { useState } from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import {responsiveHeight, colors, responsiveWidth} from '../../../utils';

export default function JerseySlider({images}) {
  const [openImage, setOpenImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  const clickPreview = index => {
    setOpenImage(true);
    setPreviewImage([
      {
        url: images[index],
        props: {
          // Or you can set source directory.
          source: images[index],
        },
      },
    ]);
  };

  return (
    <View>
      <SliderBox
        images={images}
        circleLoop
        sliderBoxHeight={responsiveHeight(430)}
        ImageComponentStyle={styles.jersey}
        dotStyle={styles.dotStyle}
        dotColor={colors.primary}
        imageLoadingColor={colors.primary}
        onCurrentImagePressed={index => clickPreview(index)}
      />

      <Modal
        visible={openImage}
        transparent={true}
        onRequestClose={() => setOpenImage(false)}>
        <ImageViewer
          imageUrls={previewImage}
          backgroundColor={colors.primary}
          onClick={() => setOpenImage(false)}
          enableSwipeDown
          onSwipeDown={() => setOpenImage(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  jersey: {
    marginTop: 25,
    width: responsiveWidth(344),
  },
  dotStyle: {
    marginTop: -50,
  },
});
