import React from "react";
import { withRouter } from "react-router";

import "./products.css";
class Products extends React.Component {
    clickProductDetails = id => {
        const { history } = this.props;
        history.push(`/product/${id}`);
    };

    render() {
        const { id, title } = this.props;
        return (
            <>
                <div className="productsWrapper">
                    <div
                        className="productsItem"
                        onClick={this.clickProductDetails.bind(null, id)}
                    >
                        <h2 className="productName">{title}</h2>
                    </div>
                </div>
            </>
        );
    }
}
export default withRouter(Products);
