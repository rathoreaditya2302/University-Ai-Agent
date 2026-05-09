
export default function Dashboard() {
  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2>Total Queries</h2>
        <p className="text-4xl font-bold">1240</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2>Students</h2>
        <p className="text-4xl font-bold">320</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2>CSAT</h2>
        <p className="text-4xl font-bold">94%</p>
      </div>
    </div>
  );
}
