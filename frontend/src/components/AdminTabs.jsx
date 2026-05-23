const AdminTabs = ({
  activeTab,
  setActiveTab
}) => {

  const tabs = [

    'DANDATA',

    'APPROVALS',

    'EXPENSES',

    'EVENTS',

    'BOOKINGS'

  ];

  return (

    <div className="overflow-x-auto border-b border-stone-200 bg-white">

      <div className="flex min-w-max">

        {tabs.map(tab => (

          <button

            key={tab}

            onClick={() =>
              setActiveTab(tab)
            }

            className={`px-6 py-4 font-bold text-sm tracking-widest uppercase transition-all whitespace-nowrap border-b-4 ${
              activeTab === tab
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
            }`}

          >

            {tab}

          </button>

        ))}

      </div>

    </div>

  );

};

export default AdminTabs;