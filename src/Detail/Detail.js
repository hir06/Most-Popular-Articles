import React, { Component } from "react";
import "./Detail.scss";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Error from "../Common/Error/Error";

class Detail extends Component {
  createKeyWords(index) {
    return this.props.data[index].adx_keywords
      .split(";")
      .map((keyword, index) => {
        return <li key={index}>{keyword}</li>;
      });
  }
  render() {
    const index = this.props.match.params.id;
    if (this.props.status === "RESOLVED") {
      return (
        <div key={index} className="m-2 p-2 Detail">
          <div className="card text-center">
            <div className="card-header">{this.props.data[index].title}</div>
            <div className="card-body">
              <div className="row">
                <div>
                  <i className="fa fa-info-circle" aria-hidden="true" />
                  <span>Abstract:</span>
                </div>
                <div>
                  <span>{this.props.data[index].abstract}</span>
                </div>
              </div>
              <div className="row">
                <div>
                  <i className="fa fa-yelp" aria-hidden="true" />
                  <span>Type:</span>
                </div>
                <div>
                  <span>{this.props.data[index].type}</span>
                </div>
              </div>
           

              <div className="row">
                <div>
                  <i className="fa fa-list" aria-hidden="true" />
                  <span>Keywords:</span>
                </div>

                <div>
                  <ul>{this.createKeyWords(index)}</ul>
                </div>
              </div>
              <div className="row">
                <div>
                  <i className="fa fa-joomla" aria-hidden="true" />
                  <span>Source:</span>
                </div>
                <div>
                  <span>{this.props.data[index].source}</span>
                </div>
              </div>
              <div className="row">
                <div>
                  <i className="fa fa-external-link-square" aria-hidden="true" />
                  <span>Know more:</span>
                </div>
                <div>
                  <a
                    href={this.props.data[index].url}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    Visit the website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } 
    else if (this.props.status === "ERROR") {
      return (
        <div className="error-position mt-4">
          <Error />
        </div>
      );
    }
    else if(this.props.status === 'RESOLVING') {
      return(
  <div className="spinner">
              <Loader
                    type="Circles"
                    color="#00BFFF"
                    height="100"
                    width="100"
                />
            </div>
      )
  }
    else {
      return <div>Please Try After Sometime</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.list,
    status: state.status
  };
};

export default connect(mapStateToProps)(Detail);
