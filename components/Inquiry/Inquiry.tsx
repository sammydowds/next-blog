import { useDisclosure, Modal, Button, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TbBrandTelegram } from 'react-icons/tb'
import { useInquiry } from './hooks/useInquiry'

interface InquiryProps {
  modalTitle: string
  buttonText: string
  ctaText: string
  secondaryCtaText: string
}
export const Inquiry = ({ modalTitle, buttonText, ctaText }: InquiryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { submitInquiry, loading, error, data, setData, setError } = useInquiry()
  const [inquiry, setInquiry] = useState()
  const [name, setName] = useState()

  const handleOnClose = () => {
    setData(null)
    setError(null)
    onClose()
  }

  const handleMessageInputChange = (e: any) => {
    let inputValue = e.target.value
    setInquiry(inputValue)
  }

  const handleNameInputChange = (e: any) => {
    let inputValue = e.target.value
    setName(inputValue)
  }

  const handleClick = () => {
    submitInquiry(router.asPath, name, inquiry)
  }

  return (
    <>
      <Button onClick={onOpen} borderRadius="0" height="60px" fontSize="20px" leftIcon={<TbBrandTelegram />}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent borderRadius="0" mx="5px">
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!data && !error && (
              <VStack gap="5px">
                <Input placeholder="Name" borderRadius="0" onChange={handleNameInputChange} />
                <Textarea placeholder="Message..." height="200px" borderRadius="0" onChange={handleMessageInputChange} />
              </VStack>
            )}
            {data && (
              <Alert status='success'>
                <AlertIcon />
                <AlertTitle>Message sent!</AlertTitle>
                <AlertDescription>Thanks!</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Message Failed to Send</AlertTitle>
                <AlertDescription>Oops, something went wrong.</AlertDescription>
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            {!data && !error && <Button isDisabled={!name || !inquiry} variant='ghost' mr={3} onClick={handleClick} leftIcon={<TbBrandTelegram />} isLoading={loading}>
              {ctaText}
            </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}