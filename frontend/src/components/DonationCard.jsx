import axios from 'axios';

import API_BASE_URL
  from '../config/config';

const DonationCard = ({

  donation,

  loadDashboard

}) => {

  const approveDonation =
    async () => {

      try {

        await axios.put(

          `${API_BASE_URL}/api/donations/approve/${donation.id}`

        );

        alert(
          'Donation Approved'
        );

        loadDashboard();

      } catch (error) {

        console.log(error);

        alert(
          'Approval Failed'
        );

      }

    };

  return (

    <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">

      <div className="flex justify-between gap-4">

        <div className="space-y-1">

          <p className="font-bold text-lg text-stone-900">

            {donation.user?.name}

          </p>

          <p className="text-sm text-stone-500">

            {donation.user?.mobile_number}

          </p>

          <p className="text-sm text-orange-600 font-bold">

            {donation.paymentMode}

          </p>

          {donation.utrNumber && (

            <p className="text-sm">

              UTR:
              {' '}
              <span className="font-bold">

                {donation.utrNumber}

              </span>

            </p>

          )}

          {donation.receivedBy && (

            <p className="text-sm text-blue-600">

              Received By:
              {' '}
              {donation.receivedBy}

            </p>

          )}

          {donation.proofImage && (

            <a

              href={`${API_BASE_URL}${donation.proofImage}`}

              target="_blank"

              className="text-blue-600 underline text-sm"

            >

              View Screenshot

            </a>

          )}

        </div>

        <div className="text-right space-y-2">

          <p className="font-bold text-xl text-green-600">

            ₹{donation.amount}

          </p>

          <p
            className={`text-xs font-bold ${donation.status === 'SUCCESS'
              ? 'text-green-600'
              : 'text-yellow-600'
              }`}
          >

            {donation.status}

          </p>

          <div className="flex flex-col gap-1 items-end">

  {donation.status === 'PENDING' && (

    <button

      onClick={approveDonation}

      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl font-semibold cursor-pointer"

    >

      APPROVE

    </button>

  )}

  {donation.status === 'SUCCESS' && (

  <div className="flex gap-2 mt-3">

    <a

      href={`${API_BASE_URL}/api/receipts/${donation.id}`}

      target="_blank"

      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold text-sm inline-block"

    >

      Receipt

    </a>

    <a

      href={`https://wa.me/?text=${encodeURIComponent(
        `🙏 Donation Receipt

Donor: ${donation.user?.name}

Amount: ₹${donation.amount}

Receipt:
${API_BASE_URL}/api/receipts/${donation.id}`
      )}`}

      target="_blank"

      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl font-semibold text-sm inline-block"

    >

      WhatsApp

    </a>

  </div>

)}

</div>

        </div>

      </div>

    </div>

  );

};

export default DonationCard;

// import axios from 'axios';

// import API_BASE_URL
//   from '../config/config';

// const DonationCard = ({

//   donation,

//   loadDashboard

// }) => {

//   const approveDonation =
//     async () => {

//       try {

//         await axios.put(

//           `${API_BASE_URL}/api/donations/approve/${donation.id}`

//         );

//         alert(
//           'Donation Approved'
//         );

//         loadDashboard();

//       } catch (error) {

//         console.log(error);

//         alert(
//           'Approval Failed'
//         );

//       }

//     };

//   return (

//     <div className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm">

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

//           <p
//             className={`text-xs font-bold ${
//               donation.status === 'SUCCESS'
//                 ? 'text-green-600'
//                 : 'text-yellow-600'
//             }`}
//           >

//             {donation.status}

//           </p>

//           {donation.status === 'PENDING' &&
//             donation.paymentMode === 'CASH' && (

//               <button

//                 onClick={approveDonation}

//                 className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg font-bold mt-2 cursor-pointer"

//               >

//                 APPROVE

//               </button>

//             )}

//         </div>

//       </div>

//     </div>

//   );

// };

// export default DonationCard;