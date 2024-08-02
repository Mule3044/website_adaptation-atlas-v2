"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { breakpoints } from "@/lib/constants"
import Search from "@/components/ui/search"
// import atlasLogo from '@/public/images/atlas-logo.svg'
import { Home, SearchItem, Settings } from "@/types/sanity.types"
import cn from "classnames"
import { PortableText } from "@portabletext/react"
import { useLanguageContext } from "@/contexts/language-context"

type Props = {
  searchContent: SearchItem[]
  content: Home
  settings: Settings
}

const HomeHero = ({ searchContent, content, settings }: Props) => {
  const [searchBoxActive, setSearchBoxActive] = useState(false)
  const isDesktop = useMediaQuery(breakpoints.lg)
  const isLgScreen = useMediaQuery(breakpoints.xl)
  const searchPlaceholder = isLgScreen
    ? content.search.placeholder
    : content.search.placeholderShort
  const introTextRef = useRef<HTMLHeadingElement>(null)
  const subTitleRef = useRef<HTMLHeadingElement>(null)
  const [translateY, setTranslateY] = useState(0)

  const { setLocale, locale } = useLanguageContext()
  const handleLinkClick = (e: any, target: any) => {
    e.preventDefault() // Prevent default anchor behavior
    const scrollTarget = document.querySelector(target)

    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    if (introTextRef.current) {
      const height = introTextRef.current.offsetHeight
      const offset = isDesktop ? 70 : 40
      setTranslateY(searchBoxActive ? -height - offset : 0)
    }
  }, [searchBoxActive])

  return (
    <div
      id="hero"
      className="flex flex-wrap justify-between lg:h-[800px] mb-5"
    >
      {isDesktop ? (
        <>
          <div
            id="intro-search"
            className="basis-full lg:basis-1/2 flex lg:justify-center mt-[100px] lg:mt-[200px]"
          >
            <div className="basis-full lg:basis-4/5  ">
              <Image // logo
                src={settings.logoDark}
                alt={settings.logoDarkAlt}
                width={280}
                height={280}
                className="mb-7 w-[200px] lg:w-[280px]"
              />

              {content.introText && (
                <h1
                  ref={introTextRef}
                  className={cn(
                    "max-w-[480px] lg:max-w-[600px] text-grey-600 font-semibold leading-snug mb-1 lg:mb-2 lg:text-[36px] transition-opacity",
                    { "opacity-0": searchBoxActive }
                  )}
                >
                  {content.introText}
                </h1>
              )}
              <div
                className={cn(
                  "max-w-[480px] lg:max-w-[600px] text-grey font-semibold leading-[28px] mb-5 text-[18px] lg:mb-10 "
                )}
              >
                <PortableText value={content.subTitle} />
              </div>
              <button className={`bg-[#2E7636] hover:bg-[#245E2B] text-white text-2xl w-[${locale === 'fr' ? '255px' : '210px'}] h-[58px] py-[8px] px-[30px]`}>
                <a href="#spotlight-grid">{content.ctaText}</a>
              </button>
            </div>
          </div>
          <div
            id="intro-nav"
            className="basis-full lg:basis-1/2 flex lg:justify-center mt-[50px] lg:mt-[100px]"
          >
            <Image // logo
              src={content.heroImage}
              alt={content.heroImageAlt}
              width={739}
              height={600}
              />
          </div>
        </>
      ) : (
        <>
          <div
            id="intro-search"
            className="basis-full lg:basis-1/2 flex lg:justify-center mt-[100px] lg:mt-[200px]"
          >
            <div className="basis-full lg:basis-4/5  ">
              <Image // logo
                src={settings.logoDark}
                alt={settings.logoDarkAlt}
                width={280}
                height={280}
                className="mb-7 w-[200px] md:w-[250px] lg:w-[280px]"
              />

              {content.introText && (
                <h1
                  ref={introTextRef}
                  className={cn(
                    "max-w-[480px] md:max-w-[560px] lg:max-w-[600px] text-grey-600 font-semibold leading-snug mb-1 lg:mb-2 md:text-[30px] lg:text-[36px] transition-opacity",
                    { "opacity-0": searchBoxActive }
                  )}
                >
                  {content.introText}
                </h1>
              )}
              <Image // arrow icon
                className={cn("my-8")}
                src={content.heroImage}
                alt={content.heroImageAlt}
                width={352}
                height={286}
              />
              <div
                className={cn(
                  "max-w-[480px] lg:max-w-[600px] text-grey font-semibold leading-[28px] mb-5 text-[18px] lg:mb-10 "
                )}
              >
                <PortableText value={content.subTitle} />
              </div>
              <button className={`bg-[#2E7636] hover:bg-[#245E2B] text-white text-2xl  h-[58px] py-[8px] px-[30px] ${(locale === "fr") ? "w-[255px]" : "w-[205px]"}`}>
                <a href="#spotlight-grid">{content.ctaText}</a>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomeHero
