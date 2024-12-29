import  { useState } from "react";
import axios from "axios";

const CreateReports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carId, setCarId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState("");

  const fetchReport = async (action, params = {}) => {
    console.log(`Fetching report for action: ${action}, params:`, params);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost/car-rental-website/reports.php?action=${action}`,
        params,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (response.data.status === "success") {
        setReportData(response.data.data);
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch the report. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Car Rental Reports</h1>

      {/* Input Parameters */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Enter Parameters</h2>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Car ID:
            <input
              type="text"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>
        <div>
          <label>
            Customer ID:
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>
      </div>

      {/* Buttons to Fetch Reports */}
      <div>
        <button
          onClick={() =>
            fetchReport("reservation_report", {
        
              start_date: startDate,
              end_date: endDate,
            })
          }
        >
          Fetch Reservation Report
        </button>
        <button
          onClick={() =>
            fetchReport("reservations_by_car", { car_id: carId })
          }
        >
          Fetch Reservations by Car
        </button>
        <button
          onClick={() =>
            fetchReport("car_status_by_day", { date })
          }
        >
          Fetch Car Status by Day
        </button>
        <button
          onClick={() =>
            fetchReport("reservations_by_customer", { customer_id: customerId })
          }
        >
          Fetch Reservations by Customer
        </button>
        <button
          onClick={() =>
            fetchReport("daily_payments", {
              start_date: startDate,
              end_date: endDate,
            })
          }
        >
          Fetch Daily Payments
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Report Data */}
      <div>
        <h2>Report Data:</h2>
        {reportData.length > 0 ? (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                {Object.keys(reportData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default CreateReports;
