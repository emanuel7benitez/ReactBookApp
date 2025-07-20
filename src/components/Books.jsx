

const Books = ({book, handleComplete, handleDelete})=>{

    
    return (
        
              
            
            <div className="flex items-center gap-4 bg-[#131520] px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  {book.text}
                </p>
                <p className="text-[#99a0c2] text-sm font-normal leading-normal line-clamp-2">
                  {book.gender}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex gap-2 size-7 items-center justify-center">
                  <input
                    onChange={() => handleComplete(book)}
                    checked={book.completed}
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#394060] border-2"
                  />
                <div className="shrink-0"><button onClick={() => handleDelete(book._id)} className="text-base text-red-700 font-medium leading-normal">X</button></div>
                </div>
              </div>
            </div>
    )
}

export {Books}