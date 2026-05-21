
const LoginView = ({
  loginForm,
  setLoginForm,
  handleLogin
}) => {

  return (

    <div className="min-h-[70vh] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-stone-100">

        <h2 className="text-3xl font-extrabold text-stone-900 mb-6 text-center">

          Admin Login

        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="text"
            required
            placeholder="Username"
            className="w-full border rounded-lg p-3"
            value={loginForm.username}
            onChange={e =>
              setLoginForm({
                ...loginForm,
                username: e.target.value
              })
            }
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={loginForm.password}
            onChange={e =>
              setLoginForm({
                ...loginForm,
                password: e.target.value
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold cursor-pointer"
          >

            Login

          </button>

        </form>

      </div>

    </div>

  );

};

export default LoginView;