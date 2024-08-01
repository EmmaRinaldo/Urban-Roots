import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 lg:px-0 px:5 mb-10">
      <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
        <Skeleton className="w-full h-[1000px]" />
      </div>
      <div className="flex min-h-[300px] justify-center flex-col rounded-md p-8 t">
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
}