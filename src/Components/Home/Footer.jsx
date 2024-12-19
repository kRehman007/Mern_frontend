import { Typography, Container, Box, Stack, Link } from "@mui/material";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ background: "#333", padding: "60px", mt: 10 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { sm: "space-between" },
          }}
        >
          <Stack direction="column" alignItems="center">
            <Typography
              variant="h5"
              className="font-montserrat"
              sx={{ color: "#e91367" }}
            >
              Quick Links
            </Typography>
            <Box
              className="font-roboto"
              sx={{
                color: "#fff",
                mt: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                gap: 2,
              }}
            >
              <Link
                href="https://www.facebook.com/profile.php?id=100056951512316&mibextid=ZbWKwL"
                color="#fff"
                underline="none"
              >
                <BsFacebook className="text-3xl" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/kashifdev/"
                color="#fff"
                underline="none"
              >
                <FaLinkedin className="text-3xl" />
              </Link>
              <Link
                href="https://www.instagram.com/k_rehman_007/profilecard/?igsh=MTNlZXd5aHpub3drMg=="
                color="#fff"
                underline="none"
              >
                <FaSquareInstagram className="text-3xl" />
              </Link>
              <Link
                href="https://github.com/kRehman007"
                color="#fff"
                underline="none"
              >
                <FaGithub className="text-3xl" />
              </Link>
            </Box>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography
              variant="h5"
              className="font-poppins"
              sx={{ color: "#e91367", mt: { xs: 5, sm: 0 } }}
            >
              Terms & Conditions
            </Typography>
            <Box
              className="font-roboto"
              sx={{
                color: "#fff",
                mt: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography>User accounts</Typography>
              <Typography>Educational content</Typography>
              <Typography>Payment and refunds</Typography>
              <Typography>Governing law</Typography>
            </Box>
          </Stack>
          <Stack
            direction="column"
            className="font-montserrat"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ color: "#e91367", mt: { xs: 5, sm: 0 } }}
            >
              Contact Info
            </Typography>
            <Box
              className="font-roboto"
              sx={{
                color: "#fff",
                mt: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography>+92 3314315567</Typography>
              <Typography>kashisial2327@gmail.com</Typography>
            </Box>
          </Stack>
        </Box>
        <Typography
          className="text-center font-roboto"
          sx={{
            color: "#fff",
            mt: { xs: 7, sm: 5 },
            fontSize: { xs: "11px", sm: "15px" },
          }}
        >
          @copyrights reserved. Kashif ur Rehman 2024
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
