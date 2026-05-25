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

//             <h3 className="text-xl font-bold mb-5">

//               Contact

//             </h3>

//             <div className="space-y-4">

//               <div className="flex gap-3 items-start">

//                 <Phone
//                   className="text-orange-500"
//                   size={18}
//                 />

//                 <p className="text-stone-300">

//                   +91 8518021111

//                 </p>

//               </div>

//               <div className="flex gap-3 items-start">

//                 <Mail
//                   className="text-orange-500"
//                   size={18}
//                 />

//                 <p className="text-stone-300">

//                   info@shivshaktiseva.in

//                 </p>

//               </div>

//               <div className="flex gap-3 items-start">

//                 <MapPin
//                   className="text-orange-500"
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

    <footer className="bg-stone-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <Flame className="text-orange-400 w-10 h-10" />

              <h2 className="text-2xl font-extrabold">

                Shiv Shakti
                Seva Foundation

              </h2>

            </div>

            <p className="text-stone-400 leading-8">

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

            <h3 className="text-xl font-bold mb-5">

              Important Note

            </h3>

            <div className="space-y-4 text-stone-400 leading-7 text-sm">

              <p>

                1. Shiv Shakti Seva Foundation
                is registered under Section 80G
                of Income Tax Act.

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

              <p className="text-orange-400 font-bold">

                CA Alok Agrawal
                — 8319514793

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <h3 className="text-xl font-bold mb-5">

              Contact

            </h3>

            <div className="space-y-5">

              <div className="flex gap-3 items-start">

                <Phone
                  className="text-orange-500"
                  size={18}
                />

                <p className="text-stone-300">

                  +91 8518021111

                </p>

              </div>

              <div className="flex gap-3 items-start">

                <Mail
                  className="text-orange-500"
                  size={18}
                />

                <p className="text-stone-300">

                  info@shivshaktiseva.in

                </p>

              </div>

              <div className="flex gap-3 items-start">

                <MapPin
                  className="text-orange-500"
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

        <div className="border-t border-stone-800 mt-12 pt-6 text-center text-stone-500 text-sm">

          © 2026 Shiv Shakti Seva Foundation.
          All rights reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;