export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", width: "250px" }}
    />
  );
}