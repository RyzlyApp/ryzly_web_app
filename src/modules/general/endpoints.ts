export const ENDPOINTS = {
  chats: {
    chat: "/chat",
    get_chat_by_id: (id: string) => `/chat/${id}`,
    get_chat_by_challenge_id: (challengeId: string) =>
      `/chat/challenge/${challengeId}`,
    delete_chat_message: (messageId: string) => `/chat/message/${messageId}`,
    get_chat_messages: (chatId: string) => `/chat/${chatId}/messages/`,
    delete_chat: (chatId: string) => `/chat/${chatId}`,
  },
  payment: {
    create_order: "/payment/order",
    create_order_organisation: (typeId: string) =>  `/payment/organization/${typeId}`,
    verify_payment: "/payment/verify",
    payment_list: "/payment/list",
    get_payment_by_typeid: (typeId: string) => `/payment/by-type/${typeId}`,
  },
  wallet: {
    get_wallet: "/wallet",
    get_paystack_bank_list: "/wallet/banks",
    create_bank: "/wallet/banks",
    create_organisation_bank: (id: string) => `/wallet/organization/${id}/banks`,
    get_user_accounts: "/wallet/banks/accounts",
    get_account_by_organisation_bank: (id: string) => `/wallet/organization/${id}/banks/accounts`,
    get_account_by_id: (id: string) => `/wallet/banks/${id}`,
    get_account_by_organisation_id: (id: string) => `/wallet/organization/${id}`,
    edit_account: (id: string) => `/wallet/banks/${id}`,
    delete_account: (id: string) => `/wallet/banks/${id}`,
    set_account_as_default: (id: string) => `/wallet/banks/${id}/default`,
    set_account_as_default_organisation: (id: string, organizationId: string) => `/wallet/organization/${organizationId}/banks/${id}/default`,
    edit_organisation_account: (id: string, organizationId: string) => `/wallet/organization/${organizationId}/banks/${id}`,
  },  
  payout: {
    create_payout: '/payout',
    create_organisation_payout: (id: string) => `/payout/organization/${id}`,
  },
  fileUploads: {
    upload_file: "/upload/file",
  },
  notification: {
    get: "/notifications/user/unread",
    markAsRead: "/notifications/user/read",
  },
};
