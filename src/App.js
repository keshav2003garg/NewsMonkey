import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export default class App extends Component {
  pageSize=6
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><News key="newsmonkey" pageSize={this.pageSize} country="in" category="general" heading="" /></Route>
            <Route exact path="/top-headlines"><News key="general" pageSize={this.pageSize} country="in" category="general" heading=" - Top HeadLines" /></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" heading=" - Top Entertainment Headlines" /></Route>
            <Route exact path="/health"><News key="health" pageSize={this.pageSize} country="in" category="health" heading=" - Top Health Headlines" /></Route>
            <Route exact path="/science"><News key="science" pageSize={this.pageSize} country="in" category="science" heading=" - Top Science Headlines" /></Route>
            <Route exact path="/sports"><News key="sports" pageSize={this.pageSize} country="in" category="sports" heading=" - Top Sports Headlines" /></Route>
            <Route exact path="/technology"><News key="technology" pageSize={this.pageSize} country="in" category="technology" heading=" - Top Technology Headlines" /></Route>
          </Switch>
        </Router>
      </>
    )
  }
}

