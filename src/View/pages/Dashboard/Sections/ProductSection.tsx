import { Card, Table, Image, Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import { Pagination, Form } from "react-bootstrap";

//Types:
import { Product } from "../../../../Model/Types/ProductTypes";
import { Category } from "../../../../Model/Types/CategoryTypes";

//Services:
import { createProduct, editProduct, getProducts, deleteProduct } from "../../../../Model/Services/Product/index";
import { editImage, saveImage } from "../../../../Model/Services/Image/index";
import { imagePath } from "../../../../Model/Services/Image/index";

type Props = {
  categories: Category[];
};

export default function ProductSection({ categories }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category: 0,
    price: 0,
  });

  const [editedProduct, setEditedProduct] = useState({
    name: "",
    image: "",
    category: 0,
    price: 0,
  });

  //Images
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [editedProductImage, setEditedProductImage] = useState<File | null>(null);


  const totalPages = Math.ceil(totalItems / limit);

  const fetchProducts = async () => {
    setLoading(true);

    const { products, totalItems } = await getProducts(page, limit);
    setProducts(products);
    setTotalItems(totalItems);

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleAddProduct = async () => {
    const { name, category, price } = newProduct;
    if (name.trim() === "" || !newProductImage || category < 0 || price <= 0) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const fileName = newProductImage.name.replace(/\s+/g, "_");
    const imagePath = `product/${fileName}`;

    try {
      // 1. Subir imagen
      const uploaded = await saveImage(imagePath, newProductImage);
      if (!uploaded) throw new Error("No se pudo subir la imagen");

      // 2. Crear producto con la ruta
      const created = await createProduct({ ...newProduct, image: imagePath });

      if (created) {
        setProducts([...products, created]);
        setNewProduct({ name: "", image: "", category: 0, price: 0 });
        setNewProductImage(null);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("No se pudo crear el producto.");
    }
  };


  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditedProduct({
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
    });
  };

  const handleSaveEdit = async (id: number) => {
    try {
      let imagePath = editedProduct.image;

      if (editedProductImage) {
        const fileName = editedProductImage.name.replace(/\s+/g, "_");
        imagePath = `product/${fileName}`;
        await editImage(imagePath, editedProductImage);
      }

      await editProduct(id, { ...editedProduct, image: imagePath });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...editedProduct, image: imagePath } : p))
      );
      setEditingId(null);
      setEditedProductImage(null);
    } catch (err) {
      alert("Error al guardar el producto.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Productos</h4>
          <Form.Select
            style={{ width: "150px" }}
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </Form.Select>
        </div>

        {/* Formulario para nuevo producto */}
        <Form className="mb-4">
          <Row>
            <Col md={3}>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0] || null;
                  setNewProductImage(file);
                }}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Col>
            
            <Col md={3}>
              <Form.Select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: parseInt(e.target.value) })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Control
                type="number"
                placeholder="Precio ($)"
                value={newProduct.price === 0 ? "" : newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                }
              />
            </Col>
            <Col md={1}>
              <Button onClick={handleAddProduct}>Agregar</Button>
            </Col>
          </Row>
        </Form>

        {/* Tabla de productos */}
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editingId === product.id ? (
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0] || null;
                        setEditedProductImage(file);
                      }}
                    />
                  ) : (
                    <Image
                      src={ imagePath + product.image}
                      alt={product.name}
                      rounded
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>{product.id}</td>
                <td>
                  {editingId === product.id ? (
                    <Form.Control
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, name: e.target.value })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <Form.Select
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, category: parseInt(e.target.value) })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Form.Select>

                  ) : (
                    categories.find((cat) => cat.id === product.category)?.name
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <Form.Control
                      type="number"
                      placeholder="Precio ($)"
                      value={editedProduct.price === 0 ? "" : editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                    />

                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSaveEdit(product.id)}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="ms-2"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditClick(product)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
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
      </Card.Body>
    </Card>
  );
}
