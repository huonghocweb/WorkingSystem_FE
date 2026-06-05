'use client'

import ModalWrapper from "@/src/components/ModalWrapper";
import { useModal } from "@/src/store/useModalStore"
import WorkspaceMemberModalUI from "./WorkspaceMemberUI";
import {  getUserToInvite, getWorkspaceInvitationsByWorkspaceId, getWorkspaceMembersByWorkspaceId, inviteUserByEmail } from "../../services/workspace.client.service";
import {  useRef, useState } from "react";
import { UserSearchResponse, UserSummaryResponse } from "@/src/types/user";
import { WorkspaceInvitationRequest, WorkspaceMemberId, WorkspaceMemberRequest } from "@/src/types/workSpace";
import { showToast } from "@/src/utils/notification";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDeleteWorkspaceInvitation, useDeleteWorkspaceMember, useInviteEmailToWorkspace, useInviteUserToWorkspace } from "@/src/hooks/useWorkSpaceMutation";
import { ApiResponse } from "@/src/types/pageResponse";

export const WorkspaceMember  =  ()=> {
    const [userSearch, setUserSearch]  = useState<UserSearchResponse | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const {isOpen , onClose , type , data} = useModal();
    const isOpenModal = isOpen && type ==="workspaceMember";
    const router = useRouter();

    const {mutate : inviteUserMutation  , isPending : isPendingInviteUser}  = useInviteUserToWorkspace();
    const {mutate  :  inviteEmailMutation , isPending : isPendingInviteEmail} = useInviteEmailToWorkspace();
    const {mutate : deleteWorkspaceMemberMutation , isPending : isPendingDeleteWorkspaceMember} = useDeleteWorkspaceMember();
    const {mutate : deleteWorkspaceInvitationMutation , isPending : isPendingDeleteWorkspaceInvitation} = useDeleteWorkspaceInvitation();
    const {data : workspaceMembers ,isLoading : isLoadingMember } = useQuery({     
        queryKey : ["workspace-members", data.workspaceId], 
        queryFn : async () => {
            const res = await getWorkspaceMembersByWorkspaceId(data?.workspaceId) ;
            return res.data  || [];
        },
        initialData: [],
        enabled : !!isOpenModal && !!data?.workspaceId, 
        staleTime : 0
    }); 

    const {data : workspaceInvitations  ,isLoading :  isLoadingInvitations } = useQuery({
        queryKey : ["workspace-invitations", data?.workspaceId] , 
        queryFn : async() => {
            console.log("wy")
            const res = await getWorkspaceInvitationsByWorkspaceId(data?.workspaceId) ;
            return res.data || [];
        }, 
        initialData : [],
        staleTime : 0
    })

    const findUserToInvite = async (keyword : string ) =>  {
        console.log(keyword);
      try{
          const userByKeyWord = await getUserToInvite(keyword , data.workspaceId);
        console.log('userByKeyword' , userByKeyWord);
        if(userByKeyWord.success) {
            setUserSearch(userByKeyWord.data);
         
        }
      }catch(error) {
        setUserSearch(null);
      }
    }

    const inviteUser = async (user : UserSearchResponse) => {
        console.log(user.isExisted);
        const isInviteByEmail = !user.isExisted && !user.isJoined;
        const options = { 
            onSuccess :() => {
                if(isInviteByEmail) { 
                    showToast('success', 'Invite user by email success');
                }else {
                showToast('success',  'Invite user success');
                }
                setUserSearch(null);
                   if(inputRef.current) {
                inputRef.current.value = "";
            }
                router.refresh();
            }, onError : (error : Error) => { 
                showToast('error', error.message)
            }
        }
        if(isInviteByEmail) { 
            const workspaceInvitationRequest : WorkspaceInvitationRequest = {
            email :  user.email, 
            workspaceId : data.workspaceId
        }
            console.log('by mail', isInviteByEmail)
            inviteEmailMutation(workspaceInvitationRequest, options);
        }else { 
            const workspaceMemberRequest  : WorkspaceMemberRequest  =  { 
            userId : user.userId,
            workspaceId :  data.workspaceId
        }
            console.log('by account', isInviteByEmail)
            inviteUserMutation(workspaceMemberRequest,  options);
        }

    }

    const deleteWorkspaceMember = async( workspaceMemberId : WorkspaceMemberId) => {
        const options = ({
            onSuccess : () => {
                showToast('success',"Delete workspaceMember success!");
            }, onError : (error: Error) => {
                showToast('error', `${error.message}` )
            }
        })
        deleteWorkspaceMemberMutation(workspaceMemberId, options);
    }
    const deleteWorkspaceInvitation = async (workspaceInvitationId : number) => {
        const  options = ({
            onSuccess : (res : ApiResponse<unknown>) => {
                showToast('success' , `${res.message}` )
            }, onError : (error : Error) => {
                showToast('error', `${error.message}`)
            }
        })
        deleteWorkspaceInvitationMutation(workspaceInvitationId, options);
    }
    return (
        <>
            {
                isOpenModal && (
                    <ModalWrapper
                    onClose={onClose}
                    >
                        <WorkspaceMemberModalUI
                        inputRef = {inputRef}
                        workspaceMembers={workspaceMembers}
                        workspaceInvitations = {workspaceInvitations}
                        isLoading = {isLoadingMember || isLoadingInvitations || isPendingInviteUser 
                            || isPendingInviteEmail || isPendingDeleteWorkspaceMember || isPendingDeleteWorkspaceInvitation}
                        findUserToInvite = {findUserToInvite}
                        userSearch = {userSearch}
                        inviteUser = {inviteUser}
                        deleteWorkspaceMember= {deleteWorkspaceMember}
                        deleteWorkspaceInvitation = {deleteWorkspaceInvitation}
                        />
                    </ModalWrapper>
                )
            }
        </>
    )
}