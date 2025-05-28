  export const dummyOrders = [
    {
      id: '#A1827873463667378',
      status: 'arriving',
      product: {
        name: 'Bells Analog Watch for Womens',
        brand: 'Timex',
        price: '¥40,000',
        image: require('../../../assets/Products/img3.png'),
        size: 'Onesize',
        quantity: 1
      },
      orderDate: '2024-05-20',
      expectedDelivery: '24th May 2024',
      deliveryAddress: {
        name: 'Apoorva Gaur',
        street: '23B, Maple Residency, Sector 45',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122003',
        phone: '9999999999'
      },
      isExchangeReturnOpen: false
    },
    {
      id: '#B1827873463667378',
      status: 'cancelled',
      product: {
        name: 'Brown Tote Bag for Womens',
        brand: 'YouBelle',
        price: '¥15,000',
        image:  require('../../../assets/Products/img1.png'),
        size: 'Medium',
        quantity: 1
      },
      orderDate: '2024-05-15',
      cancellationDate: '2024-05-16',
      deliveryAddress: {
        name: 'Apoorva Gaur',
        street: '23B, Maple Residency, Sector 45',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122003',
        phone: '9999999999'
      }
    },
    {
      id: '#C1827873463667378',
      status: 'delivered',
      product: {
        name: 'Silver Stud Earrings',
        brand: 'WomenClub',
        price: '¥8,999',
        image:  require('../../../assets/Products/img2.png'),
        size: 'Small',
        quantity: 2
      },
      orderDate: '2024-04-10',
      deliveryDate: '2024-04-16',
      deliveryAddress: {
        name: 'Apoorva Gaur',
        street: '23B, Maple Residency, Sector 45',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122003',
        phone: '9999999999'
      },
      isExchangeReturnOpen: false,
      exchangeReturnEndDate: '2024-04-20'
    },
    {
      id: '#D1827873463667378',
      status: 'exchange_initiated',
      product: {
        name: 'Gold Dig Watch',
        brand: 'Fastrack',
        price: '¥12,999',
        image:  require('../../../assets/Products/img3.png'),
        size: 'Onesize',
        quantity: 1
      },
      orderDate: '2024-05-18',
      expectedDelivery: '22nd May 2024',
      deliveryAddress: {
        name: 'Apoorva Gaur',
        street: '23B, Maple Residency, Sector 45',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122003',
        phone: '9999999999'
      },
      exchangeDate: '22nd May 2024'
    }
  ];