import Loader from "@/components/Loader/Loader";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
}
