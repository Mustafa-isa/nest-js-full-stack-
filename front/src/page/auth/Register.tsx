// App.js
import {
  Button,
  Container,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast,  } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import CenteredCard from "../../component/CenterCard";
import {useAppContext} from '../../context/AppContext'
import { ThreeDots  } from 'react-loading-icons'

import { useState } from "react";
import FormControlCom from "../../component/FormControlCom";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const {register} = useAppContext()
  const [loadBtn ,setLoadBtnm ] = useState(false)

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


    if (formData.pass.trim() === "") {
      newErrors.pass = "pass is required";
      valid = false;
    } else {
      newErrors.pass = "";
    }

  
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
    return true;
  };

  const handleChange = (e: unknown) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit =async (e) => {
    try{
      e.preventDefault();
      setLoadBtnm(true)
    
      if (validateForm()) {
        // Form submission logic goes here
        console.log("Form submitted:", formData); 
      await  register(formData.email ,formData.pass ,formData.linkedProfile)
      navigate('/');
      console.log("naigate failed")
      toast.warn('🦄 User Not Found', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      } else {
        console.log("Form has errors. Please fix them.");
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoadBtnm(false)
    
    }
  }
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
            <FormControlCom
              type="url"
              name="linkedProfile"
              value={formData.linkedProfile}
              onChange={handleChange}
              error={!!formErrors.linkedProfile}
              helperText={formErrors.linkedProfile}
              label="linkedProfile"
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              endIcon={loadBtn && <ThreeDots strokeOpacity={.125} />}
            >
              Login
            </Button>
          </form>
          <Stack
            direction="row"
            sx={{ mt: "10px" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <p>do you have no account</p>
            <Link to="/login">Login</Link>
          </Stack>
        </Container>
      </CenteredCard>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  );
};

export default Register;
