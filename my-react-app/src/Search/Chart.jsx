import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
function Chart({ options }) {
  return (
    <Container fluid>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
}
export default Chart;
