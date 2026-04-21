const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

dotenv.config();

const restaurants = [
  {
    name: "Burger Palace",
    description: "Home of the best gourmet burgers in town. Fresh ingredients, never frozen.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    cuisine: ["American", "Burgers"],
    rating: 4.7,
    reviewCount: 342,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 10,
    address: "123 Main St",
    featured: true,
    tags: ["Popular", "Fast Delivery"],
  },
  {
    name: "Pizza Paradise",
    description: "Authentic Italian wood-fired pizzas made with love and tradition.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    reviewCount: 218,
    deliveryTime: "25-40 min",
    deliveryFee: 2.49,
    minOrder: 12,
    address: "456 Oak Ave",
    featured: true,
    tags: ["Wood-fired", "Vegetarian Options"],
  },
  {
    name: "Sushi World",
    description: "Fresh sushi and Japanese cuisine prepared by master chefs.",
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.8,
    reviewCount: 189,
    deliveryTime: "30-45 min",
    deliveryFee: 3.99,
    minOrder: 20,
    address: "789 Pine Rd",
    featured: true,
    tags: ["Premium", "Fresh"],
  },
  {
    name: "Taco Fiesta",
    description: "Authentic Mexican street food with bold flavors.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    cuisine: ["Mexican", "Tacos"],
    rating: 4.3,
    reviewCount: 156,
    deliveryTime: "20-35 min",
    deliveryFee: 1.49,
    minOrder: 8,
    address: "321 Elm Blvd",
    featured: false,
    tags: ["Spicy", "Budget-Friendly"],
  },
  {
    name: "The Green Bowl",
    description: "Healthy, plant-based meals for conscious eaters.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    cuisine: ["Healthy", "Vegan"],
    rating: 4.6,
    reviewCount: 203,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minOrder: 15,
    address: "654 Maple Dr",
    featured: false,
    tags: ["Vegan", "Organic"],
  },
];

const menuItems = {
  "Burger Palace": [
    { name: "Classic Cheeseburger", description: "Beef patty, cheddar, lettuce, tomato, pickles", price: 9.99, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", isVeg: false },
    { name: "BBQ Bacon Burger", description: "Double patty, crispy bacon, BBQ sauce, onion rings", price: 13.99, category: "Burgers", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300", isVeg: false },
    { name: "Veggie Burger", description: "Plant-based patty, avocado, sprouts, chipotle mayo", price: 11.99, category: "Burgers", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300", isVeg: true },
    { name: "Crispy Fries", description: "Golden fries with sea salt and house dip", price: 3.99, category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300", isVeg: true },
    { name: "Chocolate Milkshake", description: "Thick and creamy, made with real ice cream", price: 5.99, category: "Drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300", isVeg: true },
  ],
  "Pizza Paradise": [
    { name: "Margherita", description: "San Marzano tomato, fresh mozzarella, basil", price: 12.99, category: "Pizzas", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300", isVeg: true },
    { name: "Pepperoni Feast", description: "Loaded with premium pepperoni slices", price: 15.99, category: "Pizzas", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", isVeg: false },
    { name: "BBQ Chicken Pizza", description: "Grilled chicken, red onion, cilantro, BBQ base", price: 16.99, category: "Pizzas", image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=300", isVeg: false },
    { name: "Garlic Bread", description: "Toasted with herb butter and parmesan", price: 4.99, category: "Sides", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300", isVeg: true },
    { name: "Tiramisu", description: "Classic Italian dessert, homemade daily", price: 6.99, category: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300", isVeg: true },
  ],
  "Sushi World": [
    { name: "Salmon Nigiri (2pc)", description: "Fresh Atlantic salmon over seasoned rice", price: 7.99, category: "Nigiri", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300", isVeg: false },
    { name: "Dragon Roll", description: "Shrimp tempura, avocado, cucumber, eel sauce", price: 14.99, category: "Rolls", image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=300", isVeg: false },
    { name: "Veggie Rainbow Roll", description: "Avocado, cucumber, carrot, radish, sesame", price: 11.99, category: "Rolls", image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=300", isVeg: true },
    { name: "Miso Soup", description: "Traditional with tofu, wakame, scallions", price: 3.49, category: "Soups", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300", isVeg: true },
    { name: "Edamame", description: "Steamed soybeans with sea salt", price: 4.49, category: "Starters", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", isVeg: true },
  ],
  "Taco Fiesta": [
    { name: "Carne Asada Tacos (3pc)", description: "Grilled beef, salsa verde, onion, cilantro", price: 10.99, category: "Tacos", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300", isVeg: false },
    { name: "Chicken Quesadilla", description: "Grilled chicken, peppers, melted cheese", price: 9.99, category: "Quesadillas", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300", isVeg: false },
    { name: "Veggie Burrito", description: "Black beans, rice, roasted veggies, guac", price: 8.99, category: "Burritos", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300", isVeg: true },
    { name: "Guacamole & Chips", description: "Fresh made guac with tortilla chips", price: 5.99, category: "Sides", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300", isVeg: true },
  ],
  "The Green Bowl": [
    { name: "Buddha Bowl", description: "Quinoa, roasted veggies, tahini, seeds", price: 13.99, category: "Bowls", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", isVeg: true },
    { name: "Acai Smoothie Bowl", description: "Acai, banana, granola, fresh berries", price: 10.99, category: "Bowls", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300", isVeg: true },
    { name: "Kale Caesar Salad", description: "Massaged kale, vegan caesar, croutons", price: 11.99, category: "Salads", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300", isVeg: true },
    { name: "Green Detox Juice", description: "Spinach, cucumber, celery, lemon, ginger", price: 6.99, category: "Drinks", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300", isVeg: true },
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Restaurant.deleteMany();
    await MenuItem.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create({ name: 'Admin User', email: 'admin@foodie.com', password: 'admin123', role: 'admin' });
    await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    console.log('✅ Users seeded');

    for (const rData of restaurants) {
      const restaurant = await Restaurant.create(rData);
      const items = menuItems[rData.name] || [];
      for (const item of items) {
        await MenuItem.create({ ...item, restaurant: restaurant._id });
      }
      console.log(`✅ Seeded: ${restaurant.name}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin: admin@foodie.com / admin123');
    console.log('User:  john@example.com / password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
