import { ImSpinner8 } from "react-icons/im";

export function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-950">
      <ImSpinner8 className="h-24 w-24 animate-spin text-sky-600" />
    </div>
  );
}
