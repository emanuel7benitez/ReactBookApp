const NotFound = ()=>{
    return (
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                  <div className="flex flex-col px-4 py-6">
                    <div className="flex flex-col items-center gap-6">
                      <div
                        className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWUAm7pn9O5ayMANJxlOZ1GZIMUozvQx3azWEEhFOWPKD2YtUe3ep5mqTbesnb0nTG4a-Y7isoeeAnBVv17bhBvYHztU8naT1J7QMGvFrxqhQUxzj7ntsnqv0J4fiOt6ZwYnWJmU94Kj1n7Fx-PKMeUTqrBPW2xET_8aN_NunHSOWHocOMRXvsdXNg8LBBD9PVNr4jikCRoNQF1VQbhWZ2elltuYA_jr1GopPH6it47WFfb5nt0Q2FSZC8cTzVWhI6Mej-79udvA")',
                        }}
                      ></div>
                      <div className="flex max-w-[480px] flex-col items-center gap-2">
                        <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                          No books yet
                        </p>
                        <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">
                          Start tracking your reading journey by adding your
                          first book.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
    )
}

export {NotFound}