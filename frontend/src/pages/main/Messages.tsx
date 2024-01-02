import PageTitle from "../../components/PageTitle";

const Messages = () => {
  return (
    <div>
    <PageTitle title="Messages" />
    <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
      <div className="flex-1 min-w-0 bg-white xl:flex">
        <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
          <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="h-full relative">
              <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                <div className="flex-shrink-0">
                  <img 
                  className="h-12 w-12 rounded-full"
                  src="https://unsplash.com/photos/man-wearing-henley-top-portrait-7YVZYZeITc8"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" />
                    <p className="text-sm font-bold text-blue-400">
                      Jan Kowalski
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      
                    </p>
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
                  </div>
                  <input
                    name="search"
                    className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border" 
                    /> 
                </div>

                
                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                  <div className="flex-shrink-0">
                    <img
                    className="h-10 w-10 rounded-full"
                    src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-blue-400">
                          Maria Nowak
                        </p>
                        <div className="text-gray-400 text-xs">
                          10:30 AM
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          Hej
                        </p>
                        <div className="text-white text-xs bg-blue-400 rounded-full px-1 px-0">
                          3
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                
                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                  <div className="flex-shrink-0">
                    <img
                    className="h-10 w-10 rounded-full"
                    src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-blue-400">
                          Damian Pytajnik
                        </p>
                        <div className="text-gray-400 text-xs">
                          11:40 PM
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          Hej
                        </p>
                        <div className="text-white text-xs bg-blue-400 rounded-full px-1 px-0">
                          3
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex">
          <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
            <div className="flex items-center space-x-4">
              <img
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
              src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I" 
              />
              <div className="flex flex-col leading-tight">
                <div className="text-1xl mt-1 flex items-center">
                  <span className="teext-gray-700 mr-3">
                    Damian Pytajnik
                  </span>

                </div>
              </div>
            </div>

          </div>

          

          <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            
            

            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                      Lorem ipsum
                    </span>
                  </div>
                </div>
                <img 
                className="w-6 h-6 rounded-full order-1"
                src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                />
              </div>
            </div>

            

            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-400 text-white">
                      Lorem ipsum
                    </span>
                  </div>
                </div>
                <img 
                className="w-6 h-6 rounded-full order-1"
                src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                />
              </div>
            </div>

            

            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                      Lorem ipsum
                    </span>
                  </div>
                </div>
                <img 
                className="w-6 h-6 rounded-full order-1"
                src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                />
              </div>
            </div>

            

            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                      Lorem ipsum
                    </span>
                  </div>
                </div>
                <img 
                className="w-6 h-6 rounded-full order-1"
                src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                />
              </div>
            </div>

            

            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                      Lorem ipsum
                    </span>
                  </div>
                </div>
                <img 
                className="w-6 h-6 rounded-full order-1"
                src="https://unsplash.com/photos/woman-wearing-blue-denim-jacket-W7b3eDUb_2I"
                />
              </div>
            </div>


          </div>

          

          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16">
            <div className="relative flex">
              <input
              placeholder="Write something" 
              className="focus:ring-blue-500 focus:border-blue-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default Messages;
