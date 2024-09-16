import { Dialog, IconButton, Button } from "@material-tailwind/react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const UserInvoiceDialog = ({
  booking,
  invoiceDialogOpen,
  handleInvoiceDialog,
  setBooking,
  redirectingLoading,
  handleInvoicePayment
}) => {
  const handleRejectInvoice = async () => {
    const postData = {
      ...booking,
      invoices: { ...booking.invoices, status: "Invoice Rejected" },
    };
    try {
      const res = await axios.put(
        `/api/bookings/${booking._id}`,
        postData
      );
      if (res.status === 201) {
        toast.success("Invoice rejected successfully!");
        handleInvoiceDialog();
      }
      setBooking(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject the invoice!");
    }
  };
  const handleAcceptInvoice = async () => {
    const postData = {
      ...booking,
      status: "Service Invoice Accepted, service will start soon !",
      invoices: {
        ...booking.invoices,
        status: "Invoice Accepted",
      },
    };
    try {
      const res = await axios.put(
        `/api/bookings/${booking._id}`,
        postData
      );
      if (res.status === 201) {
        toast.success("Invoice accepted successfully!");
      }
      setBooking(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to accept the invoice!");
    }
  };
  return (
    <Dialog
      open={invoiceDialogOpen}
      handler={handleInvoiceDialog}
      size="md"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.1, y: 500 },
      }}
      className="p-6"
    >
      <header className="flex items-center justify-between gap-2 mb-2">
        <h1 className="text-center text-xl lg:text-2xl text-gray-700">
          Invoice Detail
        </h1>
        <IconButton variant="text" onClick={handleInvoiceDialog}>
          <RxCross2 size={25} />
        </IconButton>
      </header>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-start flex-col lg:flex-row mb-2 gap-2">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              Title:
              <div className="text-gray-700 font-medium">
                {booking?.invoices?.title}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              Date & Time:
              <div className="text-gray-700 font-medium">
                {booking?.invoices?.date},{" "}
                {booking?.invoices?.time}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              Total:
              <div className="text-gray-700 font-medium">
                ₹{booking?.invoices?.total}
              </div>
            </div>
          </div>
        </div>
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg border overflow-auto">
          <thead className="text-white">
            <tr className="bg-gray-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Unit Price</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {booking.invoices?.items?.map((item, index) => (
              <tr
                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                key={index}
              >
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.description}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.quantity}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  ₹{item.unitPrice}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  ₹{item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {booking.invoices?.status === "Invoice Rejected" ? (
          <p className="text-red-500 text-sm text-center mt-4">
            Invoice rejected
          </p>
        ) : booking.invoices?.status === "Invoice Accepted" ? (
          <div className="text-teal-500 text-sm mt-4 flex items-center justify-between">
            <div>Invoice accepted, Service will start soon! </div>
            {!booking.invoices.paid && (
              <Button
                variant="gradient"
                color="teal"
                className="rounded"
                loading={redirectingLoading}
                onClick={handleInvoicePayment}
              >
                Pay ₹{booking.invoices.total}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-2 items-center mt-4 justify-end">
            <Button
              color="red"
              variant="gradient"
              onClick={handleRejectInvoice}
            >
              Reject
            </Button>
            <Button
              onClick={handleAcceptInvoice}
              color="teal"
              variant="gradient"
            >
              Accept
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default UserInvoiceDialog;
