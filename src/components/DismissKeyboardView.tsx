import React from 'react';
import {TouchableWithoutFeedback, StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboardView: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({children, ...props}) => (
  <TouchableWithoutFeedback accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style} extraScrollHeight={180}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
