export const cars = [
  {
    id: '1',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 15300000,
    category: 'Coupe',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '10.8 kmpl',
    power: '510 bhp',
    popularity: 95,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Laser Lights', 'Carbon Fiber Roof', 'Harman Kardon Audio', 'M Sport Seats'],
    description: 'The BMW M4 Competition blends high-performance capabilities with a luxurious daily-driving experience. A masterpiece of engineering.'
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    price: 17700000,
    category: 'Sedan',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '12.5 kmpl',
    power: '286 bhp',
    popularity: 98,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['MBUX Infotainment', 'Burmester 3D Surround', 'Panoramic Sunroof', 'Rear Seat Entertainment'],
    description: 'The S-Class stands for the fascination of Mercedes-Benz: legendary and traditional engineering expertise defines the luxury segment.'
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 19500000,
    category: 'Electric',
    fuelType: 'Electric',
    transmission: 'Automatic',
    range: '472 km',
    power: '598 bhp',
    popularity: 92,
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Quattro AWD', 'Matrix LED Headlights', 'Bang & Olufsen Sound', 'Carbon Ceramic Brakes'],
    description: 'The Audi RS e-tron GT is a fully electric grand tourer offering dynamic performance and progressive luxury.'
  },
  {
    id: '4',
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    price: 20100000,
    category: 'Coupe',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '9.0 kmpl',
    power: '450 bhp',
    popularity: 99,
    image: 'https://images.unsplash.com/photo-1503376713229-3b6833481231?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1503376713229-3b6833481231?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Sport Chrono Package', 'Rear-Axle Steering', 'Porsche Active Suspension', 'Sports Exhaust System'],
    description: 'Timeless design, contemporary interpretation. The Porsche 911 Carrera S is an icon of the sports car world.'
  },
  {
    id: '5',
    brand: 'Land Rover',
    model: 'Range Rover Velar',
    year: 2024,
    price: 9400000,
    category: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '13.1 kmpl',
    power: '246 bhp',
    popularity: 88,
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Pivi Pro', 'Meridian Sound System', 'Air Suspension', 'Terrain Response 2'],
    description: 'The avant-garde Range Rover. Clean, elegant and distinctive.'
  },
  {
    id: '6',
    brand: 'Jaguar',
    model: 'F-TYPE',
    year: 2023,
    price: 10000000,
    category: 'Coupe',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '10.6 kmpl',
    power: '296 bhp',
    popularity: 85,
    image: 'https://images.unsplash.com/photo-1594951239088-29472ff27103?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1594951239088-29472ff27103?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Active Sports Exhaust', 'Performance Seats', 'Meridian Audio', 'LED Headlights'],
    description: 'A true Jaguar sports car. The F-TYPE combines exhilarating performance with stunning design.'
  }
];

export const brands = [
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Porsche_logo.svg/1200px-Porsche_logo.svg.png' },
  { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Land_Rover_logo_2023.svg/1200px-Land_Rover_logo_2023.svg.png' },
  { name: 'Jaguar', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Jaguar_Cars_logo.svg/1200px-Jaguar_Cars_logo.svg.png' },
  { name: 'Mahindra', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mahindra_Auto_new_logo.svg/1200px-Mahindra_Auto_new_logo.svg.png' }
];
