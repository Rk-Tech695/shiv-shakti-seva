import API_BASE_URL
  from '../config/config';

const BookingCard = ({
  booking
}) => {

  return (

    <div className="bg-white border rounded-2xl shadow p-6">

      <div className="flex justify-between gap-4">

        <div>

          <h3 className="text-2xl font-bold text-orange-600">

            {booking.pnr}

          </h3>

          <p>

            {booking.event?.title}

          </p>

          <p>

            Mobile:
            {' '}
            {booking.mobileNumber}

          </p>

          <p>

            Total Persons:
            {' '}
            {booking.totalPersons}

          </p>

          <p className="text-sm text-stone-500">

            {new Date(
              booking.createdAt
            ).toLocaleString()}

          </p>

        </div>

        <button

          onClick={() =>

            window.open(

              `${API_BASE_URL}/api/tickets/${booking.pnr}`

            )

          }

          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer h-fit"

        >

          Download Ticket

        </button>

      </div>

      <table className="w-full mt-5 border-collapse">

        <thead>

          <tr className="bg-stone-100">

            <th className="border p-3">

              Name

            </th>

            <th className="border p-3">

              Age

            </th>

            <th className="border p-3">

              Gender

            </th>

          </tr>

        </thead>

        <tbody>

          {booking.devotees?.map(
            devotee => (

              <tr key={devotee.id}>

                <td className="border p-3">

                  {devotee.name}

                </td>

                <td className="border p-3">

                  {devotee.age}

                </td>

                <td className="border p-3">

                  {devotee.gender}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

};

export default BookingCard;