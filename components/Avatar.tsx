import useUser from "@/hooks/useUser";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [userId, router]
  );
  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "w-32 h-32" : "w-12 h-12"}
      rounded-full
      hover:opacity-90
      transition
      cursor-pointer
      relative
    `}
    >
      <Image 
        fill
        style={{
          "objectFit": "cover",
          "borderRadius": "100%"
        }}
        alt="Avatar"
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
