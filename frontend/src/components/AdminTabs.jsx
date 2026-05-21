
const AdminTabs = ({
  activeTab,
  setActiveTab
}) => {

  return (

    <div className="flex border-b border-stone-200">

      {[
        'DANDATA',
        'EXPENSES',
        'EVENTS',
        'BOOKINGS'
      ].map(tab => (

        <button

          key={tab}

          onClick={() =>
            setActiveTab(tab)
          }

          className={`flex-1 py-4 font-bold text-sm tracking-widest uppercase transition-colors ${
            activeTab === tab
              ? 'border-b-4 border-orange-500 text-orange-600'
              : 'text-stone-500 hover:text-stone-800'
          }`}

        >

          {tab}

        </button>

      ))}

    </div>

  );

};

export default AdminTabs;