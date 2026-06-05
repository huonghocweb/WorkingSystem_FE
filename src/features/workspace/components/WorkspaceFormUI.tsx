import PendingPage from "@/src/components/PendingPage";
import { VisibilityResponse } from "@/src/types/visibility";
import { WorkSpaceRequest } from "@/src/types/workSpace";
import { register } from "module";
import { UseFormReturn } from "react-hook-form";

interface Props {
  visibilities : VisibilityResponse[], 
  onSubmit : (data : WorkSpaceRequest)=> void
  isPendingCreate : boolean, 
  formMethod : UseFormReturn<WorkSpaceRequest>, 
  onClose: () => void;
  // Bạn có thể thêm onSuccess ở đây sau
}
export default function WorkspaceFormUI({visibilities, onSubmit, isPendingCreate, formMethod, onClose }: Props) { 
  const {handleSubmit, register} = formMethod;

 
  return (
    <>
      {isPendingCreate && (
      <PendingPage/>
      )}

      <div className="p-3" > 
             <div className="mb-4">
                <h2 className="fw-bold m-0" style={{ fontSize: '18px', color: '#172b4d' }}>
                    Create Board
                </h2>
                {/* <p className="text-muted small">Bắt đầu một dự án mới</p> */}
            </div>
          
          <form className="modal-form-base" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Workspace title</label>
              <input 
                className="form-control form-control-sm border-0" 
                style={{ backgroundColor: '#091e420f', color: '#44546f' }}
                type="text" 
                placeholder="Enter title..." 
                {...register('workspaceTitle')}
              />
            </div>

            <div className="mb-4">
              <label  className="form-label small fw-bold text-secondary">Visibility</label>
              <select {...register('visibilityId')}
                className="form-control shadow-none">
                {visibilities.map((item) => (
                  <option key={item.visibilityId} value={item.visibilityId}>
                    {item.visibilityName}
                  </option>
                ))}
              </select>
            </div>

              <div className="d-flex justify-content-end gap-2 pt-2 border-top">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
      </div>
    </>
  );
}