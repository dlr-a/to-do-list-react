import Dropdown from "react-bootstrap/Dropdown";

export default function Menu({
  categories,
  onAddHandleCategory,
  isOpen,
  setIsOpen,
}) {
  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="sidebar">
      <Dropdown>
        <Dropdown.Toggle onClick={handleIsOpen}>CATEGORIES</Dropdown.Toggle>

        {isOpen && (
          <ul>
            {categories.map((category, index) => (
              <li>
                <button
                  className="sidenav"
                  key={index}
                  onClick={() => onAddHandleCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Dropdown>
    </div>
  );
}
