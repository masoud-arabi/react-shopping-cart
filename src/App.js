import React, { Component } from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/product';
import data from "./data.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
// feature-1

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: '',
      sort:'',
    }

  }
  createOrder = (order)=>{
  alert("need to save order for" + order.name);

};

  removeFromCart=(product)=>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)));
  };
  
  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item)=>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

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
            <a href="/">Queenie shopping cart</a>
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
                <Products 
                  products={this.state.products}
                  addToCart={this.addToCart}
                />
                </div>
              <div className="sidebar">
                <Cart 
                  cartItems={this.state.cartItems} 
                  removeFromCart={this.removeFromCart} 
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>
            
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={['fal', 'code']} />
          <i class="fas fa-coffee"></i>
            All right is reserved.
          </footer>
      </div>

     );
  }
}
 
export default App;
