/* eslint-disable no-useless-escape */
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const [loading, setLoading] = useState(false);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert('알림', '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.');
    }
    try {
      setLoading(true);
      await axios.post(`${Config.API_URL}/user`, {email, name, password});
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorRes = (error as AxiosError<{message: string}>).response;
      if (errorRes) {
        Alert.alert('알림', errorRes?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, name, password, navigation, loading]);

  const goLogin = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const canGoNext = email && name && password;

  return (
    <DismissKeyboardView style={styles.inputZone}>
      <View style={styles.titleZone}>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.goLoginZone}>
        <Pressable onPress={goLogin}>
          <Text style={styles.goLoginText}>로그인하러가기</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={canGoNext ? StyleSheet.compose(styles.registerButton, styles.registerButtonActive) : styles.registerButton}
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {loading ? <ActivityIndicator /> : <Text style={styles.registerButtonText}>Register</Text>}
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
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
  buttonZone: {
    alignItems: 'center',
    marginTop: 50,
  },
  registerButton: {
    backgroundColor: '#979797',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerButtonActive: {
    backgroundColor: '#90c8a4',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputZone: {
    marginHorizontal: 20,
    marginTop: 100,
  },
  titleZone: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#90c8a4',
  },
  goLoginZone: {
    backgroundColor: 'red',
    marginTop: 13,
  },
  goLoginText: {
    position: 'absolute',
    right: 20,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#90c8a4',
  },
});

export default SignUp;
