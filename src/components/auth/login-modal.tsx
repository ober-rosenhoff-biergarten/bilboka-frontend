'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import CorbadoLogin from './login-corbado';

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  function closeModal() {
    router.back();
  }

  return (
    <Modal
      isOpen={true}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={closeModal}
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Logg inn</ModalHeader>
            <ModalBody className="grid justify-center">
              <CorbadoLogin />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
