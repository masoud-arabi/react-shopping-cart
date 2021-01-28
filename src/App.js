import React, { Component } from 'react';
import Filter from './components/Filter';
import Products from './components/product';
import data from "./data.json"
// feature-1

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: '',
      sort:'',
    }

  }

  filterProducts = (event)=>{
    console.log(event.target.value);
    if (event.target.value === ""){
      this.setState({size: event.target.value, products: data.products});
    }else{
   this.setState({ 
     size:event.target.value,
     products: data.products.filter(product=> product.availableSizes.indexOf(event.target.value) >= 0),
    });
  }
  };
  sortProducts = (event)=>{
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState({
      sort:sort,
      products: this.state.products.slice().sort((a,b) => (
      sort === 'lowest' ?
      ((a.price > b.price)? 1 : -1) :
      sort === 'highest' ?
      ((a.price < b.price)? 1 : -1):
      ((a._id < b._id)? 1 : -1)

      )
    ),
  });
};
  
  render() { 
    return ( 
      <div className="grid-container">
          <header className>
            <a href="/">React shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter 
                 count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
                />
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
