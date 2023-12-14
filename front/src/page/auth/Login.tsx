// App.js
import {
  Button,
  Container,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import CenteredCard from "../../component/CenterCard";
import { useState } from "react";
import FormControlCom from "../../component/FormControlCom";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    linkedProfile: "",
    pass: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    linkedProfile: "",
    pass: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate First Name
    if (formData.email.trim() === "") {
      newErrors.pass = "pass is required";
      valid = false;
    } else {
      newErrors.pass = "";
    }

    // Validate Last Name
    if (formData.linkedProfile.trim() === "") {
      newErrors.linkedProfile = "url is required";
      valid = false;
    } else {
      newErrors.linkedProfile = "";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (e: unknown) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form submission logic goes here
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
    >
      <CenteredCard>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h3" color="initial">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <FormControlCom
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                label="email"
              />
              <FormControlCom
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                error={!!formErrors.pass}
                helperText={formErrors.pass}
                label="password"
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Register
            </Button>
          </form>
          <Stack
            direction="row"
            sx={{ mt: "10px" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <p>do you have no account</p>
            <Link to="/register">Reigster</Link>
          </Stack>
        </Container>
      </CenteredCard>
    </div>
  );
};

export default Register;
