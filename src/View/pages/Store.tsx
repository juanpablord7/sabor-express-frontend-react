import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useStore } from "../../Controller/context/StoreContext"
import Pagination from "../components/Pagination"
import { useEffect } from "react"

export default function Store() {
    const {products, page, limit, totalItems, refreshProducts} = useStore()

    const totalPages = Math.ceil(totalItems/limit)

    const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        refreshProducts(page, value)
    };

    useEffect(() => {
        refreshProducts(page, limit)        
    }, [])

    if (products === null) return <div>Cargando productos...</div>;

    return <>
        <h1>Store</h1>

        <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="itemsPerPage">Mostrar: </label>
        <select id="itemsPerPage" value={limit} onChange={changeLimit}>
            <option value={10}>10 Productos</option>
            <option value={20}>20 Productos</option>
            <option value={50}>50 Productos</option>
        </select>
        </div>

        <Row lg={3} md={2} className="g-3">
            {products.map(item => (
                <Col key={item.product_id}>
                    <StoreItem {...item} />
                </Col>
            ))}
        </Row>
        <Pagination currentPage={page}
            totalPages={totalPages}
            onPageChange={(value) => refreshProducts(value, limit) }/>
    </>
}