
export default function Register() {
  return (
    <div className="p-8 max-w-lg mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-card">
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input className="w-full border p-3 rounded mb-4" placeholder="Name" />
        <input className="w-full border p-3 rounded mb-4" placeholder="Email" />
        <input className="w-full border p-3 rounded mb-4" placeholder="Password" />

        <button className="w-full bg-primary text-white py-3 rounded">
          Register
        </button>
      </div>
    </div>
  );
}

