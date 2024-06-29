
import { authService } from '@/services/auth';
import { AuthRequest } from '@/types/auth';
import axios from 'axios';
import { readAsStringAsync } from 'expo-file-system';
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const TOKEN_KEY = 'my_jwt';
type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  authState: { token: string | null; authenticated: boolean };
  onRegister: (email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;


};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false
  })


  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await authService.register(email, password);
      if (!response) {
        return
      }

      const token = response.data.token;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({
        token: token,
        authenticated: true,
      })
    } catch (error) {
      console.log(error)

    }


  }
  const handleLogin = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    if (!response) {
      return
    }
    console.log(response.data)

    const token = response.data.token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthState({
      token: token,
      authenticated: true,
    })
    await SecureStore.setItemAsync(TOKEN_KEY, token)
    router.navigate('/(authenticated)');
  }
  const handleLogout = async () => {
    axios.defaults.headers.common['Authorization'] = ''
    setAuthState({
      token: null,
      authenticated: false
    })
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  }


  const value = {
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
    authState,
  };

  useEffect(() => {
    const loadToken = async () => {
      console.log('loadToken')
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('tokem', token);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        })
        router.navigate('/(authenticated)');

      }
    }
    handleLogout()
    loadToken();
  }, [])

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
  }

  return context;
};
