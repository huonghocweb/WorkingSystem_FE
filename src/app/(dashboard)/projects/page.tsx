export default function ProjectPage() {
  return (
    <>
      <div className="app-container">
        {/* <!-- Main Content --> */}
        <main className="main-content">
          <div
            className="page-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h1 className="greeting">Projects</h1>
              <p className="greeting-sub">Manage and track your team work</p>
            </div>
            <button className="btn btn-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Project
            </button>
          </div>

          {/* <!-- Kanban Board --> */}
          <div className="kanban-board">
            {/* <!-- To Do --> */}
            <div className="kanban-column">
              <div className="kanban-header">
                <span className="kanban-title">To Do</span>
                <span className="kanban-count">4</span>
              </div>
              <div className="kanban-cards">
                <div className="kanban-card">
                  <div className="kanban-card-title">Design System Updates</div>
                  <div className="kanban-card-desc">
                    Update color palette and typography scale for v2.0
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-blue">Design</span>
                    <div className="avatar-group">
                      <div className="avatar blue">SC</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">User Research Report</div>
                  <div className="kanban-card-desc">
                    Compile findings from Q4 user interviews
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-orange">Research</span>
                    <div className="avatar-group">
                      <div className="avatar green">EW</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Mobile App Wireframes</div>
                  <div className="kanban-card-desc">
                    Create low-fidelity wireframes for iOS app
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-blue">Design</span>
                    <div className="avatar-group">
                      <div className="avatar blue">SC</div>
                      <div className="avatar purple">JL</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">API Documentation</div>
                  <div className="kanban-card-desc">
                    Write comprehensive docs for REST endpoints
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar orange">MT</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 
                <!-- In Progress --> */}
            <div className="kanban-column">
              <div className="kanban-header">
                <span className="kanban-title">In Progress</span>
                <span className="kanban-count">3</span>
              </div>
              <div className="kanban-cards">
                <div className="kanban-card">
                  <div className="kanban-card-title">Dashboard Redesign</div>
                  <div className="kanban-card-desc">
                    Implement new analytics dashboard with charts
                  </div>
                  <div
                    className="progress-bar"
                    style={{ marginBottom: " 0.75rem" }}
                  >
                    <div
                      className="progress-fill accent"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar blue">SC</div>
                      <div className="avatar orange">MT</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Payment Integration</div>
                  <div className="kanban-card-desc">
                    Integrate Stripe for subscription billing
                  </div>
                  <div
                    className="progress-bar"
                    style={{ marginBottom: " 0.75rem" }}
                  >
                    <div
                      className="progress-fill accent"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar orange">MT</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Email Templates</div>
                  <div className="kanban-card-desc">
                    Design responsive email templates for campaigns
                  </div>
                  <div
                    className="progress-bar"
                    style={{ marginBottom: " 0.75rem" }}
                  >
                    <div
                      className="progress-fill accent"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-blue">Design</span>
                    <div className="avatar-group">
                      <div className="avatar green">EW</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 
                <!-- Review --> */}
            <div className="kanban-column">
              <div className="kanban-header">
                <span className="kanban-title">Review</span>
                <span className="kanban-count">2</span>
              </div>
              <div className="kanban-cards">
                <div className="kanban-card">
                  <div className="kanban-card-title">Authentication Flow</div>
                  <div className="kanban-card-desc">
                    OAuth2 implementation with social login options
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar purple">JL</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Landing Page Copy</div>
                  <div className="kanban-card-desc">
                    Review and finalize marketing copy for launch
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-orange">Marketing</span>
                    <div className="avatar-group">
                      <div className="avatar green">EW</div>
                      <div className="avatar blue">SC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Done --> */}
            <div className="kanban-column">
              <div className="kanban-header">
                <span className="kanban-title">Done</span>
                <span className="kanban-count">5</span>
              </div>
              <div className="kanban-cards">
                <div className="kanban-card">
                  <div className="kanban-card-title">Brand Guidelines</div>
                  <div className="kanban-card-desc">
                    Complete brand identity documentation
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-blue">Design</span>
                    <div className="avatar-group">
                      <div className="avatar blue">SC</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Database Migration</div>
                  <div className="kanban-card-desc">
                    Migrate legacy data to new schema
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar orange">MT</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">User Onboarding Flow</div>
                  <div className="kanban-card-desc">
                    New user welcome sequence and tooltips
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-blue">Design</span>
                    <div className="avatar-group">
                      <div className="avatar green">EW</div>
                      <div className="avatar purple">JL</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Performance Audit</div>
                  <div className="kanban-card-desc">
                    Lighthouse audit and optimization
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-green">Dev</span>
                    <div className="avatar-group">
                      <div className="avatar orange">MT</div>
                    </div>
                  </div>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Security Review</div>
                  <div className="kanban-card-desc">
                    Third-party security assessment completed
                  </div>
                  <div className="kanban-card-footer">
                    <span className="badge badge-red">Security</span>
                    <div className="avatar-group">
                      <div className="avatar purple">JL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
