import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  { label: "Buscar Restaurantes", to: "/restaurantes" },
  { label: "Administrar Restaurantes", to: "/restaurantes/admin" },
];

function NavBar() {
  return (
    <section className="w-full bg-blue-500 py-3">
      <nav className="px-8 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="text-white text-2xl font-bold">
          <Link to="/">TECHNICAL TEST</Link>
        </div>
        <ul className="flex gap-4 text-white text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="hover:text-blue-50 transition-colors text-lg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default NavBar;
