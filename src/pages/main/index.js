import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo} = response.data;

        this.setState({ products: response.data.docs, productInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);

    };

    nextPage = () => {

        const { page, productInfo } = this.state;

        if(productInfo.pages === page) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
         
    };


    render() {
        //return <h1>Contagem de produtos: {this.state.products.length}</h1>
        const { products, page, productInfo } = this.state;
        return (
            <div className="product-list">
                {
                    products.map(product => (
                        <article key={product._id}>

                            <strong>{product.title}</strong>
                            <p> {product.description} </p>
                            <Link to={`products/${product._id}`}>Acessar</Link>

                        </article>
                    ))
                }
                <div className="actions">
                    <button onClick={this.prevPage} disabled={ page === 1 } >Anterior</button>
                    <button onClick={this.nextPage} disabled={ page === productInfo.pages } >Próximo</button>
                </div>
            </div>

            
        );
    }
}