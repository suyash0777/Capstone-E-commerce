import React, { useEffect, useState } from "react";
import { getProduct, clearErrors } from "../../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "./Product.css";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Mobiles",
  "SmartPhones",
];

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");

  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={30000}
            />
          </div>

          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
