import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/NotFound";
import ProductPage from "./pages/Product";
import Layout from "./layout";
import EditProductPage from "./pages/Product/edit";
function App() {
  return (
    <div className="w-full h-screen bg-sky-800">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<Layout />} >
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/edit/:id" element={<EditProductPage />} />
            <Route path="/account" element={<HomePage />} />
            <Route path="/order" element={<HomePage />} />
            <Route path="/comment" element={<HomePage />} />
            <Route path="/setting" element={<HomePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
