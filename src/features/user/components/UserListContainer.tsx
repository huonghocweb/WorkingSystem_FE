"use client"

import { UserResponse } from "@/src/types/user";
import PaginationControls from "@/src/components/Pagination";
import { PageResponse } from "@/src/types/pageResponse";
import { PaginationState, SortOption } from "@/src/types/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserListUI from "./UserListUI";
import Link from "next/link";

interface userListProps  {
initialData : PageResponse<UserResponse>;
}

export default function UserList({initialData}: userListProps )  {

    console.log(initialData)
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

  const sortOptions : SortOption [] = [
    {label :'UserId' ,value :'userId'},
    {label :'email' ,value :'email'},
    {label :'Gender' ,value :'gender'},
  ]
  const paginationState : PaginationState  = {
        page : initialData.page , 
        size : initialData.size  , 
        by : initialData.by , 
        order : initialData.order ,  
        totalPages :  initialData.totalPages 
  }

  const handlePaginationChange = (key  : string , newValue  :  string |number) => {
    console.log(key , newValue)
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, newValue.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

    return (
        <> 
            <div className="card">
                <div className="card-header">
                    <div>
                    <h3 className="card-title">Top Pages</h3>
                    <p className="card-subtitle">Most visited pages this period</p>
                    </div>
                    <PaginationControls
                    paginationState={paginationState}
                    handlePaginationChange={handlePaginationChange}
                    sortOptions={sortOptions}
                    />
                    <Link className="btn btn-primary" href={"/users/create"}>New</Link>
                </div>
                <UserListUI
                users={initialData?.content}
                />
          </div>
        </>
    )
}