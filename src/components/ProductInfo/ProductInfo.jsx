import React from "react";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
import { connect } from "react-redux";
import { compose } from "redux";
import * as action from "../../stores/actions/action";
import { withRouter } from "react-router";

import "./productInfo.css";

class ProductInfo extends React.Component {
    state = {
        rating: 0,
        comments: ""
    };

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }

    renderCurrentProductReviews = ({
        id,
        created_at,
        rate,
        text,
        created_by: { username }
    }) => {
        return (
            <li className="reviewItem" key={`productInfo=>${id}`}>
                <div>
                    <span className="userName">{username} at </span>
                    <span className="reviewDate">
                        {
                            <Moment format="YYYY/MM/DD HH:mm">
                                {created_at}
                            </Moment>
                        }
                    </span>
                </div>
                <div className="reviewRate">
                    Rate: {rate}
                    <span className="reviewStars">
                        <StarRatings
                            rating={rate}
                            starEmptyColor={"#80796a"}
                            starRatedColor={"#bf8f0b"}
                            starDimension="15px"
                            starSpacing="5px"
                        />
                    </span>
                </div>
                <p className="reviewComment">Comment: {text}</p>
            </li>
        );
    };

    changeComment = ({ target: { value } }) => {
        this.setState({
            comments: value
        });
    };

    sendComment = () => {
        const { id, sendComment, isLoginAuth } = this.props;
        if (!isLoginAuth) {
            alert("You need to go through authorization");
            this.setState({
                comments: "",
                rating: 0
            });
            return;
        }
        sendComment(id, this.state.rating, this.state.comments);
        this.setState({
            comments: "",
            rating: 0
        });
        alert("comment sent successfully");
    };

    render() {
        const { title, text, img, review } = this.props;

        return (
            <>
                <div className="product">
                    <div className="productDescription">
                        <h2 className="title">{title}</h2>
                        <img
                            src={
                                String(img).includes("https")
                                    ? img
                                    : `../${img}`
                            }
                            alt=""
                        />
                        <h3 className="description">Description:</h3>
                        <p>{text}</p>
                    </div>
                    <div className="productReviews">
                        <StarRatings
                            rating={this.state.rating}
                            starEmptyColor={"#80796a"}
                            starRatedColor={"#bf8f0b"}
                            starHoverColor={"#bf8f0b"}
                            changeRating={this.changeRating.bind(this)}
                            starDimension={"20px"}
                            numberOfStars={5}
                            name="rating"
                        />
                        <textarea
                            className="reviewComments"
                            placeholder="Type your review..."
                            onChange={this.changeComment}
                            value={this.state.comments}
                        />
                        <button
                            className="reviewButton"
                            type="submit"
                            onClick={this.sendComment}
                        >
                            Submit Review
                        </button>
                        <h2>Reviews</h2>
                        <ul className="reviewList">
                            {review
                                .map(this.renderCurrentProductReviews)
                                .reverse()}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(store) {
    return {
        isLoginAuth: store.isLoginAuth
    };
}

function mapDispatcToProps(dispatch) {
    return {
        sendComment: (id, rate, text) =>
            dispatch(action.sendComment(id, rate, text)),
        fetchProductReviews: id => dispatch(action.fetchProductReviews(id))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatcToProps),
    withRouter
)(ProductInfo);
