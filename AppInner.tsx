import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {RootState} from './src/store/reducer';
import {useSelector} from 'react-redux';
import {RootStackParamList} from './App';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppInner = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Orders" component={Orders} options={{title: '오더 목록', headerShown: true}} />
          <Tab.Screen name="Delivery" component={Delivery} options={{headerShown: false}} />
          <Tab.Screen name="Settings" component={Settings} options={{title: '내 정보', headerShown: true}} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{title: '로그인', headerShown: false}} />
          <Stack.Screen name="SignUp" component={SignUp} options={{title: '회원가입', headerShown: false}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppInner;
