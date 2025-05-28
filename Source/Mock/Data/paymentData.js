export const paymentMethodsData = [
  {
    id: '1',
    section: 'CARDS',
    items: [
      {
        id: '1-1',
        icon: 'credit-card',
        title: 'Set as Default',
        subtitle: 'Credit and Debit Card',
        action: 'Add',
        hasActionButton: true,
        isDefault: true,
      },
    ],
  },
  {
    id: '2',
    section: 'CASH ON DELIVERY',
    items: [
      {
        id: '2-1',
        icon: 'local-atm',
        title: 'Set as Default',
        subtitle: 'Pay with cash on delivery',
        isDefault: true,
      },
    ],
  },
  {
    id: '3',
    section: 'UPI APPS',
    items: [
      {
        id: '3-1',
        icon: 'apps',
        title: 'PhonePe UPI',
        subtitle: 'Link',
        action: 'Set as Default',
      },
      {
        id: '3-2',
        icon: 'apps',
        title: 'Paytm UPI',
        subtitle: 'Link',
        action: 'Set as Default',
      },
      {
        id: '3-3',
        icon: 'add-circle-outline',
        title: 'Enter New UPI ID',
        action: 'ADD',
        hasActionButton: true,
      },
    ],
  },
  {
    id: '4',
    section: 'WALLET',
    items: [
      {
        id: '4-1',
        icon: 'account-balance-wallet',
        title: 'SuperWallet',
        subtitle: '10.00',
        action: 'ADD',
        hasActionButton: true,
      },
      {
        id: '4-2',
        icon: 'account-balance-wallet',
        title: 'Paytm Wallet',
        subtitle: 'Link',
      },
    ],
  },
  {
    id: '5',
    section: 'NET BANKING',
    items: [
      {
        id: '5-1',
        icon: 'account-balance',
        title: 'Choose your bank',
        action: 'ADD',
        hasActionButton: true,
      },
    ],
  },
];
