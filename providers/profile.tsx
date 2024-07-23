import { useHandleError } from '@/hooks/usehandleError';
import { profileService } from '@/services/profile';
import { Profile } from '@/types/profile';
import { readAsStringAsync } from 'expo-file-system';
import { createContext, useCallback, useContext, useState } from 'react';

type ProfileContextProviderProps = {
  children: React.ReactNode;
};

type ProfileContextType = {
  profileInfo: Profile | null;
  onGetProfile:  (username: string) => Promise<void>;
};

export const ProfileContext = createContext({} as ProfileContextType);

export const ProfileContextProvider = ({ children }: ProfileContextProviderProps) => {
  const { onHandleError } = useHandleError();
  const [profileInfo, setProfileInfo] = useState<Profile | null>(null);

  const handleGetProfile = useCallback(
    async (username: string) => {
      console.log('handleGetProfile')
      try {
        const response = await profileService.getProfile(username);
        setProfileInfo(response?.data)
        return;
      } catch (error) {
        onHandleError(error)
      }
    },
    [onHandleError],
  )
  
  const value = {
    onGetProfile: handleGetProfile,
    profileInfo,
  };

  return (
    <ProfileContext.Provider
      value={value}
    >
      {children}
    </ProfileContext.Provider>
  );
};


// Custom hook to use the Profile context
export const useProfileContext = (): ProfileContextType => {

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
  }

  return context;
};
