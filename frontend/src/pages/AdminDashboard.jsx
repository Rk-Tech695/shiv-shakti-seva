import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/config';



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

import ApprovalTab from '../components/ApprovalTab';

import BhavanTab from '../components/BhavanTab';

import {

  fetchBhavanBookings,

  fetchBhavanRooms

} from '../services/adminService';


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

  const [bhavanBookings,
  setBhavanBookings] =
  useState([]);

  const [bhavanRooms,
    setBhavanRooms] =
    useState([]);  

  // =========================
  // TABS
  // =========================

  const [activeTab, setActiveTab] =
  useState(

    localStorage.getItem(
      'adminActiveTab'
    ) || 'DANDATA'

  );

  // =========================
  // DATA STATES
  // =========================

  const [donors, setDonors] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const [pendingDonations, setPendingDonations] =
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

    bannerImage: '',

    description: ''

  });

  //   const [cashDonationForm, setCashDonationForm] =
  // useState({

  //   name: '',
  //   mobile: '',
  //   amount: '',
  //   receivedBy: ''

  // });

  const [cashDonationForm, setCashDonationForm] =
  useState({

    donorName: '',

    donorMobile: '',

    amount: '',

    paymentMode: 'CASH',

    paymentHolderName: '',

    transactionId: '',

    receivedBy: ''

  });

  // =========================
  // FETCH DASHBOARD
  // =========================

  const loadDashboard = async () => {

  try {

    const data =
      await fetchDashboardData();

      const bhavanBookingsData =
        await fetchBhavanBookings();

      const bhavanRoomsData =
        await fetchBhavanRooms();

      setBhavanBookings(
        bhavanBookingsData
      );

      setBhavanRooms(
        bhavanRoomsData
      );

    const pendingRes =
  await axios.get(

    `${API_BASE_URL}/api/donations/pending`

  );

setPendingDonations(

  pendingRes.data.donations || []

);  

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
const handleTabChange =
  tab => {

    setActiveTab(tab);

    localStorage.setItem(
      'adminActiveTab',
      tab
    );

  };

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

// const handleCashDonation =
//   async (e) => {

//     e.preventDefault();

//     try {

//       await axios.post(

//         `${API_BASE_URL}/api/donations`,

//         {

//           ...cashDonationForm,

//           mode: 'CASH'

//         }

//       );

//       alert(
//         'Cash Donation Added'
//       );

//       setCashDonationForm({

//         name: '',
//         mobile: '',
//         amount: '',
//         receivedBy: ''

//       });

//       loadDashboard();

//     } catch (error) {

//       console.log(error);

//     }

//   };

const handleCashDonation =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        `${API_BASE_URL}/api/donations`,

        {

          name:
            cashDonationForm.donorName,

          mobile:
            cashDonationForm.donorMobile,

          amount:
            cashDonationForm.amount,

          mode:
            cashDonationForm.paymentMode,

          transactionId:
            cashDonationForm.transactionId,

          receivedBy:
            cashDonationForm.receivedBy,

          paymentHolderName:
            cashDonationForm.paymentHolderName

        }

      );

      alert(
        'Donation Recorded'
      );

      setCashDonationForm({

        donorName: '',

        donorMobile: '',

        amount: '',

        paymentMode: 'CASH',

        paymentHolderName: '',

        transactionId: '',

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

  const handleAddEvent = async (e) => {

  e.preventDefault();

  try {

    await axios.post(

      `${API_BASE_URL}/api/events`,

      eventForm

    );

    // 😄 EVENTS DOBARA LOAD

    loadDashboard();

    // 😄 FORM CLEAR

    setEventForm({

      title: '',

      eventDate: '',

      location: '',

      description: '',

      bannerImage: ''

    });

  } catch (error) {

    console.log(error);

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
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-5">
    <div className="bg-white rounded-[2.5rem] shadow-lg border border-stone-100 overflow-hidden min-h-[80vh]">

      <AdminHeader
        setIsLoggedIn={setIsLoggedIn}
      />

      <AdminTabs

        activeTab={activeTab}

        setActiveTab={handleTabChange}

      />

      <div className="p-8">

        {/* DANDATA */}

        {activeTab === 'DANDATA' && (

          <DonorTab donors={donors} />

        )}

        {/* APPROVALS */}

          {activeTab === 'APPROVALS' && (

            <ApprovalTab

              donations={pendingDonations}

              loadDashboard={loadDashboard}

            />

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

        {/* BHAVAN */}

{activeTab === 'BHAVAN' && (

  <BhavanTab

    bookings={bhavanBookings}

    rooms={bhavanRooms}

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

    </div>

  );

};

export default AdminDashboard;