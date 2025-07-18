import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

//Components
import OrdersSection from "./Sections/OrderSection";
import ProductSection from "./Sections/ProductSection";
import UserSection from "./Sections/UserSection";
import RoleSection from "./Sections/RoleSection";
import CategorySection from "./Sections/CategorySection";

//Types:
import { Category } from "../../../Model/Types/CategoryTypes";

//Context:
import { useUser } from "../../../Controller/Context/UserContext";

//Services:
import { getCategories } from "../../../Model/Services/Category/index";

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const { role } = useUser();

  // Define secciones disponibles según permisos
  const sections = [
    { key: "Órdenes", visible: role?.manageOrder },
    { key: "Categorías", visible: role?.manageProduct },
    { key: "Productos", visible: role?.manageProduct },
    { key: "Usuarios", visible: role?.manageUser },
    { key: "Roles", visible: role?.manageRole },
  ].filter((section) => section.visible);

  const fetchCategories = async () => {
    const res = await getCategories();

    if(res){
      setCategories(res);
    }
  }

  // Carga categorías si tiene permiso para productos
  useEffect(() => {
    if (role?.manageProduct) {
      fetchCategories()
    }
  }, [role?.manageProduct]);

  // Selecciona por defecto la primera sección permitida
  useEffect(() => {
    if (!selectedSection && sections.length > 0) {
      setSelectedSection(sections[0].key);
    }
  }, [sections, selectedSection]);

  const renderSection = () => {
    switch (selectedSection) {
      case "Órdenes":
        return <OrdersSection />;
      case "Categorías":
        return (
          <CategorySection
            categories={categories}
            setCategories={setCategories}
          />
        );
      case "Productos":
        return <ProductSection categories={categories} />;
      case "Usuarios":
        return <UserSection />;
      case "Roles":
        return <RoleSection />;
      default:
        return <p className="text-gray-500">Sección no disponible</p>;
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-xl font-semibold">Panel de Administración</h2>

      {/* Botones de navegación */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {sections.map(({ key }) => {
          const isActive = selectedSection === key;

          return (
            <Button
              key={key}
              variant={isActive ? "primary" : "outline-primary"}
              className="rounded-pill d-flex align-items-center gap-2"
              onClick={() => setSelectedSection(key)}
            >
              {key}
            </Button>
          );
        })}
      </div>






      {/* Sección seleccionada */}
      <div>{renderSection()}</div>
    </Container>
  );
}