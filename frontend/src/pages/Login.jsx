
export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-accent text-white py-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

