import React from 'react'

function Review() {
  return (
    <>
      <div className="inline-flex items-center justify-center w-full">
    <hr className="w-[calc(100%-5rem)] md:w-[40rem] h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"/>
    <span className="absolute px-3 font-medium text-lg text-gray-700 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Write a review</span>
</div>
    <form>
      <div className="flex md:w-[calc(100%-5rem)] w-[calc(100%-1rem)] h-fit mx-auto mt-4">
        

    <label htmlFor="chat" className="sr-only">Your message</label>
    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 w-full">
        
           <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span className="sr-only">Send message</span>
        </button>
    </div>







      </div>
      </form>
    </>
  )
}

export default Review
