import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
} from "@mui/material";

function UpdateCarStatus() {
  const [cars, setCars] = useState([]); // State to hold car data
  const [loading, setLoading] = useState(true); // Loading state
  const statusOptions = ["available", "not available"]; // ENUM values
  const backgroundImageUrl = '/images/car1.jpg'; // Background image URL

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "http://localhost/car-rental-website/updateCarStatus.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const result = await response.json();
        if (result.status === "success") {
          setCars(result.data); // Set car data
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Update car status
  const handleStatusUpdate = async (car_id, status) => {
    try {
      const response = await fetch(
        "http://localhost/car-rental-website/updateCarStatus.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_id, status }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.car_id === car_id ? { ...car, status } : car
          )
        );
        alert("Car status updated successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImageUrl})`, // Correct variable name
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 4,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center", color: "#fff" }}>
        Update Car Status
      </Typography>
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "#fff" }}>
          Loading cars...
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {cars.map((car) => (
            <Card
              key={car.car_id}
              sx={{
                position: "relative",
                boxShadow: 4,
                backgroundColor: "rgba(58, 56, 56, 0.7)",
                borderRadius: 2,
                overflow: "hidden",
                "&:hover": { boxShadow: 12 },
                width: 300,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`/images/${car.plate_id}.jpg`} // Ensure this path matches your server setup
                alt={`${car.brand} ${car.model} ${car.year}`}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  {car.brand} {car.model} ({car.year})
                </Typography>
                <Typography variant="body2" sx={{ color: "#9E9EA2" }}>
                  ${car.price_per_day} per day
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, color: "#fff" }}
                >
                  Current Status:{" "}
                  <strong style={{ color: "#FFD700" }}>{car.status}</strong>
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Select
                    value={car.status || ""}
                    onChange={(e) =>
                      handleStatusUpdate(car.car_id, e.target.value)
                    }
                    fullWidth
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default UpdateCarStatus;
