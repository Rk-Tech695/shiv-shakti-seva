const DonorTab = ({
  donors
}) => {

  return (

    <div>

      <h3 className="text-2xl font-bold mb-6">

        Dan Data Master

      </h3>

      <div className="overflow-x-auto">

        <table className="w-full text-left border-collapse">

          <thead>

            <tr className="bg-stone-100 text-stone-600 uppercase text-xs tracking-wider">

              <th className="p-4 rounded-tl-xl">
                Name
              </th>

              <th className="p-4">
                Mobile
              </th>

              <th className="p-4 rounded-tr-xl">
                Total Donated (₹)
              </th>
              <th className="p-4 rounded-tr-xl">
               Date
              </th>

            </tr>

          </thead>

          <tbody>

  {donors.map(donor => (

    <tr
      key={donor.id}
      className="border-b"
    >

      <td className="p-4 font-bold">

        {donor.name}

      </td>

      <td className="p-4">

        {donor.mobile_number}

      </td>

      <td className="p-4 text-orange-600 font-bold">

        ₹{donor.total_donated_amount}

      </td>

      <td className="p-4">

        <div className="space-y-2">

          {donor.donations

  ?.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )

  .map(
            donation => (

              <div
                key={donation.id}
                className="text-sm"
              >

                <p className="font-bold text-green-600">

                  ₹{donation.amount}

                </p>

                <p className="text-stone-500">

                  {new Date(
                    donation.createdAt
                  ).toLocaleDateString(
                    'en-IN',
                    {

                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'

                    }
                  )}

                </p>

              </div>

            )
          )}

        </div>

      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </div>

  );

};

export default DonorTab;