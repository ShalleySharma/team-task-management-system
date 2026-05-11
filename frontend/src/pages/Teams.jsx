import Navbar from "../components/Navbar";

export default function Teams() {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="card">
          <h2>Frontend Team</h2>

          <p>5 Members</p>
        </div>

        <div className="card">
          <h2>Backend Team</h2>

          <p>4 Members</p>
        </div>
      </div>
    </>
  );
}