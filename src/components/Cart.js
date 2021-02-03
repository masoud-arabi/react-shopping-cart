import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';



export default class Cart extends Component {
    constructor(){
        super();
        this.state = {
            name:"",
            address:"",
            email:"",
            showCheckout: false};
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    };

    createOrder = (e)=>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header"> Cart is empty</div>
                ) : (
                    <div className="cart cart-header">
                        you have {cartItems.length} in the cart{" "}
                    </div>
                )}
                <div>
                    <div className="cart">
                        <Fade left cascade={true}>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}> 
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className="button" onClick={()=>this.props.removeFromCart(item)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {   cartItems.length !== 0 && (
                    <div className="cart">
                        <div className="total">
                            <div>total:{" "} {formatCurrency(cartItems.reduce((a,c)=>a + c.price*c.count, 0))}</div>
                        <button onClick={()=> {this.setState({showCheckout: true});}} className="button primary">Proceed</button>
                        </div>
                        {this.state.showCheckout && (
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <Fade right cascade={true}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Name</label>
                                            <input type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Email</label>
                                            <input type="email" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <button  className="button primary" type="submit">Submit</button>
                                        </li>
                                    </ul>
                                </Fade>
                            </form>

                        </div> 
                        )}
                </div>
                )}
                </div> 
            </div>
        );
    }
}
