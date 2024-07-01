import { useHandleError } from '@/hooks/usehandleError';
import { postService } from '@/services/post';
import { PostRequest, PostResponse } from '@/types/post';
import { readAsStringAsync } from 'expo-file-system';
import { createContext, useContext, useState } from 'react';

type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostContextType = {
  onUpdateSelectedImage: (img: string) => void;
  onGetPosts: () => Promise<PostResponse[]>;
  onCreatePost: (description: string) => Promise<PostResponse>;


};

export const PostContext = createContext({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const { onHandleError } = useHandleError();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<PostRequest | null>(null);

  const handleGetPosts = async () => {
    try {
      const response = await postService.getPosts();
      const posts = response?.data;

      return posts;
    } catch (error) {
      onHandleError(error)
    }
  }

  const handleCreatePost = async (description: string) => {
    try {
      if (!selectedImage) {
        return;
      }
      const imgbase64 = await readAsStringAsync(selectedImage)
      const newPost = { images: [], description };
      console.log(newPost);
      const response = await postService.createPost(newPost);
      if (!response) {
        return;
      }
      console.log(response);
      const post = response.data;
      return post;

    } catch (error) {
      onHandleError(error)
    }


  }

  const handleUpdateSelectedImage = async (imageSrc: string) => {
    setSelectedImage(imageSrc);
    const imgbase64 = await readAsStringAsync(imageSrc)
  }

  const value = {
    onUpdateSelectedImage: handleUpdateSelectedImage,
    onGetPosts: handleGetPosts,
    onCreatePost: handleCreatePost,

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
