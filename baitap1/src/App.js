import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPostsComponent from '../../../module5s2/baitap1/src/component/blog/ListBlog';
import PostDetailComponent from '../../../module5s2/baitap1/src/component/blog/DetailBlog';
import CreatePostComponent from '../../../module5s2/baitap1/src/component/blog/AddBlog';
import EditPostComponent from '../../../module5s2/baitap1/src/component/blog/EditBlog';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
      <div className="App">

        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/posts" element={<ListPostsComponent />} />
            <Route path="/posts/add" element={<CreatePostComponent />} />
            <Route path="/posts/edit/:id" element={<EditPostComponent />} />
            <Route path="/posts/:id" element={<PostDetailComponent />} /> {/* Assuming you want a detail route */}
          </Routes>
        </Router>
      </div>
  );
};

export default App;