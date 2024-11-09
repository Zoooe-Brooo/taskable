import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../utils/mutations';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ variables: { email } });
      toast({
        title: 'Success',
        description: 'Password reset instructions sent to your email',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent p={6}>
        <ModalHeader>Reset Password</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Text mb={4}>Enter your email to receive reset instructions.</Text>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="teal" w="full">
              Send Reset Link
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ForgotPasswordModal;
