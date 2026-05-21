import BookingCard from './BookingCard';
const BookingsTab = ({
  bookings,
  pnrSearch,
  setPnrSearch
}) => {

  return (

    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow p-6 border">

        <h2 className="text-2xl font-bold mb-4">

          Booking Dashboard

        </h2>

        <input
          type="text"
          placeholder="Search by PNR"
          className="w-full border rounded-xl p-3"
          value={pnrSearch}
          onChange={e =>
            setPnrSearch(e.target.value)
          }
        />

      </div>

      <div className="space-y-5">

        {bookings

          .filter(booking =>
            booking.pnr
              .toLowerCase()
              .includes(
                pnrSearch.toLowerCase()
              )
          )

          .map(booking => (

  <BookingCard
    key={booking.id}
    booking={booking}
  />

))}

      </div>

    </div>

  );

};

export default BookingsTab;