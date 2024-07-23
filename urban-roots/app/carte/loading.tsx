import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 lg:px-0 px-5 mb-10">
      <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto lg:h-screen h-[80vh]">
        <Skeleton className="w-full lg:h-screen h-[80vh]" />
      </div>
      <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto mb-5">
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
}
