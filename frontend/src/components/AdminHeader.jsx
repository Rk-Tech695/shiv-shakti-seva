
const AdminHeader = ({
  setIsLoggedIn
}) => {

  return (

    <div className="bg-stone-900 p-8 text-white flex justify-between items-center">

      <div>

        <h2 className="text-3xl font-bold">
          Admin Portal
        </h2>

        <p className="text-stone-400">
          Manage Foundation Data
        </p>

      </div>

      <button

        onClick={() => {

          localStorage.removeItem(
            'adminLoggedIn'
          );

          setIsLoggedIn(false);

        }}

        className="bg-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-700"

      >

        Logout

      </button>

    </div>

  );

};

export default AdminHeader;