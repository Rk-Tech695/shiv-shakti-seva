import EventCard from './EventCard';
const EventsTab = ({

  events,

  eventForm,

  setEventForm,

  handleAddEvent

}) => {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div>

        <h3 className="text-2xl font-bold mb-6">

          Add New Event

        </h3>

        <form

          onSubmit={handleAddEvent}

          className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-100"

        >

          <input

            type="text"

            required

            placeholder="Event Title"

            className="w-full border rounded-lg p-3"

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

            className="w-full border rounded-lg p-3"

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

            className="w-full border rounded-lg p-3"

            value={eventForm.location}

            onChange={e =>
              setEventForm({
                ...eventForm,
                location: e.target.value
              })
            }

          />

          <input

            type="number"

            required

            placeholder="Total Slots"

            className="w-full border rounded-lg p-3"

            value={eventForm.totalSlots}

            onChange={e =>
              setEventForm({
                ...eventForm,
                totalSlots: e.target.value
              })
            }

          />

          <textarea

            placeholder="Description"

            className="w-full border rounded-lg p-3"

            rows="3"

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

            className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 cursor-pointer"

          >

            Create Event

          </button>

        </form>

      </div>

      <div>

        <h3 className="text-2xl font-bold mb-6">

          Active Events

        </h3>

        <div className="space-y-3">

          {events.map(event => (

  <EventCard
    key={event.id}
    event={event}
  />

))}

        </div>

      </div>

    </div>

  );

};

export default EventsTab;