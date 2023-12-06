import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/products/' + id)
            .then(data => setProducts(data.data.data))
            .catch(err => console.log(err))
    }, [id])
    console.log(product)
    return (
        <div>
            {id}
        </div>
    )
}