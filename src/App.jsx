import { useEffect, useState } from 'react'

import './App.css'
import { GoChevronUp, GoChevronDown, GoTrash } from "react-icons/go";

function App() {
  const [products, setProducts] = useState([
    {
      img: "https://www.course-api.com/images/cart/phone-1.png",
      title: "Samsung Galaxy S8",
      price: 399.99,
      quantity: 1
    },
    {
      img: "https://www.course-api.com/images/cart/phone-2.png",
      title: "Google Pixel",
      price: 499.99,
      quantity: 1
    },
    {
      img: "https://www.course-api.com/images/cart/phone-3.png",
      title: "Xiaomi Redmi Note 2",
      price: 699.99,
      quantity: 1
    },
    {
      img: "https://www.course-api.com/images/cart/phone-4.png",
      title: "Samsung Galaxy S7",
      price: 599.99,
      quantity: 1
    }
  ])
  function handleIncrement(index) {
    let temp = [...products];
    temp[index].quantity += 1;
    setProducts(temp);
  }
  function handleDecrement(index) {
    let temp = [...products];
    if (temp[index].quantity > 1) {
      temp[index].quantity -= 1;
      setProducts(temp);

    }
    else {
      handleRemove(index);
    }


  }
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let tempTotal = 0;
    products.map((item, index) => {
      tempTotal += item.price * item.quantity;

    })
    setTotal(tempTotal);

  }, [products])

  function clearCart() {
    setProducts([]);
  }
  function handleRemove(index) {
    let temp = products.filter((item, idx) => {
      return index != idx;
    })
    setProducts(temp);
  }

  return (
    <>
      
      <div>
      <h1>YOUR BAG</h1>

        {products.length > 0 ? (
          <div>
            {products.map((product, index) => {
              return (
                <div key="index" style={{width: "70vw"}}>
                  <div className='product'  style={{ width: "70vw", display: "flex", justifyContent: "space-evenly", alignItems: 'center', margin: "10px" }}>
                    <div className='left' style={{ display: "flex", justifyContent: "space-evenly", alignItems: 'center' }}>
                      <div >
                        <img width="100px" src={product.img} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                        <GoTrash onClick={() => {
                          handleRemove(index);
                        }} />
                      </div>
                    </div>
                    <div className='right' style={{ display: "flex", flexDirection: "column", justifyContent: 'space-evenly' }}>
                      <GoChevronUp onClick={() => {
                        handleIncrement(index)
                      }} />
                      <span>{product.quantity}</span>
                      <GoChevronDown onClick={() => {
                        handleDecrement(index)
                      }} />
                    </div>

                  </div>
                  <hr style={{width: "40vw"}}/>
                </div>



              );
            })}

            <h3>Total Price: {total}</h3>
            <button onClick={() => setProducts([])}>Clear Cart</button>
          </div>
        ) : (
          <p>There is no item in your bag</p>
        )}
      </div>
    </>
  )
}

export default App
