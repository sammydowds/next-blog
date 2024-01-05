import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 
import { CSSProperties, ReactNode } from 'react'

export const SIMPLE_AUTO_CAROUSEL_SLIDE_CLASSNAME = "keen-slider__slide"

interface SimpleAutoCarouselProps {
  children: ReactNode[]
  rtl?: boolean
  duration?: number
  style?: CSSProperties
}
export const SimpleAutoCarousel =  ({ rtl = false, duration, children, style }: SimpleAutoCarouselProps) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    rtl
    }, 
    [
        (slider) => {
          let timeout
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, duration)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
    ]
  )
  

  return (
    <div ref={sliderRef} className="keen-slider" style={style}>
      {
        children?.map((c) => {
          return(
              c
          )
        })
      }
    </div>
  )
}
