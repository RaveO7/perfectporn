import React, { useMemo, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { formatString, getRating } from './Utils';
import { IoMdThumbsUp } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';

type Image = {
    id: number
    title: string
    name: string
    imgUrl: string
    view: number
    like: number
    dislike: number
    time: number
}

function cn(...classes: string[]) { return classes.filter(Boolean).join(' '); }

export default function Galery({
    images,
    type,
    inject,
}: {
    images: Image[],
    type: string,
    /**
     * Injections "in-feed" (ex: pubs) à des index donnés.
     * L'index est basé sur la liste originale `images` (avant insertion).
     */
    inject?: Array<{ key: string; index: number; node: React.ReactNode }>,
}) {
    const items = useMemo(() => {
        if (!inject?.length) return images as any[]

        const sorted = [...inject]
            .filter((x) => x && typeof x.index === 'number' && x.node)
            .sort((a, b) => a.index - b.index)

        const out: any[] = [...images]
        let offset = 0

        for (const inj of sorted) {
            const baseIdx = Math.max(0, Math.min(images.length, inj.index))
            const insertAt = baseIdx + offset
            out.splice(insertAt, 0, { __injected: true, __key: inj.key, __node: inj.node } as any)
            offset += 1
        }

        return out
    }, [images, inject])

    return (
        <div className='w-full mb-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 md:p-0 gap-y-5 gap-x-6 xl:gap-x-8 '>
                {items.map((image: any, index: number) => {
                    if (image?.__injected) {
                        return (
                            <div key={image.__key || `__inj_${index}`} className="w-full">
                                {image.__node}
                            </div>
                        )
                    }
                    return <BlurImage key={index} image={image as Image} index={index} type={type} />
                })}
            </div>
            
        </div>
    )
}

function BlurImage({ image, index, type }: { image: Image, index: number, type: string }) {
    const [isLoading, setLoading] = useState(true)
    const title = image.title ? image.title : image.name
    const url = image.title ? (image.title && image.name ? image.name : '/videos/' + image.id + "?name=" + title): '/' + type + '/' + title
    const rating = getRating(image.like, image.dislike)

    return (
        <Link
            href={url}
            target={image.title && image.name ? `_blankz` : '_self'}
            rel={image.title && image.name ? `noopener` : ''}
            role='link'
            aria-label={'Go to video ' + title} className='group'>
            <div className='aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-200'>
                <Image
                    alt={title}
                    src={image.imgUrl}
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={80}
                    decoding="async"
                    data-nimg="1"
                    priority={index < 8 ? true : false}
                    fetchPriority={index < 8 ? 'high' : 'low'}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    className={cn('block w-auto h-auto  group-hover:scale-105 duration-[400ms] ease-in-out',
                        isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                    )}
                    onLoad={() => setLoading(false)}
                />
                {image.time != 0 &&
                    <div>
                        <div className="tracking-wider text-xs absolute right-[6px] top-[6px] rounded px-[4px]
                        bg-bgTimeVideo opacity-80 text-timeVideo group-hover:text-white group-hover:opacity-100 duration-[400ms] ease-in-out">
                            <p>{image.time}</p>
                        </div>
                    </div>
                }
                {image.view >= 0 &&
                    <div>
                        <div className="flex items-center text-xs absolute right-[6px] bottom-[6px] rounded px-1 
                    bg-bgTimeVideo opacity-80 text-timeVideo group-hover:text-white group-hover:opacity-100 duration-[400ms] ease-in-out">
                            <IoEyeSharp className="mr-[2px]" />
                            <p className="mr-2 hover:cursor-auto">{image.view}</p>
                            <IoMdThumbsUp className="mr-[1px]" />
                            <p className="hover:cursor-auto">{rating}%</p>
                        </div>
                    </div>
                }
            </div>
            <h3 className="text-[16px] font-[600] leading-5 tracking-wide mt-1 break-words max-h-10 overflow-hidden text-timeVideo group-hover:text-white duration-[400ms] ease-in-out">
                {formatString(title)}
            </h3>
        </Link>
    )
}
