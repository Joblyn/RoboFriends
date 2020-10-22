import React, { Component} from 'react';
import CardList from './CardList';
import { connect } from 'react-redux';
// import { robots } from './robots';
import SearchBox from './SearchBox';
import './App.css';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';
import { setSearchField } from './actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
    }
  }

  componentDidMount() {
    // console.log(this.state.store.getState())
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=>response.json())
      .then(users => this.setState({ robots: users }))
  }

  
  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredrobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase()) 
    })
    return !robots.length ? <h1>Loading</h1> : (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchchange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredrobots} />
          </ErrorBoundary>
        </Scroll> 
        <footer className='tc'>
          Dev'd by Joblyn
        </footer>
      </div>
  ) 
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);       