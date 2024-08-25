
import { authService } from '@/services/auth';
import { AuthRequest, RegisterRequest } from '@/types/auth';
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
  onRegister: (registerRequest: RegisterRequest) => Promise<any>;
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

  const handleRegister = async (userData: RegisterRequest) => {
    try {
      const response = await authService.register(userData);

      console.log(response)

      const token = response.data.token;

      await SecureStore.setItemAsync(TOKEN_KEY, token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthState({
        token: token,
        authenticated: true,
      });
      router.navigate('/(authenticated)');
    } catch (error) {
      console.log("handleRegister failed");
      throw error;
    }
  };
  const handleLogin = async (email: string, password: string) => {
    try {
      
  
    const response = await authService.login(email, password);
    const token = response.data.token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthState({
      token: token,
      authenticated: true,
    })
    await SecureStore.setItemAsync(TOKEN_KEY, token)
      router.replace('/(authenticated)');
    } catch (error) {
      console.log("handleLogin failed");
      throw error;
    }
  }
  
  const handleLogout = async () => {
    axios.defaults.headers.common['Authorization'] = ''
    setAuthState({
      token: null,
      authenticated: false
    })
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  }

  useEffect(() => {
    const loadToken = async () => {
      console.log('loadToken')
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        })
        router.replace('/(authenticated)');

      }
    }
    loadToken();
  }, [])


  const value = {
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
    authState,
  };


  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
  }

  return context;
};
