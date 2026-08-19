/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChallenge } from "@/helper/model/challenge"; 
import useChallengePayment from "./useChallengePayment";
import GuestSignupForm from "./GuestSignupForm";
import JoinStep from "./JoinStep";
import PaymentMethodStep from "./PaymentMethodStep";
import CouponStep from "./CouponStep";
import { ModalLayout } from "@/components/shared";

interface ChallengeJoinModalProps {
    isOpen: boolean;
    onClose: () => void;
    isShow: boolean;
    tab: number;
    setTab: (tab: number) => void;
    formikTpLogin: any;
    isLoading: boolean;
    item: IChallenge;
    share: string | null;
    hasPaid: boolean;
    isParticipant: boolean;
    isCheckingChallenge: boolean;
    discount?: number | null;
    payment: ReturnType<typeof useChallengePayment>;
    isUserLoggedIn: boolean;
    isJoinPending: boolean;
    onJoin: () => void;
    onLogin: () => void;
    couponCode: string;
    setCouponCode: (val: string) => void;
    isRedeemingCoupon: boolean;
    onRedeemCoupon: () => void;
}

export default function ChallengeJoinModal({
    isOpen,
    onClose,
    isShow,
    tab,
    setTab,
    formikTpLogin,
    isLoading,
    item,
    share,
    hasPaid,
    isParticipant,
    isCheckingChallenge,
    discount,
    payment,
    isUserLoggedIn,
    isJoinPending,
    onJoin,
    onLogin,
    couponCode,
    setCouponCode,
    isRedeemingCoupon,
    onRedeemCoupon,
}: ChallengeJoinModalProps) {
    return (
        <ModalLayout
            isOpen={isOpen}
            size={isShow ? "sm" : tab === 1 ? "sm" : "md"}
            onClose={onClose}
        >
            {isShow && (
                <GuestSignupForm formik={formikTpLogin} isLoading={isLoading} />
            )}

            {!isShow && tab === 0 && !payment.showPaymentTypeSelector && (
                <JoinStep
                    item={item}
                    share={share}
                    hasPaid={hasPaid}
                    isParticipant={isParticipant}
                    isCheckingChallenge={isCheckingChallenge}
                    discount={discount}
                    fee={payment.fee}
                    isJoining={isJoinPending}
                    onJoin={onJoin}
                    onLogin={onLogin}
                    onUseCoupon={() => setTab(1)}
                    onSelectPaymentMethod={() =>
                        payment.setShowPaymentTypeSelector(true)
                    }
                />
            )}

            {!isShow && tab === 0 && payment.showPaymentTypeSelector && (
                <PaymentMethodStep
                    showWalletOption={isUserLoggedIn}
                    walletBalance={payment.wallet?.balance as number}
                    paymentType={payment.paymentType}
                    setPaymentType={payment.setPaymentType}
                    canPay={payment.canPay}
                    isPaying={isJoinPending || payment.creatingOrderLoading}
                    onPay={payment.handlePayment}
                    reference={payment.reference}
                    amount={payment.amount}
                    onPaystackFailed={() => {
                        payment.stopOrderLoading();
                        payment.setCanPay(false);
                    }}
                    onPaystackSuccess={() => {
                        payment.stopOrderLoading();
                        payment.setCanPay(true);
                        onJoin();
                    }}
                />
            )}

            {!isShow && tab === 1 && (
                <CouponStep
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    onBack={() => setTab(0)}
                    onConfirm={onRedeemCoupon}
                    isLoading={isRedeemingCoupon}
                />
            )}
        </ModalLayout>
    );
}
