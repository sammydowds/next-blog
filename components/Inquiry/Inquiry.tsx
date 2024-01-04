import { useDisclosure, Modal, Button, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TbBrandTelegram } from 'react-icons/tb'
import { useInquiry } from './hooks/useInquiry'
import va from '@vercel/analytics'

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
  const [email, setEmail] = useState()

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

  const handleEmailChange = (e: any) => {
    let inputValue = e.target.value
    setEmail(inputValue)
  }

  const handleClick = () => {
    submitInquiry(router.asPath, name, email, inquiry)
  }

  const handleOpenModal = () => {
    va.track("Opened inquiry modal")
    onOpen()
  }

  return (
    <>
      <Button onClick={handleOpenModal} borderRadius="5px" height="60px" fontSize="20px" leftIcon={<TbBrandTelegram />}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent borderRadius="5px" mx="5px">
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!data && !error && (
              <VStack gap="5px">
                <Input placeholder="Name" borderRadius="0" onChange={handleNameInputChange} />
                <Input placeholder="Email" type="email" borderRadius="0" onChange={handleEmailChange} />
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
                <AlertTitle>Failed to send</AlertTitle>
                <AlertDescription>Oops!</AlertDescription>
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            {!data && !error ? <Button isDisabled={!name || !inquiry || !email} borderRadius="5px" variant='ghost' mr={3} onClick={handleClick} leftIcon={<TbBrandTelegram />} isLoading={loading}>
              {ctaText}
            </Button> : null
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
