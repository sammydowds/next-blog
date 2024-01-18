import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: '3px',
  },
})

const sizes = {
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
