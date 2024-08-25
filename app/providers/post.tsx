import { useHandleError } from '@/hooks/usehandleError';
import { postService } from '@/services/post';
import { PostRequest, PostResponse } from '@/types/post';
import { readAsStringAsync } from 'expo-file-system';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostContextType = {
  onSelectImage: (img: string) => void;
  selectedImage: string | null;
  posts: PostResponse[];
  onGetPosts: () => Promise<void>;
  onCreatePost: (description: string) => Promise<PostResponse>;
  addViewedPosts: (postId: number) => void;
};

export const PostContext = createContext({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const { onHandleError } = useHandleError();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [viewedPosts, setViewedPosts] = useState<number[]>([]);

  useEffect(() => {
    if (viewedPosts.length > 5) {
      handleMarkPostsAsSeen();
    }
  }, [viewedPosts])
  
  const handleGetPosts = useCallback(
    async () => {
      try {
        await handleMarkPostsAsSeen();
        const response = await postService.getPosts();
        setPosts(response?.data)
        return;
      } catch (error) {
        onHandleError(error)
      }
    },
    [onHandleError],
  )

  const handleMarkPostsAsSeen = useCallback(
    async () => {
      try {
        if (viewedPosts.length) {
          const response = await postService.markPostAsViewed(viewedPosts);
          setViewedPosts([]);
         }
        return;
      } catch (error) {
        onHandleError(error)
      }
    },
    [onHandleError],
  )

  const handleCreatePost = async (description: string) => {
    console.log("handleCreatePost");
    try {
      if (!selectedImage) {
        return;
      }
      const imgbase64 = await readAsStringAsync(selectedImage, { encoding: "base64" })
      const newPost = { images: [imgbase64], description };
      const response = await postService.createPost(newPost);
      if (!response) {
        return;
      }
      const post = response.data;
      return post;

    } catch (error) {
      onHandleError(error)
    }
  }


  const addViewedPosts = async (postId: number) => {
    setViewedPosts((prevState) => [...prevState, postId]);
  }

  const handleSelectImage = async (imageSrc: string) => {
    setSelectedImage(imageSrc);
  }

  const value = {
    onSelectImage: handleSelectImage,
    selectedImage,
    posts,
    onGetPosts: handleGetPosts,
    onCreatePost: handleCreatePost,
    addViewedPosts,
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
