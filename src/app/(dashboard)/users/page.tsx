import UserListContainer from "@/src/features/user/components/UserListContainer";
import { getUsers } from "@/src/features/user/services/user.server.service";
import { showToast } from "@/src/utils/notification";
import { redirect } from 'next/navigation';

interface UserPageProps { 
    searchParams : Promise<{ 
        page? : string , 
        size? : string , 
        by? :string , 
        order? :string
    }>
}

export default async function UserPage({searchParams}: UserPageProps)  { 

    const params = await searchParams;
  
    const page = Number(params.page ||0 ) ; 
    const size = Number(params.size || 8);
    const by = params.by || 'userId';
    const order = params.order || 'ASC';

        const  userPage = await getUsers(page, size , by , order);
     //   console.log(userPage?.data);

       return (
                <div className="app-container">
                    <UserListContainer
                    initialData={userPage} />
               </div>
    )
}