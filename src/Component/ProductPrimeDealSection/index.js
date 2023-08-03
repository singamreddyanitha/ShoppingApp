import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProductCard from '../ProductsCard'
import Loader from 'react-loader-spinner'
import "./index.css"


const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: 'IN_PROGRESS',

}

const ProductPrimeDealsSection = () => {
    const [primeDealsList, setPrimeDealsList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    
  useEffect(() => {
    getPrimeDeals()
  }, [])

  const getPrimeDeals = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const url = "https://apis.ccbp.in/prime-deals";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);
    console.log(response);

    if(response.ok === true) {
        const fetchedData = await response.json()
        console.log(fetchedData)
        const updatedData = fetchedData.prime_deals.map((product) => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
        }))
    
        setPrimeDealsList(updatedData)
        setApiStatus(apiStatusConstants.success)
    } 
    else if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure)
    }
    
    else {
        setApiStatus(apiStatusConstants.inProgress)
    }
  };

  const renderPrimeDealsList = () => (
    <div>
      <h1 className="products-list-heading">Exclusive Prime Deals</h1>

      <ul className="products-list">
        {primeDealsList.map((product) => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </div>
  );


  const renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

 const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderSwitchContent = () => {
    switch (apiStatus) {
        case apiStatusConstants.success:
            return renderPrimeDealsList()
        case apiStatusConstants.failure:
            return renderPrimeDealsFailureView()
        case apiStatusConstants.inProgress:
            return renderLoadingView()
        
        default :
        return null
    }
}

  return (<>
    
    {renderSwitchContent()}
  </>)
};

export default ProductPrimeDealsSection;
