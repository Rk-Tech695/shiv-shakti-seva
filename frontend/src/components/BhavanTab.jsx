import {

    approveBhavanBooking,

    rejectBhavanBooking,
    
    checkoutBooking,

    updateBhavanSettings

} from '../services/adminService';

import {

    createBhavanRoom

} from '../services/adminService';

import { useState } from 'react';


const BhavanTab = ({

    bookings,

    rooms,

}) => {

    const [bookingEnabled,
  setBookingEnabled] =
  useState(true);

    const [bookingMessage,
    setBookingMessage] =
  useState('');

    const [selectedBooking,
        setSelectedBooking] =
        useState(null);

    const [statusFilter,
        setStatusFilter] =
        useState('ALL');

    const [search,
        setSearch] =
        useState('');

    const [roomForm,
        setRoomForm] =
        useState({

            name: '',

            type: '',

            totalBeds: '',

            isHall: false

        });

    const handleApprove =
        async (bookingId, roomId) => {

            if (!roomId) {

                return alert(
                    'Select room first'
                );

            }

            try {

                await approveBhavanBooking({

                    bookingId,

                    roomId

                });

                window.location.reload();

            } catch (error) {

                console.log(error);

            }

        };

    const handleReject =
        async id => {

            try {

                await rejectBhavanBooking(id);

                window.location.reload();

            } catch (error) {

                console.log(error);

            }

        };

    const handleCreateRoom =
        async e => {

            e.preventDefault();

            try {

                await createBhavanRoom(
                    roomForm
                );

                alert(
                    'Room Created Successfully'
                );

                window.location.reload();

            } catch (error) {

                console.log(error);

                alert(
                    'Failed To Create Room'
                );

            }

        };

    const handleCheckout =
  async bookingId => {

    try {

      await checkoutBooking(
        bookingId
      );

      alert(
        'Checkout Complete'
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };   
  
const handleUpdateSettings =
  async () => {

    try {

      await updateBhavanSettings({

        bhavanBookingEnabled:
          bookingEnabled,

        bhavanBookingMessage:
          bookingMessage

      });

      alert(
        'Settings Updated'
      );

    } catch (error) {

      console.log(error);

    }

  };  

    return (

        <div className="space-y-10">

            <div className="bg-white rounded-3xl border border-stone-200 p-7 shadow-sm">

  <h2 className="text-3xl font-extrabold mb-6">

    Bhavan Booking Control

  </h2>

  <div className="space-y-5">

    <div className="flex items-center gap-4">

      <input

        type="checkbox"

        checked={bookingEnabled}

        onChange={e =>
          setBookingEnabled(
            e.target.checked
          )
        }

      />

      <label className="font-bold">

        Enable Bhavan Booking

      </label>

    </div>

    <textarea

      placeholder="Booking Closed Message"

      className="w-full border border-stone-200 rounded-2xl p-4"

      rows="4"

      value={bookingMessage}

      onChange={e =>
        setBookingMessage(
          e.target.value
        )
      }

    />

    <button

  onClick={handleUpdateSettings}

  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold"

>

  Save Settings

</button>

  </div>

</div>

            {/* CREATE ROOM */}

            <div className="bg-white rounded-3xl border border-stone-200 p-7 shadow-sm">

                <h2 className="text-3xl font-extrabold mb-6">

                    Create Room / Hall

                </h2>

                <form

                    onSubmit={handleCreateRoom}

                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"

                >

                    <input

                        type="text"

                        required

                        placeholder="Room Name"

                        className="border border-stone-200 rounded-2xl p-4"

                        value={roomForm.name}

                        onChange={e =>

                            setRoomForm({

                                ...roomForm,

                                name: e.target.value

                            })

                        }

                    />

                    <input

                        type="text"

                        required

                        placeholder="Room Type"

                        className="border border-stone-200 rounded-2xl p-4"

                        value={roomForm.type}

                        onChange={e =>

                            setRoomForm({

                                ...roomForm,

                                type: e.target.value

                            })

                        }

                    />

                    <input

                        type="number"

                        required

                        placeholder="Total Beds"

                        className="border border-stone-200 rounded-2xl p-4"

                        value={roomForm.totalBeds}

                        onChange={e =>

                            setRoomForm({

                                ...roomForm,

                                totalBeds: e.target.value

                            })

                        }

                    />

                    <div className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            checked={roomForm.isHall}

                            onChange={e =>

                                setRoomForm({

                                    ...roomForm,

                                    isHall: e.target.checked

                                })

                            }

                        />

                        <label className="font-semibold">

                            Is Hall

                        </label>

                    </div>

                    <button

                        type="submit"

                        className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold"

                    >

                        Create Room / Hall

                    </button>

                </form>

            </div>

            {/* ROOM STATUS */}

            <div>

                <h2 className="text-3xl font-extrabold mb-6">

                    Bhavan Rooms Status

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {rooms.map(room => {

                        const availableBeds =
                            room.totalBeds -
                            room.occupiedBeds;

                        return (

                            <div

                                key={room.id}

                                className={`rounded-3xl border p-6 shadow-sm ${availableBeds > 0
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-red-50 border-red-200'
                                    }`}

                            >

                                <h3 className="text-2xl font-bold">

                                    {room.name}

                                </h3>

                                <p className="mt-2 text-stone-600">

                                    {room.type}

                                </p>

                                <div className="mt-3 flex gap-3 flex-wrap">

                                    {room.isHall ? (

                                        <span className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold">

                                            HALL

                                        </span>

                                    ) : (

                                        <span className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full font-bold">

                                            ROOM

                                        </span>

                                    )}

                                    {availableBeds > 0 ? (

                                        <span className="bg-green-600 text-white text-xs px-4 py-2 rounded-full font-bold">

                                            AVAILABLE

                                        </span>

                                    ) : (

                                        <span className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold">

                                            FULL

                                        </span>

                                    )}

                                </div>

                                <p className="mt-3 font-semibold">

                                    Total Beds:
                                    {' '}
                                    {room.totalBeds}

                                </p>

                                <p className="font-semibold">

                                    Occupied:
                                    {' '}
                                    {room.occupiedBeds}

                                </p>

                                <p className="font-bold mt-2">

                                    Available:
                                    {' '}
                                    {availableBeds}

                                </p>

                                <div className="mt-4">

                                    <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">

                                        <div

                                            className={`h-full ${room.occupiedBeds ===
                                                    room.totalBeds

                                                    ? 'bg-red-500'

                                                    : 'bg-green-500'
                                                }`}

                                            style={{

                                                width: `${(room.occupiedBeds /
                                                        room.totalBeds)

                                                    * 100
                                                    }%`

                                            }}

                                        />

                                    </div>

                                </div>

                                <div className="mt-4">

                                    {availableBeds > 0 ? (

                                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">

                                            AVAILABLE

                                        </span>

                                    ) : (

                                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">

                                            FULL

                                        </span>

                                    )}

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

            {/* BOOKINGS */}

            <div className="flex gap-3 flex-wrap mb-6">

                {[
                    'ALL',
                    'PENDING',
                    'APPROVED',
                    'REJECTED'
                ].map(status => (

                    <button

                        key={status}

                        onClick={() =>
                            setStatusFilter(status)
                        }

                        className={`px-5 py-3 rounded-2xl font-bold ${statusFilter === status
                                ? 'bg-orange-500 text-white'
                                : 'bg-stone-200 text-stone-700'
                            }`}

                    >

                        {status}

                    </button>


                ))}


                <input

                    type="text"

                    placeholder="Search Mobile / Group Name"

                    className="w-full border border-stone-200 rounded-2xl p-4 mb-6"

                    value={search}

                    onChange={e =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            <div>

                <h2 className="text-3xl font-extrabold mb-6">

                    {statusFilter === 'ALL' &&
                        'All Bhavan Bookings'}

                    {statusFilter === 'PENDING' &&
                        'Pending Bhavan Bookings'}

                    {statusFilter === 'APPROVED' &&
                        'Approved Bhavan Bookings'}

                    {statusFilter === 'REJECTED' &&
                        'Rejected Bhavan Bookings'}

                </h2>

                <div className="space-y-6">

                    {bookings

                        .filter(booking =>

                            statusFilter === 'ALL'
                                ? true
                                : booking.status ===
                                statusFilter

                        )

                        .filter(booking =>

                            booking.mobileNumber
                                .includes(search)

                            ||

                            booking.groupName
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )

                        )

                        .map(booking => (

                            <div

                                key={booking.id}

                                className="bg-white rounded-3xl border border-stone-200 p-7 shadow-sm"

                            >

                                {/* TOP */}

                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                                    <div className="space-y-2">

                                        <div className="space-y-3">

  <div>

    {booking.status === 'PENDING' && (

      <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">

        PENDING

      </span>

    )}

    {booking.status === 'APPROVED' && (

      <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">

        APPROVED

      </span>

    )}

    {booking.status === 'REJECTED' && (

      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">

        REJECTED

      </span>

    )}

  </div>

  <h3 className="text-2xl font-bold text-stone-900">

    {

      booking.groupName ||

      'Individual Booking'

    }

  </h3>

</div>

                                        <p className="text-stone-600">

                                            📞
                                            {' '}
                                            {booking.mobileNumber}

                                        </p>

                                        <p className="text-stone-600">

                                            👥
                                            {' '}
                                            {booking.totalPersons}
                                            {' '}
                                            Persons

                                        </p>

                                        <p className="text-stone-600">

                                            🚹
                                            {' '}
                                            {booking.totalMales}
                                            {' '}
                                            Males

                                            {' '}|{' '}

                                            🚺
                                            {' '}
                                            {booking.totalFemales}
                                            {' '}
                                            Females

                                        </p>

                                        <p className="text-stone-600">

                                            🪔 Jal Date:
                                            {' '}

                                            {new Date(

                                                booking.jalDate

                                            ).toLocaleDateString()}

                                        </p>

                                        <p className="text-stone-600">

                                            🏠 Arrival:
                                            {' '}

                                            {new Date(

                                                booking.arrivalDate

                                            ).toLocaleDateString()}

                                        </p>

                                        <p className="text-stone-600">

                                            🚪 Departure:
                                            {' '}

                                            {new Date(

                                                booking.departureDate

                                            ).toLocaleDateString()}

                                        </p>

                                        {booking.note && (

                                            <p className="text-stone-700 mt-3">

                                                📝
                                                {' '}
                                                {booking.note}

                                            </p>

                                        )}

                                    </div>

                                    {/* RIGHT */}

                                    <div className="w-full lg:w-80 space-y-4">

                                        <div>

                                            <label className="block text-sm font-bold mb-2">

                                                Assign Room

                                            </label>

                                            {booking.totalPersons > 10 && (

                                                <p className="text-red-600 font-bold text-sm mb-3">

                                                    Large Group — Prefer Hall

                                                </p>

                                            )}

                                            <select

                                                id={`room-${booking.id}`}

                                                className="w-full border border-stone-200 rounded-xl p-4"

                                            >

                                                <option value="">

                                                    Select Room

                                                </option>

                                                {rooms
                                                    .filter(

                                                        room =>

                                                            room.totalBeds -

                                                            room.occupiedBeds >=

                                                            booking.totalPersons

                                                    )
                                                    .map(room => (

                                                        <option

                                                            key={room.id}

                                                            value={room.id}

                                                        >

                                                            {room.name}
                                                            {' '}
                                                            (
                                                            {room.totalBeds -
                                                                room.occupiedBeds}
                                                            {' '}
                                                            beds left)

                                                        </option>

                                                    ))}

                                            </select>

                                        </div>

                                        {/* ACTIONS */}

                                        <div className="flex flex-col gap-3">
                                            <button

                                                onClick={() =>
                                                    setSelectedBooking(
                                                        booking
                                                    )
                                                }

                                                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold"

                                            >

                                                View Details

                                            </button>

                                            {booking.status ===
                                                'PENDING' && (
                                                    <button

                                                        onClick={() => {

                                                            const roomId =
                                                                document.getElementById(

                                                                    `room-${booking.id}`

                                                                ).value;

                                                            handleApprove(

                                                                booking.id,

                                                                roomId

                                                            );

                                                        }}

                                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl"

                                                    >

                                                        Approve Booking

                                                    </button>
                                                )}



                                            {booking.status ===
                                                'PENDING' && (

                                                    <button

                                                        onClick={() =>
                                                            handleReject(
                                                                booking.id
                                                            )
                                                        }

                                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl"

                                                    >

                                                        Reject Booking

                                                    </button>

                                                )}

                                            {booking.status ===
                                                'APPROVED' && (

                                                    <button

                                                        onClick={() =>
                                                            handleCheckout(
                                                            booking.id
                                                            )
                                                        }

                                                        className="bg-stone-900 text-white py-3 rounded-xl font-bold"

                                                        >

                                                        Checkout

                                                        </button>

                                                )}

                                            <a

                                                href={`https://wa.me/91${booking.mobileNumber}`}

                                                target="_blank"

                                                rel="noreferrer"

                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-center"

                                            >

                                                WhatsApp Contact

                                            </a>

                                        </div>

                                    </div>

                                </div>

                                {/* DEVOTEES */}

                                <div className="mt-8">

                                    <h4 className="text-xl font-bold mb-4">

                                        Yatri Details

                                    </h4>

                                    <div className="overflow-x-auto">

                                        <table className="w-full border-collapse">

                                            <thead>

                                                <tr className="bg-stone-100">

                                                    <th className="p-3 text-left">

                                                        Name

                                                    </th>

                                                    <th className="p-3 text-left">

                                                        Gender

                                                    </th>

                                                    <th className="p-3 text-left">

                                                        Age

                                                    </th>

                                                    <th className="p-3 text-left">

                                                        Mobile

                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {booking.devotees.map(

                                                    devotee => (

                                                        <tr
                                                            key={devotee.id}
                                                            className="border-b"
                                                        >

                                                            <td className="p-3">

                                                                {devotee.name}

                                                            </td>

                                                            <td className="p-3">

                                                                {devotee.gender}

                                                            </td>

                                                            <td className="p-3">

                                                                {devotee.age}

                                                            </td>

                                                            <td className="p-3">

                                                                {

                                                                    devotee.mobile ||

                                                                    '-'

                                                                }

                                                            </td>

                                                        </tr>

                                                    )

                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>

                        ))}

                </div>

            </div>
            {selectedBooking && (

                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">

                    <div className="bg-white rounded-3xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-3xl font-extrabold">

                                Booking Details

                            </h2>

                            <button

                                onClick={() =>
                                    setSelectedBooking(null)
                                }

                                className="text-red-500 font-bold text-xl"

                            >

                                ✕

                            </button>

                        </div>

                        <div className="space-y-4">

                            <p>

                                <span className="font-bold">

                                    Group:

                                </span>

                                {' '}

                                {selectedBooking.groupName || 'N/A'}

                            </p>

                            <p>

                                <span className="font-bold">

                                    Mobile:

                                </span>

                                {' '}

                                {selectedBooking.mobileNumber}

                            </p>

                            <p>

                                <span className="font-bold">

                                    Total Persons:

                                </span>

                                {' '}

                                {selectedBooking.totalPersons}

                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-5">

                                Yatri Details

                            </h3>

                            <div className="space-y-4">

                                {selectedBooking.devotees?.map(
                                    (devotee, index) => (

                                        <div

                                            key={index}

                                            className="border border-stone-200 rounded-2xl p-5"

                                        >

                                            <p>

                                                <span className="font-bold">

                                                    Name:

                                                </span>

                                                {' '}

                                                {devotee.name}

                                            </p>

                                            <p>

                                                <span className="font-bold">

                                                    Gender:

                                                </span>

                                                {' '}

                                                {devotee.gender}

                                            </p>

                                            <p>

                                                <span className="font-bold">

                                                    Age:

                                                </span>

                                                {' '}

                                                {devotee.age}

                                            </p>

                                            <p>

                                                <span className="font-bold">

                                                    Mobile:

                                                </span>

                                                {' '}

                                                {devotee.mobile || 'N/A'}

                                            </p>

                                        </div>

                                    )
                                )}

                            </div>
                            <button

                                onClick={() =>
                                    window.print()
                                }

                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold mt-6"

                            >

                                Print Booking Slip

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default BhavanTab;