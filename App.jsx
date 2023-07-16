import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-gesture-handler'

// import FavoritesContextProvider from './store/context/favorites-context';
import SignUpScreen from './src/modules/auth/signup'
import Profile from './src/modules/profile/profile'
import LoginScreen from './src/modules/auth/login'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigator(props) {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: 'white',
                sceneContainerStyle: { backgroundColor: '#3f2f25' },
                drawerContentStyle: { backgroundColor: '#351401' },
                drawerInactiveTintColor: 'white',
                drawerActiveTintColor: '#351401',
                drawerActiveBackgroundColor: '#e4baa1',
            }}
        >
            <Drawer.Screen
                name="Categories"
                component={Profile}
                options={{
                    title: 'All Categories',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Favorites"
                component={Profile}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="star" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={Profile}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('Login')
                            }}
                        >
                            <Ionicons
                                name="log-out"
                                color={color}
                                size={size}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            {/* <FavoritesContextProvider> */}
            <NavigationContainer
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#351401' },
                        headerTintColor: 'white',
                        contentStyle: { backgroundColor: '#3f2f25' },
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={SignUpScreen}
                        style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Drawer"
                        component={DrawerNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

            {/* </FavoritesContextProvider> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
})
