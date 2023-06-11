import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './Home.css'; // Import CSS file

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({
    id: '',
    subtitle: '',
    title: '',
    author: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBlog = () => {
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setBlogData(blog);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setBlogData(blog);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
    setBlogData({
      id: '',
      subtitle: '',
      title: '',
      author: '',
    });
    setModalOpen(false);
  };

  const handleSaveBlog = () => {
    if (modalMode === 'add') {
      setBlogs((prevBlogs) => [...prevBlogs, blogData]);
    } else if (modalMode === 'edit') {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === selectedBlog.id ? blogData : blog))
      );
    }
    handleCloseModal();
  };

  const handleDeleteBlog = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Blogs
      </Typography>
      <Button variant="contained" onClick={handleAddBlog} startIcon={<AddIcon />}>
        Add Blog
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Subtitle</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.id}</TableCell>
              <TableCell>{blog.subtitle}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewBlog(blog)}>View</Button>
                <Button onClick={() => handleEditBlog(blog)}>Edit</Button>
                <Button onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
  <Box className="modal-box">
    <Typography variant="h5" component="h2" gutterBottom>
      {modalMode === 'add' ? 'Add Blog' : modalMode === 'edit' ? 'Edit Blog' : 'View Blog'}
    </Typography>
    <form className="two-column-form">
      <div className="form-row">
        <TextField
          label="Id"
          name="id"
          value={blogData.id}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          className="form-control mt-1"
          disabled={modalMode === 'view'}
        />
        <TextField
          label="Subtitle"
          name="subtitle"
          value={blogData.subtitle}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          className="form-control mt-1"
          disabled={modalMode === 'view'}
        />
      </div>
      <div className="form-row">
        <TextField
          label="Title"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          className="form-control mt-1"
          disabled={modalMode === 'view'}
        />
        <TextField
          label="Author"
          name="author"
          value={blogData.author}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          className="form-control mt-1"
          disabled={modalMode === 'view'}
        />
      </div>
      {modalMode === 'add' && (
        <Button  className="d-grid gap-2 mt-3 btn btn-primary" variant="contained" onClick={handleSaveBlog}>
          Save
        </Button>
      )}
      {modalMode === 'edit' && (
        <Button  className="d-grid gap-2 mt-3 btn btn-primary" variant="contained" onClick={handleSaveBlog}>
          Update
        </Button>
      )}
    </form>
  </Box>
</Modal>

    </div>
  );
};

export default Home;
