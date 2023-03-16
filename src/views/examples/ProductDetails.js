import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_PRODUCTS_LIST,
} from "../../api/Urls";
import ProductForm  from './ProductChanging'
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const [product, setProduct] = useState({});

    let { id } = useParams();

    const getProduct = async () => {
        const product_response = await axios.get(`${API_PRODUCTS_LIST}${id}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        console.log(product_response);
        setProduct(prev => product_response.data);
      };

    useEffect(() => {
        getProduct();
    }, [product.id]);

    return (    
        <ProductForm product={product}/>
    );
  };
  
  export default ProductDetail;
  