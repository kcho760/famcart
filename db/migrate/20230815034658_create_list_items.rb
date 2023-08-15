class CreateListItems < ActiveRecord::Migration[7.0]
  def change
    create_table :list_items do |t|
      t.integer :quantity
      t.boolean :checked
      t.text :notes
      t.references :list, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.references :added_by, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
