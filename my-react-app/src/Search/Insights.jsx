import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Insights(props) {
  const {
    insiderSentimentsData,
    recommendationTrendsOptions,
    historicalEPSSurprisesOptions,
  } = props;
  const InsiderSentiments = ({ data }) => (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>{data.company}</th>
          <th>MSPR</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          <td>{data.total.mspr}</td>
          <td>{data.total.change}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{data.positive.mspr}</td>
          <td>{data.positive.change}</td>
        </tr>
        <tr>
          <td>Negative</td>
          <td>{data.negative.mspr}</td>
          <td>{data.negative.change}</td>
        </tr>
      </tbody>
    </Table>
  );
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <InsiderSentiments data={insiderSentimentsData} />
        </Col>
        <Col md={6}>
          <HighchartsReact
            highcharts={Highcharts}
            options={recommendationTrendsOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={historicalEPSSurprisesOptions}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Insights;
