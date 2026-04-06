export default function Loading() {
    return (
        <div className="p-6 max-w-4xl mx-auto w-full">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-48 bg-slate-100 rounded animate-pulse"></div>
            </div>

            {/* List Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div 
                        key={item} 
                        className="flex items-center space-x-4 p-4 border border-slate-100 rounded-xl bg-white shadow-sm"
                    >
                        {/* Avatar giả lập */}
                        <div className="rounded-full bg-slate-200 h-12 w-12 animate-pulse"></div>
                        
                        {/* Nội dung giả lập */}
                        <div className="flex-1 space-y-3 py-1">
                            <div className="h-3 bg-slate-200 rounded-full w-1/4 animate-pulse"></div>
                            <div className="h-3 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                        </div>
                        
                        {/* Nút giả lập */}
                        <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}