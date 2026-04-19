import { FormValues } from "@/src/schema/userSchema"
import { RoleResponse } from "@/src/types/role";
import { UserResponse } from "@/src/types/user";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface Props {
    isEditMode : boolean | false, 
    formMethods : UseFormReturn<FormValues> , 
    onSubmit : (data:FormValues)=>  void, 
    isPendingCreate : boolean , 
    isPendingUpdate : boolean, 
    roles : RoleResponse[] | [], 
    preview : string | null, 
    handleChangeFile  :  (e: React.ChangeEvent<HTMLInputElement> )=> void,
}

export default function UserTable  ({isEditMode ,formMethods, onSubmit , isPendingCreate , isPendingUpdate , roles ,preview , handleChangeFile}: Props ){
    const {register , handleSubmit , formState:{errors}} = formMethods;
    return (  
        <>
        <div className="page-wrapper">
   {(isPendingCreate || isPendingUpdate) && (
        <div className="loading-overlay">
            <div className="spinner-border text-light" role="status" />
        </div>
    )}
 <div className="container-fluid">
              <div className="page-header">
                <h1 className="greeting">Settings</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-lg-3">
                   <section className="settings-section">
                        <div className="card avatar-card">
                            <h2 className="settings-title">Profile Picture</h2>

                            <div className="avatar-container">
                            {/* Ảnh hiển thị */}
                            <img 
                                src= {preview|| "/default-avatar.png"} 
                                className="profile-preview"
                            />
                            
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fas fa-camera"></i> Change Photo
                            </label>
                            <input 
                                id="file-upload" 
                                type="file" 
                                {...register("file")} 
                                onChange={(e) => {
                                    register("file").onChange(e); 
                                    handleChangeFile(e); 
                                }}
                            />
                            </div>
                            
                            {/* <p className="upload-hint">JPG, PNG or GIF. Max size 2MB</p> */}
                        </div>
                        </section>
                </div>
                <div className="col-lg-9">
                    <section className="settings-section">
                        <div className="card">
                        <h2 className="settings-title">Account Form</h2>
                        {/* <p className="settings-desc">Update your personal information</p> */}

                        <div
                            style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            marginBottom: "1rem",
                            }}
                        >
                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">UserName</label>
                            <input
                                type="text"
                                {...register("userName")}
                                className="form-input"
                            />
                            {errors.userName && (
                                <span className="error-message">{errors.userName.message}</span>
                            )}
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">PhoneNumber</label>
                            <input
                                type="text"
                                className="form-input"
                                {...register("phoneNumber")}
                            />
                            {errors.phoneNumber && (
                                <span className="error-message">{errors.phoneNumber.message}</span>
                            )}
                            </div>
                        </div>

                           <div
                            style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            marginBottom: "1rem",
                            }}
                        >
                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-input"
                                {...register("firstName")}
                            />
                               {errors.firstName && (
                                <span className="error-message">{errors.firstName.message}</span>
                            )}
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-input"
                                {...register("lastName")}
                            />
                             {errors.lastName && (
                                <span className="error-message">{errors.lastName.message}</span>
                            )}
                            </div>
                            
                        </div>

                           <div
                            style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            marginBottom: "1rem",
                            }}
                        >
                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">BirthDay</label>
                            <input
                                type="date"
                                {...register("birthDay")}
                                className="form-input"
                            />
                            {errors.birthDay && (
                                <span className="error-message">{errors.birthDay.message}</span>
                            )}
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-input"
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className="error-message"> {errors.email.message} </span>
                            )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address </label>
                            <input
                            type="text"
                            className="form-input"
                             {...register("address")}
                            />
                            {errors.address && (
                                <span className="error-message"> {errors.address.message}</span>
                            )}
                        </div>
                        <div className="form-group">
                        <label className="form-label">Assign Roles</label>
                        <div className="role-checklist-container">
                            {roles?.map((role) => (
                                <label key={role.roleId} className="role-checkbox-item">
                                    <input
                                        type="checkbox"
                                        {...register("roleIds")}
                                        value={role.roleId}
                                    />
                                    <span className="role-name">{role.roleName}</span>
                                </label>
                            ))}
                            
                        </div>
                            {errors.roleIds && (
                                      <span className="error-message">{errors.roleIds.message} </span>
                            ) } 
                        </div>
                        
                          <div className="form-group">
                        <label className="form-label">Gender</label>
                        <div className="role-checklist-container">
                                <label  className="role-checkbox-item">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        value={0}
                                    />
                                    <span className="role-name">Male</span>
                                </label>
                                   <label  className="role-checkbox-item">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        value={1}
                                    />
                                    <span className="role-name">Female</span>
                                </label>
                        </div>
                            {errors.gender && (
                                      <span className="error-message">{errors.gender.message} </span>
                            ) } 
                        </div>
                        

                          </div>
                        {/* <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Bio</label>
                            <textarea
                            className="form-input"
                            style={{ minHeight: "80px", resize: "vertical" }}
                            defaultValue="Product manager with 5+ years of experience in SaaS."
                            />
                        </div> */}

                        <div style={{ marginTop: "1.25rem" }}>
                            <button 
                            type="submit"
                             className="btn btn-primary"
                            disabled={isPendingCreate || isPendingUpdate}
                            >
                            
                              {isEditMode ? 'Update User' : 'Create User'}
                            </button>
                        </div>
                      
                    </section>

                </div>
            </div>
               </form>
        </div>
        </div>
        </>
    )
}