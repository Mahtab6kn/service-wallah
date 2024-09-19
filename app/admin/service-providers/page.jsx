"use client";
import { FaUsers, FaUsersGear } from "react-icons/fa6";
import { Input, Select, Option } from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import UserList from "@/components/admin/user/UserList";
import PaginationBtn from "@/components/PaginationBtn";

const ServiceProviders = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  const [allUsers, setAllUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterByStatus, setFilterByStatus] = useState("both");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    const limit = 12;
    try {
      const response = await fetch(
        `/api/admin/service-providers?page=${page}&limit=${limit}&search=${searchQuery}&status=${filterByStatus}`
      );
      const data = await response.json();
      if (data.success) {
        setAllUsers(data.users);
        setMeta(data.meta);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page, filterByStatus, searchQuery]);

  const userDeactivating = async (user) => {
    try {
      const updatedUser = { ...user, active: !user.active };
      const response = await fetch(`/api/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        toast.success(
          `User ${
            updatedUser.active ? "activated" : "deactivated"
          } successfully`
        );

        setAllUsers((prev) =>
          prev.map((u) => (u._id === user._id ? updatedUser : u))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userDeleting = async (user) => {
    const confirmation = confirm(`Are you sure you want to delete this user`);
    if (!confirmation) return;
    if (user.image.url) {
      await deleteObject(ref(storage, user.image.name));
    }
    try {
      const response = await fetch(`/api/admin/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        // setOpen(false);
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="grid place-items-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="loaction-loader"></div>
            <div className="text-2xl font-julius">Loading</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 md:flex-row w-full py-4 justify-between px-10 items-center">
            <div className="flex gap-2 items-center text-gray-700">
              <FaUsersGear size={30} />
              <span className="text-3xl font-bold">Service Providers</span>
            </div>
            <div className="flex md:w-fit w-full md:flex-row flex-col gap-3 items-center">
              <div className="md:w-72 w-full">
                <Input
                  label="Search Service Provider"
                  className="bg-white"
                  icon={<IoIosSearch />}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>

              <div className="md:w-60 w-full bg-white">
                <Select
                  label="FIlter By Status"
                  value={filterByStatus}
                  onChange={(e) => setFilterByStatus(e)}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">InActive</Option>
                  <Option value="both">Both</Option>
                </Select>
              </div>
            </div>
          </div>
          <UserList
            allUsers={allUsers}
            userDeleting={userDeleting}
            userDeactivating={userDeactivating}
          />
          <PaginationBtn totalPages={meta.totalPages} />
        </div>
      )}
    </>
  );
};

export default ServiceProviders;
