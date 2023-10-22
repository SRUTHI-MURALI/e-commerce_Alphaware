import ProductList from "../Components/ProductList/ProductList";
import HeaderNav from "../Components/Header/HeaderNav";
import { useState } from "react";

function ProductListPage() {
  const [search, setSearch] = useState("");
  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };

  return (
    <div>
      <HeaderNav data={"home"} query={handleSearch} />
      <ProductList searchData={search} />
    </div>
  );
}

export default ProductListPage;
