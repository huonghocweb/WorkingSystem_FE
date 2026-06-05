'use client'
import ModalWrapper from '@/src/components/ModalWrapper';
import PendingPage from '@/src/components/PendingPage';
import { UserSearchResponse } from '@/src/types/user';
import { WorkspaceInvitationResponse, WorkspaceMemberId, WorkspaceMemberResponse } from '@/src/types/workSpace';
import Link from 'next/link';
import React, { RefObject, useState } from 'react';

interface WorkspaceMemberModalProps { 
 inputRef: RefObject<HTMLInputElement | null>,
  workspaceMembers : WorkspaceMemberResponse[], 
  workspaceInvitations  : WorkspaceInvitationResponse [],
  isLoading : boolean,
  findUserToInvite : (data : string) => void, 
  userSearch? : UserSearchResponse | null, 
  inviteUser : (data : UserSearchResponse) => void, 
  deleteWorkspaceMember : (workspaceMemberId : WorkspaceMemberId) => void, 
  deleteWorkspaceInvitation : (workspaceInvitationId : number )=> void
}

export default function WorkspaceMemberModalUI({inputRef,workspaceMembers,workspaceInvitations,isLoading 
  , findUserToInvite , userSearch, inviteUser , deleteWorkspaceMember , deleteWorkspaceInvitation} : WorkspaceMemberModalProps) {
  console.log(workspaceMembers);
    console.log(workspaceInvitations);
  return (
    <>
    {
      isLoading && (
        <PendingPage/>
      )
    }
        <div className="p-2">
      <div className="mb-4">
        <label className="form-label small fw-bold text-uppercase text-secondary">Invite to join   Workspace</label>
        <form className="input-group">
          <input
            ref = {inputRef}
            type="text"
            className={`form-control`}
            placeholder="Enter email or username..."
            onChange={(e) => findUserToInvite(e.target.value)}
          />
        </form>
      </div>
       {userSearch && (
  <div className="d-flex align-items-center justify-content-between p-3 mt-2 bg-white rounded-3 shadow border" style={{ minHeight: '60px' }}>
    <div className="d-flex align-items-center gap-3">
      {userSearch.imageUrl ? (
           <img  src={userSearch.imageUrl} className="rounded-circle border" width="40" height="40"/>
      ) : (
        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white border" style={{width: '40px', height: '40px', fontSize: '16px'}}>
        </div>
      )}
      <div>
        <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '14px' }}>
          {userSearch.userName}
        </h6>
        <small className="text-muted d-block" style={{ fontSize: '14px' }}>
          {userSearch.email}
        </small>
      </div>
    </div>
          <button onClick={() => inviteUser(userSearch)} className="btn btn-sm btn-primary px-3" >Invite</button>
        </div>
      )}
<div className="">
      <div className="inline-block px-2 py-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Workspace Members
        </span>
      </div>
    </div>

      <div className="list-group list-group-flush border rounded-3 overflow-auto" style={{ maxHeight: '350px' }}>
<div className="list-group list-group-flush border rounded-3 overflow-auto" style={{ maxHeight: '350px' }}>
  
  {workspaceMembers.map((member, index) => (
    <div key={`member-${index}`} className="list-group-item list-group-item-action py-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            {member.user.imagePublicId != "" ? (
              <>
                <img src={member.user.imageUrl} alt="avatar" className="rounded-circle border" width="40" height="40" />
                <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
              </>
            ) : ( 
            <div className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
             <i className="bi bi-envelope text-secondary"><i className="fa-solid fa-user"></i></i>
            </div>
            )}
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '14px' }}>
                {member.user ? member.user.userName : member.email}
            </h6>
            <small className="text-muted">{member.user?.email || ''}</small>
          </div>
        </div>
        <div className="dropdown">
          <button className="btn btn-sm btn-light border dropdown-toggle" type="button">
            {member.role }
          </button>
            <button  type="button" onClick={() => deleteWorkspaceMember(member.workspaceMemberId)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
        </div>
  
  
      </div>
    </div>
  ))}

  {workspaceInvitations.map((invite, index) => (
    <div key={`invite-${index}`} className="list-group-item list-group-item-action py-3 bg-light-subtle">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
             <i className="bi bi-envelope text-secondary"><i className="fa-solid fa-user"></i></i>
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '14px' }}>{invite.email}</h6>
            <small className="text-warning">Pending Invitation</small>
          </div>
        </div>
        <div className="dropdown">
           <div className="btn btn-sm btn-light border dropdown-toggle">
            {invite.status}
          </div>
           <button onClick={() => deleteWorkspaceInvitation(invite.invitationId)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>
  ))}

  {workspaceMembers.length === 0 && workspaceInvitations.length === 0 && (
    <div className="p-4 text-center text-muted">No members or pending invitations.</div>
  )}
</div>
      </div>
      <div className="mt-4 text-center">
        <small className="text-muted">
          Người được mời sẽ nhận được một email thông báo tham gia Workspace này.
        </small>
      </div>
    </div>
    </>
   
  );
}