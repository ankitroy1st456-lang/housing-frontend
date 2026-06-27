import React, { useState } from "react";

const fields = [
  {
    id: "longitude",
    label: "Longitude",
    type: "number",
    step: "0.01",
    placeholder: "-122.23",
  },
  {
    id: "latitude",
    label: "Latitude",
    type: "number",
    step: "0.01",
    placeholder: "37.88",
  },
  {
    id: "housing_median_age",
    label: "Housing Median Age",
    type: "number",
    step: "1",
    placeholder: "41",
  },
  {
    id: "total_rooms",
    label: "Total Rooms",
    type: "number",
    step: "1",
    placeholder: "880",
  },
  {
    id: "total_bedrooms",
    label: "Total Bedrooms",
    type: "number",
    step: "1",
    placeholder: "129",
  },
  {
    id: "population",
    label: "Population",
    type: "number",
    step: "1",
    placeholder: "322",
  },
  {
    id: "households",
    label: "Households",
    type: "number",
    step: "1",
    placeholder: "126",
  },
  {
    id: "median_income",
    label: "Median Income (×10,000)",
    type: "number",
    step: "0.1",
    placeholder: "8.3",
  },
  {
    id: "ocean_proximity",
    label: "Ocean Proximity",
    type: "select",
    options: ["<1H OCEAN", "INLAND", "NEAR OCEAN", "NEAR BAY", "ISLAND"],
  },
];

function App() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Collected form data: ", formData);
    try {
      // 1. Check for the Vercel cloud link, or fall back to your local testing port
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8123";

      // 2. Fetch from the dynamic URL and append your endpoint route
      const response = await fetch(`${backendUrl}/api/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Response from Node Server: ", data);
      alert(
        `Server Connected ! Temporary valuation: $${data.aiData.Predicted_price}`,
      );
    } catch (error) {
      console.log("there is some error :", error);
      alert(
        "Could not connect to the backend server. Make sure node index.js is running.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="mb-3" key={field.id}>
          <label htmlFor={field.id} className="form-label">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              className="form-select"
              id={field.id}
              name={field.id}
              value={formData[field.id] || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select an option...</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              step={field.step}
              className="form-control"
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default App;
