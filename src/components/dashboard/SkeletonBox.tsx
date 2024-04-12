import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonBox() {
    return (
        < div className="flex flex-col space-y-2" >
            <Skeleton className="h-[128px] w-[220px]" />
            <Skeleton className="h-[150px] w-[220px]" />
        </div >
    )
}
