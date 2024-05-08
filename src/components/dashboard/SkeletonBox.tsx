import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonBox() {
    return (
        <div className="flex flex-col pt-1">
            <Skeleton className="h-[30px] w-[300px]" />
            <div className="flex flex-row space-x-4 pt-4">
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
            </div>
            <div className="flex flex-row space-x-4 pt-4">
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
                <div className="flex flex-col space-y-2 mb-[100px]" >
                    <Skeleton className="h-[128px] w-[220px]" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[150px]" />
                    </div>
                </div >
            </div>
        </div>
    )
}
