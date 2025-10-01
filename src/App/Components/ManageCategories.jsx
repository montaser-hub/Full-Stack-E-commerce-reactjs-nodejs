export default function ManageCategoryRow({ cat }) {
  return (
    <tr key={cat._id} className="border-t">
      <td className="p-2">{cat.name || "N/A"}</td>
      <td className="p-2">{cat.description || "N/A"}</td>
      <td className="p-2">
        <button className="text-blue-500 mr-2 hover:underline">Edit</button>
        <button className="text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  );
}