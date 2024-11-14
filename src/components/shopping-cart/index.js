"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getCart,
  increaseCartItems,
  decreaseCartItems,
  deleteCartItem,
} from "@/services/substrate";
import Swal from "sweetalert2";
import Loader from "../loader";

const ShoppingCart = () => {
  const [cartData, setCartData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      orderId: 12,
      product: "/assets/images/product-1.jpg",
      materialType: "Metals",
      quantity: 1,
      price: 578,
    },
    {
      id: 2,
      orderId: 15,
      product: "/assets/images/product-1.jpg",
      materialType: "Metals",
      quantity: 1,
      price: 578,
    },
    {
      id: 3,
      orderId: 22,
      product: "/assets/images/product-1.jpg",
      materialType: "Metals",
      quantity: 1,
      price: 578,
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(null);
  console.log("totalPrice==>", totalPrice);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setTotalPrice(response.totalPrice);
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, []);

  const handleIncreaseQuantity = (data) => {
    setCartData(
      cartData.map((item) =>
        item?.order_item_id === data.order_item_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    handleUpdateCart(data);
  };

  const handleDecreaseQuantity = (data) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item?.order_item_id === data?.order_item_id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
    // Call handleDecreaseCart only if the quantity is greater than 1
    if (data.quantity > 1) {
      handleDecreaseCart(data);
    }
  };

  const handleRemoveItem = (id) => {
    // setCartData(cartData.filter((item) => item.order_item_id !== id));
    setLoader(true);
    deleteCartItem(id)
      .then((response) => {
        setLoader(false);
        if (response) {
          getCart()
            .then((response) => {
              setTotalPrice(response.totalPrice);
              setCartData(response.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.error(err);
      });
  };

  // const total = cartData.reduce(
  //   (acc, item) => acc + item?.selling_price * item.quantity,
  //   0
  // );
  // const totalItemsPrice = parseFloat(total.toFixed(2));

  const handleUpdateCart = async (item) => {
    const updatedQuantity = Math.max(item?.quantity - 1, 1);
    const price = item?.selling_price * updatedQuantity;
    const sellPrice = price.toString();
    setLoader(true);
    try {
      const data = {
        color_name: item.color_name ? item.color_name : null,
        design_link: item.design_link ? item.design_link : "",
        finish_name: item.finish_name ? item.finish_name : null,
        material_name: item.material_name ? item.material_name : "",
        thickness: item.thickness ? item.thickness : "",
        selling_price: sellPrice,
        actual_price: item.actual_price ? item.actual_price : "",
        vat_price: item.vat_price ? item.vat_price : "",
        vat_percentage: item.vat_percentage ? item.vat_percentage : "",
        quantity: item.quantity ? item.quantity : "",
        order_item_id: item.order_item_id ? item.order_item_id : "",
        total_price_sum: item.total_price_sum ? item.total_price_sum : "",
        increased: 1,
      };
      const res = await increaseCartItems(data);
      console.log("res......", res);
      setLoader(false);
      if (res) {
        getCart()
          .then((response) => {
            setTotalPrice(response.totalPrice);
            setCartData(response?.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (err) {
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err?.data?.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handleDecreaseCart = async (item) => {
    if (item.quantity > 0 && item) {
      console.log("data...", item);
      const price = item?.selling_price * (item?.quantity - 1);
      const sellPrice = price.toString();
      console.log("price", price);
      try {
        const data = {
          color_name: item.color_name ? item.color_name : null,
          design_link: item.design_link ? item.design_link : "",
          finish_name: item.finish_name ? item.finish_name : null,
          material_name: item.material_name ? item.material_name : "",
          thickness: item.thickness ? item.thickness : "",
          selling_price: sellPrice,
          actual_price: item.actual_price ? item.actual_price : "",
          vat_price: item.vat_price ? item.vat_price : "",
          vat_percentage: item.vat_percentage ? item.vat_percentage : "",
          quantity: item.quantity ? item.quantity : "",
          order_item_id: item.order_item_id ? item.order_item_id : "",
          total_price_sum: item.total_price_sum ? item.total_price_sum : "",
          decreased: 1,
        };
        const res = await decreaseCartItems(data);
        console.log("res......", res);
        if (res) {
          getCart()
            .then((response) => {
              setTotalPrice(response.totalPrice);
              setCartData(response?.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: `error`,
          title: `Error - ${err?.data?.error}`,
          confirmButtonText: "Okay",
          timer: 3000,
        });
      }
    }
  };
  function formatNumber(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <section className="shopping-cart-area sc-pt-50 sc-pb-50">
      <h2 className="text-center">Shopping Cart</h2>
      {/*Shopping Cart Area */}

      <div className="container">
        <div className="cart-container">
        <div className="cart-container-inner">
          <div className="cart-inner-sec">
            <div className="cart-header">
              <div>Order Id</div>
              {/* <div>Product</div> */}
              <div>Material Type</div>
              <div>Linear Meter</div>
              <div>Thickness</div>
              <div>Color</div>
              <div>Finish</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Action</div>
            </div>
            <div className="cart-body">
              {cartData.map((item) => (
                <div key={item?.order_item_id} className="cart-item">
                  <div className="order-id">{`100` + item.order_item_id}</div>

                  <div className="material-type">{item?.material_name}</div>
                  <div className="material-type">{item?.linear_meters}</div>
                  <div className="material-type">{item?.thickness}mm</div>
                  {/* <div className="color">{item?.color_name}</div> */}
                  <div className="color">
                    {item?.color_name ? item?.color_name : "N/A"}
                  </div>

                  <div className="finish">
                    {item?.finish_name ? item?.finish_name : "N/A"}
                  </div>
                  <div className="quantity-control-main">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="minus"
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="plus"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="price">
                    AED {formatNumber(item?.selling_price)}
                  </div>
                  <div className="remove-btn-holder">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item?.order_item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

           {/* <div className="cart-summary-main">
              <div className="cart-summary-inner">
                 <div className="cart-total">Total:</div>
                <div className="cart-summary-total">{totalPrice}</div> */}
                {/* <div className="proceed-checkout">
                  <Link
                    className="btn btn-sqare proceed-checkout-btn"
                    href="/shipping"
                  >
                    Proceed to Checkout
                  </Link>
                </div> 
              </div>
            </div>*/}
          </div>

          <div className="cart-summary">
            <div className="summary">
              <h5>Summary</h5>
            </div>
            {/* <div className='heada'>Subtotal: <strong>AED {total}</strong> </div> */}
            <div className="heada head-total">
              Total: <strong>AED {formatNumber(totalPrice)}</strong>
            </div>
            <div className="checkout-con">
              {/* <Link className="btn btn-sqare go-checkout" href="/shipping">
                Go to Checkout
              </Link> */}
              <Link
                className={`btn btn-square go-checkout ${
                  totalPrice === 0 ? "disabled" : ""
                }`}
                href={totalPrice === 0 ? "#" : "/shipping"}
                style={
                  totalPrice === 0
                    ? { pointerEvents: "none", opacity: 0.5 }
                    : {}
                }
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
      {loader && <Loader />}
    </section>
  );
};

export default ShoppingCart;
