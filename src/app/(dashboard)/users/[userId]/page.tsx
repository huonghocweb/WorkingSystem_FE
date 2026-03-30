import { getAllRole } from "@/src/features/role/services/role.server.service";
import UserFormContainer from "@/src/features/user/components/UserFormContainer";
import { getUserById } from "@/src/features/user/services/user.server.service";
import { notFound } from "next/navigation";

interface Props {
    params : Promise<{userId : string}>
}

export default async function Page({params}: Props) {
    const {userId}  = await params;
     const roles = await getAllRole();
   //  console.log("Check Roles Data:", roles);
    let userById = null;
    if(userId !== "create") { 
        try {
           userById = await getUserById(Number(userId));
        } catch (error) {
         throw error;
        }
    }

   

  return (
    <main className="main-content">
            <UserFormContainer
                user={userById?.data }
                roles = {roles?.data}
            />
    </main>
  );
}