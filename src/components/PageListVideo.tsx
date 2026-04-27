import React, { Dispatch, SetStateAction } from 'react'
import Galery from './Galery'
import NavPage from './NavPage'
import Loading from './Loading'
import Nodata from './Nodata'
import BurgerMenuIndexPage from './DroptwonFilter'
import { upperFirstLetter } from './Utils'
import { getInFeedInjections } from '@/components/ads/infeed'


interface Props {
    valueMenu: string,
    setValueMenu: Dispatch<SetStateAction<string>>,
    videos: Array<any>,
    page: number,
    numberPage: number,
    type: string,
    nbrVideo: number,
    loading: boolean,
}

export default function PageListVideo(props: Props) {
    const { setValueMenu, videos, page, numberPage, type, nbrVideo, loading } = props;

    if (loading) return <Loading />
    if (!videos.length) return (<Nodata />)

    let list
    if (!videos[0].title) { list = ["Latest", "A->Z", "Z->A",]; }
    else { list = ["Latest", "More View", "Most Popular", "A->Z", "Z->A",]; }

    const valueMenu = props.valueMenu ? list.includes(props.valueMenu) ? props.valueMenu : "Latest" : props.valueMenu
    // type, valueMenu, nbrVideo, setValueMenu, list

    return (
        <div className='flex flex-col w-full'>
            <div className='w-full flex justify-between items-center text-[20px] mb-6 px-4 lg:px-0 font-bold'>
                {!type ?
                    <h2 className='text-xl md:text-[27px]'>{valueMenu + " " + upperFirstLetter("videos")}</h2>
                    :
                    <h2 className='text-xl md:text-5xl'>{upperFirstLetter(type)} : {nbrVideo}</h2>
                }
                {valueMenu && <BurgerMenuIndexPage valueMenu={valueMenu} setValueMenu={setValueMenu} list={list} />}
            </div>

            <Galery
                images={videos}
                type={type}
                inject={getInFeedInjections()}
            />



            <NavPage page={page} numberPage={numberPage} />
        </div >
    )
}
