import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetails = () => {
  const { empid } = useParams();

  const [empData, empDataChange] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        empDataChange(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Employee Details</h1>
      {empData && <h4>The Employee name is: {empData.name}</h4>}
      <h5>Email: {empData.email}</h5>
      <h5>Email: {empData.mobile}</h5>
      <Link to="/" className="btn btn-danger">
        Back to Employee Listing
      </Link>
    </div>
  );
};

export default EmpDetails;
