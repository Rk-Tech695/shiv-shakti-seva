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

    <nav className="bg-gradient-to-r from-orange-600 to-red-600 shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <Flame className="h-9 w-9 text-yellow-300" />

            <Link
              to="/"
              className="text-xl md:text-3xl font-extrabold text-white tracking-wide"
            >

              SHIV SHAKTI SEVA

            </Link>

          </div>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-white hover:text-yellow-200 text-lg font-semibold transition"
            >

              Home

            </Link>

            <Link
              to="/donate"
              className="text-white hover:text-yellow-200 text-lg font-semibold transition"
            >

              Donate

            </Link>

            <Link
                to="/about"
                className="text-white hover:text-yellow-200 text-lg font-semibold transition"
              >

                About Us

              </Link>

            <Link
              to="/admin"
              className="text-white hover:text-yellow-200 text-lg font-semibold transition"
            >

              Admin Portal

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="md:hidden text-white"
          >

            {open
              ? <X size={32} />
              : <Menu size={32} />}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden bg-red-600 border-t border-red-400 px-6 py-5 space-y-4">

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