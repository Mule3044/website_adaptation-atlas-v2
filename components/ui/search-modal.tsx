import React, { useEffect, useRef, useState } from "react"
import { useSanityData } from "@/contexts/data-context"
import * as Collapsible from "@radix-ui/react-collapsible"
import OutsideClickHandler from "react-outside-click-handler"
import Link from "next/link"
import Search from "./search"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { breakpoints } from "@/lib/constants"
import { usePathname, useSearchParams } from "next/navigation"

const SearchModal = ({modalState}: any) => {
    const [open, setOpen] = React.useState(false)
    const closeAll = () => {
        setOpen(false)
    }
    const isDesktop = useMediaQuery(breakpoints.lg);
    const isLgScreen = useMediaQuery(breakpoints.xl)
        const {
        homeContent,
        searchContent
    } = useSanityData()
    const ref = useRef<HTMLDivElement>(null)
    const [translateY, setTranslateY] = useState(0)
    const [searchBoxActive, setSearchBoxActive] = useState(false);
    const searchPlaceholder = isLgScreen ? homeContent?.search.placeholder : homeContent?.search.placeholderShort;
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const setModalOpen = () => {
        setOpen(true)
    }
    useEffect(() => {
        setOpen(false)
    }, [pathname, searchParams]);
    useEffect(() => { 
        modalState(open)
    }, [open]);

    return (
        <Collapsible.Root
        className={`CollapsibleRoot font-medium mr-12 h-full hover:text-brand-green transition-colors`}
        open={open} 
        onOpenChange={setModalOpen}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Collapsible.Trigger asChild>
            <Link href={''} onClick={setModalOpen} className={`${ !isDesktop ? 'text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide' : 'mr-11 text-l font-medium text-grey-600 hover:text-brand-green transition-colors'}`}>
              {!isDesktop ? homeContent?.search.menuTitle : homeContent?.search.menuTitle.toUpperCase()}
            </Link>
          </Collapsible.Trigger>
        </div>
        <div className={`h-screen w-screen fixed ${open && isDesktop ? ' bg-white/95 top-0 left-0' : ''}  ${open && !isDesktop ? ' bg-white top-[-245px] left-0' : ''} z-80 ${open && 'transition ease-in-out delay-50 duration-150'}`}>
        <OutsideClickHandler onOutsideClick={() => closeAll()}>
          <Collapsible.Content
            className="collapseContent text-grey-600"
          >
            <div id="modal" ref={ref} className={`${!isDesktop ? 'absolute' : 'fixed'} top-[50%] left-0 h-full w-full flex justify-center align-middle ${open && 'transition ease-in-out delay-150 duration-300'}`}>
              <div id='search-container' style={{ transform: `translateY(${translateY}px)` }} className={` ${isDesktop ? 'w-[849px]' : 'w-[343px]'} transition-transform`}>
                {searchContent && <Search data={searchContent} placeholder={searchPlaceholder} searchBoxActive={searchBoxActive} setSearchBoxActive={setSearchBoxActive} />}
              </div>
            </div>
          </Collapsible.Content>
        </OutsideClickHandler>
        </div>
      </Collapsible.Root>
    )
}

export default SearchModal
