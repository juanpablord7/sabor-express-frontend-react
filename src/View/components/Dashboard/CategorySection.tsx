import { Card, Table, Image, Col, Button, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Pagination, Form } from "react-bootstrap";
import { Category } from "../../../Model/types/CategoryTypes";
import { createCategory, deleteCategory, editCategory } from "../../../Model/services/categoryService";
import { editImage, saveImage } from "../../../Model/services/imageService";

type Props = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};


const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function CategorySection({ categories, setCategories }: Props) {
  
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const [newCategory, setNewCategory] = useState({ name: ""});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState<{ name: string }>({
    name: "",
  });

  //Images
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editedCategoryImage, setEditedCategoryImage] = useState<File | null>(null);


  const totalItems = allCategories.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPageCategories = allCategories.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    setAllCategories(categories);
    setLoading(false);
  }, [categories]);

  const handleAddCategory = async () => {
    const { name } = newCategory;
    if (name.trim() === "" || !newCategoryImage) {
      alert("Completa todos los campos.");
      return;
    }

    const fileName = newCategoryImage.name.replace(/\s+/g, "_");
    const imagePath = `category/${fileName}`;

    try {
      // 1. Subir imagen
      const uploaded = await saveImage(imagePath, newCategoryImage);
      if (!uploaded) throw new Error("No se pudo subir la imagen");

      // 2. Crear categoria con la ruta de la imagen
      console.log(imagePath);

      const created = await createCategory({ ...newCategory, image: imagePath });
      
      if (created) {
        setCategories((prev) => [...prev, created]);
        setNewCategory({ name: "" });
        setNewCategoryImage(null);
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("No se pudo crear la categoría.");
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setEditedCategory({ name: category.name});
  };

  const handleSaveEdit = async (id: number) => {
    try {
      let imagePath = editedCategory.name;
      
      if (editedCategoryImage) {
        const fileName = editedCategoryImage.name.replace(/\s+/g, "_");
        imagePath = `product/${fileName}`;
        await editImage(imagePath, editedCategoryImage);
      }

      await editCategory(id, { ...editedCategory, image: imagePath });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...editedCategory, image: imagePath } : cat))
      );
      setEditingId(null);
      setEditedCategoryImage(null);
    } catch (err) {
      alert("Error al guardar los cambios.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta categoria?");
    if (!confirmed) return;
    
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      alert("Error al eliminar la categoría.");
    }
  };

  if (loading) return <div>Cargando categorías...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Categorías</h4>
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

        {/* Formulario para nueva categoría */}
        <Form className="mb-4">
          <Row>
            <Col md={4}>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0] || null;
                  setNewCategoryImage(file);
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </Col>
            <Col md={4}>
              <Button onClick={handleAddCategory}>Agregar categoría</Button>
            </Col>
          </Row>
        </Form>

        {/* Tabla de categorías */}
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPageCategories.map((category) => (
              <tr key={category.id}>
                <td>
                  {editingId === category.id ? (
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0] || null;
                        setEditedCategoryImage(file);
                      }}
                    />
                    ) : (
                    <Image
                      src={baseURL + "/image/" + category.image}
                      alt={category.name}
                      rounded
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>{category.id}</td>
                <td>
                  {editingId === category.id ? (
                    <Form.Control
                      type="text"
                      value={editedCategory.name}
                      onChange={(e) =>
                        setEditedCategory({
                          ...editedCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  {editingId === category.id ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSaveEdit(category.id)}
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
                        onClick={() => handleEditClick(category)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleDelete(category.id)}
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
      </Card.Body>
    </Card>
  );
}
