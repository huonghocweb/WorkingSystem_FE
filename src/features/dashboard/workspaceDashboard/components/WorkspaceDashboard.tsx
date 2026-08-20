"use client";

import { WorkspaceDashboardDTO } from "@/src/types/dashoard/workspace/workspaceDashboardDTO";
import { WorkSpaceResponse } from "@/src/types/workSpace";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Overview } from "./widgetComponents/Overview";
import { MemberCardsStats } from "./widgetComponents/MemberCardsStats";
import { CompletionRateChart } from "./widgetComponents/BoardCompletionRateChart";

interface WorkspaceDashboardProps {
  currentWorkspaceId: number;
  workspaceDashboard: WorkspaceDashboardDTO;
  workspaceOwnedByUser: WorkSpaceResponse[];
}

export const WorkspaceDashboard = ({
  currentWorkspaceId,
  workspaceDashboard,
  workspaceOwnedByUser,
}: WorkspaceDashboardProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleSelectChange = (newWorkspaceId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspaceId", newWorkspaceId);
    router.push(`${pathName}?${params.toString()}`);
  };
  console.log("workspaceDashboard : ", workspaceDashboard);
  // console.log("workspaceOwnedByUser: ", workspaceOwnedByUser);
  return (
    <>
      {/* Mobile Menu Overlay */}
      {/* <div className="mobile-menu-overlay"></div> */}

      <div className="app-container">
        {/* Main Content */}
        <main className="main-content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h1 className="greeting" id="greeting">
                Good morning, Alex
              </h1>
              <p className="greeting-sub">Heres whats happening with your projects today.</p>
            </div>

            <div className="option-group workspace-select-group">
              <div className="select-wrapper">
                <select value={currentWorkspaceId} onChange={(e) => handleSelectChange(e.target.value)}>
                  {workspaceOwnedByUser.map((workspace, index) => (
                    <option key={index} value={workspace.workspaceId}>
                      {workspace.workspaceTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Overview workspaceOverview={workspaceDashboard.workspaceOverviewDTO} />
          <MemberCardsStats memberCardsStats={workspaceDashboard.memberCardsStatsDTOs} />
          <CompletionRateChart boardOverviewDTOs={workspaceDashboard.boardOverviewDTOs} />
          <div className="two-col">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Revenue Overview</h3>
                  <p className="card-subtitle">Compare this period with previous</p>
                </div>
                <div className="date-picker">
                  <button className="date-btn">7D</button>
                  <button className="date-btn active">30D</button>
                  <button className="date-btn">90D</button>
                  <button className="date-btn">12M</button>
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-scroll">
                  <div className="chart-scroll-inner">
                    <div className="bar-chart">
                      <div className="y-axis">
                        <span className="y-axis-label">$50K</span>
                        <span className="y-axis-label">$40K</span>
                        <span className="y-axis-label">$30K</span>
                        <span className="y-axis-label">$20K</span>
                        <span className="y-axis-label">$10K</span>
                        <span className="y-axis-label">$0</span>
                      </div>
                      <div className="y-axis-lines">
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "80px" }}></div>
                          <div className="bar current" style={{ height: "100px" }}></div>
                        </div>
                        <span className="bar-label">Jan</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "95px" }}></div>
                          <div className="bar current" style={{ height: "120px" }}></div>
                        </div>
                        <span className="bar-label">Feb</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "70px" }}></div>
                          <div className="bar current" style={{ height: "85px" }}></div>
                        </div>
                        <span className="bar-label">Mar</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "110px" }}></div>
                          <div className="bar current" style={{ height: "140px" }}></div>
                        </div>
                        <span className="bar-label">Apr</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "90px" }}></div>
                          <div className="bar current" style={{ height: "105px" }}></div>
                        </div>
                        <span className="bar-label">May</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "130px" }}></div>
                          <div className="bar current" style={{ height: "155px" }}></div>
                        </div>
                        <span className="bar-label">Jun</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "100px" }}></div>
                          <div className="bar current" style={{ height: "125px" }}></div>
                        </div>
                        <span className="bar-label">Jul</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar-wrapper">
                          <div className="bar previous" style={{ height: "85px" }}></div>
                          <div className="bar current" style={{ height: "110px" }}></div>
                        </div>
                        <span className="bar-label">Aug</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot current"></span>
                    This Period
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot previous"></span>
                    Previous Period
                  </div>
                </div>
              </div>
            </div>
            {/* Activity Feed */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Recent Activity</h3>
                  <p className="card-subtitle">Latest updates from your team</p>
                </div>
                <button className="btn btn-ghost">View All</button>
              </div>
              <div className="card-scroll">
                <div className="card-scroll-inner" style={{ minWidth: "360px" }}>
                  <div className="activity-feed">
                    <div className="activity-item">
                      <div className="activity-icon blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          <strong>Sarah Chen</strong> uploaded new design files for Dashboard v2
                        </p>
                        <span className="activity-time">2 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          <strong>Michael Torres</strong> completed task{" "}
                        </p>
                        <span className="activity-time">15 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon orange">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          <strong>Emma Wilson</strong> commented on your project proposal
                        </p>
                        <span className="activity-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" />
                          <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          <strong>James Lee</strong> joined the team as Frontend Developer
                        </p>
                        <span className="activity-time">3 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          Scheduled deployment for <strong>v2.4.0</strong> completed successfully
                        </p>
                        <span className="activity-time">5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Top Pages</h3>
                <p className="card-subtitle">Most visited pages this period</p>
              </div>
              <button className="btn btn-ghost">View All</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Views</th>
                    <th>Unique Views</th>
                    <th>Avg. Time</th>
                    <th>Bounce Rate</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style={{ fontWeight: 500 }}>/dashboard</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Main dashboard</div>
                    </td>
                    <td>15,230</td>
                    <td>12,450</td>
                    <td>5m 24s</td>
                    <td>24.5%</td>
                    <td>
                      <span className="badge badge-green">+12.4%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ fontWeight: 500 }}>/analytics</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Analytics page</div>
                    </td>
                    <td>8,450</td>
                    <td>6,890</td>
                    <td>4m 18s</td>
                    <td>28.3%</td>
                    <td>
                      <span className="badge badge-green">+8.7%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ fontWeight: 500 }}>/projects</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Projects overview</div>
                    </td>
                    <td>6,780</td>
                    <td>5,420</td>
                    <td>3m 52s</td>
                    <td>31.2%</td>
                    <td>
                      <span className="badge badge-green">+5.2%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ fontWeight: 500 }}>/settings</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>User settings</div>
                    </td>
                    <td>4,120</td>
                    <td>3,890</td>
                    <td>2m 45s</td>
                    <td>45.8%</td>
                    <td>
                      <span className="badge badge-red">-2.3%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ fontWeight: 500 }}>/inbox</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Messages inbox</div>
                    </td>
                    <td>3,890</td>
                    <td>3,120</td>
                    <td>6m 12s</td>
                    <td>18.4%</td>
                    <td>
                      <span className="badge badge-green">+15.8%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Additional Chart Row */}
          <div className="two-col" style={{ marginTop: "1.5rem" }}>
            {/* User Growth Chart */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">User Growth</h3>
                  <p className="card-subtitle">New users vs returning users</p>
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-scroll">
                  <div className="chart-scroll-inner">
                    <div className="bar-chart">
                      <div className="y-axis">
                        <span className="y-axis-label">500</span>
                        <span className="y-axis-label">400</span>
                        <span className="y-axis-label">300</span>
                        <span className="y-axis-label">200</span>
                        <span className="y-axis-label">100</span>
                        <span className="y-axis-label">0</span>
                      </div>
                      <div className="y-axis-lines">
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                        <div className="y-axis-line"></div>
                      </div>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
                        <div key={week} className="bar-group">
                          <div className="bar-wrapper">
                            <div
                              className="bar"
                              style={{ height: `${60 + week * 10}px`, background: "var(--success)" }}
                            ></div>
                            <div className="bar" style={{ height: `${80 + week * 10}px`, background: "#A855F7" }}></div>
                          </div>
                          <span className="bar-label">Week {week}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: "var(--success)" }}></span>
                    New Users
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: "#A855F7" }}></span>
                    Returning Users
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Performance Metrics</h3>
                  <p className="card-subtitle">Key performance indicators</p>
                </div>
              </div>
              <div className="card-scroll">
                <div className="card-scroll-inner" style={{ minWidth: "400px" }}>
                  <div style={{ padding: "0.5rem 0" }}>
                    {[
                      { label: "Customer Satisfaction", val: "92%", type: "success" },
                      { label: "Response Time", val: "78%", type: "accent" },
                      { label: "Task Completion", val: "85%", type: "success" },
                      { label: "System Uptime", val: "99.9%", type: "success" },
                      { label: "Bug Resolution", val: "68%", type: "warning" },
                    ].map((m, i) => (
                      <div key={i} style={{ marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{m.label}</span>
                          <span style={{ fontSize: "0.875rem", fontWeight: "600", color: `var(--${m.type})` }}>
                            {m.val}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div className={`progress-fill ${m.type}`} style={{ width: m.val }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
