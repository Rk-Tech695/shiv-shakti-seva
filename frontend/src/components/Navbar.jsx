import { Link } from 'react-router-dom';

import {
  Flame,
  Menu,
  X
} from 'lucide-react';

import { useState } from 'react';

const Navbar = () => {

  const [open, setOpen] =
    useState(false);

  return (

    <nav className="fixed top-0 left-0 w-full z-[999] backdrop-blur-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 shadow-2xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16 lg:h-[72px]">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <Flame className="h-7 w-7 lg:h-8 lg:w-8 text-yellow-300 drop-shadow-lg" />

            <Link
              to="/"
              className="text-lg md:text-2xl font-extrabold text-white tracking-wide whitespace-nowrap"
            >

              SHIV SHAKTI SEVA

            </Link>

          </div>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-6 lg:gap-8">

            <Link
              to="/"
              className="text-white/90 hover:text-yellow-200 text-base font-semibold transition duration-300"
            >

              Home

            </Link>

            <Link
              to="/donate"
              className="text-white/90 hover:text-yellow-200 text-base font-semibold transition duration-300"
            >

              Donate

            </Link>

            <Link
                to="/about"
                className="text-white/90 hover:text-yellow-200 text-base font-semibold transition duration-300"
              >

                About Us

              </Link>

            <Link
              to="/admin"
              className="text-white/90 hover:text-yellow-200 text-base font-semibold transition duration-300"
            >

              Admin Portal

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="md:hidden text-white p-1"
          >

            {open
              ? <X size={32} />
              : <Menu size={32} />}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden bg-gradient-to-b from-red-600 to-orange-600 border-t border-white/10 px-6 py-5 space-y-5 shadow-2xl">

          <Link
            to="/"
            onClick={() =>
              setOpen(false)
            }
            className="block text-white text-lg font-semibold"
          >

            Home

          </Link>

          <Link
            to="/donate"
            onClick={() =>
              setOpen(false)
            }
            className="block text-white text-lg font-semibold"
          >

            Donate

          </Link>

          <Link
            to="/about"
            onClick={() =>
              setOpen(false)
            }
            className="block text-white text-lg font-semibold"
          >

            About Us

          </Link>

          <Link
            to="/admin"
            onClick={() =>
              setOpen(false)
            }
            className="block text-white text-lg font-semibold"
          >

            Admin Portal

          </Link>

        </div>

      )}

    </nav>

  );

};

export default Navbar;