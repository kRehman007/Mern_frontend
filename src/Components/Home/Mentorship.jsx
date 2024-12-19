import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Array = [
  "Our mentors work with you to identify your career aspirations and create a roadmap tailored to your goals.",
  "We evaluate your current skills and recommend courses that align with your objectives and interests.",
  "Engage in weekly sessions with experienced mentors who guide you through course material, projects, and real-world applications.",
  "Work on industry-relevant projects under expert guidance to build a portfolio that stands out.",
  "Receive regular feedback on your progress and actionable insights to improve your skills.",
  "Get career advice, mock interview practice, and resume-building support to confidently land your dream job.",
];
const Mentorship = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "2rem", fontWeight: "semibold", color: "#673ab7" }}
      >
        Mentoship Process
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontSize: "1rem", fontWeight: "medium", color: "#e91367" }}
      >
        A Step-by-Step Journey to Success
      </Typography>
      <Box>
        <ul className="mt-5 list-disc list-outside pl-3">
          {Array.map((list, index) => (
            <li key={index} className="mb-1">
              {list}
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default Mentorship;
