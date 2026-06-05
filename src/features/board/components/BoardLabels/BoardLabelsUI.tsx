'use client'

import PendingPage from "@/src/components/PendingPage"
import { LabelRequest, LabelResponse } from "@/src/types/label"
import { useParams } from "next/navigation"
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

interface BoardLabelsUIProps  {
    isPending :  boolean , 
    cardLabels :  LabelResponse [],
    boardLabels : LabelResponse[], 
    handleDeleteBoardLabel : (labelId  :  number) => void, 
    setIsOpenLabelForm : (data :boolean )=> void,
    isOpenLabelForm :boolean, 
    onSubmit : (data : LabelRequest) => void, 
    register : UseFormRegister<LabelRequest>, 
    handleSubmit : UseFormHandleSubmit<LabelRequest>, 
    handleAddLabelToCard : (cardId  :number | string , labelId :number) => void , 
    handleDeleteLabelFromCard : (cardId :number , labelId :number) => void
}

export const BoardLabelsUI = ({isPending ,cardLabels, boardLabels, handleDeleteBoardLabel, setIsOpenLabelForm , isOpenLabelForm ,
  onSubmit , register , handleSubmit, handleAddLabelToCard , handleDeleteLabelFromCard
}  : BoardLabelsUIProps) => {
  const {cardId} = useParams();
  console.log(cardLabels);
    console.log(boardLabels);
    const colors = [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', 
      '#7F1D1D', '#78350F', '#064E3B', '#1E3A8A', '#4C1D95',
      '#FCA5A5', '#FDE68A', '#A7F3D0', '#BFDBFE', '#DDD6FE',
    ];
    return ( 
        <>
        {isPending && (
            <PendingPage/>
        )}
        <div className="p-3" style={{ backgroundColor: '#f1f2f4', minHeight: '100%' }}>
      {!isOpenLabelForm ? (
        <>

      <div 
        className="bg-white border shadow-sm p-3 mb-4" 
      >
        <div className="text-center mb-1">Labels</div>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control form-control-sm border-2 shadow-none" 
            placeholder="Search labels..." 
            style={{ backgroundColor: '#f7f8f9', borderColor: '#dfe1e6' }}
          />
        </div>

        <div className="d-grid gap-2">
          {boardLabels.map((label,index) => (
            <>
            <div key={index} className="d-flex align-items-center gap-2 py-1">
              <input 
                onClick={()=> (cardLabels.some(cardLabel => cardLabel.labelId === label.labelId) ? 
                   handleDeleteLabelFromCard(cardId, label.labelId) : handleAddLabelToCard(cardId, label.labelId)) }
                className="form-check-input border-2 m-0 shadow-none" 
                type="checkbox" 
                readOnly={true}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                checked= { cardLabels.some(cardLabel => cardLabel.labelId === label.labelId)}
              />
               <div 
                  className="flex-grow-1 rounded-1 shadow-sm d-flex align-items-center justify-content-center" 
                  style={{ 
                    backgroundColor: label.labelColor, 
                    height: '32px',  color: '#241414',  
                    }} >
                  {label.labelName}
                </div>
              <button onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteBoardLabel(label.labelId);
                }} className="btn btn-outline-secondary">
               <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            </>
          ))}
        </div>
      </div>

      <div className="d-grid gap-2">
        <button 
          onClick={() => setIsOpenLabelForm(!isOpenLabelForm)}
          className="btn btn-light btn-sm border shadow-sm fw-semibold py-2" 
          style={{ backgroundColor: '#ffffff', color: '#172b4d' }}
        >+ New label </button>
      </div>
      </>
      )
    : (
      <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 bg-white p-3 border">
      <div className="mb-6">
        <label className="form-label" >
          Title
        </label>
        <input
          type="text"
          className="form-input"
          {...register('labelName')}
          placeholder="Enter label name..."
        />
      </div>
      <label className="form-label">
        Select a color
      </label>
      {/* Click chọn màu bằng thẻ div này , input chi để register, chứ khong phải hiện thị list radio input lên  */}
      <div className="grid grid-cols-5 gap-3 mb-6 p-2 bg-[#F2F2F7] rounded-xl shadow-inner">
        {colors.map((color) => (
          <label key={color} className="relative cursor-pointer">
            <input
              type="radio"
              value={color}
              {...register('labelColor')}
              className="peer hidden"
            />
          <div
            className="h-9 rounded-lg peer-checked:scale-135"
            style={{ backgroundColor: color }}
          />
          </label>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-5">
        <button type="submit" className="btn btn-outline-primary"> Create </button>
        <button onClick={()=> setIsOpenLabelForm(!isOpenLabelForm)} className="btn btn-outline-primary">Cancel</button>
      </div>
    </form>
      </>
    ) }
    </div>
    </>
    )
}