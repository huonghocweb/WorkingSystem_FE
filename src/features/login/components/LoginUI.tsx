
interface LoginUIProps { 
    isLoading : boolean , 
    handleSubmit : (e : React.FormEvent<HTMLFormElement>) => void
}

export default function LoginUI({isLoading , handleSubmit} : LoginUIProps) {

    return (
        <>

            {/* */}
            <div className="login-page">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <div className="login-logo">
                                <div className="logo-icon">
                                </div>
                                <span>TaskNova</span>
                            </div>
                            <h1 className="login-title">Welcome back</h1>
                            <p className="login-subtitle">Sign in to your account to continue</p>
                        </div>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">UserName</label>
                                <input type="text" name="userName" className="form-input" placeholder="Enter your accountName" />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                                    <a href="#" style={{ fontSize: '0.8125rem', color: 'var(--accent)' }}>Forgot password?</a>
                                </div>
                                <input type="password" name="password" className="form-input" placeholder="Enter your password" />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
                                />
                                <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    Remember me 
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>or continue with</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <button className="btn btn-secondary">
                               <i className="fa-brands fa-google"></i>
                                Google
                            </button>
                            <button className="btn btn-secondary">
                             <i className="fa-brands fa-facebook"></i>
                                FaceBook
                            </button>
                        </div>

                        <p className="login-footer">
                            Dont have an account? <a href="#">Sign up for free</a>
                        </p>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        TaskNova. Designed by <a href="https://www.templatemo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>huongpham</a>
                    </p>
                </div>
            </div>
        </>
    );
}