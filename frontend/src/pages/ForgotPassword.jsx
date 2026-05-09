
export default function ForgotPassword() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-card">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Enter Email"
        />

        <button className="w-full bg-accent text-white py-3 rounded">
          Reset Password
        </button>
      </div>
    </div>
  );
}
