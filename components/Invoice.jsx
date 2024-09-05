"use client";
import {
  Button,
  Dialog,
  IconButton,
  Input,
  Alert,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { toast } from "sonner";

const Invoice = ({ selectedBooking, setSelectedBooking }) => {
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [openCreateInvoiceDialog, setOpenCreateInvoiceDialog] = useState(false);

  const handleInvoiceDialog = () => setOpenInvoiceDialog(!openInvoiceDialog);
  const handleCreateInvoiceDialog = () =>
    setOpenCreateInvoiceDialog(!openCreateInvoiceDialog);

  const [disableTitleInput, setDisableTitleInput] = useState(false);

  const initialInvoice = {
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    items: [],
    total: 0,
  };

  const initialItem = {
    description: "",
    quantity: "",
    unitPrice: "",
    amount: 0,
  };

  const [newInvoice, setNewInvoice] = useState(initialInvoice);
  const [newItem, setNewItem] = useState(initialItem);

  const handleAddItem = () => {
    const { description, quantity, unitPrice } = newItem;
    if (!description || !quantity || !unitPrice) {
      toast.error("Please fill in all fields for the item.");
      return;
    }
    const amount = parseFloat(quantity) * parseFloat(unitPrice);
    setNewInvoice((prevInvoice) => ({
      ...prevInvoice,
      items: [...prevInvoice.items, { ...newItem, amount }],
      total: parseFloat(prevInvoice.total) + amount,
    }));

    setNewItem(initialItem);
    if (newInvoice.title !== "") {
      setDisableTitleInput(true);
    }
  };

  const handleCreateInvoice = async () => {
    if (!newInvoice.title || newInvoice.items.length === 0) {
      toast.error(
        "Please fill in all fields for the invoice and add at least one item."
      );
      return;
    }
    try {
      const postData = {
        ...selectedBooking,
        invoices: newInvoice,
      };
      const response = await axios.put(
        `/api/bookings/${selectedBooking._id}`,
        postData
      );
      setSelectedBooking(postData);
      console.log("Invoice created successfully:", response.data);
      toast.success("Invoice created successfully");
      handleCreateInvoiceDialog();
      setNewInvoice(initialInvoice);
      setDisableTitleInput(false);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Error creating invoice. Please try again.");
    }
  };

  // const handleDeleteInvoice = async (invoiceId) => {
  //   try {
  //     const updatedInvoices = selectedBooking.invoices.filter(
  //       (inv) => inv.id !== invoiceId
  //     );
  //     const updatedBooking = {
  //       ...selectedBooking,
  //       invoices: {},
  //     };
  //     setSelectedBooking(updatedBooking);
  //     const response = await axios.put(
  //       `/api/bookings/${selectedBooking._id}`,
  //       updatedBooking
  //     );
  //     console.log("Invoice deleted successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error deleting invoice:", error);
  //   }
  // };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center gap-4">
      <div className="text-center text-xl text-gray-700">
        Create an invoice!
      </div>
      <Button color="blue" variant="gradient" onClick={handleInvoiceDialog}>
        Invoices
      </Button>
      <Dialog
        open={openInvoiceDialog}
        handler={handleInvoiceDialog}
        size="lg"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.1, y: 500 },
        }}
        className="bg-gray-100 max-h-[80vh] overflow-auto"
      >
        <div className="flex justify-between gap-2 flex-col lg:flex-row items-center mb-4 p-6">
          <h1 className="text-2xl font-bold">All Invoices</h1>
          <Button
            onClick={handleCreateInvoiceDialog}
            className="rounded"
            color="blue"
            variant="outlined"
          >
            Create New Invoice
          </Button>
          <Dialog
            open={openCreateInvoiceDialog}
            handler={handleCreateInvoiceDialog}
            size="lg"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.1, y: 500 },
            }}
            className="p-4 sm:p-6 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]"
          >
            <div className="w-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-lg sm:text-xl font-medium text-blue-gray-500">
                  Create invoice
                </div>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={handleCreateInvoiceDialog}
                  className="p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <Input
                  label="Title - invoice for"
                  type="text"
                  value={newInvoice.title}
                  disabled={disableTitleInput}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      title: e.target.value,
                    })
                  }
                  fullWidth
                  color="blue"
                />
                <Input
                  label="Description"
                  type="text"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      description: e.target.value,
                    })
                  }
                  fullWidth
                  color="blue"
                />
              </div>
              <div className="flex flex-col sm:flex-row mb-4 gap-4">
                <div className="w-full sm:w-1/3">
                  <Input
                    label="Quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: e.target.value,
                      })
                    }
                    fullWidth
                    color="blue"
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <Input
                    label="Unit Price"
                    type="number"
                    value={newItem.unitPrice}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        unitPrice: e.target.value,
                      })
                    }
                    fullWidth
                    color="blue"
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <Button
                    onClick={handleAddItem}
                    color="blue"
                    variant="gradient"
                    className="rounded w-full"
                  >
                    Add item
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 max-h-64 overflow-auto">
                <div className="flex w-full justify-between items-center p-2 sm:p-4 bg-gray-700 text-white rounded-lg font-semibold text-xs sm:text-sm">
                  <div className="w-2/5">Description</div>
                  <div className="w-1/5 text-center">Quantity</div>
                  <div className="w-1/5 text-center">Unit Price</div>
                  <div className="w-1/5 text-center">Amount</div>
                </div>
                {newInvoice?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full justify-between items-center p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm"
                  >
                    <div className="w-2/5">{item.description}</div>
                    <div className="w-1/5 text-center">{item.quantity}</div>
                    <div className="w-1/5 text-center">₹{item.unitPrice}</div>
                    <div className="w-1/5 text-center">₹{item.amount}</div>
                  </div>
                ))}
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleCreateInvoice}
                  className="rounded w-full sm:w-auto"
                  size="lg"
                  color="teal"
                  variant="gradient"
                >
                  Generate new invoice of ₹{newInvoice.total}
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
        <div className="border p-4 bg-white rounded-lg m-0 md:m-6">
          <div className="flex justify-between items-start flex-col lg:flex-row mb-2 gap-2">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                Title:
                <div className="text-gray-700 font-medium">
                  {selectedBooking.invoices?.title}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                Date & Time:
                <div className="text-gray-700 font-medium">
                  {selectedBooking.invoices?.date},{" "}
                  {selectedBooking.invoices?.time}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                Total:
                <div className="text-gray-700 font-medium">
                  ₹{selectedBooking.invoices?.total}
                </div>
              </div>
            </div>
            {selectedBooking.invoices.status ? (
              <div className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-sm capitalize">
                Accepted
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm capitalize">
                Not accepted yet!
              </div>
            )}
            {/* <Button
                color="red"
                variant="gradient"
                onClick={() => handleDeleteInvoice(selectedBooking.invoices.id)}
                className="rounded"
              >
                Delete invoice
              </Button> */}
          </div>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg border overflow-auto">
            <thead className="text-white">
              <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Unit Price</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {selectedBooking.invoices?.items?.map((item, index) => (
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
        </div>
      </Dialog>
    </div>
  );
};

export default Invoice;
