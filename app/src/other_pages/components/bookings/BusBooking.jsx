import React from "react";

function BusBooking({ bookings, loading, error }) {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  // Check if bookings array is empty
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-4 text-yellow-500">
        There are no bookings.
      </div>
    );
  }

  return (
    <ul className=" ">
      {bookings.map((booking) => (
        <li
          key={booking._id}
          className="bg-gray-100 rounded-md p-4 mb-2 shadow"
        >
          <p
            className={`text-sm rounded-md border text-gray-800 p-3 ${
              booking?.reserveSpecialSeat
                ? "border-red-500 border-dashed"
                : "border-gray-500  border-dashed"
            }`}
          >
            <span className="text-blue-700">Booking Code:</span>{" "}
            {booking.bookingCode}
            <br />
            <span className="text-blue-700">Booking Date:</span>{" "}
            {new Date(booking.paymentDate).toLocaleString()}
            <br />
            <span className="text-blue-700">Fare Amount: </span>
            <span className="italic">Ksh {booking.amountPaid}</span>
            <br />
            <span className="text-blue-700">Is Paid:</span>{" "}
            {booking.isPaid ? "Yes" : "No"}
            <br />
            <span className="text-blue-700">Special Seat:</span>{" "}
            {booking?.reserveSpecialSeat ? "Yes" : "No"}
            <br />
            <span className="text-blue-700">Bus Details:</span>
            <br />
            <span className="ml-4">
              - Sacco: {booking?.busDetails?.sacco}
              <br />- Number Plate: {booking.busDetails.numberPlate}
              <br />- Bus No: {booking.busDetails?.busNo}
              <br />- To: {booking.busDetails.to}
              <br />- Now At: {booking.busDetails.currentLocation} (
              {booking.busDetails.timeToCurrentLocation} mins away )
              <br />- Capacity: {booking.busDetails.capacity}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default BusBooking;
