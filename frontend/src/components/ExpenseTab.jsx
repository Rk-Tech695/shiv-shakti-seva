import DonationCard from './DonationCard';

const ExpenseTab = ({
  finances,
  expenseForm,
  setExpenseForm,
  handleAddExpense,
  loadDashboard,
  cashDonationForm,
  setCashDonationForm,
  handleCashDonation
}) => {

  

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div>

        <h3 className="text-2xl font-bold mb-6">
          Foundation Funds
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">

    <p className="text-sm font-bold text-green-600 mb-1 uppercase tracking-wider">
      Available Cash
    </p>

    <p className="text-3xl font-extrabold text-green-900">
      ₹{finances.cashAvailable}
    </p>

  </div>

  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">

    <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider">
      Available Bank
    </p>

    <p className="text-3xl font-extrabold text-blue-900">
      ₹{finances.bankAvailable}
    </p>

  </div>

  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">

    <p className="text-sm font-bold text-orange-600 mb-1 uppercase tracking-wider">
      Net Balance
    </p>

    <p className="text-3xl font-extrabold text-orange-900">
      ₹{finances.totalBalance}
    </p>

  </div>

</div>

{/* <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-8">

  <h3 className="text-xl font-bold mb-4">

    Record Donation

  </h3>

  <form
    onSubmit={handleCashDonation}
    className="space-y-4"
  >

    <input
      type="text"
      placeholder="Donor Name"
      className="w-full border rounded-lg p-3"
      value={cashDonationForm.name}
      onChange={e =>
        setCashDonationForm({
          ...cashDonationForm,
          name: e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder="Mobile Number"
      className="w-full border rounded-lg p-3"
      value={cashDonationForm.mobile}
      onChange={e =>
        setCashDonationForm({
          ...cashDonationForm,
          mobile: e.target.value
        })
      }
    />

    <input
  type="text"
  inputMode="numeric"
  placeholder="Amount"
  className="w-full border rounded-lg p-3"
  value={cashDonationForm.amount}
  onChange={e =>
    setCashDonationForm({

      ...cashDonationForm,

      amount:
        e.target.value.replace(
          /[^0-9]/g,
          ''
        )

    })
  }
/>

    <input
      type="text"
      placeholder="Received By"
      className="w-full border rounded-lg p-3"
      value={cashDonationForm.receivedBy}
      onChange={e =>
        setCashDonationForm({
          ...cashDonationForm,
          receivedBy: e.target.value
        })
      }
    />

    <button
      type="submit"
      className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
    >

      Add Cash Donation

    </button>

  </form>

</div> */}

<div className="bg-stone-50 p-6 rounded-3xl border border-stone-200">

  <h3 className="text-3xl font-extrabold mb-6">

    Record Donation

  </h3>

  <form
    onSubmit={handleCashDonation}
    className="space-y-4"
  >

    <input
      type="text"
      placeholder="Donor Name"
      className="w-full border rounded-xl p-4"
      value={cashDonationForm.donorName}
      onChange={e =>
        setCashDonationForm({

          ...cashDonationForm,

          donorName:
            e.target.value

        })
      }
    />

    <input
      type="text"
      placeholder="Mobile Number"
      className="w-full border rounded-xl p-4"
      value={cashDonationForm.donorMobile}
      onChange={e =>
        setCashDonationForm({

          ...cashDonationForm,

          donorMobile:
            e.target.value

        })
      }
    />

    <input
      type="number"
      placeholder="Amount"
      className="w-full border rounded-xl p-4"
      value={cashDonationForm.amount}
      onChange={e =>
        setCashDonationForm({

          ...cashDonationForm,

          amount:
            e.target.value

        })
      }
    />

    <select
      className="w-full border rounded-xl p-4"
      value={cashDonationForm.paymentMode}
      onChange={e =>
        setCashDonationForm({

          ...cashDonationForm,

          paymentMode:
            e.target.value

        })
      }
    >

      <option value="CASH">
        CASH
      </option>

      <option value="UPI">
        UPI
      </option>

      <option value="BANK_TRANSFER">
        BANK TRANSFER
      </option>

    </select>

    {(cashDonationForm.paymentMode === 'UPI' ||

      cashDonationForm.paymentMode === 'BANK_TRANSFER') && (

      <>

        <input
          type="text"
          placeholder="UPI / Bank Holder Name"
          className="w-full border rounded-xl p-4"
          value={cashDonationForm.paymentHolderName}
          onChange={e =>
            setCashDonationForm({

              ...cashDonationForm,

              paymentHolderName:
                e.target.value

            })
          }
        />

        <input
          type="text"
          placeholder="Transaction ID / UTR"
          className="w-full border rounded-xl p-4"
          value={cashDonationForm.transactionId}
          onChange={e =>
            setCashDonationForm({

              ...cashDonationForm,

              transactionId:
                e.target.value

            })
          }
        />

      </>

    )}

    <input
      type="text"
      placeholder="Received By"
      className="w-full border rounded-xl p-4"
      value={cashDonationForm.receivedBy}
      onChange={e =>
        setCashDonationForm({

          ...cashDonationForm,

          receivedBy:
            e.target.value

        })
      }
    />

    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold"
    >

      Record Donation

    </button>

  </form>

</div>

        <h3 className="text-xl font-bold mb-4">
          Record New Expense
        </h3>

        <form
          onSubmit={handleAddExpense}
          className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-100"
        >

          <input
            type="number"
            required
            placeholder="Amount (₹)"
            className="w-full border rounded-lg p-3"
            value={expenseForm.amount}
            onChange={e =>
              setExpenseForm({
                ...expenseForm,
                amount: e.target.value
              })
            }
          />

          <input
            type="text"
            required
            placeholder="Purpose"
            className="w-full border rounded-lg p-3"
            value={expenseForm.purpose}
            onChange={e =>
              setExpenseForm({
                ...expenseForm,
                purpose: e.target.value
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3 bg-white"
            value={expenseForm.sourceType}
            onChange={e =>
              setExpenseForm({
                ...expenseForm,
                sourceType: e.target.value
              })
            }
          >

            <option value="CASH">
              Deduct from CASH
            </option>

            <option value="BANK">
              Deduct from BANK
            </option>

          </select>

          <input
            type="text"
            required
            placeholder="Handled By"
            className="w-full border rounded-lg p-3"
            value={expenseForm.handledBy}
            onChange={e =>
              setExpenseForm({
                ...expenseForm,
                handledBy: e.target.value
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 cursor-pointer"
          >

            Deduct Expense

          </button>

        </form>

      </div>

      <div>

        <h3 className="text-2xl font-bold mb-6">
          Donation History
        </h3>

        <div className="space-y-3 mb-10">

          {finances.donations?.map(donation => (

            <DonationCard

                        key={donation.id}
                        donation={donation}
                        loadDashboard={loadDashboard}

            />

          ))}

        </div>

        <h3 className="text-2xl font-bold mb-6">
          Expense History
        </h3>

        <div className="space-y-3">

          {finances.expenses?.map(exp => (

            <div
              key={exp.id}
              className="bg-white border border-stone-200 p-4 rounded-xl flex justify-between items-center shadow-sm"
            >

              <div>

                <p className="font-bold text-stone-900">
                  {exp.purpose}
                </p>

                <p className="text-sm text-stone-500">
                  By: {exp.handledBy}
                  {' | '}
                  via {exp.sourceType}
                </p>

              </div>

              <div className="font-bold text-red-600">
                - ₹{exp.amount}
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default ExpenseTab;