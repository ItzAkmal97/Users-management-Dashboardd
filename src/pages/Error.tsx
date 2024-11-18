import { Link } from "react-router-dom"
function Error() {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-8 justify-center items-center">
        <span className="text-9xl font-bold text-stone-600">404!</span> 
        <h1 className="text-5xl font-bold text-stone-600">Something’s not right.</h1>
        <Link to={'/'}>
        <button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-4 px-6 rounded-full mt-4">Back to Homepage</button>
        </Link>
    
      </div>
    </main>
  )
}

export default Error