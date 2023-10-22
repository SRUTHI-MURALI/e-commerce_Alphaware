import React from "react";
import Cartproducts from "../Components/Cart/Cartproducts";
import HeaderNav from "../Components/Header/HeaderNav";

function Cart() {
  return (
    <div>
      <HeaderNav data={"cart"} />
      <Cartproducts />
    </div>
  );
}

export default Cart;
