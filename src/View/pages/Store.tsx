import { Col, Row, Image, Button, Pagination } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useEffect, useState } from "react"
import { Product } from "../../Model/types/productTypes"
import { getProducts } from "../../Model/services/productService"
import { Category } from "../../Model/types/CategoryTypes"
import { getCategories } from "../../Model/services/categoryService"

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Store() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);


  const totalPages = Math.ceil(totalItems/limit);

  const fetchProduct = async () => {
    setLoading(true);

    const { products, totalItems } = await getProducts(page - 1, limit, selectedCategory);
    setProducts(products);
    setTotalItems(totalItems);
    setLoading(false);
  };

  const fetchCategory = async () => {
    try {
      const allCategories: Category[] = await getCategories();

      // Mover la categoría con id = 0 al final
      const reordered = allCategories.filter(c => c.id !== 0);
      const categoryZero = allCategories.find(c => c.id === 0);
      if (categoryZero) reordered.push(categoryZero);

      setCategories(reordered);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchProduct(); // Se llama cada vez que page o limit cambian
  }, [page, limit, selectedCategory])

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value);
      setPage(1);
      setLimit(value);
  };
  
  const handleCategorySelect = (id?: number) => {
      setSelectedCategory(id);
      setPage(1);
  };

  if (loading) return <div>Cargando productos...</div>;

    return (
    <>
      <h1>Store</h1>

      {/* CATEGORÍAS COMO BOTONES */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Button
          variant={selectedCategory === undefined ? "primary" : "outline-primary"}
          className="rounded-pill d-flex align-items-center gap-2"
          onClick={() => handleCategorySelect(undefined)}
        >
          Todos
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "primary" : "outline-primary"}
            className="rounded-pill d-flex align-items-center gap-2"
            onClick={() => handleCategorySelect(cat.id)}
          >
            <Image src={baseURL + "/image/" + cat.image} width={24} height={24} roundedCircle />
            {cat.name}
          </Button>
        ))}
      </div>

      {/* SELECTOR DE LÍMITE */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end", // Alínea a la izquierda
        marginBottom: "1.5rem"
      }}>
        <div style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <label htmlFor="itemsPerPage" style={{
            margin: 0,
            fontWeight: 500,
            color: "#495057"
          }}>
            Mostrar:
          </label>
          <select
            id="itemsPerPage"
            value={limit}
            onChange={changeLimit}
            style={{
              border: "1px solid #ced4da",
              borderRadius: "0.375rem",
              padding: "0.25rem 0.5rem",
              backgroundColor: "#fff",
              color: "#212529",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            <option value={6}>6 Productos</option>
            <option value={10}>10 Productos</option>
            <option value={20}>20 Productos</option>
          </select>
        </div>
      </div>

      {/* PRODUCTOS */}
      <Row lg={3} md={2} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
    </>
  );
}