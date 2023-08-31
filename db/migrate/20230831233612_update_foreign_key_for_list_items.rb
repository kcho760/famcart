class UpdateForeignKeyForListItems < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :list_items, :lists
    add_foreign_key :list_items, :lists, on_delete: :cascade
  end
end
