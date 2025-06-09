import ClienteSearch from "./ClienteSearch";

const ClientePanel = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar libros</h2>
      <ClienteSearch />
    </div>
  );
};

export default ClientePanel;
