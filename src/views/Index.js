
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  colors
} from "variables/charts.js";
import axios from "axios";
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from "react";
import {
  API_INCOME_STATS,
} from "../api/Urls";
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [incomeStats, setIncomeStats] = useState([]);
  const [costsStats, setCostsStats] = useState([]);
  const [countOrder, setCountOrder] = useState([]);

  const [chartExample1Data, setChartExample1Data] = useState("data1");
  
  const processData = () =>{
    let labels = incomeStats.map(item => {
      let date = new Date(item.month);
      return date.toLocaleString('rus', { month: 'short' });
    }
    )
    let income_data = incomeStats.map(item => item.total_price)
    let costs_data = costsStats.map(item => item.total_price)

    const result =   {
          labels: labels,
          datasets: [
            {
              label: "Доход",
              data: income_data, 
              borderColor: colors["theme"].warning
            },
            {
              label: "Расход",
              data: costs_data
            }
          ]
        };
    return result
  }

    
  const processCountData = () =>{
    let labels = countOrder.map(item => {
      let date = new Date(item.month);
      return date.toLocaleString('rus', { month: 'short' });
    }
    )
    let counts = countOrder.map(item => item.counts);

    const result =   {
          labels: labels,
          datasets: [
            {
              label: "test",
              data: counts
            }
          ]
        };
    return result
  }

  const getIncomeStats = async () => {
    const stats = await axios.get(`${API_INCOME_STATS}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
    setIncomeStats(Prev => stats.data.income_data);
    setCostsStats(Prev => stats.data.costs_data);
    setCountOrder(Prev => stats.data.income_count_data);
  };
  useEffect(() => {
    getIncomeStats();
}, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  // const getIncometats = () => {
  //   const company = axios.get(`${API_INCOME_STATS}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})

    // {
  //     labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //     datasets: [
  //       {
  //         label: "Performance",
  //         data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
  //       }
  //     ]
  //   };
  // },
  // }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Продажи и расходы за последний год</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={processData()}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row className="mt-5">
        <Col xl="10">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Количество
                    </h6>
                    <h2 className="mb-0">Количество оплаченных счетов</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={processCountData()}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
