import { useState } from 'react';
import API_BASE_URL from '../config/config';
import axios from 'axios';

const Donate = () => {
  const [formData, setFormData] =
    useState({

      name: '',

      mobile: '',

      amount: '',

      mode: 'UPI',

      dob: '',

      utrNumber: '',

      paymentHolderName: ''

    });
  const [donationSuccess, setDonationSuccess] =
    useState(null);

  const [proofImage, setProofImage] =
    useState(null);
  const [loading, setLoading] = useState(false);




  const handleManualPayment =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const data =
          new FormData();

        data.append(
          'name',
          formData.name
        );

        data.append(
          'mobile',
          formData.mobile
        );

        data.append(
          'amount',
          formData.amount
        );

        data.append(
          'mode',
          formData.mode
        );

        data.append(
          'dob',
          formData.dob
        );

        data.append(
          'utrNumber',
          formData.utrNumber
        );

        data.append(
        'paymentHolderName',
        formData.paymentHolderName
      );

        if (proofImage) {

          data.append(
            'proofImage',
            proofImage
          );

        }

        // await axios.post(

        //   `${API_BASE_URL}/api/donations`,

        //   data,

        //   {

        //     headers: {

        //       'Content-Type':

        //         'multipart/form-data'

        //     }

        //   }

        // );

        const res = await axios.post(

          `${API_BASE_URL}/api/donations`,

          data,

          {

            headers: {

              'Content-Type':
                'multipart/form-data'

            }

          }

        );

        setDonationSuccess(res.data.donation);

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        }); 

        alert(

          'Donation Submitted Successfully. Admin verification pending.'

        );

        setFormData({

          name: '',

          mobile: '',

          amount: '',

          mode: 'UPI',

          dob: '',

          utrNumber: '',

          paymentHolderName: ''

        });

        setProofImage(null);

      } catch (err) {

        alert(
          'Donation Failed'
        );

      }

      setLoading(false);

    };

  const handleSubmit = (e) => {

    handleManualPayment(e);

  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] overflow-hidden border border-stone-100 mt-8">
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-bold tracking-wider uppercase mb-4">
            Gupt Daan
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-3">Make a Donation</h2>
          <p className="text-orange-100 text-lg">Your contribution helps us serve the society and spread the divine path.</p>
        </div>
      </div>

      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Full Name (Shraddhalu)</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-stone-900 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Mobile/WhatsApp Number</label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-stone-900 outline-none"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            <p className="text-sm text-stone-500 mt-2 flex items-center gap-1.5">
              Invoice will be sent to this WhatsApp number.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Donation Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-stone-400">₹</span>
              <input
                type="text"
                inputMode="numeric" 
                min="1"
                required
                placeholder="0"
                className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-2xl font-bold text-orange-600 outline-none"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value.replace(/[^0-9]/g, '') })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-3 uppercase tracking-wide">Payment Mode</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['UPI', 'BANK_TRANSFER', 'CASH'].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setFormData({ ...formData, mode })}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${formData.mode === mode
                    ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-[0_0_0_1px_rgb(249,115,22)]'
                    : 'bg-white border-stone-200 text-stone-500 hover:border-orange-300 hover:text-stone-700'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
              {formData.mode !== 'CASH' && (
          <div className="bg-stone-50 border rounded-2xl p-5 space-y-3">

            <h3 className="text-xl font-bold">

              Payment Details

            </h3>

            <div className="flex justify-center">

              <img

                src="/qr.jpeg"

                alt="Temple QR"

                className="w-64 rounded-2xl border shadow"

              />

            </div>

            <p>

              UPI ID:
              {' '}
              <span className="font-bold text-orange-600">

                shivshakti@upi

              </span>

            </p>

            <p>

              Account Name:
              {' '}
              <span className="font-bold">

                Shiv Shakti Seva Foundation

              </span>

            </p>

            <p>

              IFSC:
              {' '}
              <span className="font-bold">

                SBIN0001234

              </span>

            </p>

            <p>

              Account Number:
              {' '}
              <span className="font-bold">

                12345678901

              </span>

            </p>

          </div>
          )}  
          <div>
            <label className="block text-sm font-bold mb-2">
              Date of Birth
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3"
              value={formData.dob}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dob: e.target.value
                })
              }
            />
          </div>
          {formData.mode !== 'CASH' && (  

            
          <div>
            <div>

  <label className="block text-sm font-bold mb-2">

    Payment Holder Name

  </label>

  <input

    type="text"

    required={formData.mode !== 'CASH'}

    className="w-full border rounded-lg p-3"

    placeholder="UPI / Bank Account Holder Name"

    value={formData.paymentHolderName}

    onChange={(e) =>

      setFormData({

        ...formData,

        paymentHolderName: e.target.value

      })

    }

  />

</div>

            <label className="block text-sm font-bold mb-2">

              UTR / Transaction Number

            </label>

            <input

              type="text"

              required={formData.mode !== 'CASH'}

              className="w-full border rounded-lg p-3"

              placeholder="Enter transaction number"

              value={formData.utrNumber}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  utrNumber: e.target.value

                })

              }

            />

          </div>
          )}

          {formData.mode !== 'CASH' && (
          <div>

            <label className="block text-sm font-bold mb-2">

              Upload Payment Screenshot

            </label>

            <input

              type="file"

              required={formData.mode !== 'CASH'}

              accept="image/*"

              className="w-full border rounded-lg p-3"

              onChange={(e) =>

                setProofImage(
                  e.target.files[0]
                )

              }

            />

          </div>
          )}


          <button disabled={loading} type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-stone-900/20 transition-all hover:-translate-y-1 disabled:opacity-50">
            {loading
              ? 'Processing...'
              : formData.mode === 'CASH'
                ? `Submit Cash Donation ₹${formData.amount || '0'}`
                : `Proceed to Donate ₹${formData.amount || '0'}`
            }
          </button>
        </form>

        {donationSuccess && (

          <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mt-8 space-y-5">

            <div>

              <h3 className="text-3xl font-bold text-green-700">

                Donation Submitted 🙏

              </h3>

              <p className="text-stone-700 mt-2 text-lg">

                Thank you for supporting
                Shiv Shakti Seva Foundation.

              </p>

              <p className="text-sm text-stone-500 mt-2">

                Your donation has been submitted successfully.

              </p>

            </div>

            <div className="bg-white rounded-2xl border border-green-100 p-5">

              <p className="text-sm text-stone-500">
                Donor Name
              </p>

              <p className="font-bold text-xl">

                {donationSuccess.user?.name ||
                  formData.name}

              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>

                  <p className="text-sm text-stone-500">

                    Amount

                  </p>

                  <p className="font-bold text-green-600 text-xl">

                    ₹{donationSuccess.amount}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-stone-500">

                    Status

                  </p>

                  <p className="font-bold text-orange-600">

                    {donationSuccess.status}

                  </p>

                </div>

              </div>

            </div>

            <div className="flex gap-3 flex-wrap">

              <a

                href={`${API_BASE_URL}/api/receipts/${donationSuccess.id}`}

                target="_blank"

                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold"

              >

                Download Receipt

              </a>

              <a

                href={`https://wa.me/?text=${encodeURIComponent(

                  `🙏 Donation Submitted

Donor: ${formData.name}

Amount: ₹${donationSuccess.amount}

Receipt:
${API_BASE_URL}/api/receipts/${donationSuccess.id}`

                )}`}

                target="_blank"

                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-bold"

              >

                Share on WhatsApp

              </a>

            </div>

          </div>

        )}
      </div>
    </div>
  );
};

export default Donate;



// import { useState } from 'react';
// import API_BASE_URL from '../config/config';
// import axios from 'axios';

// const Donate = () => {
//   const [formData, setFormData] = useState({ name: '', mobile: '', amount: '', mode: 'UPI' });
//   const [loading, setLoading] = useState(false);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleRazorpayPayment = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert('Razorpay SDK failed to load. Are you online?');
//       return;
//     }

//     try {
//       // 1. Create order on backend
//       const { data: order } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, { amount: formData.amount });

//       const options = {
//         key: 'rzp_test_dummy123', // In production, use env variable
//         amount: order.amount,
//         currency: order.currency,
//         name: 'Shiv Shakti Seva Foundation',
//         description: 'Gupt Daan',
//         order_id: order.id,
//         handler: async function (response) {
//           // 2. Save donation to backend
//           await axios.post(`${API_BASE_URL}/api/donations`, {
//             name: formData.name,
//             mobile: formData.mobile,
//             amount: formData.amount,
//             mode: 'RAZORPAY',
//             transactionId: response.razorpay_payment_id
//           });
//           alert('Donation successful! Har Har Mahadev. Invoice sent to WhatsApp.');
//           setFormData({ name: '', mobile: '', amount: '', mode: 'UPI', dob: '' });
//         },
//         prefill: {
//           name: formData.name,
//           contact: formData.mobile,
//         },
//         theme: {
//           color: '#ea580c'
//         }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       console.error(err);
//       alert('Error creating Razorpay order');
//     }
//   };

//   const handleManualPayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE_URL}/api/donations`, {
//         name: formData.name,
//         mobile: formData.mobile,
//         amount: formData.amount,
//         mode: formData.mode,
//         transactionId: `MANUAL_${Date.now()}`
//       });
//       alert(`Donation of ₹${formData.amount} via ${formData.mode} recorded successfully! Invoice sent to WhatsApp.`);
//       setFormData({ name: '', mobile: '', amount: '', mode: 'UPI', dob: '' });
//     } catch (err) {
//       alert('Error recording donation');
//     }
//     setLoading(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.mode === 'RAZORPAY') {
//       handleRazorpayPayment();
//     } else {
//       handleManualPayment(e);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] overflow-hidden border border-stone-100 mt-8">
//       <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-10 text-center relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
//         <div className="relative z-10">
//           <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-bold tracking-wider uppercase mb-4">
//             Gupt Daan
//           </span>
//           <h2 className="text-4xl font-extrabold text-white mb-3">Make a Donation</h2>
//           <p className="text-orange-100 text-lg">Your contribution helps us serve the society and spread the divine path.</p>
//         </div>
//       </div>

//       <div className="p-10">
//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div>
//             <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Full Name (Shraddhalu)</label>
//             <input
//               type="text"
//               required
//               placeholder="e.g. Ramesh Kumar"
//               className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-stone-900 outline-none"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Mobile/WhatsApp Number</label>
//             <input
//               type="tel"
//               required
//               placeholder="e.g. 9876543210"
//               className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-stone-900 outline-none"
//               value={formData.mobile}
//               onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
//             />
//             <p className="text-sm text-stone-500 mt-2 flex items-center gap-1.5">
//               Invoice will be sent to this WhatsApp number.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Donation Amount (₹)</label>
//             <div className="relative">
//               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-stone-400">₹</span>
//               <input
//                 type="number"
//                 min="1"
//                 required
//                 placeholder="0"
//                 className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-2xl font-bold text-orange-600 outline-none"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-stone-700 mb-3 uppercase tracking-wide">Payment Mode</label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {['UPI', 'RAZORPAY', 'BANK', 'CASH'].map((mode) => (
//                 <button
//                   type="button"
//                   key={mode}
//                   onClick={() => setFormData({ ...formData, mode })}
//                   className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${formData.mode === mode
//                       ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-[0_0_0_1px_rgb(249,115,22)]'
//                       : 'bg-white border-stone-200 text-stone-500 hover:border-orange-300 hover:text-stone-700'
//                     }`}
//                 >
//                   {mode}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-bold mb-2">
//               Date of Birth
//             </label>

//             <input
//               type="date"
//               className="w-full border rounded-lg p-3"
//               value={formData.dob}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   dob: e.target.value
//                 })
//               }
//             />
//           </div>

//           <button disabled={loading} type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-stone-900/20 transition-all hover:-translate-y-1 disabled:opacity-50">
//             {loading ? 'Processing...' : `Proceed to Donate ₹${formData.amount || '0'}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Donate;

