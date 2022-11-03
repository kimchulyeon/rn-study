import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const emptyEmailPwd = !email.trim() || !password.trim();

  const onSubmit = useCallback(() => {
    return Alert.alert('Notice', '로그인이 되었습니다.');
  }, []);
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <DismissKeyboardView style={styles.inputZone}>
      <View style={styles.titleZone}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          ref={emailRef}
          value={email}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요."
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.passwordZone}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          ref={passwordRef}
          value={password}
          onChangeText={onChangePassword}
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          autoCapitalize="none"
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={emptyEmailPwd ? styles.loginButton : [styles.loginButton, styles.loginButtonActive]}
          disabled={emptyEmailPwd}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={toSignUp} style={[styles.loginButton, styles.registerButton]}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  buttonZone: {
    alignItems: 'center',
    marginTop: 70,
  },
  loginButton: {
    backgroundColor: '#0000001c',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: '#90c8a4',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderColor: '#90c8a4',
    borderWidth: 1,
    color: '#90c8a4',
  },
  registerButtonText: {
    color: '#90c8a4',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#bed2d739',
  },
  inputZone: {
    marginHorizontal: 20,
    marginTop: 100,
  },
  passwordZone: {
    marginTop: 20,
  },
  titleZone: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#90c8a4',
  },
});

export default SignIn;
