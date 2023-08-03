import React, {useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Headers from "../Header"
import Cookies from "js-cookie"
// import {TailSpin} from "react-loader-spinner"
import Loader from 'react-loader-spinner'
import SimilarProductItem from "../SimilarProductItem"
import {CartContext} from "../../Context/CartContext"

import "./index.css"

const apiStatusConstants = {
    initial : "INITIAL",
    success: "SUCCESS",
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',

};

const ProductItemDetails = () => {
const {addCartItem} = useContext(CartContext)

const [similarProductsData, setSimilarProductsData] = useState([])
const [quantity, setQuantity] = useState(1)
const [productsData, setProductsData] = useState({})
const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

const {id} = useParams();

const getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
})

const getProductData = async () => {
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
const response = await fetch(url, options)
// console.log(response)
const fetchedData = await response.json()
console.log(fetchedData)

if (response.ok) {
    const updatedData = getFormattedData(fetchedData)
    console.log(updatedData)
    setProductsData(updatedData)
    const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => getFormattedData(eachSimilarProduct),
      )
      setApiStatus(apiStatusConstants.success)
      setSimilarProductsData(updatedSimilarProductsData)
}

if (response.ok === 404) {
    setApiStatus(apiStatusConstants.failure)
}

}

useEffect(() => {
    getProductData()
}, [])

const renderProductDetailsView = () => {
  const {
        availability,
        brand,
        description,
        imageUrl,
        price,
        rating,
        title,
        totalReviews,
      } = productsData

      const onDecrementQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
      }

      const onIncrementQuantity = () => {
        setQuantity(quantity + 1)
      }

     const onClickAddToCart = () => {
      addCartItem({...productsData, quantity})
     }

      return (
        <div className="product-details-success-view">
          <div className="product-details-container">
            <img src={imageUrl} alt="product" className="product-image" />
            <div className="product">
              <h1 className="product-name">{title}</h1>
              <p className="price-details">Rs {price}/-</p>
              <div className="rating-and-reviews-count">
                <div className="rating-container">
                  <p className="rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
                <p className="reviews-count">{totalReviews} Reviews</p>
              </div>
              <p className="product-description">{description}</p>
              <div className="label-value-container">
                <p className="label">Available:</p>
                <p className="value">{availability}</p>
              </div>
              <div className="label-value-container">
                <p className="label">Brand:</p>
                <p className="value">{brand}</p>
              </div>
              <hr className="horizontal-line" />
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onDecrementQuantity}
                  // eslint-disable-next-line react/no-unknown-property
                  data-testid="minus"
                >
                  <BsDashSquare className="quantity-controller-icon" />
                </button>
                <p className="quantity">{quantity} </p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onIncrementQuantity}
                  // eslint-disable-next-line react/no-unknown-property
                  data-testid="plus"
                >
                  <BsPlusSquare className="quantity-controller-icon" />
                </button>
              </div>
              <button type="button" onClick = {onClickAddToCart} className="button add-to-cart-btn">
                ADD TO CART
              </button>
            </div>
          </div>
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProductsData.map(eachSimilarProduct => (
              <SimilarProductItem
                productDetails={eachSimilarProduct}
                key={eachSimilarProduct.id}
              />
            ))}
          </ul>
        </div>
      )
}


const renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>

    
  )

  const renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )
   
const renderProductDetails = () => {
  
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView()
     case apiStatusConstants.failure:
        return renderFailureView()
    case apiStatusConstants.inProgress:
        return renderLoadingView()
    default:
        return null
    }

}

return (
    <>
    <Headers/>
    <div className="product-item-details-container">
          {renderProductDetails()}
        </div>
    </>
)
 

}

export default ProductItemDetails