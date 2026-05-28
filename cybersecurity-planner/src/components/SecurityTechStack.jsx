import React, { Component } from "react";
import { connect } from "react-redux";
import ResponsiveCard from "../common/ResponsiveCard";

class SecurityTechStack extends Component {
  render() {
    const techStackData = [
      { productName: "SIEM", productId: 1 },
      { productName: "SOAR", productId: 2 },
    ];

    return techStackData.map((item) => (
      <ResponsiveCard key={item.productId} title={item.productName} />
    ));
  }
}

export default connect(null)(SecurityTechStack);
