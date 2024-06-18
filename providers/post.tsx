import { PostRequest } from '@/types/post';
import { readAsStringAsync } from 'expo-file-system';
import { createContext, useContext, useState } from 'react';

type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostContextType = {
  handleUpdateSelectedImage: (img: string) => void; 
  
};

export const PostContext = createContext({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<PostRequest | null>(null);

  const handleCreateNewPost = async (newPost: PostRequest) => {
    let imgbase64 = ''
    if (selectedImage) {
      imgbase64 = await readAsStringAsync(selectedImage);
    }
    

  }

  const handleUpdateNewPost = async (newPost: PostRequest) => {

  }

  const handleUpdateSelectedImage = async (imageSrc: string) => {
    console.log('handleUpdateSelectedImage');
    setSelectedImage(imageSrc);
    const imgbase64 = await readAsStringAsync(imageSrc)
  }

  const value = {
    handleUpdateSelectedImage,
  };

  return (
    <PostContext.Provider
      value={value}
    >
      {children}
    </PostContext.Provider>
  );
};


// Custom hook to use the Post context
export const usePostContext = (): PostContextType => {

  const context = useContext(PostContext);

  if (!context) {
    throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
  }

  return context;
};
