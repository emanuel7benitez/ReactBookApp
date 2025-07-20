const TitleApp = ({title})=>{
    return(
        <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              {title}
            </p>
          </div>
    )
}

export {TitleApp}