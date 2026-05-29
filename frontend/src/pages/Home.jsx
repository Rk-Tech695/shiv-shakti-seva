import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import API_BASE_URL from '../config/config';

import axios from 'axios';

const Home = () => {

  const [events, setEvents] =useState([]);

  const [donationData, setDonationData] = useState(null);

  const [bhavanSettings,setBhavanSettings] = useState(null);  
  
  const [bhavanForm, setBhavanForm] = useState({

    groupName: '',

    mobileNumber: '',

    totalPersons: '',

    totalMales: '',

    totalFemales: '',

    jalDate: '',

    arrivalDate: '',

    departureDate: '',

    note: '',

    devotees: [

      {

        name: '',

        gender: 'Male',

        age: '',

        dob: '',

        mobile: ''

      }

    ]

  });  

  const addDevotee = () => {

  setBhavanForm({

    ...bhavanForm,

    devotees: [

      ...bhavanForm.devotees,

      {

        name: '',

        gender: 'Male',

        age: '',

        dob: '',

        mobile: ''

      }

    ]

  });

};


const handleDevoteeChange = (
  index,
  field,
  value
) => {

  setBhavanForm(prev => {

    const updated =
      [...prev.devotees];

    updated[index] = {

      ...updated[index],

      [field]: value

    };

    return {

      ...prev,

      devotees: updated

    };

  });

};

const handleBhavanBooking =
  async e => {

    e.preventDefault();

    try {

      await axios.post(

        `${API_BASE_URL}/api/bhavan/booking`,

        bhavanForm

      );

      alert(
        'Booking Request Submitted'
      );

      setBhavanForm({

        groupName: '',

        mobileNumber: '',

        totalPersons: '',

        totalMales: '',

        totalFemales: '',

        jalDate: '',

        arrivalDate: '',

        departureDate: '',

        note: '',

        devotees: [

          {

            name: '',

            gender: 'Male',

            age: '',

            dob: '',

            mobile: ''

          }

        ]

      });

    } catch (error) {

      console.log(error);

      alert('Booking Failed');

    }

  };


  const fetchEvents =
    async () => {

      try {

        const res =
          await axios.get(

            `${API_BASE_URL}/api/events`

          );

        setEvents(res.data);

      } catch (error) {

        console.log(error);

      }

  };

  const fetchDonationData =
  async () => {

    try {

      const res =
        await axios.get(

          `${API_BASE_URL}/api/donations/live`

        );

      setDonationData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

    const fetchBhavanSettings =
  async () => {

    try {

      const res =
        await axios.get(

          `${API_BASE_URL}/api/bhavan/settings`

        );

      setBhavanSettings(
        res.data.setting
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

  fetchDonationData();

  const interval =
    setInterval(() => {

      fetchDonationData();

    }, 5000);

  return () =>
    clearInterval(interval);

}, []);

  useEffect(() => {

    fetchEvents();
    fetchBhavanSettings();

  }, []);

  return (

    <div className="space-y-16">

      {/* FOUNDATION BANNER */}

      

      {/* HERO SECTION */}

      <section className="relative w-screen min-h-[78vh] overflow-hidden">

  {/* BACKGROUND IMAGE */}

  <img
    src="/baidyanath.png"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* OVERLAY */}

  <div className="absolute inset-0 bg-gradient-to-r from-[#4a1204]/95 via-[#6b1806]/70 to-[#3b0d02]/40"></div>

  {/* CONTENT */}

  <div className="relative z-10 w-full min-h-[78vh] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 px-8 lg:px-24 py-6">

    {/* LEFT SIDE */}

    <div className="flex flex-col justify-center">

      {/* LIVE BADGE */}

      <div className="flex items-center gap-4 mb-6">

        {/* <div className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">

          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>

          LIVE

        </div> */}

        <p className="text-orange-100 text-lg font-medium">

          Har Har Mahadev 

        </p>

      </div>

      {/* MAIN TITLE */}

      <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-white leading-[0.9]">

        SHIV SHAKTI
        <br />
        SEVA FOUNDATION

      </h1>

      {/* SUBTITLE */}

      <p className="mt-4 text-2xl lg:text-3xl text-orange-300 font-bold">

        Nishulk Kanwar
        Yatri Seva Kendra

      </p>

      {/* DESCRIPTION */}

      <p className="mt-4 text-base lg:text-lg leading-7 text-orange-50 max-w-xl">

        Serving thousands of
        Kanwar Yatris on
        Devghar Kanwar Marg
        with free stay, food,
        medical seva and
        drinking water facilities.

      </p>

      {/* BUTTONS */}

      <div className="mt-5 flex flex-wrap gap-3">

        <Link
          to="/donate"
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all hover:scale-105"
        >

          Donate Now

        </Link>

        <button

              onClick={() => {

                document
                  .getElementById(
                    'events'
                  )
                  ?.scrollIntoView({

                    behavior:
                      'smooth'

                  });

              }}

              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition"

            >

              Explore Events

            </button>

      </div>

      {/* LIVE DONATION POPUP */}

      <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5 max-w-md">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-2xl shadow-lg">

            🙏

          </div>

          <div>

            <p className="text-xl font-bold text-white">

              {
                donationData
                  ?.latestDonations?.[0]
                  ?.user?.name || 'Devotee'
              }

            </p>

            <p className="text-orange-100">

              just donated

              <span className="font-bold text-yellow-300 ml-2">

                ₹{
                  donationData
                    ?.latestDonations?.[0]
                    ?.amount || 0
                }

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="flex items-center justify-center">

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-[420px] scale-[0.82] origin-center">

        {/* HEADER */}

        <div className="bg-[#f8f4ee] px-6 py-4 border-b">

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-full text-sm font-medium  mb-4 shadow">

            ✅ Government Recognized • 80G & 12A Tax Free

          </div>

          <h2 className="text-2xl font-extrabold text-stone-800 leading-tight">

            Digital Donation Counter

          </h2>

          <p className="text-stone-500 mt-2">

            Real-time donation tracker

          </p>

        </div>

        {/* BODY */}

        <div className="p-4">

          {/* AMOUNT */}

          <h2 className="text-4xl lg:text-5xl font-extrabold text-red-600 text-center">

            ₹{
              donationData?.totalRaised?.toLocaleString()
            }

          </h2>

          <p className="text-center text-orange-500 text-2xl mt-4 font-semibold">

            Raised So Far

          </p>

          {/* PROGRESS */}

          <div className="mt-4 bg-[#fff5ee] rounded-2xl p-3">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-stone-500">

        Total Donors

      </p>

      <h3 className="text-3xl font-extrabold text-red-600 mt-1">

        {
          donationData?.totalDonors || 0
        }

      </h3>

    </div>

    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-3xl text-white shadow-lg">

      🤍

    </div>

  </div>

</div>

          {/* LIVE FEED */}

          <div className="mt-6 bg-[#f8f4ee] rounded-2xl p-4">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <p className="font-semibold text-stone-700">

                Latest Donation

              </p>

            </div>

            <p className="text-lg lg:text-xl text-stone-700 leading-8">

              <span className="font-extrabold text-red-600">

                ₹{
                  donationData
                    ?.latestDonations?.[0]
                    ?.amount || 0
                }

              </span>
              

              donated by

              <span className="font-bold ml-2">

                {
                  donationData
                    ?.latestDonations?.[0]
                    ?.user?.name || 'Devotee'
                }

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* TRUSTEE */}

      {/* <section className="py-12 bg-white rounded-[2.5rem] p-10 shadow-lg border border-stone-100 flex flex-col md:flex-row items-center gap-8">

        <div className="w-48 h-48 rounded-full bg-stone-200 overflow-hidden shadow-inner border-4 border-orange-100">

          <img

            src="https://via.placeholder.com/200?text=Trustee+Photo"

            alt="Trustee"

            className="w-full h-full object-cover"

          />

        </div>

        <div>

          <h2 className="text-3xl font-extrabold text-stone-900 mb-2">

            Shri Dummy Sharma

          </h2>

          <p className="text-orange-600 font-bold text-xl mb-4">

            Founder & Chief Trustee

          </p>

          <p className="text-stone-600 text-lg mb-4">

            Dedicated to the service
            of Lord Shiva and humanity.

          </p>

          <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg font-semibold text-stone-800">

            📞 +91 98765 43210

          </div>

        </div>

      </section> */}

      {/* ABOUT US */}

<section className="bg-white rounded-[2.5rem] p-8 lg:p-14 border border-stone-200 shadow-xl mx-6 mt-20">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* LEFT */}

    <div>

      <div className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-bold mb-5">

        ABOUT US

      </div>

      <h2 className="text-5xl font-extrabold text-stone-900 leading-tight">

        कांवरिया सेवा ही
        सच्ची शिव सेवा है

      </h2>

      <p className="mt-6 text-lg leading-9 text-stone-600">

        शिव शक्ति सेवा फाउंडेशन एक
        गैर-लाभकारी संस्था है जिसका
        उद्देश्य सुल्तानगंज से
        देवघर जाने वाले कांवर यात्रियों
        की सेवा करना है।

      </p>

      <p className="mt-5 text-lg leading-9 text-stone-600">

        संस्था द्वारा कांवर यात्रियों
        के लिए निःशुल्क विश्राम,
        भोजन, पेयजल और चिकित्सा
        सुविधा हेतु विशाल सेवा भवन
        का निर्माण कराया जा रहा है।

      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

          <h3 className="font-extrabold text-orange-600 text-2xl">

            Free

          </h3>

          <p className="mt-2 text-stone-600">

            Vishram Facility

          </p>

        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

          <h3 className="font-extrabold text-orange-600 text-2xl">

            24x7

          </h3>

          <p className="mt-2 text-stone-600">

            Seva & Support

          </p>

        </div>

      </div>

    </div>

    {/* RIGHT */}

    <div className="space-y-5">

      <img
        src="/construction1.jpeg"
        alt="Construction"
        className="w-full h-72 object-cover rounded-3xl shadow-lg"
      />

      <div className="grid grid-cols-2 gap-5">

        <img
          src="/construction2.jpeg"
          alt="Construction"
          className="w-full h-52 object-cover rounded-3xl shadow-lg"
        />

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white flex flex-col justify-center">

          <h3 className="text-4xl font-extrabold">

            Seva
            Bhavan

          </h3>

          <p className="mt-4 leading-7 text-orange-100">

            Under Construction
            for Kawar Yatris

          </p>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* Bhavan */}
      <section className="bg-white rounded-[2.5rem] p-8 lg:p-14 border border-stone-200 shadow-xl mx-6 mt-20 mb-20">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

    {/* LEFT */}

    <div>

      <h2 className="text-5xl font-extrabold text-stone-900 leading-tight">

        🛕 Kawar Yatri
        Vishram Bhavan

      </h2>

      <p className="mt-6 text-stone-600 leading-8 text-lg">

        Shiv Shakti Seva Foundation
        is building a free Bhavan
        facility for Kawar Yatris
        travelling from
        Sultanganj to Devghar.

      </p>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-orange-500" />

          <p className="text-stone-700 font-medium">

            Free Stay Facility

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-orange-500" />

          <p className="text-stone-700 font-medium">

            Hall & Room Facility

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-orange-500" />

          <p className="text-stone-700 font-medium">

            Safe Drinking Water

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-orange-500" />

          <p className="text-stone-700 font-medium">

            Seva For Mahadev Bhakts

          </p>

        </div>

      </div>

    </div>

    {/* RIGHT */}

    <div className="bg-stone-50 rounded-3xl border border-stone-200 p-7">

      <h3 className="text-3xl font-bold text-stone-900 mb-6">

        Bhavan Booking

      </h3>

      {/* FORM YAHA AAYEGA */}

     {bhavanSettings
  ?.bhavanBookingEnabled ? (

  <form
    onSubmit={handleBhavanBooking}
    className="space-y-4"
  >

    <input
    type="text"
    placeholder="Group / Family Name (Optional)"
    className="w-full border border-stone-200 rounded-xl p-4"
    value={bhavanForm.groupName}
    onChange={e =>
      setBhavanForm({
        ...bhavanForm,
        groupName: e.target.value
      })
    }
  />

  <input
    type="text"
    required
    placeholder="Mobile Number"
    className="w-full border border-stone-200 rounded-xl p-4"
    value={bhavanForm.mobileNumber}
    onChange={e =>
      setBhavanForm({
        ...bhavanForm,
        mobileNumber: e.target.value
      })
    }
  />

  <div className="grid grid-cols-3 gap-3">

    <input
      type="text"
      inputMode="numeric"
      required
      placeholder="Persons"
      className="border border-stone-200 rounded-xl p-4"
      value={bhavanForm.totalPersons}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          totalPersons: e.target.value
        })
      }
    />

    <input
      type="text"
      inputMode="numeric"
      required
      placeholder="Males"
      className="border border-stone-200 rounded-xl p-4"
      value={bhavanForm.totalMales}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          totalMales: e.target.value
        })
      }
    />

    <input
      type="text" 
      inputMode="numeric"
      required
      placeholder="Females"
      className="border border-stone-200 rounded-xl p-4"
      value={bhavanForm.totalFemales}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          totalFemales: e.target.value
        })
      }
    />

  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

  <div className="w-full">

    <label className="block text-sm font-bold mb-2 text-stone-700">

      Jal Uthane Ki Date

    </label>

    <input
      type="date"
      required
      className="w-full border border-stone-200 rounded-xl p-4"
      value={bhavanForm.jalDate}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          jalDate: e.target.value
        })
      }
    />

  </div>

  <div className="w-full">

    <label className="block text-sm font-bold mb-2 text-stone-700">

      Bhavan Arrival Date

    </label>

    <input
      type="date"
      required
      className="w-full border border-stone-200 rounded-xl p-4"
      value={bhavanForm.arrivalDate}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          arrivalDate: e.target.value
        })
      }
    />

  </div>

  <div className="w-full">

    <label className="block text-sm font-bold mb-2 text-stone-700">

      Bhavan Dep. Date

    </label>

    <input
      type="date"
      required
      className="w-full border border-stone-200 rounded-xl p-4"
      value={bhavanForm.departureDate}
      onChange={e =>
        setBhavanForm({
          ...bhavanForm,
          departureDate: e.target.value
        })
      }
    />

  </div>

</div>
  <div className="pt-4">

  <div className="flex items-center justify-between mb-5">

    <h4 className="text-2xl font-bold text-stone-900">

      Yatri Details

    </h4>

    <button

      type="button"

      onClick={addDevotee}

      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold"

    >

      + Add Yatri

    </button>

  </div>

  <div className="space-y-5">

    {bhavanForm.devotees.map(

      (devotee, index) => (

        <div

          key={index}

          className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4"

        >

          <div className="flex items-center justify-between">

            <h5 className="font-bold text-lg text-stone-800">

              Yatri #{index + 1}

            </h5>

            {bhavanForm.devotees.length > 1 && (

              <button

                type="button"

                onClick={() => {

                  const updated =
                    [...bhavanForm.devotees];

                  updated.splice(index, 1);

                  setBhavanForm({

                    ...bhavanForm,

                    devotees: updated

                  });

                }}

                className="text-red-500 font-bold"

              >

                Remove

              </button>

            )}

          </div>

          <input

            type="text"

            required

            placeholder="Full Name"

            className="w-full border border-stone-200 rounded-xl p-4"

            value={devotee.name}

            onChange={e =>

              handleDevoteeChange(

                index,

                'name',

                e.target.value

              )

            }

          />

          <div className="grid grid-cols-2 gap-4">

            <select

              className="border border-stone-200 rounded-xl p-4"

              value={devotee.gender}

              onChange={e =>

                handleDevoteeChange(

                  index,

                  'gender',

                  e.target.value

                )

              }

            >

              <option value="Male">

                Male

              </option>

              <option value="Female">

                Female

              </option>

            </select>

            <input

              type="text"
              inputMode="numeric"
              required

              placeholder="Age"

              className="border border-stone-200 rounded-xl p-4"

              value={devotee.age}

              onChange={e =>

                handleDevoteeChange(

                  index,

                  'age',

                  e.target.value

                )

              }

            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input

              type="date"

              className="border border-stone-200 rounded-xl p-4"

              value={devotee.dob}

              onChange={e =>

                handleDevoteeChange(

                  index,

                  'dob',

                  e.target.value

                )

              }

            />

            <input

              type="text"

              placeholder="Mobile Number"

              className="border border-stone-200 rounded-xl p-4"

              value={devotee.mobile}

              onChange={e =>

                handleDevoteeChange(

                  index,

                  'mobile',

                  e.target.value

                )

              }

            />

          </div>

        </div>

      )

    )}

  </div>

</div>

  <textarea
    placeholder="Additional Note"
    className="w-full border border-stone-200 rounded-xl p-4"
    rows="4"
    value={bhavanForm.note}
    onChange={e =>
      setBhavanForm({
        ...bhavanForm,
        note: e.target.value
      })
    }
  />

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold"
  >

    Submit Booking Request

  </button>

</form>

) : (

  <div className="bg-red-50 border border-red-200 rounded-3xl p-8">

    <h3 className="text-2xl font-bold text-red-700">

      Booking Temporarily Closed

    </h3>

    <p className="mt-4 text-red-600 leading-7">

      {

        bhavanSettings
          ?.bhavanBookingMessage

      }

    </p>

  </div>

)}

  

</div>

</div>

</section>



   

      {/* EVENTS */}

      <section
        id="events"
        className="py-12"
      >

        <div className="text-center mb-12">

          <h2 className="text-4xl font-extrabold text-stone-900 mb-4">

            Upcoming Programs

          </h2>

          <p className="text-stone-500 text-lg">

            Join Baba ka Darbar
            and experience the
            divine energy.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {events.length === 0 ? (

            <p className="text-center text-stone-500 col-span-3">

              No upcoming events
              scheduled yet.

            </p>

          ) : (

            events.map(event => (

              <div

                key={event.id}

                className="bg-white rounded-3xl p-8 shadow border border-stone-100 relative overflow-hidden"

              >

                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-red-500"></div>

                {event.bannerImage && (

                  <img

                    src={event.bannerImage}

                    alt={event.title}

                    className="w-full h-56 object-cover rounded-2xl mb-6"

                  />

                )}

                <h3 className="text-2xl font-bold text-stone-900 mb-3">

                  {event.title}

                </h3>

                <p className="text-stone-600 mb-6 leading-7">

                  {event.description}

                </p>

                <div className="flex justify-between items-center bg-stone-50 p-4 rounded-xl">

                  <div>

                    <p className="text-xs text-stone-500 uppercase font-bold mb-1">

                      Date

                    </p>

                    <p className="font-semibold text-stone-900">

                      {new Date(
                        event.eventDate
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-stone-500 uppercase font-bold mb-1">

                      Location

                    </p>

                    <p className="font-semibold text-stone-900">

                      {event.location}

                    </p>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>

  );

};

export default Home;