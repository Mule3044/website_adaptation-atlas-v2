import React from "react"
import { useSanityData } from "@/contexts/data-context"
import * as Collapsible from "@radix-ui/react-collapsible"
import OutsideClickHandler from "react-outside-click-handler"
import Link from "next/link"

const DropdownExpandMenu = () => {
  const [subMenu1, setSubMenu1] = React.useState(false)
  const [subMenu2, setSubMenu2] = React.useState(false)
  const [subMenu3, setSubMenu3] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const anySubOpen = () => (subMenu1 || subMenu2 || subMenu3 ? true : false)
  const openSubMenu = (key: number) => {
    if (key == 1) {
      setSubMenu1(!subMenu1)
      setSubMenu2(false)
      setSubMenu3(false)
    }
    if (key == 2) {
      setSubMenu1(false)
      setSubMenu2(!subMenu2)
      setSubMenu3(false)
    }
    if (key == 3) {
      setSubMenu1(false)
      setSubMenu2(false)
      setSubMenu3(!subMenu3)
    }
  }
  const closeAll = () => {
    setOpen(false)
    setSubMenu1(false)
    setSubMenu2(false)
    setSubMenu3(false)
  }
  const { spotlights, insights, impacts, siteSettings } = useSanityData()
  const filteredSpotlights = spotlights?.filter((item: any) => !item.comingSoon  || !item.underMaintenance)
  if (spotlights)
    return (
      <Collapsible.Root
        className={`CollapsibleRoot font-medium mr-12 hover:text-brand-green transition-colors ${
          open ? "text-brand-green" : "text-grey-600"
        }`}
        open={open}
        onOpenChange={setOpen}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Collapsible.Trigger asChild>
            <span className="Text cursor-pointer">
              {siteSettings.menu.workTitle.toUpperCase()}
            </span>
          </Collapsible.Trigger>
        </div>
        <OutsideClickHandler onOutsideClick={() => closeAll()}>
          <Collapsible.Content
            style={{ width: anySubOpen() ? "814px" : "210px" }}
            className="bg-white border-l-4 mt-5 text-grey-600 border-brand-green pt-4 pl-5 absolute left-64 hover:text-brand-green transition-colors"
          >
            <div className="text-black mb-5">
              <p onClick={() => openSubMenu(1)}>
                <span
                  className={`cursor-pointer text-base font-medium hover:text-brand-green transition-colors ${
                    subMenu1 ? "text-brand-green" : "text-grey-600"
                  }`}
                >
                  {siteSettings.contentTypes.spotlightsTitle.toUpperCase()}
                </span>
              </p>
              {subMenu1 &&
                filteredSpotlights.map((article: any) => (
                  <p className="ml-4 my-4">
                    <Link
                      key={article.id}
                      href={`/data-explorations/${article.slug}`}
                      className="m-0 cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors"
                      onClick={() => closeAll()}
                    >
                      {article.title}
                    </Link>
                  </p>
                ))}
            </div>
            <div className="text-black mb-5">
              <p onClick={() => openSubMenu(2)}>
                <span
                  className={`cursor-pointer text-base font-medium hover:text-brand-green transition-colors ${
                    subMenu2 ? "text-brand-green" : "text-grey-600"
                  }`}
                >
                  {siteSettings.contentTypes.impactsTitle.toUpperCase()}
                </span>
              </p>
              {subMenu2 &&
                impacts.map((article: any) => (
                  <p className="ml-4 my-4">
                    <Link
                      key={article.id}
                      href={`/use-cases/${article.slug}`}
                      className="m-0 cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors"
                      onClick={() => closeAll()}
                    >
                      {article.title}
                    </Link>
                  </p>
                ))}
            </div>
            <div className="text-black mb-5">
              <p onClick={() => openSubMenu(3)}>
                <span
                  className={`cursor-pointer text-base font-medium hover:text-brand-green transition-colors ${
                    subMenu3 ? "text-brand-green" : "text-grey-600"
                  }`}
                >
                  {siteSettings.contentTypes.insightsTitle.toUpperCase()}
                </span>
              </p>
              {subMenu3 &&
                insights.map((article: any) => (
                  <p className="ml-4 my-4">
                    <Link
                      key={article.id}
                      href={`/quick-reads/${article.slug}`}
                      className="m-0 cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors"
                      onClick={() => closeAll()}
                    >
                      {article.title}
                    </Link>
                  </p>
                ))}
            </div>
          </Collapsible.Content>
        </OutsideClickHandler>
      </Collapsible.Root>
    )
}

export default DropdownExpandMenu
