import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  // Initialize form with data if available
  useEffect(() => {
    if (location.state && location.state.blog) {
      setInputs(location.state.blog);
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (inputs._id) {
      
      axios
        .put(`http://localhost:3001/post/${inputs._id}`, inputs)
        .then((res) => {
          alert("Blog updated successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error updating blog:", err);
        });
    } else {
     
      axios
        .post("http://localhost:3001/post", inputs)
        .then((res) => {
          alert("Blog added successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error adding blog:", err);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />

          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {inputs._id ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
