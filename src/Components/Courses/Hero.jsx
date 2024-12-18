import {
  Container,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React from "react";

const Hero = () => {
  const categories = [
    {
      value: "All",
    },
    {
      value: "Technology",
    },
    {
      value: "Business",
    },
    {
      value: "Web Dev",
    },
  ];
  return (
    <Container sx={{ mt: 0 }}>
      <Typography
        variant="h1"
        className="font-montserrat font-bold"
        sx={{ fontSize: { xs: "2rem", sm: "2.5rem" }, color: "#673ab7" }}
      >
        Explore Our Courses
      </Typography>
      <Typography
        variant="h6"
        className="font-poppins"
        sx={{ fontSize: "1rem", color: "#e91363" }}
      >
        Find the best courses to upskill and achieve your goals!
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{ xs: 1, sm: 2 }}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 10 }}
      >
        <TextField
          label="Find your courses"
          variant="outlined"
          sx={{ width: "300px" }}
        />
        <Typography sx={{ fontWeight: "bold" }}>OR</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <TextField
            select
            label="Select by category"
            defaultValue="All"
            sx={{ width: "300px" }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Hero;
