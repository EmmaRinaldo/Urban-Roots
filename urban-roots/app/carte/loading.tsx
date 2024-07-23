import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex flex-col md:flex-row z-0">
      <div className="lg:w-[65%] w-full flex flex-col gap-y-5 mx-auto lg:h-[100vh] h-[50vh]">
        <Skeleton className="w-full lg:h-[100vh] h-[50vh]" />
      </div>
      <div className="lg:w-[35%] w-full mx-auto mb-5">
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
}
