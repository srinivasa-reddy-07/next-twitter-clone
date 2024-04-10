import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModel = useLoginModel();

  const isFollowing = useMemo(() => {
    const followersList = currentUser?.followingIds || [];

    return followersList.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      loginModel.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success")
    } catch (error) {
      if(currentUser) {
        toast.error("Something went wrong");
      }
    }
  }, [
    currentUser,
    loginModel,
    mutateCurrentUser,
    mutateFetchedUser,
    isFollowing,
    userId,
  ]);

  return {
    isFollowing,
    toggleFollow
  }
};

export default useFollow;
