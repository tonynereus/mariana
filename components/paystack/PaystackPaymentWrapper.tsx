import { usePaystackPayment } from 'react-paystack';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPaystackConfig } from '../../utils/functions';

interface PaystackPaymentWrapperProps {
  amount: number;
  orderId: string;
  email: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const PaystackPaymentWrapper = ({
  amount,
  orderId,
  email,
  onSuccess,
  onClose
}: PaystackPaymentWrapperProps) => {
  const router = useRouter();
  const initializePayment = usePaystackPayment(getPaystackConfig(amount, orderId, email));

  useEffect(() => {
    if (initializePayment) {
      initializePayment({
        onSuccess: () => {
          onSuccess?.();
          router.push('/');
        },
        onClose: () => {
          onClose?.();
        }
      });
    }
  }, [initializePayment, onSuccess, onClose, router]);

  return null; // This component doesn't render anything
};

export default PaystackPaymentWrapper;
