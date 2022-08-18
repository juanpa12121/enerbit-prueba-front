import { Link } from "react-router-dom"
const Header = () => {
  return (
    <>
    <nav className="sm:gap-8 text-center sm:text-left items-center justify-around flex-wrap bg-white fixed w-full z-10 top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <Link to="/" className="font-semibold text-3xl tracking-tight"><img alt="logo-enerbit" src="logo.svg"></img>
            <a href="/logo.svg"></a>
        </Link>
      </div>
    </nav>
    </>
  )
}

export default Header