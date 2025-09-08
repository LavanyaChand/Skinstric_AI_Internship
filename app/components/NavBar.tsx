import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-1000">
            <div className="flex-center flex-row pt-1 scale-75">
                <Link
                    href="/"
                    className="inline-flex-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-bold text-sm line-clamp-4 leading-[16px] text-dark-1 z-1000"
                >
                    SKINSTRIC
                </Link>
            </div>

            <button
                className="inline-flex-center gap-2 whitespace-nowrap font-semibold transition-colors cursor-not-allowed shadow h-9 px-4 py-2 mx-4 scale-[0.8] text-light-2 text-[10px] bg-dark-2 leading-[16px]"
            >
                ENTER CODE
            </button>
        </div>
    )
}

export default NavBar
