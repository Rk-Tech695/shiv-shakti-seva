const EventCard = ({
  event
}) => {

  return (

    <div className="w-full bg-white border border-stone-200 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300">

      {/* EVENT IMAGE */}

      {event.bannerImage && (

        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-52 object-cover rounded-xl mb-4"
        />

      )}

      {/* TITLE */}

      <h4 className="font-bold text-2xl text-stone-900">

        {event.title}

      </h4>

      {/* DATE + LOCATION */}

      <p className="text-stone-500 mt-1">

        {new Date(
          event.eventDate
        ).toLocaleDateString()}

        {' '}•{' '}

        {event.location}

      </p>

      {/* DESCRIPTION */}

      {event.description && (

        <p className="text-stone-600 mt-4 leading-7">

          {event.description}

        </p>

      )}

      {/* BUTTON */}

      <button className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer">

        Join Program

      </button>

    </div>

  );

};

export default EventCard;