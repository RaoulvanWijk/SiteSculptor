import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonBox() {
    return (
        <div className="flex flex-col space-y-2 mb-[100px]" >
            <Skeleton className="h-[128px] w-[220px]" />
            <div className="flex flex-col space-y-1">
                <Skeleton className="h-[20px] w-[200px]" />
                <Skeleton className="h-[20px] w-[150px]" />
            </div>
        </div >
    )
}
