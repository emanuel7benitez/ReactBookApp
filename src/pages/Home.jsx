
import { Layout } from "../components/Layout"
import { useTasks } from "../hooks/useTasks"
import { NotFound } from "../components/NotFound";
import { Books } from "../components/Books";
import { TitleApp } from "../components/TitleApp";

const Home = () => {
  const {
    tasks,
    gender,
    selectedGender,
    loader,
    error,
    handleComplete,
    handleDelete,
    addTask,
    changesText,
    changesSelectedGender
  } = useTasks()



  return (
    <Layout>

      <div className="px-40 flex flex-1 justify-center py-5">
        {
          !loader ? (
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <TitleApp title={'My Book App'}></TitleApp>
          <div className="flex flex-col p-4 gap-3">
            <details
              className="flex flex-col rounded-xl bg-[#282d43] px-4 py-2 group"
              open=""
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                <p className="text-white text-sm font-medium leading-normal">
                  Add New Book
                </p>
                <div
                  className="text-white group-open:rotate-180"
                  data-icon="CaretDown"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </summary>
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Add New Book
              </h3>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder="Book Title"
                    type="text"
                    onChange={(e) => changesText(e.target.value)}
                    required
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <select
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
                    value={selectedGender}
                    onChange={(e) => changesSelectedGender(e.target.value)}
                  >
                    <option value="">Select Genre</option>
                    {gender.map((genre) => (
                      <option key={genre._id} value={genre.name}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 text-red-700">
                {
                  error && <p>{error}</p>
                }
              </div>
              <div className="flex px-4 py-3 justify-end">
                <button
                  onClick={() => addTask()}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#4264fa] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Add Book</span>
                </button>
              </div>
            </details>
          </div>
          {tasks.length > 0 && 
           <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#99a0c2] flex border-none bg-[#282d43] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search book titles"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#282d43] focus:border-none h-full placeholder:text-[#99a0c2] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>}
          {tasks.length > 0 ? (
            
              tasks.map((book) => (
                <Books key={book._id} book={book} handleComplete={handleComplete} handleDelete={handleDelete}></Books>
            ))
          ) : (
            <div className="px-40 flex flex-1 justify-center py-5">
              {tasks.length === 0 && (
                <NotFound></NotFound>
              )}
            </div>
          )}
        </div>
          ) : <p>Cargando...</p>
        }
      </div>
    </Layout>
  );
}

export { Home }