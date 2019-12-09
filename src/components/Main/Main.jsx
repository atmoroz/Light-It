import React from "react";
import { connect } from "react-redux";

import * as action from "../../stores/actions/action";
import Products from "./../Products/Products";

class Main extends React.Component {
    componentDidMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }

    renderProducts = ({ id, title }) => {
        return <Products key={`keyProducts-${id}`} id={id} title={title} />;
    };

    render() {
        const { allProducts } = this.props;
        return (
            <section className="products">
                {allProducts.map(this.renderProducts)}
            </section>
        );
    }
}

function mapStateToProps(store) {
    return {
        allProducts: store.allProducts
    };
}

function mapDispatcToProps(dispatch) {
    return {
        fetchProducts: () => dispatch(action.fetchProducts())
    };
}
export default connect(mapStateToProps, mapDispatcToProps)(Main);
