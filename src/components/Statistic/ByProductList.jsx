import { ByProduct } from "./ByProduct";

function ByProductList({ product }) {
    return product.map((data) => <ByProduct key={data.id} {...data} />);
}

export { ByProductList };
