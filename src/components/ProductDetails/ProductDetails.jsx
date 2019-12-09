import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import * as action from "../../stores/actions/action";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./productDetails.css";
import ProductInfo from "../ProductInfo/ProductInfo";

class ProductDetails extends React.Component {
    componentDidMount() {
        const {
            match: {
                params: { id }
            },
            fetchProductsDetails,
            fetchProductReviews
        } = this.props;
        fetchProductsDetails(id);
        fetchProductReviews(id);
    }

    componentDidUpdate(prevProps) {
        const {
            match: {
                params: { id }
            },
            fetchProductsDetails,
            fetchProductReviews,
            isComment
        } = this.props;

        if (
            id !== prevProps.match.params.id ||
            prevProps.isComment !== isComment
        ) {
            fetchProductsDetails(id);
            fetchProductReviews(id);
        }
    }

    clickProductDetails = id => {
        const { history } = this.props;
        history.push(`/product/${id}`);
    };

    renderChooseProduct = ({ id, title }) => {
        return (
            <div
                className="chooseProductItem"
                key={`productKey-${id}`}
                onClick={this.clickProductDetails.bind(null, id)}
            >
                {title}
            </div>
        );
    };

    render() {
        const {
            currentProduct: { id, title, text, img },
            currentProductReviews,
            allProducts
        } = this.props;
        if (!this.props.isLoadingRew) {
            return (
                <Loader
                    type="Triangle"
                    color="#EB5858"
                    height={100}
                    width={100}
                    timeout={1000}
                />
            );
        } else {
            return (
                <section className="productDetails">
                    <div className="chooseProduct">
                        {allProducts.map(this.renderChooseProduct)}
                    </div>
                    <div className="productInfo">
                        <ProductInfo
                            id={id}
                            title={title}
                            text={text}
                            img={img}
                            review={currentProductReviews}
                        />
                    </div>
                </section>
            );
        }
    }
}

function mapStateToProps(store) {
    return {
        currentProduct: store.currentProduct,
        allProducts: store.allProducts,
        currentProductReviews: store.currentProductReviews,
        isComment: store.isComment,
        isLoadingRew: store.isLoadingRew
    };
}

function mapDispatcToProps(dispatch) {
    return {
        fetchProductsDetails: id => dispatch(action.fetchProductsDetails(id)),
        fetchProductReviews: id => dispatch(action.fetchProductReviews(id))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatcToProps),
    withRouter
)(ProductDetails);
