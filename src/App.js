import React, { Component } from 'react';
import Products from './components/product';
import data from "./data.json"
// feature-1

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.product,
      size: '',
      sort:'',
    }

  }
  render() { 
    return ( 
      <div className="grid-container">
          <header className>
            <a href="/">React shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Products products={this.state.products}/>
                </div>
              <div className="sidebar">Cart items</div>
            </div>
          </main>
          <footer>
            All right is reserved.
          </footer>
      </div>

     );
  }
}
 
export default App;
