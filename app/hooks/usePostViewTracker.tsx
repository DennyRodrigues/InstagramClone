import { usePostContext } from '@/providers/post';
export const usePostViewTracker = (postId: number) => {
  const { addViewedPosts } = usePostContext();

  const handleViewChange = (inView: boolean) => {
    if (inView) {
      addViewedPosts(postId);
    }
  };

  return { handleViewChange };
};
