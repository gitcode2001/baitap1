import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPostsComponent from '../../../module5s2/baitap1/src/component/blog/ListBlog';
import PostDetailComponent from '../../../module5s2/baitap1/src/component/blog/DetailBlog';
import CreatePostComponent from '../../../module5s2/baitap1/src/component/blog/AddBlog';
import EditPostComponent from '../../../module5s2/baitap1/src/component/blog/EditBlog';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <div className="App">
          <Routes>
            <Route path="/posts" element={<ListPostsComponent />} />
            <Route path="/posts/add" element={<CreatePostComponent />} />
            <Route path="/posts/edit/:id" element={<EditPostComponent />} />
            <Route path="/posts/detail/:id" element={<PostDetailComponent />} />
          </Routes>

      </div>

  );
};

export default App;