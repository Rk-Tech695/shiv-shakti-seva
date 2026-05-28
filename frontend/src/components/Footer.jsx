// import {
//   Flame,
//   Phone,
//   MapPin,
//   Mail
// } from 'lucide-react';

// const Footer = () => {

//   return (

//     <footer className="bg-stone-950 text-white mt-20">

//       <div className="max-w-7xl mx-auto px-6 py-14">

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//           {/* LEFT */}

//           <div>

//             <div className="flex items-center gap-3 mb-5">

//               <Flame className="text-yellow-400 w-10 h-10" />

//               <h2 className="text-2xl font-extrabold">

//                 SHIV SHAKTI SEVA

//               </h2>

//             </div>

//             <p className="text-stone-400 leading-7">

//               Serving society with devotion,
//               spirituality and humanity.

//             </p>

//           </div>

          

//           {/* RIGHT */}

//           <div>

//             <h3 className="text-2xl font-bold mb-6 text-orange-300">

//               Contact

//             </h3>

//             <div className="space-y-4">

//               <div className="flex gap-3 items-start">

//                 <Phone
//                   className="text-orange-400 mt-1"
//                   size={18}
//                 />

//                 <p className="text-stone-300">

//                   +91 8518021111

//                 </p>

//               </div>

//               <div className="flex gap-3 items-start">

//                 <Mail
//                   className="text-orange-400 mt-1"
//                   size={18}
//                 />

//                 <p className="text-stone-300">

//                   info@shivshaktiseva.in

//                 </p>

//               </div>

//               <div className="flex gap-3 items-start">

//                 <MapPin
//                   className="text-orange-400 mt-1"
//                   size={18}
//                 />

//                 <p className="text-stone-300">

//                   Raipur, Chhattisgarh

//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* BOTTOM */}

//         <div className="border-t border-stone-800 mt-10 pt-6 text-center text-stone-500 text-sm">

//           © 2026 Shiv Shakti Seva Foundation.
//           All rights reserved.

//         </div>

//       </div>

//     </footer>

//   );

// };

// export default Footer;

import {
  Flame,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {

  return (

    // <footer className="bg-gradient-to-br from-[#120602] via-[#1b0802] to-black text-white mt-24 border-t border-orange-500/20">
    // <footer className="bg-stone-950 text-white mt-20">
    <footer className="bg-gradient-to-br from-[#120602] via-[#1b0802] to-black text-white mt-24 border-t border-orange-500/20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <Flame className="text-orange-400 w-10 h-10" />

              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">

                Shiv Shakti
                Seva Foundation

              </h2>

            </div>

            <p className="text-stone-300 leading-7 text-sm">

              Dedicated to Kawar Yatri Seva,
              Bhavan Nirman, Mahadev Bhakti,
              Food Distribution and Spiritual Service.

            </p>

            <div className="mt-6">

              <Link

                to="/about"

                className="text-orange-400 font-bold hover:text-orange-300"

              >

                About Foundation →

              </Link>

            </div>

          </div>

          {/* CENTER */}

          <div>

           <h3 className="text-2xl font-bold mb-6 text-orange-300">

              Important Note

            </h3>

            <div className="space-y-3 text-stone-300 leading-7 text-sm">

              <p>

                1. Donations are eligible for
80G tax exemption benefits
under Income Tax Act.

              </p>

              <p>

                2. Official donation receipt
                and Form 10BE certificate
                will be shared after
                successful payment verification.

              </p>

              <p>

                3. For technical or financial
                assistance contact our
                financial advisor.

              </p>

              <p className="text-orange-300 font-bold text-base">

                CA Alok Agrawal
                — 8319514793

              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold">

  🛕 Har Har Mahadev

</div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

           <h3 className="text-2xl font-bold mb-6 text-orange-300">

              Contact

            </h3>

            <div className="space-y-4">

              <div className="flex gap-3 items-start">

                <Phone
                  className="text-orange-400 mt-1"
                  size={18}
                />

                <p className="text-stone-300">

                  +91 8518021111

                </p>

              </div>

              <div className="flex gap-3 items-start">

                <Mail
                  className="text-orange-400 mt-1"
                  size={18}
                />

                <p className="text-stone-300">

                  info@shivshaktiseva.in

                </p>

              </div>

              <div className="flex gap-3 items-start">

                <MapPin
                  className="text-orange-400 mt-1"
                  size={18}
                />

                <p className="text-stone-300 leading-7">

                  Ward No.13,
                  Ring Road No.02,
                  Gurusagar Nagar,
                  Raipur,
                  Chhattisgarh

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-orange-500/10 mt-8 pt-5 text-center text-stone-400 text-sm">

          © 2026 Shiv Shakti Seva Foundation.
          All rights reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;