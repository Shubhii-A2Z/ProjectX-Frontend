export const Auth=({children}: {children: any})=>{
    // Layout for auth related pages
    return (
        <div 
            className="h-[100vh] flex items-center justify-center bg-projectX"
        >
            <div className="md:h-auto md:w-[420px]">
                {children}
            </div>
        </div>
    );
};