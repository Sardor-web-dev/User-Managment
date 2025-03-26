import { useEffect, useState } from "react";
import "./App.css";
import { product } from "./types/product";
import { method, useApi } from "./hooks/useApi";

function App() {
  const [products, setProducts] = useState([]);
  const { fetchData, error, loading } = useApi(import.meta.env.VITE_PUBLIC_API);

  useEffect(() => {
    fetchData("/products", method.get).then((res) =>
      setProducts(res?.data.products)
    );
  }, []);

  return (
    <>
      <ul>
        {loading && <li>Loading...</li>}
        {products?.length > 0 ? (
          products.map((product: product) => (
            <li key={product.id}>{product.title}</li>
          ))
        ) : (
          <li>{error && "Something went wrong"}</li>
        )}
      </ul>
    </>
  );
}

export default App;
