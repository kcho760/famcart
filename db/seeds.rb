# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# Clear existing data
ListItem.destroy_all
Item.destroy_all
List.destroy_all
User.destroy_all

# Create first user
user1 = User.create!(
  email: 'test1@example.com',
  password: 'password123',
  name: 'Test User 1'
)

# Create a list for user1
list1 = List.create!(
  name: 'Grocery List',
  user: user1
)

# Create some items for user1
item1 = Item.create!(name: 'Apples', unit: 'lbs', user: user1)
item2 = Item.create!(name: 'Milk', unit: 'gallons', user: user1)

# Add items to the list of user1
ListItem.create!(quantity: 2, item: item1, list: list1, added_by_id: user1.id, checked: false, notes: 'Red apples')
ListItem.create!(quantity: 1, item: item2, list: list1, added_by_id: user1.id, checked: true, notes: 'Whole milk')

# Create second user
user2 = User.create!(
  email: 'test2@example.com',
  password: 'password123',
  name: 'Test User 2'
)

# Create a list for user2
list2 = List.create!(
  name: 'Office Supplies',
  user: user2
)

# Create some items for user2
item3 = Item.create!(name: 'Pens', unit: 'pieces', user: user2)
item4 = Item.create!(name: 'Notebooks', unit: 'pieces', user: user2)

# Add items to the list of user2
ListItem.create!(quantity: 5, item: item3, list: list2, added_by_id: user2.id, checked: false, notes: 'Blue ink')
ListItem.create!(quantity: 3, item: item4, list: list2, added_by_id: user2.id, checked: false, notes: 'Lined paper')

puts 'Seeding complete!'
