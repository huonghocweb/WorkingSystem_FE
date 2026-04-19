'use client'

import { BoardRequest } from "@/src/types/board"
import { WorkSpaceResponse } from "@/src/types/workSpace"
import { UseFormReturn } from "react-hook-form"

interface BoardFormUIProps { 
    workspace : WorkSpaceResponse | null
    onClose : () => void, 
    onSubmit : (data : BoardRequest)=>  void , 
    formMethod :UseFormReturn<BoardRequest>, 
    isPendingCreate : boolean
}

export default function BoardFormUI ({workspace , onClose, onSubmit , formMethod , isPendingCreate} : BoardFormUIProps) {
  const {register , handleSubmit} = formMethod;
    return ( 
        <>
        {
          isPendingCreate && (
            <div className="">loading</div>
          )
        }
          <div className="modal-overlay" > 
        <div className="modal-content-base w-workspace">
          <h2 style={{ fontSize: '18px', color: '#172b4d', margin: 0 }}>Create Board</h2>
          
          <form className="modal-form-base" onSubmit={ handleSubmit(onSubmit)} >

              <div className="form-group-base">
              <label className="form-label">Workspace </label>
              <input 
              className="form-input"
                type="text" 
                readOnly={true}
                value={workspace?.workspaceTitle}
              />
            </div>


            <div className="form-group-base">
              <label className="form-label">Board title</label>
              <input 
              className="form-input"
                type="text" 
                placeholder="Enter title..." 
                {...register('boardTitle')}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}