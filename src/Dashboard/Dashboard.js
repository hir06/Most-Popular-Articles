import React, { Component } from "react";
import "./Dashboard.scss";
import Article from "../Articles/Articles";
import Detail from "../Detail/Detail";
import { connect } from "react-redux";
import { fetchArticles } from "../store/actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class Dashboard extends Component {
  componentDidMount() {
    //loading 7 days data by default
    this.props.putPostDataToStore(7);
  }

  fetchPeriodData(period) {
    //calling API to get peirods data
    this.props.putPostDataToStore(period);
  }

  render() {
    return (
      <div>
        {
          <nav className="navbar navbar-light sticky-top dashboard__header">
            <a className="navbar-brand cursor" href="/">
              NY Times Most Popular Articles
            </a>
            <li className="nav-item dropdown cursor">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                View Article Of
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div
                  className="dropdown-item"
                  onClick={this.fetchPeriodData.bind(this, 1)}
                >
                  Last 1 day
                </div>
                <div
                  className="dropdown-item"
                  onClick={this.fetchPeriodData.bind(this, 7)}
                >
                  Last 7 days
                </div>
                <div
                  className="dropdown-item"
                  onClick={this.fetchPeriodData.bind(this, 30)}
                >
                  Last 30 Days
                </div>
              </div>
            </li>
          </nav>
        }
        {
          <Router>
            <Switch>
              <Route exact path="/" component={Article} />
              <Route path="/detail/:id" component={Detail} />
            </Switch>
          </Router>
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    popularData: state.list,
    status: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putPostDataToStore: subreddit => dispatch(fetchArticles(subreddit))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
