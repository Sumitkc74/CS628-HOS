import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Details from './Details';
import Team from './Team';
import Member from './Member';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar">
            <ul>
              {/* Use NavLink instead of Link */}
              <li>
                <NavLink to="/" activeClassName="active">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">About</NavLink>
              </li>
              <li>
                <NavLink to="/details" activeClassName="active">Details</NavLink>
              </li>
              <li>
                <NavLink to="/team" activeClassName="active">Team</NavLink>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/details" element={<Details />} />
              <Route path="/team" element={<Team />}>
                {/* Nested Routing */}
                <Route path="member/:id" element={<Member />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;