'use client'

import PendingPage from "@/src/components/PendingPage"
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
           <PendingPage/>
          )
        }
         <div className="p-3"> 
            {/* Header: Gọn gàng, màu chữ tiêu chuẩn */}
            <div className="mb-4">
                <h2 className="fw-bold m-0" style={{ fontSize: '18px', color: '#172b4d' }}>
                    Create Board
                </h2>
                {/* <p className="text-muted small">Bắt đầu một dự án mới</p> */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Workspace</label>
                    <input 
                        className="form-control form-control-sm border-0" 
                        style={{ backgroundColor: '#091e420f', color: '#44546f' }}
                        type="text" 
                        readOnly
                        value={workspace?.workspaceTitle || "My Workspace"} 
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">
                        Board title <span className="text-danger">*</span>
                    </label>
                    <input 
                        {...register("boardTitle", { required: true })}
                        className="form-control shadow-none" 
                        style={{ 
                            fontSize: '14px', 
                            borderColor: '#dfe1e6',
                            transition: 'border-color 0.2s'
                        }}
                        type="text" 
                        placeholder="Enter title..." 
                        autoFocus
                    />
                </div>

                <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-sm fw-bold px-3"
                        style={{ backgroundColor: '#0c66e4', border: 'none' }}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}