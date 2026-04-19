'use client'
import { BoardRequest, BoardResponse } from "@/src/types/board"
import { UseFormReturn } from "react-hook-form"

interface BoardUIProps { 
  boardById : BoardResponse , 
  formMethod : UseFormReturn<BoardRequest>, 
  onSubmit :(data :  BoardRequest) =>  void , 
  isPendingUpdate  :boolean
}

export default  function BoardsUI ({boardById , formMethod  , onSubmit , isPendingUpdate} : BoardUIProps) {  
    const {register , handleSubmit} = formMethod; 
  return (
        <>
        {
          isPendingUpdate && (
              <div className="loading-overlay">
          <div className="spinner-border text-light" role="status" />
        </div>
          )
        }
        <div className="mobile-menu-overlay"></div>

      <div className="app-container">
        <main className="main-content">
          <div 
            className="page-header" 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-start" 
            }}
          >
            <form onSubmit={(handleSubmit(onSubmit))}>
              <h1 className="greeting">
                <input
                 style={{fontSize : '25px'}}
               {...register('boardTitle', { 
                onBlur : (e) => {
                  handleSubmit(onSubmit)()
                }
               })}
                />
              </h1>
            </form>
            <button className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Project
            </button>
          </div>

          <div className="kanban-board">
            {
              boardById.boardLists.map((boardList, boardIndex)=> (
              <div className="kanban-column" key={boardIndex}>
              <div className="kanban-header">
                <span className="kanban-title">{boardList.boardListTitle}</span>
                <span className="kanban-count">4</span>
              </div>
              <div className="kanban-cards">

               {
                boardList.cards.map((card, cardIndex)=> (
                   <div className="kanban-card" key={cardIndex}>
                  <div className="kanban-card-title">{card.cardTitle}</div>
                  <div className="kanban-card-desc">{card.cardDescription}</div>
                  <div className="kanban-card-footer">
                    <div className="card-labels-container" style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {card.labels && card.labels.map((label, labelIndex) => (
                          <span 
                            key={label.id || labelIndex}
                            className="label-mini"
                            style={{ 
                              backgroundColor: label.labelColor,
                            }}
                            title={label.labelName} // Di chuột vào vẫn hiện tên nhãn
                          >
                            {/* Không để nội dung ở đây để chỉ hiện thanh màu */}
                          </span>
                        ))}
                      </div>
                   <div className="avatar-group">
                      {card.users && card.users.map((user, userIndex) => (
                        <div 
                          key={user.id || userIndex} 
                          className="avatar"
                          title={user.fullName} // Hiện tên khi di chuột vào
                        >
                          {user.imageUrl ? (
                            <img  src={user.imageUrl} alt={user.fullName} /> 
                           ) : (
                            <span className="avatar-fallback">
                              {user.fullName ? user.fullName.charAt(0) : '?'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                ))
               }
                <button className="btn btn-primary" style={{width : '50%', height : '30px'}}>+Add card</button>
              </div>
            </div>
              ))
            }
          </div>
        </main>

      </div>
        </>
    )
}