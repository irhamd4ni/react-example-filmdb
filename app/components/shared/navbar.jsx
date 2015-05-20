'use strict';

import React from 'react';
import {Link} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';
import {Alert, Button} from 'react-bootstrap';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import cn from 'classnames';

// import imageResolver from 'utils/image-resolver';

export default React.createClass({
  displayName: 'Navbar',
  mixins: [ListenerMixin],
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  statusStore() {
    return this.props.flux.getStore('status');
  },
  getInitialState() {
    console.log(this.statusStore().getState());
    return this.statusStore().getState();
  },
  componentDidMount() {
    this.listenTo(this.statusStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  retry() {
    console.log('retry');
    this.props.flux.getActions('status').retry();
  },
  render() {
    var errorComponent;
    var retryComponent;
    if (this.state.error) {
      if (this.state.retryData) {
        retryComponent = <Button onClick={this.retry} bsStyle="danger" bsSize="xsmall" className="pull-right">Retry</Button>;
      }
      errorComponent = (
      <Alert bsStyle='danger'>
      <strong>Network Error!</strong>
      {retryComponent}
      </Alert>);
    }

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            <Link to='app' className="navbar-brand">
                <i className="fa fa-film"></i> FilmDB
            </Link>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <NavItemLink to='directors'>Directors</NavItemLink>
              </li>
              <li>
                <NavItemLink to='films'>Films</NavItemLink>
              </li>
            </ul>
            <div className={cn([{invisible: !this.state.busy}, 'busy-indicator', 'pull-right'])}><i className="fa fa-refresh fa-spin"></i></div>
          </div>
        </nav>
        {errorComponent}
      </div>
    );
  }
});

// <li>
//   <NavItemLink to='cars'>Cars</NavItemLink>
// </li>
