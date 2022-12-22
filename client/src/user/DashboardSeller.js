import DashboardNav from "../components/DashboardNav";
const DashboardSeller = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <h1>Dashboard</h1>
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      <div className="container">
        <p>Show all buttons seller</p>
      </div>
    </>
  );
};

export default DashboardSeller;
