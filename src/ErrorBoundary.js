import React, { Component} from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super();
    this.state = {
      hasError: false;
    }
  }
  render (){
    if (this.state.hasError){
      return <h1>Oops. An Error Occurred</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary;