import axios from 'axios';

import API_BASE_URL
  from '../config/config';

const ApprovalTab = ({

  donations,

  loadDashboard

}) => {

  const approveDonation =
    async (id) => {

      try {

        await axios.put(

          `${API_BASE_URL}/api/donations/approve/${id}`

        );

        alert(
          'Donation Approved'
        );

        loadDashboard();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div>

      <h2 className="text-3xl font-extrabold mb-8">

        Pending Approvals

      </h2>

      <div className="space-y-4">

        {donations.length === 0 && (

          <div className="bg-stone-50 border rounded-2xl p-10 text-center text-stone-500">

            No Pending Donations

          </div>

        )}

        {donations.map(donation => (

          <div

            key={donation.id}

            className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"

          >

            <div>

              <h3 className="text-xl font-bold text-stone-900">

                {donation.user?.name}

              </h3>

              <p className="text-stone-500 text-sm mt-1">

                {donation.user?.mobile_number}

              </p>

              <p className="text-green-600 font-bold text-lg mt-2">

                ₹{donation.amount}

              </p>

              <p className="text-orange-600 text-sm font-bold mt-1">

                {donation.paymentMode}

              </p>

              {donation.utrNumber && (

                <p className="text-sm mt-1">

                  UTR:
                  {' '}
                  <span className="font-bold">

                    {donation.utrNumber}

                  </span>

                </p>

              )}

              {donation.proofImage && (

                <a

                  href={`${API_BASE_URL}${donation.proofImage}`}

                  target="_blank"

                  className="text-blue-600 underline text-sm mt-2 inline-block"

                >

                  View Screenshot

                </a>

              )}

            </div>

            <button

              onClick={() =>
                approveDonation(
                  donation.id
                )
              }

              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold cursor-pointer"

            >

              APPROVE

            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ApprovalTab;