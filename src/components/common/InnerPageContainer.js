function InnerPageContainer({title, children}){
    return(
        <div className="grid place-items-center w-full pb-48" data-theme="night">
            <div className=" content-center w-full max-w-6xl">
                <h1 className="text-4xl mt-16 font-bold md:px-0 px-4 text-center block">{title}</h1>
                <div className="w-full md:px-0 px-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default InnerPageContainer