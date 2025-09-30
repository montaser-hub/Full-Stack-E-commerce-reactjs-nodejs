import { useSelector } from "react-redux";

export default function Loader() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-[rgb(67,94,72)]/70 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
