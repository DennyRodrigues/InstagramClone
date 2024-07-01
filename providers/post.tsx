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
  onCreatePost: (post: PostRequest) => Promise<PostResponse>;


};

export const PostContext = createContext({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<PostRequest | null>(null);

  const handleGetPosts = async () => {
    const response = await postService.getPosts();
    if (!response) {
      return;
    }
    const posts = response.data;
    return posts;



  }

  const handleCreatePost = async (newPost: PostRequest) => {

    const response = await postService.createPost(newPost);
    if (!response) {
    return;  
    }
    console.log(response);
    const post = response.data;
    return post; 
    

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
