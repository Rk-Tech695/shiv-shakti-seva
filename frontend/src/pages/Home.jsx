import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import API_BASE_URL from '../config/config';

import axios from 'axios';

const Home = () => {

  const [events, setEvents] =
    useState([]);

  const [currentImage, setCurrentImage] =
    useState(0);

  const [bhavanSettings,setBhavanSettings] = useState(null);  
  
  const [bhavanForm, setBhavanForm] =
  useState({

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

  const heroSlides = [

    {

      image: '/kedarnath.png',

      title: 'Kedarnath Dham',

      subtitle:
        'Land of Divine Himalayas'

    },

    {

      image: '/baidyanath.png',

      title:
        'Baba Baidyanath Dham',

      subtitle:
        'Jyotirlinga of Devotion'

    },

    {

      image: '/kashi.jpg',

      title:
        'Kashi Vishwanath',

      subtitle:
        'City of Mahadev'

    },

    {

      image: '/mahakal.jpg',

      title:
        'Mahakaleshwar',

      subtitle:
        'Temple of Time & Power'

    },

    {

      image: '/somnath.jpg',

      title:
        'Somnath Jyotirlinga',

      subtitle:
        'The Eternal Shrine'

    }

  ];

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentImage(prev =>

          prev ===
          heroSlides.length - 1

            ? 0

            : prev + 1

        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

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

    fetchEvents();
    fetchBhavanSettings();

  }, []);

  return (

    <div className="space-y-16">

      {/* FOUNDATION BANNER */}

      <div className="bg-white border-2 border-orange-600 rounded-xl p-4 text-center shadow-lg">

        <h2 className="text-3xl font-extrabold text-blue-900 uppercase tracking-wide">

          Shiv Shakti Seva Foundation

        </h2>

        <h2 className="text-2xl font-bold text-red-600 mt-2">

          CIN No - U88900CT2026NPL020288

        </h2>

        <p className="text-blue-800 font-bold text-lg mt-2">

          Address - Ward No.13,
          Ring Road No.02,
          Gurusagar Nagar,
          Raipur-492001,
          Chhattisgarh

        </p>

      </div>

      {/* HERO SECTION */}

      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[85vh] flex items-center shadow-2xl">

        {/* BG IMAGE */}

        <img

          src={
            heroSlides[currentImage]
              .image
          }

          alt="Shiv Temple"

          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"

        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 opacity-20 blur-[120px] rounded-full"></div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-3xl px-8 md:px-16 py-20">

          <div className="inline-block px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-200 font-semibold text-sm mb-6 backdrop-blur-md">

            🙏 Har Har Mahadev

          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight">

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500">

              {
                heroSlides[currentImage]
                  .title
              }

            </span>

          </h1>

          <p className="text-xl md:text-2xl text-orange-100 font-semibold mb-6">

            {
              heroSlides[currentImage]
                .subtitle
            }

          </p>

          <p className="text-xl md:text-2xl text-stone-200 leading-relaxed mb-10">

            Join the divine journey
            of devotion, spirituality
            and seva with Shiv Shakti
            Seva Foundation.

          </p>

          <div className="flex flex-wrap gap-4">

            <Link

              to="/donate"

              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all hover:scale-105"

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

        </div>

        {/* SLIDER DOTS */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">

          {heroSlides.map(
            (_, index) => (

              <button

                key={index}

                onClick={() =>
                  setCurrentImage(
                    index
                  )
                }

                className={`w-3 h-3 rounded-full transition-all ${
                  currentImage ===
                  index

                    ? 'bg-orange-400 w-8'

                    : 'bg-white/50'
                }`}

              />

            )
          )}

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

<section className="bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm">

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
      <section className="bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm mb-16">

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