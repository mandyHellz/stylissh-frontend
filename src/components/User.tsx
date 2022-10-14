import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const User = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (!user)
    return (
      <div onClick={() => router.push("/api/auth/login")}>
        <FaUserCircle size={25} className="cursor-pointer" />
      </div>
    );

  if (isLoading)
    return (
      <div>
        <AiOutlineLoading3Quarters size={25} />
      </div>
    );

  return (
    <div onClick={() => router.push("/profile")}>
      <img
        src={user?.picture}
        alt={user?.nickname}
        className="w-[25px] h-[25px] rounded-full overflow-hidden cursor-pointer"
      />
    </div>
  );
};
