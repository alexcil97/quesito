const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="grid place-content-center bg-slate-600">
            <div className="flex justify-center items-center h-screen">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout