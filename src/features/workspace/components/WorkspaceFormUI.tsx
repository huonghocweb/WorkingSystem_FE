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
        <div className="loading-overlay">
          <div className="spinner-border text-light" role="status" />
        </div>
      )}

      <div className="modal-overlay" > 
        <div className="modal-content-base w-workspace" >
          <h2 style={{ fontSize: '18px', color: '#172b4d', margin: 0 }}>Create workspace</h2>
          
          <form className="modal-form-base" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group-base">
              <label className="form-label">Workspace title</label>
              <input 
              className="form-input"
                type="text" 
                placeholder="Enter title..." 
                {...register('workspaceTitle')}
              />
            </div>

            <div className="form-group-base">
              <label className="form-label">Visibility</label>
              <select {...register('visibilityId')}
              className="form-input">
                {visibilities.map((item) => (
                  <option key={item.visibilityId} value={item.visibilityId}>
                    {item.visibilityName}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}