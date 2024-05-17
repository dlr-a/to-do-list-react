export default function Categories({
  categories,
  categoryName,
  setCategoryName,
}) {
  return (
    <div>
      <select
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      >
        <option value={""}>Choose Category</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}
