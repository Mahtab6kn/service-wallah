"use client";
import { Collapse, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import NavList from "./NavList";
import Profile from "./user-profile/Profile";
import UserNavigation from "./user-profile/UserNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserLoading } from "@/redux/slice/userSlice";
import requestNotification from "@/utils/requestNotifiction";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const handleOpenLoginDialog = () => setOpenLoginDialog(!openLoginDialog);

  const user = useSelector((state) => state.user.user);
  const userLoading = useSelector((state) => state.user.userLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const gettingUser = async () => {
      try {
        const response = await fetch(`/api/users/check-authorization`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.message === "Unauthorized") {
          return;
        }
        if (!data.success) {
          return toast.error(data.message);
        }
        dispatch(setUser(data.user));

        if (!data.user.notificationToken) {
          const token = await requestNotification();

          if (token.success) {
            const updatedUser = await fetch(`/api/users/update`, {
              method: "POST",
              body: JSON.stringify({
                ...data.user,
                notificationToken: token.token,
              }),
            });
            const updatedUserData = await updatedUser.json();
            if (updatedUser.ok) {
              dispatch(setUser(updatedUserData));
            } else {
              console.error("Failed to update user");
            }
          } else {
            toast.error(token.message);
            return;
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Error fetching user");
      } finally {
        dispatch(setUserLoading(false));
      }
    };
    gettingUser();
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-full px-4 py-2 rounded-none shadow-none bprder-none bg-transparent z-50">
      <div className="flex items-center justify-between text-blue-gray-900 bg-transparent">
        <Link
          href={"/"}
          className="mr-4 cursor-pointer font-extrabold py-1.5 lg:ml-2"
        >
          <Image
            width={100}
            height={100}
            src="/logo/secoundary-logo-black.png"
            alt="logo"
            className="cursor-pointer w-40 object-cover"
          />
        </Link>
        <div className="hidden gap-2 lg:flex lg:items-center lg:justify-end w-full">
          <NavList />
          <Profile
            openLoginDialog={openLoginDialog}
            handleOpenLoginDialog={handleOpenLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
          />
        </div>
        <div className="flex items-center justify-end gap-1">
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <div className="flex w-fit items-center gap-2 lg:hidden">
            <UserNavigation
              userLoading={userLoading}
              user={user}
              handleOpenLoginDialog={handleOpenLoginDialog}
            />
          </div>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </div>
  );
}
