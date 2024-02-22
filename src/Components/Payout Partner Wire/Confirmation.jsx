import React, { useState } from "react";
import "./Payout Partner Wire.css";

function Confirmation({ click1, datapassed }) {
  const [wireId, setWireId] = useState("");
  const [wireDate, setWireDate] = useState("");
  const [specialRemarks, setSpecialRemarks] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      wireId: wireId,
      wireDate: wireDate,
      specialRemarks: specialRemarks,
      data: datapassed
    };

    fetch("http://localhost:3000/payout_partner_wire/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle successful response
        setIsSubmitted(true); // Update state to indicate form submission success
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  return (
    <>
      <div id="popupModal" className="modal">
        <h2 style={{ textAlign: "center" }}>Create Wire Batch</h2> <br />
        <div className="modal-content">
          <span className="close" onClick={click1}>
            &times;
          </span>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form-style"
          >
            <div className="form-group">
              <label htmlFor="wireId">Wire ID:</label>
              <input
                type="text"
                id="wireId"
                value={wireId}
                onChange={(e) => setWireId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="wireDate">Wire Date:</label>
              <input
                type="date"
                id="wireDate"
                value={wireDate}
                onChange={(e) => setWireDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialRemarks">Special Remarks:</label>
              <input
                type="text"
                id="specialRemarks"
                value={specialRemarks}
                onChange={(e) => setSpecialRemarks(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>

          {isSubmitted && (
            <div className="success-sign">
              Form submitted successfully!
            </div>
          )}
        </div>
      </div>

      <div id="overlay" className="overlay"></div>
    </>
  );
}

export default Confirmation;
