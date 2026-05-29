// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from 'react-router-dom';

// import Navbar from './components/Navbar';

// import Footer from './components/Footer';

// import Home from './pages/Home';

// import Donate from './pages/Donate';

// import AdminDashboard from './pages/AdminDashboard';

// function App() {

//   return (

//     <Router>

//       <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-orange-200 flex flex-col">

//         {/* NAVBAR */}

//         <Navbar />

//         {/* PAGE CONTENT */}

//         <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

//           <Routes>

//             <Route
//               path="/"
//               element={<Home />}
//             />

//             <Route
//               path="/donate"
//               element={<Donate />}
//             />

//             <Route
//               path="/admin"
//               element={<AdminDashboard />}
//             />

//           </Routes>

//         </main>

//         {/* FOOTER */}

//         <Footer />

//       </div>

//     </Router>

//   );

// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Donate from './pages/Donate';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';

function App() {

  return (

    <Router>

      <div className="min-h-screen relative overflow-hidden bg-[#f8f4ee] font-sans text-stone-900 selection:bg-orange-200 flex flex-col">

        {/* PREMIUM BACKGROUND */}

        <div className="fixed inset-0 -z-10 overflow-hidden">

          {/* MAIN TEMPLE IMAGE */}

          <img
            src="/baidyanath.png"
            alt="Temple Background"
            className="absolute inset-0 w-full h-full object-cover bg-fixed opacity-[0.18]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#f8f4ee]/50 to-[#f3e7d3]/70"></div>

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#f8f4ee]/80 to-[#f3e7d3]/90"></div>

          {/* TOP LEFT ORANGE GLOW */}

          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-400/30 rounded-full blur-[140px]"></div>

          {/* TOP RIGHT RED GLOW */}

          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-red-400/20 rounded-full blur-[140px]"></div>

          {/* CENTER LIGHT */}

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-[180px]"></div>

          {/* BOTTOM GLOW */}

          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[160px]"></div>

        </div>

        {/* NAVBAR */}

        <Navbar />

        {/* CONTENT */}

        <main className="flex-1 w-full relative z-10 pt-20">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />
            <Route
  path="/about"
  element={<About />}
/>

            <Route
              path="/donate"
              element={<Donate />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

          </Routes>

        </main>

        {/* FOOTER */}

        <Footer />

      </div>

    </Router>

  );

}

export default App;