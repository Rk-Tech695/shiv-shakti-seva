import axios from 'axios';

import API_BASE_URL from '../config/config';

export const fetchDashboardData = async () => {

  const [

    donorsRes,

    financeRes,

    eventsRes,

    bookingsRes

  ] = await Promise.all([

    axios.get(`${API_BASE_URL}/api/users`),

    axios.get(`${API_BASE_URL}/api/finances`),

    axios.get(`${API_BASE_URL}/api/events`),

    axios.get(`${API_BASE_URL}/api/booking-groups`)

  ]);

  return {

    donors: donorsRes.data,

    finances: financeRes.data,

    events: eventsRes.data,

    bookings: bookingsRes.data.bookings

  };

};

export const loginAdmin = async (data) => {

  return axios.post(
    `${API_BASE_URL}/api/admin/login`,
    data
  );

};

export const addExpense = async (data) => {

  return axios.post(
    `${API_BASE_URL}/api/expenses`,
    data
  );

};

export const addEvent = async (data) => {

  return axios.post(
    `${API_BASE_URL}/api/events`,
    data
  );

};