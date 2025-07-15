import { Col, Row, Image, Button, Pagination } from "react-bootstrap"
import { StoreItem } from "../Components/StoreItem"
import { useEffect, useState } from "react"

//Types:
import { Product } from "../../Model/Types/ProductTypes"
import { Category } from "../../Model/Types/CategoryTypes"

//Services:
import { getProducts } from "../../Model/Services/Product/index"
import { getCategories } from "../../Model/Services/Category/index"
import { imagePath } from "../../Model/Services/Image/index"

export default function Store() {
  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  //Products Data
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  
  //Categories Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  //State Control
  const [loading, setLoading] = useState(false);

  //Fetch Categories when the component first time render 
  useEffect(() => {
    fetchCategory();
  }, []);

  //Fetch Products when the page, limit or selected category changes
  useEffect(() => {
    fetchProduct();
    
    

  }, [page, limit, selectedCategory])

  //Fetch Products when page, limit change
  const fetchProduct = async () => {
    setLoading(true);

    const { products, totalItems } = await getProducts(page, limit, selectedCategory);
    setProducts(products);
    await setTotalProducts(totalItems);

    setTotalPages(Math.ceil(totalProducts/limit));

    setLoading(false);
  };

  //Fetch Categories just first time
  const fetchCategory = async () => {
    try {
      const allCategories: Category[] = await getCategories();

      // Reorder the "Other" Category to be the last
      const reordered = allCategories.filter(c => c.id !== 0);
      const categoryZero = allCategories.find(c => c.id === 0);
      if (categoryZero) reordered.push(categoryZero);

      //Set the Categories
      setCategories(reordered);

    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  //Change the Limit
  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //Set the limit value
    const value = parseInt(e.target.value);
    setLimit(value);

    //Set page 1
    setPage(1);
  };
  
  //Selected a Category
  const handleCategorySelect = (id?: number) => {
    //Set the selected Category
    setSelectedCategory(id);

    //Set page 1
    setPage(1);
  };

  //Loading the page
  if (loading) return <div>Cargando productos...</div>;

  return (
    <>
      <h1>Tienda</h1>

      {/* Button of Categories */}
      <div className="d-flex flex-wrap gap-2 mb-3">

        {/* Button Category "All" */}
        <Button
          variant={selectedCategory === undefined ? "primary" : "outline-primary"}
          className="rounded-pill d-flex align-items-center gap-2"
          onClick={() => handleCategorySelect(undefined)}
        >
          Todos
        </Button>

        {/* Other Buttons Category */}
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "primary" : "outline-primary"}
            className="rounded-pill d-flex align-items-center gap-2"
            onClick={() => handleCategorySelect(cat.id)}
          >
            <Image src={ imagePath + cat.image} width={24} height={24} roundedCircle />
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Limit Selector */}
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

      {/* Products */}
      <Row lg={3} md={2} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => {
                  console.log(i + 1);
                  setPage(i + 1)}}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
    </>
  );
}