import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/NotFound";
import ProductPage from "./pages/Product";
import Layout from "./layout";
import EditProductPage from "./pages/Product/edit";
import EditAccountPage from "./pages/Account/edit";
import AddProductPage from "./pages/Product/add";
import AccountPage from "./pages/Account";
import OrderPage from "./pages/Order";
import CommentPage from "./pages/Comment";
import SettingPage from "./pages/Setting";
import CategoryPage from "./pages/Category";
import AddCategoryPage from "./pages/Category/add";
import EditCategoryPage from "./pages/Category/edit";
import OrderEdit from "./pages/Order/edit";
import CommentDetailPage from "./pages/Comment/detail";
import NotificationPage from "./pages/Notification";
import NotificationAddPage from "./pages/Notification/add";
import NotificationDetailPage from "./pages/Notification/detail";
function App() {
  return (
    <div className="w-full h-screen bg-sky-800">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<Layout />} >
            <Route path="/dashboard" element={<HomePage />} />
            {/* Product router */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/edit/:id" element={<EditProductPage />} />
            <Route path="/product/add" element={<AddProductPage />} />
            {/* Category router */}
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/add" element={<AddCategoryPage />} />
            <Route path="/category/edit/:id" element={<EditCategoryPage />} />

            {/* Account router */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/edit/:id" element={<EditAccountPage />} />
            {/* Order router */}
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:id" element={<OrderEdit />} />

            {/* Comment router */}
            <Route path="/comment" element={<CommentPage />} />
            <Route path="/comment/:id" element={<CommentDetailPage />} />
            {/* Notification router */}
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/notification/add" element={<NotificationAddPage />} />
            <Route path="/notification/:id" element={<NotificationDetailPage />} />
            {/* Setting router */}
            <Route path="/setting" element={<SettingPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
