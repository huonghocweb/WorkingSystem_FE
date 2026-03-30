import './workspace.css';

export default function WorkSpace() { 
    return ( 
        <>
        <div className="workspace-section">
  <h2 className="section-title">YOUR WORKSPACES</h2>

  <div className="workspace-header">
    <div className="workspace-info">
      <div className="workspace-logo">T</div>
      <h3 className="workspace-name">Trello Workspace</h3>
    </div>
    
    <div className="workspace-actions">
      <button className="btn-action"><i className="fas fa-th-large"></i> Boards</button>
      <button className="btn-action"><i className="fas fa-user"></i> Members</button>
      <button className="btn-action"><i className="fas fa-cog"></i> Settings</button>
      <button className="btn-upgrade"><i className="fas fa-briefcase"></i> Upgrade</button>
    </div>
  </div>

  <div className="boards-grid">
    {/* Board Item 1 */}
    <div className="board-card" style={{ backgroundImage: 'url("https://picsum.photos/id/10/400/250")' }}>
      <div className="board-overlay">
        <span className="board-title">ádds</span>
      </div>
    </div>

    {/* Board Item 2 */}
    <div className="board-card" style={{ backgroundImage: 'url("https://picsum.photos/id/11/400/250")' }}>
      <div className="board-overlay">
        <span className="board-title">CourseHub</span>
      </div>
    </div>

    {/* Board Item 3 */}
    <div className="board-card" style={{ backgroundImage: 'url("https://picsum.photos/id/12/400/250")' }}>
      <div className="board-overlay">
        <span className="board-title">FoodEase</span>
      </div>
    </div>

    {/* Create New Board Card */}
    <div className="board-card create-new">
      <span>Create new board</span>
      <small>7 remaining</small>
    </div>
  </div>

  <button className="btn-view-closed">View all closed boards</button>
</div>
        </>
    )
}