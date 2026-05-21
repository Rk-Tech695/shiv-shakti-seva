import {
  Flame,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';

const Footer = () => {

  return (

    <footer className="bg-stone-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <Flame className="text-yellow-400 w-10 h-10" />

              <h2 className="text-2xl font-extrabold">

                SHIV SHAKTI SEVA

              </h2>

            </div>

            <p className="text-stone-400 leading-7">

              Serving society with devotion,
              spirituality and humanity.

            </p>

          </div>

          

          {/* RIGHT */}

          <div>

            <h3 className="text-xl font-bold mb-5">

              Contact

            </h3>

            <div className="space-y-4">

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

                <p className="text-stone-300">

                  Raipur, Chhattisgarh

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-stone-800 mt-10 pt-6 text-center text-stone-500 text-sm">

          © 2026 Shiv Shakti Seva Foundation.
          All rights reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;