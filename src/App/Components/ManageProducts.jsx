
export default function ManageProductRow({ prod }) {
  return (
    <tr key={prod._id} className="border-t">
      <td className="p-2">
        <img
          src={prod.images?.length > 0 ? prod.images[0] : "/placeholder.png"}
          alt={prod.name}
          className="w-12 h-12 object-cover rounded"
        />
      </td>
      <td className="p-2">{prod.name}</td>
      <td className="p-2">{prod.categoryId?.name || "N/A"}</td>
      <td className="p-2">{prod.quantity}</td>
      <td className="p-2">{`$${prod.price}`}</td>
      <td className="p-2">{prod.description}</td>
    </tr>
  );
}
