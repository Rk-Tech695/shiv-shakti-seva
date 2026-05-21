// import { useState, useEffect } from 'react';
// import  API_BASE_URL  from '../config/config.js';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
//   const [activeTab, setActiveTab] = useState('DANDATA');
//   const [donors, setDonors] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [bookings, setBookings] = useState([]);

// const [pnrSearch, setPnrSearch] = useState('');
  
//   const [finances, setFinances] = useState({ cashAvailable: 0, bankAvailable: 0, expenses: [], donations: [] });
//   const [expenseForm, setExpenseForm] = useState({ amount: '', purpose: '', sourceType: 'CASH', handledBy: '' });
//   const [eventForm, setEventForm] = useState({

//   title: '',

//   description: '',

//   eventDate: '',

//   location: '',

//   totalSlots: 100

// });

//   useEffect(() => {

//   const isAdminLoggedIn =
//     localStorage.getItem('adminLoggedIn');

//   if (isAdminLoggedIn === 'true') {

//     setIsLoggedIn(true);

//   }

// }, []);

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchData();
//     }
//   }, [isLoggedIn]);

//   const fetchData = async () => {

//   try {

//     const [

//       donorsRes,

//       financeRes,

//       eventsRes,

//       bookingsRes

//     ] = await Promise.all([

//       axios.get(
//         `${API_BASE_URL}/api/users`
//       ),

//       axios.get(
//         `${API_BASE_URL}/api/finances`
//       ),

//       axios.get(
//         `${API_BASE_URL}/api/events`
//       ),

//       axios.get(
//         `${API_BASE_URL}/api/booking-groups`
//       )

//     ]);

//     setDonors(donorsRes.data);

//     setFinances(financeRes.data);

//     setEvents(eventsRes.data);

//     setBookings(
//       bookingsRes.data.bookings
//     );

//   } catch (error) {

//     console.log(error);

//   }

// };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/admin/login`, loginForm);
//       if (res.data.success) {
//         localStorage.setItem(
//   'adminLoggedIn',
//   'true'
// );

// setIsLoggedIn(true);
//       }
//     } catch(err) {
//       alert('Invalid ID or Password');
//     }
//   };

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE_URL}/api/expenses`, expenseForm);
//       alert('Expense recorded successfully');
//       setExpenseForm({ amount: '', purpose: '', sourceType: 'CASH', handledBy: '' });
//       fetchData();
//     } catch(err) {
//       alert('Error recording expense');
//     }
//   };

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE_URL}/api/events`, eventForm);
//       alert('Event added successfully');
//       setEventForm({

//   title: '',

//   description: '',

//   eventDate: '',

//   location: '',

//   totalSlots: 100

// });
//       fetchData();
//     } catch(err) {
//       alert('Error adding event');
//     }
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-stone-100">
//           <h2 className="text-3xl font-extrabold text-stone-900 mb-6 text-center">Admin Login</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-bold text-stone-700 mb-1">ID / Username</label>
//               <input type="text" required className="w-full border rounded-lg p-3" value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-stone-700 mb-1">Password</label>
//               <input type="password" required className="w-full border rounded-lg p-3" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
//             </div>
//             <button type="submit" className="w-full bg-stone-900 text-white font-bold py-3 rounded-lg hover:bg-orange-600">Secure Login</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-[2.5rem] shadow-lg border border-stone-100 overflow-hidden min-h-[80vh]">
//       {/* Admin Header */}
//       <div className="bg-stone-900 p-8 text-white flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold">Admin Portal</h2>
//           <p className="text-stone-400">Manage Foundation Data</p>
//         </div>
//         <button onClick={() => {

//   localStorage.removeItem(
//     'adminLoggedIn'
//   );

//   setIsLoggedIn(false);

// }} className="bg-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-700">Logout</button>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-stone-200">
//         {['DANDATA', 'EXPENSES', 'EVENTS','BOOKINGS'].map(tab => (
//           <button 
//             key={tab} 
//             onClick={() => setActiveTab(tab)}
//             className={`flex-1 py-4 font-bold text-sm tracking-widest uppercase transition-colors ${activeTab === tab ? 'border-b-4 border-orange-500 text-orange-600' : 'text-stone-500 hover:text-stone-800'}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="p-8">
//         {activeTab === 'DANDATA' && (
//           <div>
//             <h3 className="text-2xl font-bold mb-6">Dan Data Master</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-stone-100 text-stone-600 uppercase text-xs tracking-wider">
//                     <th className="p-4 rounded-tl-xl">Name</th>
//                     <th className="p-4">Mobile</th>
//                     <th className="p-4 rounded-tr-xl">Total Donated (₹)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {donors.map(donor => (
//                     <tr key={donor.id} className="border-b border-stone-50 hover:bg-stone-50">
//                       <td className="p-4 font-semibold">{donor.name}</td>
//                       <td className="p-4 text-stone-600">{donor.mobile_number}</td>
//                       <td className="p-4 font-bold text-orange-600">₹{donor.total_donated_amount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === 'EXPENSES' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Foundation Funds</h3>
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
//                   <p className="text-sm font-bold text-green-600 mb-1 uppercase tracking-wider">Available Cash</p>
//                   <p className="text-3xl font-extrabold text-green-900">₹{finances.cashAvailable}</p>
//                 </div>
//                 <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
//                   <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider">Available Bank</p>
//                   <p className="text-3xl font-extrabold text-blue-900">₹{finances.bankAvailable}</p>
//                 </div>
//               </div>

//               <h3 className="text-xl font-bold mb-4">Record New Expense</h3>
//               <form onSubmit={handleAddExpense} className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
//                 <input type="number" required placeholder="Amount (₹)" className="w-full border rounded-lg p-3" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} />
//                 <input type="text" required placeholder="Purpose (e.g. Baba Ki Aarti)" className="w-full border rounded-lg p-3" value={expenseForm.purpose} onChange={e => setExpenseForm({...expenseForm, purpose: e.target.value})} />
//                 <select className="w-full border rounded-lg p-3 bg-white" value={expenseForm.sourceType} onChange={e => setExpenseForm({...expenseForm, sourceType: e.target.value})}>
//                   <option value="CASH">Deduct from CASH</option>
//                   <option value="BANK">Deduct from BANK</option>
//                 </select>
//                 <input type="text" required placeholder="Handled By (Name)" className="w-full border rounded-lg p-3" value={expenseForm.handledBy} onChange={e => setExpenseForm({...expenseForm, handledBy: e.target.value})} />
//                 <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">Deduct Expense</button>
//               </form>
//             </div>
            
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Expense History</h3>
//               <h3 className="text-2xl font-bold mb-6 mt-10">
//   Donation History
// </h3>

// <div className="space-y-3">

//   {finances.donations?.map(donation => (

//     <div
//       key={donation.id}
//       className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm"
//     >

//       <div className="flex justify-between items-center">

//         <div>

//           <p className="font-bold text-stone-900">
//             {donation.user?.name}
//           </p>

//           <p className="text-sm text-stone-500">
//             {donation.user?.mobile_number}
//           </p>

//           <p className="text-sm text-orange-600 mt-1">
//             {donation.paymentMode}
//           </p>

//           {donation.receivedBy && (
//             <p className="text-sm text-blue-600">
//               Received By:
//               {' '}
//               {donation.receivedBy}
//             </p>
//           )}

//         </div>

//         <div className="text-right">

//           <p className="font-bold text-green-600 text-lg">
//             ₹{donation.amount}
//           </p>

//           <p className={`text-xs font-bold ${
//             donation.status === 'SUCCESS'
//               ? 'text-green-600'
//               : 'text-yellow-600'
//           }`}>

//             <div className="flex flex-col items-end gap-2">

//   <p className={`text-xs font-bold ${
//     donation.status === 'SUCCESS'
//       ? 'text-green-600'
//       : 'text-yellow-600'
//   }`}>

//     {donation.status}

//   </p>

//   {donation.status === 'PENDING' && (

//     <button

//       className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg font-bold"

//     >

//       APPROVE

//     </button>

//   )}

// </div>

//           </p>

//         </div>

//       </div>

//     </div>

//   ))}

// </div>
//               <div className="space-y-3">
//                 {finances.expenses.map(exp => (
//                   <div key={exp.id} className="bg-white border border-stone-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
//                     <div>
//                       <p className="font-bold text-stone-900">{exp.purpose}</p>
//                       <p className="text-sm text-stone-500">By: {exp.handledBy} | via {exp.sourceType}</p>
//                     </div>
//                     <div className="font-bold text-red-600">- ₹{exp.amount}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'EVENTS' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Add New Event</h3>
//               <form onSubmit={handleAddEvent} className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
//                 <input type="text" required placeholder="Event Title" className="w-full border rounded-lg p-3" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
//                 <input type="date" required className="w-full border rounded-lg p-3" value={eventForm.eventDate} onChange={e => setEventForm({...eventForm, eventDate: e.target.value})} />
//                 <input type="text" required placeholder="Location" className="w-full border rounded-lg p-3" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
//                 <p className="text-sm text-purple-600 font-bold">

//   Total Bookings:
//   {' '}
//   {event.bookingGroups?.length || 0}

// </p>
//                 <input
//                   type="number"
//                   required
//                   placeholder="Total Slots"
//                   className="w-full border rounded-lg p-3"
//                   value={eventForm.totalSlots}
//                   onChange={e =>
//                     setEventForm({
//                       ...eventForm,
//                       totalSlots: e.target.value
//                     })
//                   }
//                 />
                
//                 <textarea placeholder="Description" className="w-full border rounded-lg p-3" rows="3" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})}></textarea>
//                 <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700">Create Event</button>
//               </form>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Active Events</h3>
//               <div className="space-y-3">
//   {events.map(event => (
//     <div key={event.id} className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm">
//       <h4 className="font-bold text-stone-900">{event.title}</h4>

//       <p className="text-sm text-stone-500">
//         {new Date(event.eventDate).toLocaleDateString()}
//         {' '}at{' '}
//         {event.location}
//       </p>

//       <div className="mt-3 space-y-1">

//         <p className="text-orange-600 font-semibold text-sm">
//           Booked:
//           {' '}
//           {event.bookedSlots}
//         </p>

//         <p className="text-green-600 font-semibold text-sm">
//           Available:
//           {' '}
//           {event.totalSlots - event.bookedSlots}
//         </p>

//         <p className="text-blue-600 font-semibold text-sm">
//           Total Slots:
//           {' '}
//           {event.totalSlots}
//         </p>

//         {!event.slotEnabled && (
//           <p className="text-red-600 font-bold">
//             SLOTS CLOSED
//           </p>
//         )}

//       </div>
//     </div>
//   ))}
// </div>
//             </div>
//           </div>
//         )}
//         {activeTab === 'BOOKINGS' && (

//                   <div className="space-y-6">

//                     <div className="bg-white rounded-2xl shadow p-6 border">

//                       <h2 className="text-2xl font-bold mb-4">

//                         Booking Dashboard

//                       </h2>

//                       <input

//                         type="text"

//                         placeholder="Search by PNR"

//                         className="w-full border rounded-xl p-3"

//                         value={pnrSearch}

//                         onChange={e =>
//                           setPnrSearch(e.target.value)
//                         }

//                       />

//                     </div>

//                     <div className="space-y-5">

//                       {bookings

//                         .filter(booking =>

//                           booking.pnr
//                             .toLowerCase()
//                             .includes(
//                               pnrSearch.toLowerCase()
//                             )

//                         )

//                         .map(booking => (

//                           <div

//                             key={booking.id}

//                             className="bg-white border rounded-2xl shadow p-6"

//                           >

//                             <div className="flex justify-between items-start gap-4 flex-wrap">

//                               <div>

//                                 <h3 className="text-2xl font-extrabold text-orange-600">

//                                   {booking.pnr}

//                                 </h3>

//                                 <p className="text-stone-700 font-semibold">

//                                   {booking.event?.title}

//                                 </p>

//                                 <p className="text-sm text-stone-500">

//                                   Mobile:
//                                   {' '}
//                                   {booking.mobileNumber}

//                                 </p>

//                                 <p className="text-sm text-stone-500">

//                                   Booking Date:
//                                   {' '}
//                                   {new Date(
//                                     booking.createdAt
//                                   ).toLocaleString()}

//                                 </p>

//                                 <p className="text-sm text-green-600 font-bold mt-1">

//                                   Total Persons:
//                                   {' '}
//                                   {booking.totalPersons}

//                                 </p>

//                               </div>

//                               <button

//                                 className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold"

//                               >

//                                 Download Ticket

//                               </button>

//                             </div>

//                             <div className="mt-6 overflow-x-auto">

//                               <table className="w-full border-collapse">

//                                 <thead>

//                                   <tr className="bg-stone-100">

//                                     <th className="border p-3">
//                                       Name
//                                     </th>

//                                     <th className="border p-3">
//                                       Age
//                                     </th>

//                                     <th className="border p-3">
//                                       Gender
//                                     </th>

//                                   </tr>

//                                 </thead>

//                                 <tbody>

//                                   {booking.devotees.map(
//                                     devotee => (

//                                       <tr
//                                         key={devotee.id}
//                                       >

//                                         <td className="border p-3">

//                                           {devotee.name}

//                                         </td>

//                                         <td className="border p-3">

//                                           {devotee.age}

//                                         </td>

//                                         <td className="border p-3">

//                                           {devotee.gender}

//                                         </td>

//                                       </tr>

//                                     )
//                                   )}

//                                 </tbody>

//                               </table>

//                             </div>

//                           </div>

//                         ))}

//                     </div>

//                   </div>

//                 )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL
  from '../config/config';


import {

  fetchDashboardData,

  loginAdmin,

  addExpense,

  addEvent

} from '../services/adminService';

import LoginView from '../components/LoginView';

import AdminHeader from '../components/AdminHeader';

import AdminTabs from '../components/AdminTabs';

import DonorTab from '../components/DonorTab';

import ExpenseTab from '../components/ExpenseTab';

import EventsTab from '../components/EventsTab';

import BookingsTab from '../components/BookingsTabs';


const AdminDashboard = () => {

  // =========================
  // AUTH
  // =========================

  const [isLoggedIn, setIsLoggedIn] =
    useState(

      localStorage.getItem(
        'adminLoggedIn'
      ) === 'true'

    );

  const [loginForm, setLoginForm] =
    useState({

      username: '',
      password: ''

    });

  // =========================
  // TABS
  // =========================

  const [activeTab, setActiveTab] =
    useState('DANDATA');

  // =========================
  // DATA STATES
  // =========================

  const [donors, setDonors] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const [pnrSearch, setPnrSearch] =
    useState('');

  const [finances, setFinances] =
    useState({

      cashAvailable: 0,

      bankAvailable: 0,

      totalDonation: 0,

      totalExpense: 0,

      expenses: [],

      donations: []

    });

  // =========================
  // FORMS
  // =========================

  const [expenseForm, setExpenseForm] =
    useState({

      amount: '',

      purpose: '',

      sourceType: 'CASH',

      handledBy: ''

    });

  const [eventForm, setEventForm] =
    useState({

      title: '',

      eventDate: '',

      location: '',

      totalSlots: 100,

      description: ''

    });

    const [cashDonationForm, setCashDonationForm] =
  useState({

    name: '',
    mobile: '',
    amount: '',
    receivedBy: ''

  });

  // =========================
  // FETCH DASHBOARD
  // =========================

  const loadDashboard = async () => {

  try {

    const data =
      await fetchDashboardData();

    setDonors(
      data.donors || []
    );

    setEvents(
      data.events || []
    );

    setBookings(
      data.bookings || []
    );

    setFinances({

      cashAvailable:
        data.finances?.cashAvailable || 0,

      bankAvailable:
        data.finances?.bankAvailable || 0,
        
      totalBalance:
      data.finances?.totalBalance || 0,  

      totalDonation:
        data.finances?.totalDonation || 0,

      totalExpense:
        data.finances?.totalExpense || 0,

      expenses:
        data.finances?.expenses || [],

      donations:
        data.finances?.donations || []

    });

  } catch (error) {

    console.log(error);

  }

};

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    if (isLoggedIn) {

      loadDashboard();

    }

  }, [isLoggedIn]);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async e => {

    e.preventDefault();

    try {

      await loginAdmin(loginForm);

      localStorage.setItem(
        'adminLoggedIn',
        'true'
      );

      setIsLoggedIn(true);

    } catch (error) {

      alert(

        error.response?.data?.message ||

        'Login Failed'

      );

    }

  };

  // =========================
  // ADD EXPENSE
  // =========================

  const handleAddExpense =
    async e => {

      e.preventDefault();

      try {

        await addExpense(expenseForm);

        alert(
          'Expense Added Successfully'
        );

        setExpenseForm({

          amount: '',

          purpose: '',

          sourceType: 'CASH',

          handledBy: ''

        });

        loadDashboard();

      } catch (error) {

        alert(

          error.response?.data?.message ||

          'Failed To Add Expense'

        );

      }

    };
// CASH DoNATION

const handleCashDonation =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        `${API_BASE_URL}/api/donations`,

        {

          ...cashDonationForm,

          mode: 'CASH'

        }

      );

      alert(
        'Cash Donation Added'
      );

      setCashDonationForm({

        name: '',
        mobile: '',
        amount: '',
        receivedBy: ''

      });

      loadDashboard();

    } catch (error) {

      console.log(error);

    }

  };
  // =========================
  // ADD EVENT
  // =========================

  const handleAddEvent =
    async e => {

      e.preventDefault();

      try {

        await addEvent(eventForm);

        alert(
          'Event Created Successfully'
        );

        setEventForm({

          title: '',

          eventDate: '',

          location: '',

          totalSlots: 100,

          description: ''

        });

        loadDashboard();

      } catch (error) {

        alert(

          error.response?.data?.message ||

          'Failed To Create Event'

        );

      }

    };

  // =========================
  // LOGIN SCREEN
  // =========================

  if (!isLoggedIn) {

    return (

      <LoginView

        loginForm={loginForm}

        setLoginForm={setLoginForm}

        handleLogin={handleLogin}

      />

    );

  }

  // =========================
  // MAIN DASHBOARD
  // =========================

  return (

    <div className="bg-white rounded-[2.5rem] shadow-lg border border-stone-100 overflow-hidden min-h-[80vh]">

      <AdminHeader
        setIsLoggedIn={setIsLoggedIn}
      />

      <AdminTabs

        activeTab={activeTab}

        setActiveTab={setActiveTab}

      />

      <div className="p-8">

        {/* DANDATA */}

        {activeTab === 'DANDATA' && (

          <DonorTab donors={donors} />

        )}

        {/* EXPENSES */}

        {activeTab === 'EXPENSES' && (

          <ExpenseTab

  activeTab={activeTab}

  finances={finances}

  expenseForm={expenseForm}

  setExpenseForm={setExpenseForm}

  handleAddExpense={handleAddExpense}

  loadDashboard={loadDashboard}

  cashDonationForm={cashDonationForm}

  setCashDonationForm={setCashDonationForm}

  handleCashDonation={handleCashDonation}


/>

        )}

        {/* EVENTS */}

        {activeTab === 'EVENTS' && (

          <EventsTab

            events={events}

            eventForm={eventForm}

            setEventForm={setEventForm}

            handleAddEvent={handleAddEvent}

          />

        )}

        {/* BOOKINGS */}

        {activeTab === 'BOOKINGS' && (

          <BookingsTab

            bookings={bookings}

            pnrSearch={pnrSearch}

            setPnrSearch={setPnrSearch}

          />

        )}

      </div>

    </div>

  );

};

export default AdminDashboard;