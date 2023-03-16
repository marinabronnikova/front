import {
    Card,
    CardHeader,
    Table,
    Container,CardFooter,PaginationItem,PaginationLink,Pagination,
    Row,
    Col, Button
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import UserHeader from "components/Headers/UserHeader.js";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {
    API_PRODUCTS_LIST
  } from "../../api/Urls";
  import { useParams, useHistory } from "react-router-dom";
import {ProductRow} from "../examples/ProductItem"
  import { SearchingRow } from "./Serching";
  const ProductsList = () => {
    const [products, setProducts] = useState([]);
    
    const applySearching = (name) => {
      axios.get(`${API_PRODUCTS_LIST}?search=${name}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}}).then(
        response => setProducts(prev => response.data));
  }
    const getProducts = async () => {
      const products_response = await axios.get(API_PRODUCTS_LIST, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
      setProducts(prev => products_response.data)
    }
  
    const history = useHistory()
    useEffect(() => {
        getProducts();
    }, []);
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="4">
                      <h3 className="mb-0">Продукты</h3>
                    </Col>
                    <Col>
                    <SearchingRow searching={applySearching}/>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href=""
                        onClick={(e) => {
                          history.push("/admin/product-add");
                            }}
                        size="sm"
                      >
                        Добавить
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Название(товара, услуги)</th>
                      <th scope="col">Категория</th>
                      <th scope="col">Производитель</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                      {products.map((product) => (
                        <ProductRow 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        category={product.category.name}
                        producer={product.producer}                        />
                      ))}
                  </tbody>
                </Table>
                
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default ProductsList;
  