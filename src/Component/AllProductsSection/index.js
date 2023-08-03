import {useState, useEffect} from "react"
import Cookies from "js-cookie"

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductsHeader from "../ProductsHeader"
import FiltersGroup from "../FiltersGroup"
import ProductCard from '../ProductsCard'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]


const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const AllProductsSection = () => {
 const [productsList, setProductsList] = useState([])
 const [isLoading, setIsLoading] = useState(true)
 const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
 const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId)
 const [activeCategoryId, setActiveCategoryId] = useState("")
 const [searchInput, setSearchInput] = useState("")
 const [ activeRatingId, setActiveRatingId] = useState("")

    useEffect(() => {
        getProducts()
    }, [activeOptionId, activeCategoryId, activeRatingId])

    const getProducts = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const jwtToken = Cookies.get("jwt_token")
        const url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
        // console.log(jwtToken)
        const options = {
            method: "GET",
            headers:  {
                Authorization: `Bearer ${jwtToken}`
            },
        }

        const response = await fetch(url, options)
        // console.log(response)
        if(response.ok) {
          const fetchedData = await response.json()
          // console.log(fetchedData)
  
          const updatedData = fetchedData.products.map((product) => ({
          brand: product.brand,
          title: product.title,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
  
          }))
  
          setProductsList(updatedData)
          setIsLoading(false)
          setApiStatus(apiStatusConstants.success)
        }

       else {
          setApiStatus(apiStatusConstants.failure)
        }
       
    }

    const updateActiveOptionId = activeOptionId => {
      setActiveOptionId(activeOptionId)
    }


    const renderFailureView = () => (
      <div className="products-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
          className="products-failure-img"
        />
        <h1 className="product-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="products-failure-description">
          We are having some trouble processing your request. Please try again.
        </p>
      </div>
    )

    const renderProductsList = () =>{
      const shouldShowProductsList = productsList.length > 0 
        return shouldShowProductsList ? (
            <div>
              {/* <h1 className="products-list-heading">All Products</h1> */}
              <ProductsHeader sortbyOptions = {sortbyOptions} 
              activeOptionId = {activeOptionId}
              updateActiveOptionId = {updateActiveOptionId}/>
              {isLoading ? (
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> 
              ) : ( 
                <ul className="products-list">
                {productsList.map(product => (
                  <ProductCard productData={product} key={product.id} />
                ))}
              </ul>
              
              )}
             
            </div>
          ) : (
            <div className="no-products-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                className="no-products-img"
                alt="no products"
              />
              <h1 className="no-products-heading">No Products Found</h1>
              <p className="no-products-description">
                We could not find any products. Try other filters.
              </p>
            </div>
          )
    }

    const renderLoadingView = () => (
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  

    const renderAllProducts = () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return renderProductsList()
        case apiStatusConstants.failure:
            return renderFailureView()
          case apiStatusConstants.inProgress:
            return renderLoadingView()
        default:
          return null
      }
    }

    const changeCategory = (activeCategoryId) => {
      setActiveCategoryId(activeCategoryId)
    }

    const enterSearchInput = () => {
      getProducts()
    }

    const changeSearchInput = searchInput => {
      setSearchInput(searchInput)
      // console.log(searchInput)
    }

    const changeRating = activeRatingId => {
      setActiveRatingId(activeRatingId)
    }

    const clearFilters = () => {
      setActiveCategoryId("")
      setActiveRatingId("")
      setSearchInput("")
     
    }
   
    return (
      <div className="all-products-section">
        <FiltersGroup 
        categoryOptions = {categoryOptions}
        activeCategoryId={activeCategoryId}
        changeCategory = {changeCategory}
        searchInput = {searchInput}
        changeSearchInput = {changeSearchInput}
        enterSearchInput = {enterSearchInput}
        ratingsList={ratingsList}
        activeRatingId = {activeRatingId}
        changeRating = {changeRating}
        clearFilters={clearFilters}
        />
    {renderAllProducts()}
    </div>
    )
  
}

export default AllProductsSection
