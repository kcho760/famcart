class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :unit
      t.string :description
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
