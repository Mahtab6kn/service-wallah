import React from "react";
import UserDetail from "./UserDetail";
import AssignServiceProvider from "./AssignServiceProvider";

const UserServiceProviderDetail = ({booking, setBooking}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center w-full mb-6">
      <div className="bg-white p-6 rounded-lg shadow w-full">
        <h3 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
          Customer Details
        </h3>
        <UserDetail
          name={booking.fullname}
          profileImage={booking.profileImage}
          email={booking.email}
          phoneNumber={booking.phoneNumber}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow w-full">
        {booking.assignedServiceProviders ? (
          <>
            <h3 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
              Assigned Service Provider
            </h3>
            <UserDetail
              name={booking.assignedServiceProviders.name}
              profileImage={booking.assignedServiceProviders.image}
              email={booking.assignedServiceProviders.email}
              phoneNumber={booking.assignedServiceProviders.phoneNumber}
            />
          </>
        ) : (
          <AssignServiceProvider
            bookingId={booking._id}
            setBooking={setBooking}
          />
        )}
      </div>
    </div>
  );
};

export default UserServiceProviderDetail;
