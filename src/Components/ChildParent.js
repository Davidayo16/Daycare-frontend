import React from "react";

const ChildParent = ({ user }) => {
  console.log(user);
  const [child, setChild] = React.useState({
    firstName: user?.user?.parent?.firstName,
    lastName: user?.user?.parent?.lastName,
    email: user?.user?.parent?.email,
    homeAddress: user?.user?.parent?.homeAddress,
    workAddress: user?.user?.user?.workAddress,
    relationship: user?.user?.user?.relationship,
  });
  React.useEffect(() => {
    if (user) {
      setChild({
        firstName: user?.user?.parent?.firstName,
        lastName: user?.user?.parent?.lastName,
        email: user?.user?.parent?.email,
        homeAddress: user?.user?.parent?.homeAddress,
        workAddress: user?.user?.parent?.workAddress,
        relationship: user?.user?.parent?.relationship,
      });
    }
  }, [user]);
  return (
    <div className="personal-profile">
      <h2>Parent/Guardian Details
      </h2>
      <div className="profile-details">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={child?.firstName}
            // placeholder="Enter first name"
            // onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={child?.lastName}
            // placeholder="Enter last name"
            // onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Home Address</label>
          <input
            type="text"
            id="homeAdress"
            name="homeAdress"
            // onChange={handleChange}
            value={child.homeAddress}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Work Address</label>
          <input
            type="text"
            id="workAddress"
            name="workAddress"
            // placeholder="Enter zip code"
            // onChange={handleChange}
            value={child.workAddress}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="relationhip"
            name="relationship"
            // placeholder="Enter country"
            // onChange={handleChange}
            value={child.relationship}
          />
        </div>

        {/* Other profile fields can be added */}
      </div>
      <div className="mt-4">
        <h2>Authorized Pickup Persons</h2>
        <table className="table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {user?.user?.authorizedPickupPersons?.map((p, index) => (
              <tr key={index} className={`table-row fade-in`}>
                <td>{p?.fullName}</td>
                <td>{p?.relationship}</td>
                <td>{p?.contactInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildParent;
