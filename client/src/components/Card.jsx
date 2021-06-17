import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({product}) => {
    return (
        <div key={product._id} className="card">
          <div>
            <Link to={'/products/'+ product._id }>
              <img  className="image-medium" src={product.image} />
            </Link>
          </div>
          <div>
            {product.name}
          </div>
          <div>
            {product.description}
          </div>
          <div>
            ${product.price}
          </div>
          <div>
            quantity:{' '} {product.countInStock}
          </div>
        </div>
    )
}

export default Card
