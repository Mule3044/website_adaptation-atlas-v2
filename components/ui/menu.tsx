import React from "react"
import { useSanityData } from "@/contexts/data-context"
import * as Collapsible from "@radix-ui/react-collapsible"

const DropdownExpandMenu = () => {
  const [subMenu1, setSubMenu1] = React.useState(false)
  const [subMenu2, setSubMenu2] = React.useState(false)
  const [subMenu3, setSubMenu3] = React.useState(false)

  const [open, setOpen] = React.useState(false)

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
  const { spotlights, insights, impacts } = useSanityData()
  if (spotlights)
    return (
      <Collapsible.Root
        className="CollapsibleRoot font-medium mr-12 text-grey-600 hover:text-brand-green transition-colors'"
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
            <span className="Text cursor-pointer">OUR WORK</span>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content className="bg-white border-l-4 mt-5 w-5/6 text-grey-600 border-brand-green p-4 pl-8 absolute left-40 hover:text-brand-green transition-colors">
          <div className="text-black mb-5">
            <p onClick={() => openSubMenu(1)}>
              <span className="cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors">
                DATA EXPLORATIONS
              </span>
            </p>
            {subMenu1 &&
              spotlights.map((article: any) => (
                <p className="my-4">
                  <a
                    key={article.id}
                    href={`/data-spotlights/${article.slug}`}
                    className="DropdownMenuItem cursor-pointer text-base font-medium mt-5 ml-5 text-grey-600 hover:text-brand-green transition-colors"
                  >
                    {article.title}
                  </a>
                </p>
              ))}
          </div>
          <div className="text-black mb-5">
            <p onClick={() => openSubMenu(2)}>
              <span className="cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors">
                USE CASES
              </span>
            </p>
            {subMenu2 &&
              impacts.map((article: any) => (
                <p className="my-4">
                  <a
                    key={article.id}
                    href={`/data-in-practice/${article.slug}`}
                    className="DropdownMenuItem cursor-pointer text-base font-medium mt-5 ml-5 text-grey-600 hover:text-brand-green transition-colors"
                  >
                    {article.title}
                  </a>
                </p>
              ))}
          </div>
          <div className="text-black mb-5">
            <p onClick={() => openSubMenu(3)}>
              <span className="cursor-pointer text-base font-medium text-grey-600 hover:text-brand-green transition-colors">
                QUICK READS
              </span>
            </p>
            {subMenu3 &&
              insights.map((article: any) => (
                <p className="my-4">
                  <a
                    key={article.id}
                    href={`/data-insights/${article.slug}`}
                    className="DropdownMenuItem cursor-pointer text-base font-medium mt-5 ml-5 text-grey-600 hover:text-brand-green transition-colors"
                  >
                    {article.title}
                  </a>
                </p>
              ))}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
}

export default DropdownExpandMenu
