import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavPage({ page, numberPage }: { page: number, numberPage: number }) {
    const pathname = usePathname()

    if (numberPage == 1) { return; }

    const classRBigButtonTest = "   flex items-center justify-center px-4 h-10 border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const classLBigButtonTest = "   flex items-center justify-center px-4 h-10 border rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

    const classLittleButtonTest = " hidden md:flex items-center justify-center px-4 h-10 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const classLittleButton = "     flex items-center justify-center px-4 h-10 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const currentButtonTest = "     flex items-center justify-center px-4 h-10 border-gray-700 bg-gray-700 text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white"

    return (
        <nav aria-label="Page navigation" className='m-auto'>            
            <div className='inline-flex -space-x-px text-base h-10'>
                {1 <= page - 3 && <Link href={`${pathname}`} className={classLBigButtonTest}>First</Link>}
                {1 <= page - 1 && <Link href={`${pathname}?page=${page - 1}`} className={1 >= page - 2 ? classLBigButtonTest : classLittleButtonTest}>Previous</Link>}
                {1 <= page - 2 && <Link href={`${pathname}?page=${page - 2}`} className={classLittleButtonTest}>{page - 2}</Link>}
                {1 <= page - 1 && <Link href={`${pathname}?page=${page - 1}`} className={classLittleButton}>{page - 1}</Link>}

                <Link href=""
                    aria-current="page"
                    className={currentButtonTest}
                    onClick={(e) => e.preventDefault()}>
                    {page}
                </Link>

                {numberPage! >= page + 1 && <Link href={`${pathname}?page=${page + 1}`} className={classLittleButton}>{page + 1}</Link>}
                {numberPage! >= page + 2 && <Link href={`${pathname}?page=${page + 2}`} className={classLittleButtonTest}>{page + 2}</Link>}
                {numberPage! >= page + 1 && <Link href={`${pathname}?page=${page + 1}`} className={numberPage <= page + 2 ? classRBigButtonTest : classLittleButtonTest}>Next</Link>}
                {numberPage! >= page + 3 && <Link href={`${pathname}?page=${numberPage}`} className={classRBigButtonTest}>Last</Link>}
            </div>
        </nav>
    )
}
