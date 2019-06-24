import React, { Component } from "react";
import "./Articles.scss";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Error from "../Common/Error/Error";

class Articles extends Component {
  showBy(item) {
    if (item.byline === "") {
      return null;
    } else {
      return (
        <div className="row">
          <div className="col-s1">
            <i className="fa fa-user-circle-o" aria-hidden="true" />
          </div>
          <div className="col-s11 text-left">
            <p className="card-text">{item.byline}</p>
          </div>
        </div>
      );
    }
  }
  render() {
    if (this.props.status === "RESOLVED") {
      return this.props.data.map((item, index) => {
        return (
          <div key={index} className="m-2 p-2 Post">
            <div className="card text-center Post">
              <div className="card-header">
                <p>{item.title} </p>
                <a href={"/detail/" + index}>
                  <i className="fa fa-arrow-right cursor" aria-hidden="true" />
                </a>
              </div>
              <div className="card-body">
                <div>{this.showBy(item)}</div>

                <div className="row">
                  <div>
                    <i className="fa fa-location-arrow" aria-hidden="true" />
                  </div>
                  <p className="card-text">{item.section}</p>
                </div>
                <div className="row">
                  <div>
                    <i className="fa fa-eye" aria-hidden="true" />
                  </div>
                  <p className="card-text">{item.views}</p>
                </div>
              </div>
              <div className="card-footer text-muted">
                <div className="row">
                  <div>
                    <i className="fa fa-calendar-check-o" aria-hidden="true" />
                  </div>
                  <p className="card-text">{item.published_date}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else if (this.props.status === "ERROR") {
      return (
        <div className="error-position mt-4">
          <Error />
        </div>
      );
    } else if (this.props.status === "RESOLVING") {
      return (
        <div className="spinner">
          <Loader type="Circles" color="#00BFFF" height="100" width="100" />
        </div>
      );
    } else {
      return <h4 />;
    }
  }
}


const mapStateToProps = state => {
  return {
    data: state.list,
    status: state.status
  };
};

export default connect(mapStateToProps)(Articles);
