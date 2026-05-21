
const EventCard = ({
  event
}) => {

  return (

    <div className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm">

      <h4 className="font-bold text-stone-900">

        {event.title}

      </h4>

      <p className="text-sm text-stone-500">

        {new Date(
          event.eventDate
        ).toLocaleDateString()}

        {' '}at{' '}

        {event.location}

      </p>

      <div className="mt-3 space-y-1">

        <p className="text-purple-600 font-bold text-sm">

          Total Bookings:
          {' '}
          {event.bookingGroups?.length || 0}

        </p>

        <p className="text-orange-600 font-semibold text-sm">

          Booked:
          {' '}
          {event.bookedSlots}

        </p>

        <p className="text-green-600 font-semibold text-sm">

          Available:
          {' '}
          {event.totalSlots - event.bookedSlots}

        </p>

        <p className="text-blue-600 font-semibold text-sm">

          Total Slots:
          {' '}
          {event.totalSlots}

        </p>

        {!event.slotEnabled && (

          <p className="text-red-600 font-bold">

            SLOTS CLOSED

          </p>

        )}

      </div>

    </div>

  );

};

export default EventCard;