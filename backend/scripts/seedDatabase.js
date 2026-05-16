const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const User = require('../models/User');
const { fetchAllData } = require('./fetchData');
require('dotenv').config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aiverse');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Tool.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = new User({
      username: 'admin',
      email: 'admin@aiverse.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });
    await adminUser.save();

    // Fetch tools data
    console.log('Fetching tools data...');
    const toolsData = await fetchAllData();
    console.log(`Fetched ${toolsData.length} tools`);

    // Insert tools into database
    console.log('Inserting tools into database...');
    const batchSize = 100;
    let insertedCount = 0;

    for (let i = 0; i < toolsData.length; i += batchSize) {
      const batch = toolsData.slice(i, i + batchSize);
      
      // Add some tools as submitted by admin user for variety
      const batchWithSubmitter = batch.map((tool, index) => {
        if (Math.random() > 0.7) { // 30% chance of being submitted by admin
          return {
            ...tool,
            submittedBy: adminUser._id
          };
        }
        return tool;
      });

      const inserted = await Tool.insertMany(batchWithSubmitter);
      insertedCount += inserted.length;
      
      console.log(`Inserted ${insertedCount}/${toolsData.length} tools`);
    }

    // Set some tools as featured
    console.log('Setting featured tools...');
    const featuredCount = Math.floor(toolsData.length * 0.05); // 5% featured
    await Tool.updateMany(
      {},
      { featured: true },
      { limit: featuredCount, sort: { popularity: -1 } }
    );

    // Set some tools as having deals
    console.log('Setting tools with deals...');
    const dealsCount = Math.floor(toolsData.length * 0.1); // 10% with deals
    await Tool.updateMany(
      {},
      { deals: true },
      { limit: dealsCount, sort: { popularity: 1 } }
    );

    console.log('Database seeding completed successfully!');
    console.log(`- ${insertedCount} tools inserted`);
    console.log(`- ${featuredCount} tools featured`);
    console.log(`- ${dealsCount} tools with deals`);
    console.log(`- 1 admin user created`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
