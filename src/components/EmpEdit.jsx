import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EmpEdit = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [mobile, mobileChange] = useState("");
  const [active, activeChange] = useState(true);

  const { empid } = useParams();

  const [empData, empDataChange] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        idChange(response.id);
        nameChange(response.name);
        emailChange(response.email);
        mobileChange(response.mobile);
        activeChange(response.isActive);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const empData = { id, name, email, mobile, active };
    fetch("http://localhost:5000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => {
        alert("Saved Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2> Edit Employee</h2>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          value={name}
                          onChange={(event) => nameChange(event.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          value={email}
                          onChange={(event) => emailChange(event.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          value={mobile}
                          onChange={(event) => mobileChange(event.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-check">
                        <input
                          checked={active}
                          onChange={(event) => activeChange(event.target.value)}
                          type="checkbox"
                          className="form-check-input"
                        ></input>
                        <label className="form-check-label">Is Active</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <Link to="/" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
