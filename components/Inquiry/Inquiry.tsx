import { useDisclosure, Modal, Button, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, Textarea } from '@chakra-ui/react'
import { TbBrandTelegram } from 'react-icons/tb'

interface InquiryProps {
  modalTitle: string
  buttonText: string
  ctaText: string
  secondaryCtaText: string
}
export const Inquiry = ({ modalTitle, buttonText, ctaText }: InquiryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} borderRadius="0" height="60px" fontSize="20px" leftIcon={<TbBrandTelegram />}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="0" mx="5px">
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Message..." height="200px" borderRadius="0" />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose} leftIcon={<TbBrandTelegram />}>
              {ctaText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}