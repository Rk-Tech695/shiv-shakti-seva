import EventCard from './EventCard';

const EventsTab = ({

  events,

  eventForm,

  setEventForm,

  handleAddEvent

}) => {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* LEFT */}

      <div>

        <h3 className="text-3xl font-extrabold mb-6 text-stone-900">

          Add New Event

        </h3>

        <form

          onSubmit={handleAddEvent}

          className="space-y-5 bg-white p-7 rounded-3xl border border-stone-200 shadow-sm"

        >

          <input

            type="text"

            required

            placeholder="Event Title"

            className="w-full border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"

            value={eventForm.title}

            onChange={e =>
              setEventForm({
                ...eventForm,
                title: e.target.value
              })
            }

          />

          <input

            type="date"

            required

            className="w-full border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"

            value={eventForm.eventDate}

            onChange={e =>
              setEventForm({
                ...eventForm,
                eventDate: e.target.value
              })
            }

          />

          <input

            type="text"

            required

            placeholder="Location"

            className="w-full border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"

            value={eventForm.location}

            onChange={e =>
              setEventForm({
                ...eventForm,
                location: e.target.value
              })
            }

          />

          <input

            type="text"

            placeholder="Banner Image URL"

            className="w-full border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"

            value={eventForm.bannerImage}

            onChange={e =>
              setEventForm({
                ...eventForm,
                bannerImage: e.target.value
              })
            }

          />

          <textarea

            placeholder="Description"

            className="w-full border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"

            rows="4"

            value={eventForm.description}

            onChange={e =>
              setEventForm({
                ...eventForm,
                description: e.target.value
              })
            }

          />

          <button

            type="submit"

            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 cursor-pointer"

          >

            Create Event

          </button>

        </form>

      </div>

      {/* RIGHT */}

      <div>

  <h3 className="text-3xl font-extrabold mb-6 text-stone-900 text-center">
    Upcoming Programs
  </h3>

  <div className="grid grid-cols-1 gap-6 justify-items-center">

    {events.map(event => (

      <div
        key={event.id}
        className="w-full max-w-xl"
      >
        <EventCard event={event} />
      </div>

    ))}

  </div>

</div>

    </div>

  );

};

export default EventsTab;