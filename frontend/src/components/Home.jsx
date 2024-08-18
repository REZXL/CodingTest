import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleUpdate = (blog) => {
    navigate("/add", { state: { blog } }); // Pass blog data as state
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/post/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {blogs.map((blog) => (
            <Card key={blog._id} sx={{ maxWidth: 345 }}>
              {blog.img_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.img_url}
                  alt={blog.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleUpdate(blog)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
